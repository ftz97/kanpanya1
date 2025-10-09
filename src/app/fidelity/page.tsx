"use client";

import Link from "next/link";

const allFidelityCards = [
  { id: "1", merchant: "🥖 Boulangerie", type: "purchases", goal: 10, current: 7, reward: "1 pain gratuit" },
  { id: "2", merchant: "☕ Café du Coin", type: "purchases", goal: 5, current: 3, reward: "1 café offert" },
  { id: "3", merchant: "🛒 Supermarché Local", type: "points", goal: 500, current: 320, reward: "5€ en bon d'achat" },
  { id: "4", merchant: "🌸 Fleuriste Antilles", type: "tiers", tier: "Argent", reward: "10% remise + offre anniversaire" },
  { id: "5", merchant: "🍹 Bar Lounge", type: "seasonal", goal: 5, current: 2, reward: "1 cocktail offert", end: "30/12/2025" },
];

export default function FidelityWalletPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📂 Mon portefeuille fidélité</h1>

      <div className="space-y-4">
        {allFidelityCards.map((card) => (
          <Link
            key={card.id}
            href={`/fidelity/${card.id}`}
            className="block bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{card.merchant}</h3>
              <span className="text-xs text-gray-500">
                {card.type === "purchases" && `${card.current}/${card.goal}`}
                {card.type === "points" && `${card.current} pts`}
                {card.type === "tiers" && `${card.tier}`}
                {card.type === "seasonal" && `${card.current}/${card.goal}`}
              </span>
            </div>

            {/* Progression visuelle */}
            {card.type === "purchases" && (
              <div className="flex gap-1 flex-wrap mb-2">
                {Array.from({ length: card.goal }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full border ${
                      i < card.current ? "bg-green-500 border-green-600" : "bg-gray-100 border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {card.type === "points" && (
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(card.current / card.goal) * 100}%` }}
                />
              </div>
            )}

            {card.type === "tiers" && (
              <div className="mb-2">
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-200 text-yellow-800 font-semibold">
                  {card.tier}
                </span>
              </div>
            )}

            {card.type === "seasonal" && (
              <div className="mb-2">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: `${(card.current / card.goal) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">⏳ Valide jusqu&apos;au {card.end}</p>
              </div>
            )}

            <p className="text-sm text-gray-600">
              🎁 <span className="font-medium">{card.reward}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

