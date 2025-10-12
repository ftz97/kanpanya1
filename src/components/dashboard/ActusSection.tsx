"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface Actu {
  merchant: string;
  title: string;
  desc: string;
}

interface ActusSectionProps {
  actus: Actu[];
}

export default function ActusSection({ actus }: ActusSectionProps) {
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
          {actus.map((a, idx) => (
            <SwiperSlide key={idx} className="!w-72 sm:!w-80">
              <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[150px] border border-gray-200">
                <p className="font-bold text-[#123456] truncate">{a.title}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{a.desc}</p>
                <p className="mt-auto text-xs sm:text-sm text-[#17BFA0] font-semibold truncate">
                  {a.merchant}
                </p>
              </div>
            </SwiperSlide>
          ))}
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

