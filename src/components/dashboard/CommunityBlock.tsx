"use client";

export default function CommunityBlock() {
  return (
    <section
      className="max-w-7xl mx-auto mt-8 sm:mt-12 mx-3 sm:mx-auto rounded-2xl shadow-lg p-6 sm:p-10 text-center"
      style={{
        background: "linear-gradient(90deg, #E9FFF6 0%, #F2FDFB 100%)",
      }}
    >
      <h2 className="text-base sm:text-2xl font-bold text-[#123456] mb-2 sm:mb-3">
        Rejoignez la communauté ! 🌱
      </h2>
      <p className="text-xs sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Soutenez vos commerçants locaux et gagnez des récompenses exclusives. Chaque achat compte pour votre progression !
      </p>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-6">
        <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#17BFA0] text-white text-sm font-semibold shadow-md hover:bg-[#14a58d]">
          Découvrir
        </button>
        <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white border border-gray-200 text-[#17BFA0] text-sm font-semibold">
          En savoir plus
        </button>
      </div>
    </section>
  );
}

