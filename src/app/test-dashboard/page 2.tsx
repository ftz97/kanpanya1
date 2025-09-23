"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

// Données de test
const traficData = [
  { day: "Lun", scans: 320 },
  { day: "Mar", scans: 250 },
  { day: "Mer", scans: 400 },
  { day: "Jeu", scans: 380 },
  { day: "Ven", scans: 500 },
  { day: "Sam", scans: 650 },
  { day: "Dim", scans: 420 },
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

export default function TestDashboard() {
  const [zones, setZones] = useState<string[]>([]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎯 Tableau de Bord de Test
      </h1>

      {/* Statistiques */}
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

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trafic journalier */}
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

        {/* Réductions par zone */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="font-semibold mb-4 text-lg">🎟️ Réductions par zone</h3>
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

        {/* Participation aux jeux */}
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

        {/* Zone de test */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="font-semibold mb-4 text-lg">🗺️ Gestion des zones</h3>
          <div className="space-y-4">
            <button 
              onClick={() => {
                const name = prompt("Nom de la nouvelle zone ?");
                if (name && !zones.includes(name)) {
                  setZones([...zones, name]);
                }
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ➕ Ajouter une zone
            </button>
            
            {zones.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Zones créées :</h4>
                {zones.map((zone, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{zone}</span>
                    <button 
                      onClick={() => setZones(zones.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-green-400 text-xl mr-3">✅</div>
          <div>
            <p className="font-medium text-green-800">Tableau de bord fonctionnel</p>
            <p className="text-green-600 text-sm">Tous les graphiques et fonctionnalités sont opérationnels</p>
          </div>
        </div>
      </div>
    </div>
  );
}


