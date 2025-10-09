"use client";

const merchantCards = [
  { id: "cafe1", title: "☕ Carte Café", type: "purchases", goal: 5, current: 3, reward: "1 café offert" },
  { id: "cafe2", title: "💶 Carte Dépenses", type: "amount", goal: 250, current: 120, reward: "10€ offerts" },
];

export default function FidelityMerchantPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4 text-[#123456]">☕ Café du Coin — Mes cartes</h2>

      {merchantCards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl shadow p-4 border border-gray-200">
          <h3 className="font-semibold mb-2 text-[#123456]">{card.title}</h3>

          {card.type === "purchases" ? (
            <div className="flex gap-2 flex-wrap mb-3">
              {Array.from({ length: card.goal }).map((_, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                    i < card.current
                      ? "bg-[#17BFA0] text-white border-[#17BFA0]"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#17BFA0]"
                style={{ width: `${(card.current / card.goal) * 100}%` }}
              />
            </div>
          )}

          <p className="text-sm text-gray-600">
            🎁 Récompense : <span className="font-medium text-[#123456]">{card.reward}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

