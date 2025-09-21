import { ChevronRight } from "lucide-react";
import { gradients, colors } from "@/lib/kanpa-theme";

interface PartnerSectionProps {
  onOpenVideo: () => void;
  onOpenSponsor: () => void;
}

export default function PartnerSection({ onOpenVideo, onOpenSponsor }: PartnerSectionProps) {
  return (
    <div className="max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10 px-3 sm:px-4 md:px-6 space-y-3 sm:space-y-4">
      {/* Bannière partenaire - Cliquable */}
      <button
        onClick={onOpenVideo}
        className={`w-full rounded-xl shadow p-4 text-[${colors.secondary}] text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${gradients.mint}`}
        aria-label="Découvrir la vidéo interactive de Mutuelle Locale et gagner des points"
      >
        <h3 className="font-semibold text-lg sm:text-xl">🎥 Mutuelle Locale</h3>
        <p className="text-xs sm:text-sm mt-1">
          Cliquez pour découvrir la vidéo interactive et gagner des points !
        </p>
        <div className={`mt-3 flex items-center text-sm font-medium`} style={{ color: colors.primaryHover }}>
          <span>Regarder la vidéo + Quiz nutrition</span>
          <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </div>
      </button>

      {/* Carte détail partenaire */}
      <div className="relative bg-white rounded-xl shadow p-4 overflow-hidden">
        {/* Bande verticale gradient */}
        <div className={`absolute top-0 left-0 w-2 h-full ${gradients.mintVertical} rounded-l-xl`}></div>

        <div className="ml-4">
          <h3 className={`font-semibold text-lg text-[${colors.secondary}]`}>Mutuelle Locale</h3>
          <p className="text-sm text-gray-500">Partenaire officiel</p>
          <p className={`mt-2 font-bold text-lg`} style={{ color: colors.primary }}>
            Points doublés cette semaine ! 🎯
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Profitez de l&apos;offre spéciale : tous vos achats rapportent 2x plus de points Kanpanya
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onOpenSponsor}
              className={`px-5 py-2 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              style={{ 
                backgroundColor: colors.primary,
                ':hover': { backgroundColor: colors.primaryHover }
              }}
              aria-label="Découvrir les offres du partenaire Mutuelle Locale"
            >
              🎬 Découvrir le partenaire
            </button>
            <button 
              className={`px-5 py-2 rounded-lg border font-semibold transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              style={{ 
                borderColor: colors.primary,
                color: colors.primary,
                ':hover': { backgroundColor: colors.bgGray }
              }}
              aria-label="En savoir plus sur les offres de Mutuelle Locale"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
