"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🎮 Administration Quiz & Scratch Cards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
