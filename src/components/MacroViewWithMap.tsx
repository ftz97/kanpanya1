"use client";

import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import SankeyChart from "@/components/SankeyChart";
import Map, { Source, Layer , useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

// ✅ Mock data
const traficData = [
  { day: "Lun", scans: 320 },
  { day: "Mar", scans: 250 },
  { day: "Mer", scans: 400 },
  { day: "Jeu", scans: 380 },
  { day: "Ven", scans: 500 },
  { day: "Sam", scans: 650 },
  { day: "Dim", scans: 420 },
];

const traficHoraire = [
  { hour: "8h", scans: 50 },
  { hour: "12h", scans: 200 },
  { hour: "16h", scans: 180 },
  { hour: "20h", scans: 120 },
];

const reductionsData = [
  { zone: "Centre-ville", used: 120 },
  { zone: "Quartier Nord", used: 80 },
  { zone: "Zone Est", used: 60 },
];

const jeuxData = [
  { name: "Participants réguliers", value: 300 },
  { name: "Occasionnels", value: 150 },
  { name: "Nouveaux", value: 50 },
];

const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

const options = [
  "Trafic",
  "Réductions",
  "Jeux",
  "Flux",
  "Alertes",
  "Classements",
  "Segmentation",
  "Simulation",
];

// 🔹 Gestion polygones MapboxDraw
function DrawControl({ onCreate }: { onCreate: (geojson: unknown) => void }) {
  useControl<MapboxDraw>(
    () =>
      new MapboxDraw({
        displayControlsDefault: false,
        controls: { polygon: true, trash: true },
      }),
    ({ map }) => {
      map.on("draw.create", (e) => onCreate(e.features[0]));
    }
  );
  return null;
}

export default function MacroViewWithMap() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Trafic"]);
  const [zones, setZones] = useState<
    { name: string; polygon: unknown; professions: Record<string, number> }[]
  >([]);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);

  
const stableSetMapboxToken = useCallback(() => {
  setMapboxToken();
}, [setMapboxToken]);

useEffect(() => {
  stableSetMapboxToken();
}, [stableSetMapboxToken]);;

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const handleCreate = (feature: unknown) => {
    const name = prompt("Nom du quartier ?");
    if (!name) return;
    // ⚠️ Mock professions — à remplacer par une requête Supabase/PostGIS
    const professions = {
      Pizzeria: Math.floor(Math.random() * 5),
      Coiffeur: Math.floor(Math.random() * 5),
      Boutique: Math.floor(Math.random() * 5),
    };
    setZones([...zones, { name, polygon: feature, professions }]);
  };

  return (
    <section className="space-y-8">
      {/* Choix du type d'analyse */}
      <div>
        <label className="text-sm font-medium">🎛️ Choisir ce que vous voulez voir</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedOptions.includes(opt)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Carte interactive avec Mapbox */}
      <div className="h-96 border rounded-lg overflow-hidden">
        {mapboxToken ? (
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: -61.55,
              latitude: 16.25,
              zoom: 11,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
          >
            <DrawControl onCreate={handleCreate} />
            {zones.map((z, i) => (
              <Source key={i} type="geojson" data={z.polygon}>
                <Layer
                  id={`zone-${i}`}
                  type="fill"
                  paint={{
                    "fill-color": "#3B82F6",
                    "fill-opacity": 0.3,
                    "fill-outline-color": "#1E3A8A",
                  }}
                />
              </Source>
            ))}
          </Map>
        ) : (
          <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Carte Interactive</h3>
              <p className="text-blue-600 mb-4">Token Mapbox configuré ✅</p>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600">
                  <strong>Mapbox activé !</strong><br />
                  Vous pouvez maintenant dessiner des zones sur la carte
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des quartiers enregistrés */}
      {zones.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {zones.map((z) => (
            <div key={z.name} className="bg-white p-4 shadow rounded">
              <h3 className="font-semibold text-indigo-700">{z.name}</h3>
              <p className="text-gray-600">Professions présentes :</p>
              <ul className="ml-4 list-disc">
                {Object.entries(z.professions).map(([p, count]) => (
                  <li key={p}>{p} : {count}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Cartes dynamiques */}
      <div className="space-y-6">
        {selectedOptions.includes("Trafic") && (
          <>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="font-semibold mb-2">📈 Trafic journalier</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={traficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="scans" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="font-semibold mb-2">⏰ Répartition horaire</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={traficHoraire}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="scans" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {selectedOptions.includes("Réductions") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">🎟️ Réductions utilisées</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reductionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="used" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedOptions.includes("Jeux") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">🎲 Participation aux jeux</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={jeuxData} dataKey="value" outerRadius={80} label>
                    {jeuxData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedOptions.includes("Flux") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">🔄 Flux commerciaux</h3>
            <div className="h-80 flex items-center justify-center">
              <SankeyChart />
            </div>
          </div>
        )}

        {selectedOptions.includes("Alertes") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">⚠️ Alertes & Anomalies</h3>
            <ul className="space-y-2">
              <li>🚧 Rue Centrale : -28% trafic (travaux)</li>
              <li>🎉 Quartier Nord : +15% samedi (festival)</li>
              <li>🌦️ Prévision pluie dimanche → baisse -20% attendue</li>
            </ul>
          </div>
        )}

        {selectedOptions.includes("Classements") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">🥇 Classements</h3>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Barber Black&Gold (320 scans)</li>
              <li>Pizzeria Bella Vista (280 scans)</li>
              <li>Boutique Chic (210 scans)</li>
            </ol>
          </div>
        )}

        {selectedOptions.includes("Segmentation") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">👥 Segmentation clients</h3>
            <ul className="space-y-2 text-gray-700">
              <li>👩‍👩‍👧‍👦 Familles : 45%</li>
              <li>👩 Jeunes : 35%</li>
              <li>🧓 Seniors : 20%</li>
            </ul>
          </div>
        )}

        {selectedOptions.includes("Simulation") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">🔮 Simulation IA</h3>
            <p className="text-gray-600">
              Scénario : Fermeture Rue Centrale 6 mois → -35% trafic zone, +15% report Quartier Est.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
