import { gradients, colors } from "@/lib/kanpa-theme";

export default function CommunityBlock() {
  return (
    <section className={`max-w-7xl mx-auto mt-12 rounded-2xl shadow-lg p-6 sm:p-10 text-center ${gradients.community}`}>
      <h2 className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-[${colors.secondary}]`}>
        Rejoignez la communauté ! 🌱
      </h2>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Soutenez vos commerçants locaux et gagnez des récompenses exclusives. Chaque achat compte pour votre progression !
      </p>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
        <button 
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          style={{ 
            backgroundColor: colors.primary,
            ':hover': { backgroundColor: colors.primaryHover }
          }}
          aria-label="Découvrir comment rejoindre la communauté Kanpanya"
        >
          Découvrir
        </button>
        <button 
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white border border-gray-200 font-semibold transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          style={{ color: colors.primary }}
          aria-label="En savoir plus sur les avantages de la communauté"
        >
          En savoir plus
        </button>
      </div>
    </section>
  );
}
