"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Category {
  icon: string;
  name: string;
  image?: string;
}

interface ExploreCategoriesProps {
  categories: Category[];
}

export default function ExploreCategories({ categories }: ExploreCategoriesProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-[#123456]">📂 Explorez par catégorie</h2>
        <a 
          href="/categories"
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
        className="overflow-visible"
      >
        {categories.map((cat, i) => (
          <SwiperSlide key={i} className="!w-72 sm:!w-80">
            <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col min-h-[240px] border border-gray-200">
              {/* Image principale avec icône overlay */}
              {cat.image && (
                <div className="relative h-32 w-full overflow-hidden">
                  <Image 
                    src={cat.image} 
                    alt={cat.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Icône en overlay centré */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="text-5xl sm:text-6xl drop-shadow-lg">{cat.icon}</span>
                  </div>
                </div>
              )}
              
              {/* Contenu */}
              <div className="p-4 flex flex-col flex-1 items-center justify-center">
                <p className="font-semibold text-base text-[#123456] mb-3">{cat.name}</p>
                <button className="w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50 active:scale-95 transition-all duration-200">
                  Découvrir
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

