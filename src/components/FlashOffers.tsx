"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function FlashOffers() {
  const offers = [
    { title: "Happy Hour 14h-16h", discount: "", tag: "Flash" },
    { title: "Légumes frais -30%", discount: "-30%", tag: "Flash" },
    { title: "Parapharmacie -15%", discount: "-15%", tag: "Flash" },
    { title: "Boulangerie -20%", discount: "-20%", tag: "Flash" },
    { title: "Épicerie Bio -25%", discount: "-25%", tag: "Flash" },
    { title: "Café du coin -10%", discount: "-10%", tag: "Flash" },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView="auto" // Auto-sizing pour meilleur swipe
      centeredSlides={false}
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{
        delay: 3000, // 3s entre chaque slide
        disableOnInteraction: false, // continue même si on swipe
        pauseOnMouseEnter: true, // pause au hover
      }}
      grabCursor={true} // Curseur de grab pour indiquer le swipe
      touchRatio={1} // Sensibilité tactile
      touchAngle={45} // Angle de swipe
      threshold={5} // Seuil minimal de swipe
      className="w-full"
    >
      {offers.map((offer, idx) => (
        <SwiperSlide key={idx} className="!w-80"> {/* Largeur fixe pour le swipe */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start min-h-[160px] w-full">
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
