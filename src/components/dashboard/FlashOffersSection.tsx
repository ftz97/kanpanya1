"use client";

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
  onProgressChange: (progress: number) => void;
}

export default function FlashOffersSection({ offers, onProgressChange }: FlashOffersSectionProps) {
  return (
    <section>
      <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">🔥 Bons plans flash</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        className="overflow-visible"
        onSlideChange={(swiper) =>
          onProgressChange((swiper.activeIndex + 1) / offers.length)
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
  );
}

