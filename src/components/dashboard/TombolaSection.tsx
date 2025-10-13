"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { calculateDistance, formatDistance } from "@/utils/calculateDistance";
import "swiper/css";
import "swiper/css/pagination";

interface Tombola {
  title: string;
  desc: string;
  cta: string;
  image?: string;
  logo?: string;
  coordinates?: { lat: number; lon: number };
}

interface TombolaSectionProps {
  tombolas: Tombola[];
  userPosition?: { lat: number; lon: number } | null;
}

export default function TombolaSection({ tombolas, userPosition }: TombolaSectionProps) {
  const [progress, setProgress] = useState(1 / tombolas.length);

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-[#123456]">🎁 Tombolas locales</h2>
          <a 
            href="/tombolas"
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
            setProgress((swiper.activeIndex + 1) / tombolas.length)
          }
        >
          {tombolas.map((tb, idx) => {
            // Calculer la distance si position utilisateur disponible
            const distance = userPosition && tb.coordinates 
              ? calculateDistance(userPosition, tb.coordinates)
              : null;

            return (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow overflow-hidden min-h-[280px] flex flex-col">
                  {/* Image principale */}
                  {tb.image && (
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image 
                        src={tb.image} 
                        alt={tb.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      
                      {/* Badge distance (si < 2km) */}
                      {distance && distance <= 2000 && (
                        <span className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-medium shadow-md">
                          📍{formatDistance(distance)}
                        </span>
                      )}
                      
                      {/* Logo rond en overlay */}
                      {tb.logo && (
                        <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                          <Image 
                            src={tb.logo} 
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
                <div className="p-4 flex flex-col flex-1 bg-yellow-50">
                  <p className="font-bold text-[#123456] truncate">{tb.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">{tb.desc}</p>
                  <button className="mt-auto bg-yellow-500 text-white rounded-lg py-2 text-sm font-semibold hover:bg-yellow-600 active:scale-95 transition-all duration-200">
                    {tb.cta}
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
          className="h-full bg-yellow-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />
      </div>
    </>
  );
}

