"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface Tombola {
  title: string;
  desc: string;
  cta: string;
}

interface TombolaSectionProps {
  tombolas: Tombola[];
}

export default function TombolaSection({ tombolas }: TombolaSectionProps) {
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
          {tombolas.map((tb, idx) => (
            <SwiperSlide key={idx} className="!w-72 sm:!w-80">
              <div className="bg-yellow-50 rounded-xl shadow p-4 min-h-[150px] flex flex-col">
                <p className="font-bold text-[#123456] truncate">{tb.title}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{tb.desc}</p>
                <button className="mt-auto bg-yellow-500 text-white rounded-lg py-2 text-sm font-semibold hover:bg-yellow-600">
                  {tb.cta}
                </button>
              </div>
            </SwiperSlide>
          ))}
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

