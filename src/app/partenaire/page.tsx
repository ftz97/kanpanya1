"use client";

import { ChevronRight } from "lucide-react";
import { useModal } from "@/components/modal/ModalManager";
import VideoModal from "@/components/modals/VideoModal";
import SponsorFlowModal from "@/components/SponsorFlowModal";
import { useState } from "react";

export default function PartenairePage() {
  const { open } = useModal();
  const [sponsorFlowOpen, setSponsorFlowOpen] = useState(false);

  const handleOpenVideo = () => {
    // Ouvrir le modal vidéo via le ModalManager
    open(<VideoModal />);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F2F2F2" }}>
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          {/* Logo */}
          <div className="text-base sm:text-lg font-bold text-[#17BFA0]">Kanpanya</div>

          {/* Menu desktop */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-[#212E40] font-medium">
            <a href="/" className="hover:text-[#17BFA0] text-sm lg:text-base">Accueil</a>
            <a href="/commercants" className="hover:text-[#17BFA0] text-sm lg:text-base">Commerçants</a>
            <a href="/offres" className="hover:text-[#17BFA0] text-sm lg:text-base">Offres</a>
            <a href="/partenaire" className="hover:text-[#17BFA0] text-sm lg:text-base">Mutuelle Locale</a>
            <a href="#" className="hover:text-[#17BFA0] text-sm lg:text-base">Plus</a>
          </div>

          {/* Bouton "Ma carte" */}
          <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-md text-[#212E40] font-semibold bg-white border border-gray-200 text-xs sm:text-sm">
            <span className="text-[#0D8C75]">▢</span>
            <span className="hidden xs:inline">Ma carte</span>
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
        {/* Header de la page */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#212E40] mb-4">
            🎥 Mutuelle Locale
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre partenaire Mutuelle Locale et profitez d'offres exclusives
          </p>
        </div>

        {/* Section principale - Bannière cliquable */}
        <div className="mb-8">
          <button
            onClick={handleOpenVideo}
            className="w-full rounded-xl shadow-lg p-6 text-[#212E40] text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            style={{
              background:
                "linear-gradient(90deg, #BCE8DF 0%, #C2F9DD 50%, #BCF7D2 100%)",
            }}
            aria-label="Découvrir la vidéo interactive de Mutuelle Locale et gagner des points"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎥</span>
              <h2 className="font-bold text-xl sm:text-2xl">Vidéo Interactive</h2>
            </div>
            <p className="text-sm sm:text-base mb-4">
              Cliquez pour découvrir la vidéo interactive et gagner des points !
            </p>
            <div className="flex items-center text-sm text-teal-700 font-medium">
              <span>Regarder la vidéo + Quiz nutrition</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        </div>

        {/* Carte détail partenaire */}
        <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden mb-8">
          {/* Bande verticale gradient */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#17BFA0] to-[#BCE8DF] rounded-l-xl"></div>

          <div className="ml-6">
            <h3 className="font-bold text-xl text-[#212E40] mb-2">Mutuelle Locale</h3>
            <p className="text-sm text-gray-500 mb-4">Partenaire officiel</p>
            <p className="font-bold text-[#17BFA0] text-lg mb-3">
              Points doublés cette semaine ! 🎯
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Profitez de l'offre spéciale : tous vos achats rapportent 2x plus de points Kanpanya. 
              Mutuelle Locale s'engage à soutenir votre santé et votre bien-être avec des offres exclusives.
            </p>
            
            {/* Informations détaillées */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-[#212E40] mb-2">🏥 Services de santé</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Consultations médicales</li>
                  <li>• Pharmacie partenaire</li>
                  <li>• Soins dentaires</li>
                  <li>• Médecine alternative</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#212E40] mb-2">🎁 Avantages exclusifs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Réduction sur les consultations</li>
                  <li>• Points doublés sur les achats</li>
                  <li>• Offres flash santé</li>
                  <li>• Programme de fidélité</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setSponsorFlowOpen(true)}
                className="px-6 py-3 rounded-lg bg-[#17BFA0] text-white font-semibold shadow-md hover:bg-[#14a58d] transition flex items-center justify-center"
                aria-label="Découvrir les offres du partenaire Mutuelle Locale"
              >
                🎬 Découvrir le partenaire
              </button>
              <button className="px-6 py-3 rounded-lg border border-[#17BFA0] text-[#17BFA0] font-semibold hover:bg-[#F9FFFD] transition">
                En savoir plus
              </button>
            </div>
          </div>
        </div>

        {/* Section informations supplémentaires */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-lg text-[#212E40] mb-4">ℹ️ À propos de Mutuelle Locale</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#17BFA0] mb-2">Notre mission</h4>
              <p className="text-sm text-gray-600">
                Mutuelle Locale s'engage à rendre la santé accessible à tous en proposant des services de qualité 
                et des tarifs préférentiels pour nos membres Kanpanya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#17BFA0] mb-2">Contact</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 01 23 45 67 89</p>
                <p>📧 contact@mutuellelocale.fr</p>
                <p>📍 123 Rue de la Santé, 75001 Paris</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Flow Modal */}
      <SponsorFlowModal
        visible={sponsorFlowOpen}
        onClose={() => setSponsorFlowOpen(false)}
      />
    </div>
  );
}
