"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Category {
  icon: string;
  name: string;
}

interface ExploreCategoriesProps {
  categories: Category[];
}

export default function ExploreCategories({ categories }: ExploreCategoriesProps) {
  return (
    <section>
      <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">📂 Explorez par catégorie</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        className="overflow-visible"
      >
        {categories.map((cat, i) => (
          <SwiperSlide key={i} className="!w-72 sm:!w-80">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center min-h-[150px] border border-gray-200">
              <span className="text-3xl sm:text-4xl mb-2">{cat.icon}</span>
              <p className="font-semibold text-base text-[#123456]">{cat.name}</p>
              <button className="mt-auto w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50">
                Découvrir
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

