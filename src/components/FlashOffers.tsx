"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

export default function FlashOffers() {
  const offers = [
    { title: "Happy Hour 14h-16h", tag: "Flash" },
    { title: "Légumes frais -30%", tag: "Flash" },
    { title: "Parapharmacie -15%", tag: "Flash" },
    { title: "Boissons fraîches -20%", tag: "Flash" },
  ];

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"} // auto calcule la largeur
      coverflowEffect={{
        rotate: 30,   // inclinaison des cartes
        stretch: 0,   // espacement latéral
        depth: 100,   // profondeur
        modifier: 1,  // intensité
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="w-full max-w-md"
    >
      {offers.map((offer, idx) => (
        <SwiperSlide key={idx} className="max-w-[260px]">
          <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col min-h-[180px]">
            <p className="font-semibold text-lg">{offer.title}</p>
            <p className="text-gray-500 text-sm">Commerçant</p>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs mt-2">
              {offer.tag}
            </span>
            <button className="mt-auto w-full border border-teal-400 text-teal-500 rounded-lg py-2 font-medium hover:bg-teal-50 transition">
              Voir l'offre
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
