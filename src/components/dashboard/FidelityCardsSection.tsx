"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { calculateDistance, formatDistance } from "@/utils/calculateDistance";
import "swiper/css";
import "swiper/css/pagination";

interface FidelityCard {
  merchant: string;
  type: "purchases" | "amount";
  goal: number;
  current: number;
  reward: string;
  image?: string;
  logo?: string;
  coordinates?: { lat: number; lon: number };
}

interface FidelityCardsSectionProps {
  cards: FidelityCard[];
  userPosition?: { lat: number; lon: number } | null;
}

export default function FidelityCardsSection({ cards, userPosition }: FidelityCardsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-[#123456]">🎟️ Mes cartes de fidélité</h2>
        <a 
          href="/fidelity"
          className="text-xs sm:text-sm text-[#17BFA0] font-medium hover:underline flex items-center gap-1"
        >
          Voir tout
          <span className="text-lg">→</span>
        </a>
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        className="overflow-visible"
      >
        {cards.map((card, idx) => {
          // Calculer la distance si position utilisateur disponible
          const distance = userPosition && card.coordinates 
            ? calculateDistance(userPosition, card.coordinates)
            : null;

          return (
            <SwiperSlide key={idx} className="!w-72 sm:!w-80">
              <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col min-h-[300px] border border-gray-200">
                {/* Image principale */}
                {card.image && (
                  <div className="relative h-24 w-full overflow-hidden">
                    <Image 
                      src={card.image} 
                      alt={card.merchant}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Badge distance (si < 2km) */}
                    {distance && distance <= 2000 && (
                      <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-md text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg border border-white/30">
                        📍 {formatDistance(distance)}
                      </span>
                    )}
                    
                    {/* Logo rond en overlay */}
                    {card.logo && (
                      <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                        <Image 
                          src={card.logo} 
                          alt={card.merchant}
                          width={40}
                          height={40}
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                )}
              
              {/* Contenu */}
              <div className="p-4 flex flex-col flex-1">
                {/* Header avec merchant et progression */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm text-[#123456] truncate">{card.merchant}</h3>
                  {card.type === "purchases" ? (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      {card.current}/{card.goal}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
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

                {/* Récompense */}
                <p className="text-xs sm:text-sm text-gray-600 mt-auto">
                  🎁 Récompense : <span className="font-semibold text-[#123456]">{card.reward}</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

