"use client";

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
  onProgressChange: (progress: number) => void;
}

export default function TombolaSection({ tombolas, onProgressChange }: TombolaSectionProps) {
  return (
    <section>
      <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">🎁 Tombolas locales</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        className="overflow-visible"
        onSlideChange={(swiper) =>
          onProgressChange((swiper.activeIndex + 1) / tombolas.length)
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
  );
}

