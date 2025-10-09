"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Gift, Calendar, TrendingUp } from "lucide-react";

// Base de données simulée des cartes
const cardsDatabase = {
  "1": {
    merchant: "🥖 Boulangerie Artisanale",
    type: "purchases",
    goal: 10,
    current: 7,
    reward: "1 pain gratuit",
    address: "12 Rue des Fleurs, Fort-de-France",
    phone: "0596 XX XX XX",
    history: [
      { date: "2025-10-08", action: "Achat pain complet", points: 1 },
      { date: "2025-10-05", action: "Achat croissants", points: 1 },
      { date: "2025-10-01", action: "Achat baguette", points: 1 },
    ],
  },
  "2": {
    merchant: "☕ Café du Coin",
    type: "purchases",
    goal: 5,
    current: 3,
    reward: "1 café offert",
    address: "45 Avenue de la Liberté, Fort-de-France",
    phone: "0596 YY YY YY",
    history: [
      { date: "2025-10-07", action: "Café crème", points: 1 },
      { date: "2025-10-04", action: "Expresso", points: 1 },
      { date: "2025-09-30", action: "Cappuccino", points: 1 },
    ],
  },
  "3": {
    merchant: "🛒 Supermarché Local",
    type: "points",
    goal: 500,
    current: 320,
    reward: "5€ en bon d'achat",
    address: "Zone Commerciale Dillon, Fort-de-France",
    phone: "0596 ZZ ZZ ZZ",
    history: [
      { date: "2025-10-06", action: "Courses alimentaires", points: 85 },
      { date: "2025-09-28", action: "Produits ménagers", points: 50 },
      { date: "2025-09-15", action: "Fruits et légumes", points: 35 },
    ],
  },
  "4": {
    merchant: "🌸 Fleuriste Antilles",
    type: "tiers",
    tier: "Argent",
    reward: "10% remise + offre anniversaire",
    address: "8 Boulevard du Commerce, Fort-de-France",
    phone: "0596 AA AA AA",
    totalSpent: 450,
    nextTier: "Or",
    nextTierAmount: 750,
    history: [
      { date: "2025-09-25", action: "Bouquet roses", points: 45 },
      { date: "2025-08-12", action: "Composition florale", points: 65 },
      { date: "2025-07-03", action: "Plante verte", points: 25 },
    ],
  },
  "5": {
    merchant: "🍹 Bar Lounge",
    type: "seasonal",
    goal: 5,
    current: 2,
    reward: "1 cocktail offert",
    end: "30/12/2025",
    address: "22 Rue de la Plage, Fort-de-France",
    phone: "0596 BB BB BB",
    history: [
      { date: "2025-10-03", action: "Ti-punch", points: 1 },
      { date: "2025-09-20", action: "Mojito", points: 1 },
    ],
  },
};

export default function FidelityCardDetailPage() {
  const params = useParams();
  const cardId = params.id as string;
  const card = cardsDatabase[cardId as keyof typeof cardsDatabase];

  if (!card) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-center text-gray-500">Carte non trouvée</p>
        <Link href="/fidelity" className="block text-center mt-4 text-teal-500">
          ← Retour au portefeuille
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header avec retour */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/fidelity"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">{card.merchant}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Carte visuelle principale */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{card.merchant}</h2>
              <p className="text-teal-100 text-sm">{card.address}</p>
            </div>
            <Gift className="w-8 h-8 text-teal-200" />
          </div>

          {/* Progression selon type */}
          {card.type === "purchases" && (
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: card.goal }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      i < card.current
                        ? "bg-white text-teal-600 border-white"
                        : "bg-teal-500/30 border-teal-300 text-teal-200"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-teal-100">
                {card.current}/{card.goal} achats · Plus que {card.goal - card.current} pour débloquer votre récompense
              </p>
            </div>
          )}

          {card.type === "points" && (
            <div className="space-y-3">
              <div className="w-full h-4 bg-teal-400/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{ width: `${(card.current / card.goal) * 100}%` }}
                />
              </div>
              <p className="text-sm text-teal-100">
                {card.current} / {card.goal} points · {card.goal - card.current} points restants
              </p>
            </div>
          )}

          {card.type === "tiers" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-full text-lg bg-yellow-400 text-yellow-900 font-bold">
                  {card.tier}
                </span>
                <TrendingUp className="w-5 h-5 text-teal-200" />
              </div>
              <div className="w-full h-4 bg-teal-400/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{ width: `${(card.totalSpent / card.nextTierAmount) * 100}%` }}
                />
              </div>
              <p className="text-sm text-teal-100">
                {card.totalSpent}€ dépensés · {card.nextTierAmount - card.totalSpent}€ pour atteindre {card.nextTier}
              </p>
            </div>
          )}

          {card.type === "seasonal" && (
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: card.goal }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      i < card.current
                        ? "bg-white text-purple-600 border-white"
                        : "bg-teal-500/30 border-teal-300 text-teal-200"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-teal-100">
                <Calendar className="w-4 h-4" />
                <span>Valide jusqu&apos;au {card.end}</span>
              </div>
            </div>
          )}

          {/* Récompense */}
          <div className="mt-4 pt-4 border-t border-teal-400/30">
            <p className="text-sm text-teal-100 mb-1">🎁 Récompense</p>
            <p className="text-lg font-bold">{card.reward}</p>
          </div>
        </div>

        {/* Informations du commerçant */}
        <div className="bg-white rounded-xl shadow-md p-5 space-y-3">
          <h3 className="font-bold text-gray-800">📍 Informations</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">Adresse :</span> {card.address}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Téléphone :</span> {card.phone}
            </p>
          </div>
        </div>

        {/* Historique */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-bold text-gray-800 mb-4">📜 Historique</h3>
          <div className="space-y-3">
            {card.history.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <span className="text-sm font-bold text-teal-600">
                  +{item.points} {card.type === "points" ? "pts" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton action */}
        <div className="flex gap-3">
          <Link
            href="/fidelity"
            className="flex-1 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 py-3 text-center transition"
          >
            ← Retour
          </Link>
          <button className="flex-1 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 py-3 transition">
            📞 Contacter
          </button>
        </div>
      </div>
    </div>
  );
}

