"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

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
}

type Mode = "navigation" | "clic";

export default function MacroAnalysisPage() {
  // ==== ÉTATS CARTE ====
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("navigation");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // ==== INIT MAP ====
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

  // ==== CLIC SUR CARTE ====
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

  // ==== GESTION GROUPES ====
  const addPoint = (point: Point) => {
    setGroups((prev) => [
      ...prev,
      { id: Date.now().toString(), name: point.label, points: [point] },
    ]);
  };

  const removeGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const clearAllGroups = () => {
    setGroups([]);
    setSelectedGroups([]);
  };

  const createGroup = () => {
    if (selectedGroups.length < 2) return alert("Sélectionnez au moins 2 groupes");
    const selected = groups.filter((g) => selectedGroups.includes(g.id));
    const mergedPoints = selected.flatMap((g) => g.points);

    const name = prompt("Nom du groupe :", "Nouveau quartier");
    if (!name) return;

    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      points: mergedPoints,
    };

    setGroups((prev) => [
      ...prev.filter((g) => !selectedGroups.includes(g.id)),
      newGroup,
    ]);
    setSelectedGroups([]);
  };

  // ==== AFFICHAGE SUR CARTE ====
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    groups.forEach((group) => {
      const coords = group.points.map((p) => [p.lng, p.lat]);

      // Marqueurs
      group.points.forEach((p) => {
        new mapboxgl.Marker({ color: "#2563eb" })
          .setLngLat([p.lng, p.lat])
          .setPopup(new mapboxgl.Popup().setText(group.name))
          .addTo(map.current!);
      });

      // Ligne
      if (coords.length >= 2) {
        const lineId = "line-" + group.id;
        if (!map.current!.getSource(lineId)) {
          map.current!.addSource(lineId, {
            type: "geojson",
            data: {
              type: "Feature" as const,
              geometry: { type: "LineString" as const, coordinates: coords },
              properties: {}
            },
          });
          map.current!.addLayer({
            id: lineId,
            type: "line",
            source: lineId,
            paint: { "line-color": "#10b981", "line-width": 3 },
          });
        }
      }

      // Polygone
      if (coords.length >= 3) {
        const polygonId = "polygon-" + group.id;
        if (!map.current!.getSource(polygonId)) {
          map.current!.addSource(polygonId, {
            type: "geojson",
            data: {
              type: "Feature" as const,
              geometry: { type: "Polygon" as const, coordinates: [[...coords, coords[0]]] },
              properties: {}
            },
          });
          map.current!.addLayer({
            id: polygonId,
            type: "fill",
            source: polygonId,
            paint: { "fill-color": "#10b981", "fill-opacity": 0.2 },
          });
        }
      }
    });
  }, [groups]);

  if (!isClient) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* --- Barre de recherche --- */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🔍 Recherche d'adresse</h3>
          <div id="geocoder" className="w-full" />
        </div>
            </div>

      {/* --- Liste Groupes --- */}
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
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={createGroup}
                disabled={selectedGroups.length < 2}
              >
                Créer un groupe
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

      {/* --- Carte --- */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">🗺️ Carte Interactive</h3>
          <div ref={mapContainer} className="w-full h-[400px] rounded-lg border shadow" />
        </div>
      </div>

      {/* --- Statistiques IA --- */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FixedMacroView />
      </div>

    </div>
  );
}