"use client";
import { useState } from "react";

export default function TicketPage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full">
        {/* Titre */}
        <h1 className="text-center text-2xl font-bold mb-4">
          🎟️ Gratte ton ticket
        </h1>

        {/* Ticket SVG */}
        <div className="relative">
          <svg
            viewBox="0 0 400 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-lg"
          >
            {/* Fond du ticket */}
            <rect
              x="0"
              y="0"
              width="400"
              height="200"
              rx="24"
              fill="#ffffff"
              stroke="#e5e7eb"
              strokeWidth="3"
            />

            {/* Encoches sur les côtés */}
            <circle cx="0" cy="50" r="20" fill="#f3f4f6" />
            <circle cx="400" cy="150" r="20" fill="#f3f4f6" />

            {/* Ligne décorative */}
            <line
              x1="0"
              y1="100"
              x2="400"
              y2="100"
              stroke="#e5e7eb"
              strokeDasharray="6 6"
              strokeWidth="2"
            />

            {/* Texte haut */}
            <text
              x="200"
              y="40"
              textAnchor="middle"
              className="font-bold"
              fill="#111827"
              fontSize="20"
            >
              Ticket Konpanya
            </text>

            {/* Zone gain */}
            <rect
              x="80"
              y="110"
              width="240"
              height="60"
              rx="12"
              fill={revealed ? "#D1FAE5" : "#9CA3AF"}
            />
            <text
              x="200"
              y="145"
              textAnchor="middle"
              fill="#111827"
              fontSize="18"
              style={{ pointerEvents: "none" }}
            >
              {revealed ? "🎁 Bravo, +50 points !" : "✨ Gratte ici ✨"}
            </text>
          </svg>

          {/* Bouton gratter (simulation) */}
          {!revealed && (
            <button
              onClick={() => setRevealed(true)}
              className="absolute inset-0 bg-transparent"
            >
              <span className="sr-only">Gratte le ticket</span>
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Cliquez sur le ticket pour révéler votre récompense !
          </p>
          <button
            onClick={() => setRevealed(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
