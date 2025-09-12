"use client";

import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import DirectMap from '@/components/DirectMap';

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
function DrawControl({ onCreate }: { onCreate: (geojson: any) => void }) {
  useControl<MapboxDraw>(
    () =>
      new MapboxDraw({
        displayControlsDefault: false,
        controls: { polygon: true, trash: true },
      }),
    ({ map }) => {
      map.on("draw.create", (e) => {
        try {
          if (e.features && e.features.length > 0) {
            onCreate(e.features[0]);
          } else {
            console.warn("Aucun feature trouvé dans l'événement draw.create:", e);
          }
        } catch (error) {
          console.error("Erreur lors de la création du polygone:", error);
        }
      });
    }
  );
  return null;
}

export default function MacroView() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Trafic"]);
  const [zones, setZones] = useState<
    { name: string; polygon: any; professions: Record<string, number> }[]
  >([]);

  // Token Mapbox depuis l'environnement
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // Debug simple
  useEffect(() => {
    console.log("🚀 MacroView chargé côté client");
    console.log("📊 selectedOptions:", selectedOptions);
  }, [selectedOptions]);

  const toggleOption = (opt: string) => {
    console.log("🔄 Toggle option:", opt);
    setSelectedOptions((prev) => {
      const newOptions = prev.includes(opt) 
        ? prev.filter((o) => o !== opt) 
        : [...prev, opt];
      console.log("📊 Nouvelles options:", newOptions);
      return newOptions;
    });
  };

  return (
    <section className="space-y-8">
      {/* Tableau de bord - Statistiques en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex items-center">
            <div className="text-2xl text-blue-600 mr-3">📊</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Scans aujourd'hui</p>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex items-center">
            <div className="text-2xl text-green-600 mr-3">🎟️</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Réductions utilisées</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex items-center">
            <div className="text-2xl text-purple-600 mr-3">🎲</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Jeux actifs</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex items-center">
            <div className="text-2xl text-orange-600 mr-3">🏪</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Commerces actifs</p>
              <p className="text-2xl font-bold text-orange-600">47</p>
            </div>
          </div>
        </div>
      </div>

      {/* Choix du type d'analyse */}
      <div>
        <label className="text-sm font-medium">🎛️ Choisir ce que vous voulez voir</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedOptions.includes(opt)
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Carte interactive */}
      <DirectMap />

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

      {/* Cartes dynamiques - Version simplifiée */}
      <div className="space-y-6">
        {selectedOptions.includes("Trafic") && (
          <>
            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="font-semibold mb-4 text-lg">📈 Trafic journalier</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={traficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="scans" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="font-semibold mb-4 text-lg">⏰ Répartition horaire</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={traficHoraire}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scans" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {selectedOptions.includes("Réductions") && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">🎟️ Réductions utilisées par zone</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reductionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="used" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedOptions.includes("Jeux") && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">🎲 Participation aux jeux</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jeuxData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {jeuxData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedOptions.includes("Flux") && (
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold mb-2">🔄 Flux commerciaux</h3>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <div className="text-2xl mb-2">🔄</div>
                <p className="text-gray-600">Diagramme Sankey</p>
              </div>
            </div>
          </div>
        )}

        {selectedOptions.includes("Alertes") && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">⚠️ Alertes & Anomalies</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <div className="text-red-400 text-xl mr-3">🚧</div>
                <div>
                  <p className="font-medium text-red-800">Rue Centrale</p>
                  <p className="text-red-600 text-sm">-28% trafic (travaux en cours)</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <div className="text-green-400 text-xl mr-3">🎉</div>
                <div>
                  <p className="font-medium text-green-800">Quartier Nord</p>
                  <p className="text-green-600 text-sm">+15% samedi (festival local)</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="text-yellow-400 text-xl mr-3">🌦️</div>
                <div>
                  <p className="font-medium text-yellow-800">Prévision météo</p>
                  <p className="text-yellow-600 text-sm">Pluie dimanche → baisse -20% attendue</p>
                </div>
              </div>
            </div>
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