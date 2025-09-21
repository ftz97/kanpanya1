"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface Point {
  lng: number;
  lat: number;
  label: string;
}

interface Group {
  id: string;
  name: string;
  points: Point[];
  color: string;
}

type Mode = "navigation" | "clic";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function MacroAnalysisPage() {
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

      geocoderRef.current.on("result", (e) => {
        const coords = e.result.center;
        addPoint({
          lng: coords[0],
          lat: coords[1],
          label: e.result.place_name,
        });
        map.current?.flyTo({ center: coords, zoom: 14 });
      });
    }

    return () => map.current?.remove();
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
    return () => map.current?.off("click", handleClick);
  }, [mode]);

  // ==== GROUPES ====
  const addPoint = (point: Point) => {
    setGroups((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: point.label,
        points: [point],
        color: COLORS[prev.length % COLORS.length],
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
      color: COLORS[groups.length % COLORS.length],
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

      group.points.forEach((p) => {
        new mapboxgl.Marker({ color: group.color })
          .setLngLat([p.lng, p.lat])
          .setPopup(new mapboxgl.Popup().setText(group.name))
          .addTo(map.current!);
      });

      if (coords.length >= 2) {
        const lineId = "line-" + group.id;
        if (!map.current.getSource(lineId)) {
          map.current.addSource(lineId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "LineString", coordinates: coords },
            },
          });
          map.current.addLayer({
            id: lineId,
            type: "line",
            source: lineId,
            paint: { "line-color": group.color, "line-width": 3 },
          });
        }
      }

      if (coords.length >= 3) {
        const polygonId = "polygon-" + group.id;
        if (!map.current.getSource(polygonId)) {
          map.current.addSource(polygonId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "Polygon", coordinates: [[...coords, coords[0]]] },
            },
          });
          map.current.addLayer({
            id: polygonId,
            type: "fill",
            source: polygonId,
            paint: { "fill-color": group.color, "fill-opacity": 0.2 },
          });
        }
      }
    });
  }, [groups]);

  // ==== FAKE DATA IA ====
  const trafficData = Array.from({ length: 7 }, (_, i) => ({
    day: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i],
    ...groups.reduce((acc, g) => {
      acc[g.name] = Math.floor(Math.random() * 500) + 50;
      return acc;
    }, {} as Record<string, number>),
  }));

  const usersData = groups.map((g) => ({
    name: g.name,
    users: Math.floor(Math.random() * 1000) + 100,
    color: g.color,
  }));

  // ==== GENERATE INSIGHTS IA ====
  const generateInsights = () => {
    if (groups.length === 0) return ["Aucune donnée disponible."];
    const insights: string[] = [];

    // Analyse de performance par groupe
    groups.forEach((g) => {
      const users = usersData.find((u) => u.name === g.name)?.users || 0;
      const traffic = trafficData.reduce((sum, day) => sum + (day[g.name] || 0), 0);
      const avgTraffic = Math.round(traffic / 7);
      
      if (users > 800) {
        insights.push(`🚀 ${g.name} : Forte activité (${users} utilisateurs, ${avgTraffic} visites/jour)`);
      } else if (users < 300) {
        insights.push(`📉 ${g.name} : Sous-activité (${users} utilisateurs, ${avgTraffic} visites/jour)`);
      } else {
        insights.push(`ℹ️ ${g.name} : Activité moyenne (${users} utilisateurs, ${avgTraffic} visites/jour)`);
      }
    });

    // Comparatifs avancés
    if (groups.length >= 2) {
      const sorted = [...usersData].sort((a, b) => b.users - a.users);
      const totalUsers = usersData.reduce((sum, g) => sum + g.users, 0);
      const marketShare = ((sorted[0].users / totalUsers) * 100).toFixed(1);
      
      insights.push(`🏆 Leader : ${sorted[0].name} domine avec ${marketShare}% du marché`);
      insights.push(`📊 Total : ${totalUsers} utilisateurs actifs sur ${groups.length} zones`);
    }

    // Analyse des tendances
    if (groups.length > 0) {
      const totalTraffic = trafficData.reduce((sum, day) => {
        return sum + groups.reduce((groupSum, g) => groupSum + (day[g.name] || 0), 0);
      }, 0);
      
      const peakDay = trafficData.reduce((peak, day) => {
        const dayTotal = groups.reduce((sum, g) => sum + (day[g.name] || 0), 0);
        return dayTotal > peak.total ? { day: day.day, total: dayTotal } : peak;
      }, { day: "Lun", total: 0 });
      
      insights.push(`📈 Pic d'activité : ${peakDay.day} (${peakDay.total} visites)`);
      insights.push(`📊 Moyenne : ${Math.round(totalTraffic / 7)} visites/jour`);
    }

    // Recommandations stratégiques
    if (groups.length >= 3) {
      const underperforming = usersData.filter(g => g.users < 500);
      if (underperforming.length > 0) {
        insights.push(`💡 Recommandation : ${underperforming.length} zone(s) sous-exploitée(s) nécessitent une attention particulière`);
      }
    }

    return insights;
  };

  // ==== MÉTRIQUES AVANCÉES ====
  const getAdvancedMetrics = () => {
    if (groups.length === 0) return null;

    const totalUsers = usersData.reduce((sum, g) => sum + g.users, 0);
    const totalTraffic = trafficData.reduce((sum, day) => {
      return sum + groups.reduce((groupSum, g) => groupSum + (day[g.name] || 0), 0);
    }, 0);
    
    const avgUsersPerGroup = Math.round(totalUsers / groups.length);
    const avgTrafficPerDay = Math.round(totalTraffic / 7);
    
    return {
      totalUsers,
      totalTraffic,
      avgUsersPerGroup,
      avgTrafficPerDay,
      groupCount: groups.length
    };
  };

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

      {/* Barre de recherche */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div id="geocoder" className="w-full" />
      </div>

      {/* Carte */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div ref={mapContainer} className="w-full h-[600px] rounded-lg border shadow" />
      </div>

      {/* Liste groupes */}
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
                  <span className="font-medium" style={{ color: g.color }}>
                    {g.name}
                  </span>
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

      {/* Section IA */}
      <div className="max-w-7xl mx-auto px-4 pb-6 space-y-8">
        {/* Graphique trafic */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">📈 Trafic journalier</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              {groups.map((g) => (
                <Line
                  key={g.id}
                  type="monotone"
                  dataKey={g.name}
                  stroke={g.color}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique utilisateurs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">👥 Répartition des utilisateurs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users">
                {usersData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Métriques globales */}
        {getAdvancedMetrics() && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">📊 Métriques Globales</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{getAdvancedMetrics()?.totalUsers}</div>
                <div className="text-sm text-gray-600">Utilisateurs totaux</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{getAdvancedMetrics()?.totalTraffic}</div>
                <div className="text-sm text-gray-600">Visites/semaine</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{getAdvancedMetrics()?.avgUsersPerGroup}</div>
                <div className="text-sm text-gray-600">Moyenne/groupe</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{getAdvancedMetrics()?.groupCount}</div>
                <div className="text-sm text-gray-600">Zones actives</div>
              </div>
            </div>
          </div>
        )}

        {/* Insights automatiques */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">🤖 Insights IA</h2>
          <div className="space-y-4">
            {generateInsights().map((insight, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations d'action */}
        {groups.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-blue-800">🎯 Plan d'Action Recommandé</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-blue-700">Actions Immédiates</h3>
                <ul className="space-y-1 text-sm text-blue-600">
                  <li>• Analyser les zones sous-performantes</li>
                  <li>• Optimiser le contenu pour les pics d'activité</li>
                  <li>• Cibler les zones à fort potentiel</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-purple-700">Stratégie Long Terme</h3>
                <ul className="space-y-1 text-sm text-purple-600">
                  <li>• Développer les zones émergentes</li>
                  <li>• Créer des synergies entre groupes</li>
                  <li>• Mesurer l'impact des actions</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}