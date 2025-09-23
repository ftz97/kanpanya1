"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🎮 Administration Kanpanya</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ticket normal */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold mb-2">Simuler un Quiz Terminé</h2>
          <p className="text-sm text-gray-600 mb-4">
            Crée un ticket comme si un utilisateur venait de finir un quiz.
          </p>
          <Link
            href="/admin/config-scratch?type=normal"
            className="inline-block bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
          >
            🎟️ Créer Ticket Quiz (50 pts)
          </Link>
        </div>

        {/* Ticket Premium */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold mb-2">Ticket Premium</h2>
          <p className="text-sm text-gray-600 mb-4">
            Crée un ticket premium avec plus de points.
          </p>
          <Link
            href="/admin/config-scratch?type=premium"
            className="inline-block bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
          >
            💎 Créer Ticket Premium (100 pts)
          </Link>
        </div>

        {/* Analyse Macro */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold mb-2">📊 Analyse Macro</h2>
          <p className="text-sm text-gray-600 mb-4">
            Analyse des données géographiques et des collectivités.
          </p>
          <Link
            href="/admin/macro-analysis"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            📊 Macro Analysis
          </Link>
        </div>

        {/* Recommandations */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold mb-2">🎯 Recommandations</h2>
          <p className="text-sm text-gray-600 mb-4">
            Système de recommandations IA pour les commerçants.
          </p>
          <Link
            href="/admin/recommandations"
            className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            🎯 Recommandations
          </Link>
        </div>

        {/* Segmentation des rues */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold mb-2">🗺️ Segmentation</h2>
          <p className="text-sm text-gray-600 mb-4">
            Segmentation des rues et analyse géographique.
          </p>
          <Link
            href="/admin/street-segmentation"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            🗺️ Street Segmentation
          </Link>
        </div>

        {/* Test Mapbox */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold mb-2">🗺️ Test Mapbox</h2>
          <p className="text-sm text-gray-600 mb-4">
            Test et configuration des cartes Mapbox.
          </p>
          <Link
            href="/admin/mapbox-test"
            className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            🗺️ Test Mapbox
          </Link>
        </div>
      </div>
    </div>
  );
}
