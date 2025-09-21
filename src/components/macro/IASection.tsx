"use client";

import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

export default function IASection() {
  const [activeChart, setActiveChart] = useState<
    "trafic" | "utilisateurs" | "reductions" | "jeux" | "flux" | "classements" | "segmentation" | "simulation"
  >("trafic");

  // === Données fictives ===
  const trafficData = [
    { day: "Lun", scans: 320 },
    { day: "Mar", scans: 250 },
    { day: "Mer", scans: 400 },
    { day: "Jeu", scans: 380 },
    { day: "Ven", scans: 500 },
    { day: "Sam", scans: 650 },
    { day: "Dim", scans: 420 },
  ];

  const usersData = [
    { category: "13-17 ans", users: 120 },
    { category: "18-25 ans", users: 300 },
    { category: "26-40 ans", users: 200 },
    { category: "41-60 ans", users: 150 },
    { category: "60+ ans", users: 80 },
  ];

  const reductionsData = [
    { type: "Offertes", value: 1200 },
    { type: "Utilisées", value: 950 },
  ];

  const jeuxData = [
    { type: "Scratch", participants: 180 },
    { type: "Tombola", participants: 90 },
  ];

  const fluxData = [
    { zone: "Centre-ville → Est", value: 120 },
    { zone: "Est → Ouest", value: 80 },
    { zone: "Nord → Centre-ville", value: 150 },
  ];

  const classementsData = [
    { commerce: "Boulangerie", scans: 240 },
    { commerce: "Supermarché", scans: 320 },
    { commerce: "Pharmacie", scans: 180 },
  ];

  const segmentationData = [
    { segment: "Familles", users: 200 },
    { segment: "Étudiants", users: 150 },
    { segment: "Touristes", users: 100 },
  ];

  const simulationData = [
    { scenario: "Pluie 🌧️", impact: "+15% livraisons" },
    { scenario: "Concert 🎶", impact: "+25% trafic centre-ville" },
    { scenario: "Fête locale 🎉", impact: "+30% commerces de proximité" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Cartes d'information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 shadow-sm">
          <h3 className="font-semibold text-blue-800 mb-2">🤖 Analyse Automatique</h3>
          <p className="text-sm text-blue-700">
            L&apos;IA analyse automatiquement les zones et génère des recommandations.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 shadow-sm">
          <h3 className="font-semibold text-green-800 mb-2">📈 Optimisation</h3>
          <p className="text-sm text-green-700">
            Optimisez vos campagnes selon les données géographiques collectées.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 shadow-sm">
          <h3 className="font-semibold text-purple-800 mb-2">🎯 Prédictions</h3>
          <p className="text-sm text-purple-700">
            Prédictions basées sur les tendances historiques et en temps réel.
          </p>
        </div>
      </div>

      {/* Bulles dynamiques */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "trafic", label: "🚦 Trafic" },
          { key: "utilisateurs", label: "👥 Utilisateurs" },
          { key: "reductions", label: "💸 Réductions" },
          { key: "jeux", label: "🎰 Jeux" },
          { key: "flux", label: "🔄 Flux" },
          { key: "classements", label: "🏆 Classements" },
          { key: "segmentation", label: "👥 Segmentation" },
          { key: "simulation", label: "🎶 Simulation" },
        ].map((b) => (
          <button
            key={b.key}
            onClick={() => setActiveChart(b.key as unknown)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              activeChart === b.key
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Graphiques dynamiques */}
      <div className="bg-white p-4 rounded-lg shadow">
        {activeChart === "trafic" && (
          <>
            <h3 className="font-semibold mb-4">📊 Trafic journalier</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="scans" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "utilisateurs" && (
          <>
            <h3 className="font-semibold mb-4">👥 Répartition des utilisateurs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "reductions" && (
          <>
            <h3 className="font-semibold mb-4">💸 Utilisation des réductions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reductionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "jeux" && (
          <>
            <h3 className="font-semibold mb-4">🎰 Participation aux jeux</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jeuxData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="participants" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "flux" && (
          <>
            <h3 className="font-semibold mb-4">🔄 Flux de déplacements</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {fluxData.map((f, idx) => (
                <li key={idx}>
                  {f.zone} : <b>{f.value}</b> personnes
                </li>
              ))}
            </ul>
          </>
        )}

        {activeChart === "classements" && (
          <>
            <h3 className="font-semibold mb-4">🏆 Classements commerces</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classementsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="commerce" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scans" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "segmentation" && (
          <>
            <h3 className="font-semibold mb-4">👥 Segmentation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === "simulation" && (
          <>
            <h3 className="font-semibold mb-4">🎶 Simulation</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {simulationData.map((s, idx) => (
                <li key={idx}>
                  {s.scenario} → <b>{s.impact}</b>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Insights IA */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">🧠 Insights IA</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>📍 Les familles scannent surtout le <b>samedi midi</b> → proposer un bundle boulangerie + restaurant.</li>
          <li>🌧️ En cas de pluie → augmentation prévue des livraisons (+15%).</li>
          <li>🎶 Concert vendredi soir → trafic attendu +25% dans le centre-ville.</li>
          <li>🏆 La boulangerie reste le commerce le plus actif → renforcer la communication locale.</li>
        </ul>
      </div>
    </div>
  );
}