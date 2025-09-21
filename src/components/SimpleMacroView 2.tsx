"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import SimpleWorkingMap from "@/components/SimpleWorkingMap";
import { AreaOption } from "@/components/SearchValidate";

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

interface SimpleMacroViewProps {
  selectedAreas?: AreaOption[];
  mapDisabled?: boolean;
}

export default function SimpleMacroView({ 
  selectedAreas = [], 
  mapDisabled = false 
}: SimpleMacroViewProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Trafic"]);

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  // Toggle pour désactiver/réactiver la carte
  const toggleMap = () => {
    // Cette fonctionnalité sera gérée par le parent
    console.log('Toggle map - géré par le parent');
  };

  return (
    <section className="space-y-8 relative">
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

      {/* Affichage des zones sélectionnées */}
      {selectedAreas.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Zones sélectionnées pour l'analyse :
          </h3>
          <div className="text-sm text-blue-800">
            {selectedAreas.map(area => area.label).join(", ")}
          </div>
        </div>
      )}

      {/* Carte interactive */}
      <SimpleWorkingMap />

      {/* Blocs d'analyse */}
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
