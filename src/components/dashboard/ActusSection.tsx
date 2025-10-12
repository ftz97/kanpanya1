"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { calculateDistance, formatDistance } from "@/utils/calculateDistance";
import "swiper/css";
import "swiper/css/pagination";

interface Actu {
  merchant: string;
  title: string;
  desc: string;
  image?: string;
  logo?: string;
  coordinates?: { lat: number; lon: number };
}

interface ActusSectionProps {
  actus: Actu[];
  userPosition?: { lat: number; lon: number } | null;
}

export default function ActusSection({ actus, userPosition }: ActusSectionProps) {
  const [progress, setProgress] = useState(1 / actus.length);

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-[#123456]">📰 Actus commerçants</h2>
          <a 
            href="/actus"
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
            setProgress((swiper.activeIndex + 1) / actus.length)
          }
        >
          {actus.map((a, idx) => {
            // Calculer la distance si position utilisateur disponible
            const distance = userPosition && a.coordinates 
              ? calculateDistance(userPosition, a.coordinates)
              : null;
            
            // Debug
            if (idx === 0) {
              console.log("🔍 ActusSection debug:", {
                userPosition,
                coordinates: a.coordinates,
                distance,
                showBadge: distance && distance <= 2000
              });
            }

            return (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col min-h-[280px] border border-gray-200">
                  {/* Image principale */}
                  {a.image && (
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image 
                        src={a.image} 
                        alt={a.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      
                      {/* Badge distance (si < 2km) */}
                      {distance && distance <= 2000 && (
                        <span className="absolute top-2 right-2 bg-white/90 text-gray-700 px-2 py-1 rounded-md text-xs font-medium shadow-sm">
                          📍 {formatDistance(distance)}
                        </span>
                      )}
                      
                      {/* Logo rond en overlay */}
                      {a.logo && (
                        <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                          <Image 
                            src={a.logo} 
                            alt={a.merchant}
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
                  <p className="font-bold text-[#123456] truncate">{a.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">{a.desc}</p>
                  <p className="mt-auto text-xs sm:text-sm text-[#17BFA0] font-semibold truncate">
                    {a.merchant}
                  </p>
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
          className="h-full bg-teal-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />
      </div>
    </>
  );
}

