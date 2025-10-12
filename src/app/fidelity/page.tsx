"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { fidelityCards } from "@/data/dashboardData";

export default function FidelityWalletPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#17BFA0] font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <div className="text-lg font-bold text-[#17BFA0]">Kanpanya</div>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#123456] mb-6">🎟️ Mes cartes de fidélité</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fidelityCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow overflow-hidden border border-gray-200 flex flex-col min-h-[340px] hover:shadow-lg transition">
              {/* Image principale */}
              {card.image && (
                <div className="relative h-32 w-full overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.merchant}
                    className="w-full h-full object-cover"
                  />
                  {/* Logo rond en overlay */}
                  {card.logo && (
                    <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
                      <img 
                        src={card.logo} 
                        alt={card.merchant}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Contenu */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm text-[#123456]">{card.merchant}</h3>
                  {card.type === "purchases" ? (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {card.current}/{card.goal}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {card.current}€/{card.goal}€
                    </span>
                  )}
                </div>

                {/* Carte par achats avec tampons */}
                {card.type === "purchases" && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {Array.from({ length: card.goal }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                          i < card.current
                            ? "bg-[#17BFA0] text-white border-[#17BFA0]"
                            : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}

                {/* Carte par montant avec barre de progression */}
                {card.type === "amount" && (
                  <div className="mb-3">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#17BFA0]"
                        style={{ width: `${(card.current / card.goal) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-600 mt-auto">
                  🎁 <span className="font-semibold">{card.reward}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

