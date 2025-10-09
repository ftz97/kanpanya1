"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const lastUsedCards = [
  { id: "1", merchant: "🥖 Boulangerie", type: "purchases", goal: 10, current: 7, reward: "1 pain gratuit" },
  { id: "2", merchant: "☕ Café du Coin", type: "purchases", goal: 5, current: 3, reward: "1 café offert" },
  { id: "3", merchant: "🛒 Supermarché Local", type: "points", goal: 500, current: 320, reward: "5€ en bon d'achat" },
];

export default function ClientFidelityDashboard() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">🎟️ Mes cartes de fidélité</h2>

      {/* Swiper des dernières cartes utilisées */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        pagination={{ clickable: true, dynamicBullets: true }}
        grabCursor={true}
        className="w-full"
      >
        {lastUsedCards.map((card) => (
          <SwiperSlide key={card.id} className="!w-72">
            <Link
              href={`/fidelity/${card.id}`}
              className="block bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{card.merchant}</h3>
                <span className="text-xs text-gray-500">
                  {card.type === "purchases" && `${card.current}/${card.goal}`}
                  {card.type === "points" && `${card.current} pts`}
                </span>
              </div>

              {/* Progression selon type */}
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

              <p className="text-sm text-gray-600">🎁 {card.reward}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lien vers toutes les cartes */}
      <div className="text-center">
        <Link
          href="/fidelity"
          className="inline-block mt-4 px-5 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow hover:bg-teal-600 transition"
        >
          📂 Voir toutes mes cartes
        </Link>
      </div>
    </div>
  );
}

