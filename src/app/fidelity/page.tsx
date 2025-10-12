"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fidelityCards } from "@/data/dashboardData";

export default function FidelityWalletPage() {
  const router = useRouter();
  const [cards, setCards] = React.useState<typeof fidelityCards>([]);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<"Toutes" | "Achats" | "Montant">("Toutes");

  React.useEffect(() => {
    // Simuler un chargement asynchrone (prêt pour Supabase)
    setTimeout(() => setCards(fidelityCards), 200);
  }, []);

  // Filtrage par recherche
  const searchedCards = cards.filter(card =>
    card.merchant.toLowerCase().includes(query.toLowerCase()) ||
    card.reward.toLowerCase().includes(query.toLowerCase())
  );

  // Filtrage par type
  const filteredCards = searchedCards.filter(card => {
    if (filter === "Toutes") return true;
    if (filter === "Achats") return card.type === "purchases";
    if (filter === "Montant") return card.type === "amount";
    return true;
  });
  
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

        {/* Barre de recherche */}
        <div className="flex items-center bg-white rounded-full shadow-sm px-4 py-3 mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher un commerçant ou une carte..."
            className="flex-1 text-base outline-none text-[#123456] placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filtres par type */}
        <div className="flex gap-2 mb-5">
          {(["Toutes", "Achats", "Montant"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === type
                  ? "bg-[#17BFA0] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#17BFA0]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Résultats */}
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Chargement des cartes...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">😕 Aucune carte trouvée</p>
            <p className="text-gray-400 text-sm mt-2">Essayez un autre filtre ou une recherche différente</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white rounded-xl shadow overflow-hidden border border-gray-200 flex flex-col h-auto sm:min-h-[300px] hover:shadow-lg transition cursor-pointer"
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
