"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import FixedMacroView from "@/components/FixedMacroView";

interface Point {
  lng: number;
  lat: number;
  label: string;
}

interface Group {
  id: string;
  name: string;
  points: Point[];
  stats: {
    users: number;
    traficJournalier: { day: string; scans: number }[];
  };
}

type Mode = "navigation" | "clic";

export default function MacroAnalysisPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("navigation");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // === Init carte ===
  useEffect(() => {
    if (!isClient || !mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("❌ Token Mapbox manquant");
      return;
    }
    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.3522, 48.8566],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Geocoder
    const geocoderContainer = document.getElementById("geocoder");
    if (geocoderContainer) {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: token,
        mapboxgl,
        marker: false,
        placeholder: "Rechercher une adresse...",
        language: "fr",
      });
      geocoderRef.current.addTo(geocoderContainer);

      geocoderRef.current.on("result", (e: any) => {
        const coords = e.result.center;
        addPoint({
          lng: coords[0],
          lat: coords[1],
          label: e.result.place_name,
        });
        map.current?.flyTo({ center: coords, zoom: 14 });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isClient]);

  // === Click sur carte ===
  useEffect(() => {
    if (!map.current) return;

    const handleClick = async (e: mapboxgl.MapMouseEvent) => {
      if (mode !== "clic") return;

      const { lng, lat } = e.lngLat;
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&language=fr`
      );
      const data = await res.json();
      const label =
        data.features?.[0]?.place_name ||
        `Point (${lng.toFixed(4)}, ${lat.toFixed(4)})`;

      addPoint({ lng, lat, label });
    };

    map.current.on("click", handleClick);
    return () => {
      if (map.current) {
        map.current.off("click", handleClick);
      }
    };
  }, [mode]);

  // === Ajout d'un point => création groupe avec stats mock ===
  const addPoint = (point: Point) => {
    const fakeStats = {
      users: Math.floor(Math.random() * 500) + 50,
      traficJournalier: [
        { day: "Lun", scans: Math.floor(Math.random() * 200) },
        { day: "Mar", scans: Math.floor(Math.random() * 200) },
        { day: "Mer", scans: Math.floor(Math.random() * 200) },
        { day: "Jeu", scans: Math.floor(Math.random() * 200) },
        { day: "Ven", scans: Math.floor(Math.random() * 200) },
        { day: "Sam", scans: Math.floor(Math.random() * 200) },
        { day: "Dim", scans: Math.floor(Math.random() * 200) },
      ],
    };

    setGroups((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: point.label,
        points: [point],
        stats: fakeStats,
      },
    ]);
  };

  const removeGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setSelectedGroups((prev) => prev.filter((gid) => gid !== id));
  };

  const clearAllGroups = () => {
    setGroups([]);
    setSelectedGroups([]);
  };

  // === Affichage markers ===
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    groups.forEach((group) => {
      group.points.forEach((p) => {
        new mapboxgl.Marker({ color: "#2563eb" })
          .setLngLat([p.lng, p.lat])
          .setPopup(new mapboxgl.Popup().setText(group.name))
          .addTo(map.current!);
      });
    });
  }, [groups]);

  if (!isClient) return <div>Chargement...</div>;

  // Couleurs dynamiques
  const colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === Header === */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">📊 Analyse Macro - Collectivités</h1>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${
                mode === "navigation" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("navigation")}
            >
              Navigation
            </button>
            <button
              className={`px-4 py-2 rounded ${
                mode === "clic" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("clic")}
            >
              Ajouter des points
            </button>
          </div>
        </div>
      </div>

      {/* === Recherche === */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div id="geocoder" className="w-full" />
      </div>

      {/* === Groupes === */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">📍 Groupes ({groups.length})</h2>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={clearAllGroups}
              >
                Tout effacer
              </button>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {groups.map((g) => (
              <li
                key={g.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedGroups.includes(g.id)}
                    onChange={(e) =>
                      setSelectedGroups((prev) =>
                        e.target.checked
                          ? [...prev, g.id]
                          : prev.filter((id) => id !== g.id)
                      )
                    }
                  />
                  <span className="font-medium">{g.name}</span>
                  <span className="ml-2 text-gray-500">
                    ({g.points.length} pts)
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeGroup(g.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* === Carte === */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div ref={mapContainer} className="w-full h-[500px] rounded-lg border shadow" />
      </div>

      {/* === Stats IA dynamiques === */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">🤖 Analyse IA - Zones sélectionnées</h2>

          {selectedGroups.length === 0 && (
            <p className="text-gray-500">
              Sélectionnez un ou plusieurs groupes pour voir leurs données.
            </p>
          )}

          {selectedGroups.length > 0 && (
            <>
              <p className="mb-4">
                👥 Utilisateurs totaux :{" "}
                <span className="font-semibold text-blue-600">
                  {groups
                    .filter((g) => selectedGroups.includes(g.id))
                    .reduce((acc, g) => acc + g.stats.users, 0)}
                </span>
              </p>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {groups
                    .filter((g) => selectedGroups.includes(g.id))
                    .map((g, idx) => (
                      <Line
                        key={g.id}
                        data={g.stats.traficJournalier}
                        dataKey="scans"
                        name={g.name}
                        stroke={colors[idx % colors.length]}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>

      {/* === Section IA complète === */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FixedMacroView />
      </div>
    </div>
  );
}