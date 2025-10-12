"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fidelityCards } from "@/data/dashboardData";

export default function FidelityWalletPage() {
  const router = useRouter();
  const [cards, setCards] = React.useState<typeof fidelityCards>([]);

  React.useEffect(() => {
    // Simuler un chargement asynchrone (prêt pour Supabase)
    setTimeout(() => setCards(fidelityCards), 200);
  }, []);
  
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

        {cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Chargement des cartes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white rounded-xl shadow overflow-hidden border border-gray-200 flex flex-col h-auto sm:min-h-[300px] hover:shadow-lg transition"
              >
                {/* Image principale */}
                {card.image && (
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image 
                      src={card.image} 
                      alt={card.merchant}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Logo rond en overlay */}
                    {card.logo && (
                      <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                        <Image 
                          src={card.logo} 
                          alt={card.merchant}
                          width={48}
                          height={48}
                          className="object-cover"
                          loading="lazy"
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
