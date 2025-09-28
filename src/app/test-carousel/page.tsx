"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const cards = [
  { id: 1, title: "Quiz Boulangerie" },
  { id: 2, title: "Ticket Café" },
  { id: 3, title: "Quiz Fleurs" },
  { id: 4, title: "Offre Spéciale" },
];

export default function TestCarouselPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-12 items-center justify-center p-6">
      {/* Variante 1 : Zoom + Halo */}
      <div className="w-full max-w-lg">
        <h2 className="text-center mb-4 font-bold">Zoom + Halo</h2>
        <Swiper spaceBetween={20} slidesPerView={1.2} centeredSlides loop>
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              {({ isActive }) => (
                <div
                  className={`w-64 h-72 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "scale-105 shadow-[0_0_25px_rgba(236,72,153,0.6)] bg-pink-100"
                      : "scale-90 opacity-60 bg-gray-200"
                  }`}
                >
                  <p className="text-lg font-semibold">{card.title}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Variante 2 : Zoom + 3D */}
      <div className="w-full max-w-lg">
        <h2 className="text-center mb-4 font-bold">Zoom + 3D</h2>
        <Swiper spaceBetween={20} slidesPerView={1.2} centeredSlides loop>
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              {({ isActive }) => (
                <div
                  className={`w-64 h-72 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
                    isActive
                      ? "scale-105 rotate-y-3 bg-blue-100 shadow-xl"
                      : "scale-90 opacity-60 bg-gray-200"
                  }`}
                >
                  <p className="text-lg font-semibold">{card.title}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Variante 3 : Combo */}
      <div className="w-full max-w-lg">
        <h2 className="text-center mb-4 font-bold">Combo (Zoom + Halo + 3D)</h2>
        <Swiper spaceBetween={20} slidesPerView={1.2} centeredSlides loop>
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              {({ isActive }) => (
                <div
                  className={`w-64 h-72 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
                    isActive
                      ? "scale-105 rotate-y-3 shadow-[0_0_25px_rgba(34,211,238,0.6)] bg-cyan-100"
                      : "scale-90 opacity-60 bg-gray-200"
                  }`}
                >
                  <p className="text-lg font-semibold">{card.title}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
