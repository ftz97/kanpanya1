"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { calculateDistance, formatDistance } from "@/utils/calculateDistance";
import "swiper/css";
import "swiper/css/pagination";

interface FlashOffer {
  title: string;
  tag: string;
  image?: string;
  logo?: string;
  coordinates?: { lat: number; lon: number };
}

interface FlashOffersSectionProps {
  offers: FlashOffer[];
  userPosition?: { lat: number; lon: number } | null;
}

export default function FlashOffersSection({ offers, userPosition }: FlashOffersSectionProps) {
  const [progress, setProgress] = useState(1 / offers.length);

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-[#123456]">🔥 Bons plans flash</h2>
          <a 
            href="/bons-plans"
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
          grabCursor={true}
          className="overflow-visible"
          onSlideChange={(swiper) =>
            setProgress((swiper.activeIndex + 1) / offers.length)
          }
        >
          {offers.map((offer, idx) => {
            // Calculer la distance si position utilisateur disponible
            const distance = userPosition && offer.coordinates 
              ? calculateDistance(userPosition, offer.coordinates)
              : null;

            return (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col min-h-[280px] border border-gray-200">
                  {/* Image principale */}
                  {offer.image && (
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image 
                        src={offer.image} 
                        alt={offer.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      
                      {/* Badge distance (si < 2km) */}
                      {distance && distance <= 2000 && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                          📍 {formatDistance(distance)}
                        </div>
                      )}
                      
                      {/* Logo rond en overlay */}
                      {offer.logo && (
                        <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                          <Image 
                            src={offer.logo} 
                            alt="Logo"
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
                  <p className="font-semibold text-base text-[#123456] truncate">{offer.title}</p>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs mt-2 w-fit">
                    {offer.tag}
                  </span>
                  <button className="mt-auto w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50 active:scale-95 transition-all duration-200">
                    Voir l&apos;offre
                  </button>
                </div>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      
      {/* Progress bar intégrée */}
      <div className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
        <motion.div
          className="h-full bg-red-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />
      </div>
    </>
  );
}

