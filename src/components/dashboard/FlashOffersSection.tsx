"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface FlashOffer {
  title: string;
  tag: string;
}

interface FlashOffersSectionProps {
  offers: FlashOffer[];
}

export default function FlashOffersSection({ offers }: FlashOffersSectionProps) {
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
          {offers.map((offer, idx) => (
            <SwiperSlide key={idx} className="!w-72 sm:!w-80">
              <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[150px] border border-gray-200">
                <p className="font-semibold text-base text-[#123456] truncate">{offer.title}</p>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs mt-2 w-fit">
                  {offer.tag}
                </span>
                <button className="mt-auto w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50">
                  Voir l&apos;offre
                </button>
              </div>
            </SwiperSlide>
          ))}
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

