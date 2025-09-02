"use client";

import { ChevronRight, Gift } from "lucide-react";
import { InteractiveOfferDialog } from "@/components/InteractiveOfferDialog";
import BannerMint from "@/components/BannerMint";
import { SiteHeader } from "@/components/site-header";
import PageHeader from "@/components/PageHeader";
import OfferFlow from "@/components/OfferFlow";
import InteractiveOfferQuiz from "@/components/InteractiveOfferQuiz";
import { ScratchCard } from "@/components/ScratchCard";
import { useScratchAvailability } from "@/hooks/useScratchAvailability";
import * as React from "react";

export default function Home() {
  const [offerFlowOpen, setOfferFlowOpen] = React.useState(false);
  const [quizOpen, setQuizOpen] = React.useState(false);
  const { state, markUsed } = useScratchAvailability();

  const handleVideoEnd = () => {
    // La vidéo est terminée, on peut préparer le quiz
    console.log("Vidéo terminée, prêt pour le quiz");
  };

  const handleStartQuiz = () => {
    // Le quiz sera géré par OfferFlow
    console.log("Quiz démarré via OfferFlow");
  };

  const handleQuizComplete = (result: { score: number; total: number; points: number }) => {
    console.log("Quiz terminé:", result);
    // Ici vous pourriez envoyer les données à votre API
    // Par exemple: saveQuizResult(result);
  };

  React.useEffect(() => {
    // Option : scroll vers le ticket si dispo
    if (state.available) {
      document.getElementById('scratch-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [state.available]);

  return (
    <div className="min-h-screen" style={{ background: "#F2F2F2" }}>
      
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <div className="text-lg font-bold text-[#17BFA0]">Kanpanya</div>

          {/* Menu desktop */}
          <div className="hidden sm:flex items-center gap-6 text-[#212E40] font-medium">
            <a href="#" className="hover:text-[#17BFA0]">Accueil</a>
            <a href="#" className="hover:text-[#17BFA0]">Commerçants</a>
            <a href="#" className="hover:text-[#17BFA0]">Offres</a>
            <a href="#" className="hover:text-[#17BFA0]">Plus</a>
          </div>

          {/* Bouton "Ma carte" */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-md text-[#212E40] font-semibold bg-white border border-gray-200">
            <span className="text-[#0D8C75]">▢</span>
            Ma carte
          </button>
        </div>
      </nav>

      {/* Header intro */}
      <div className="px-4 py-8 sm:px-6 sm:py-10 max-w-7xl mx-auto">
        <PageHeader />
      </div>

      {/* Section Ticket à gratter */}
      {state.available && !state.used ? (
        <div id="scratch-section" className="px-4 py-6 sm:px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🎫</span>
              <h3 className="text-xl font-semibold">Ticket à gratter disponible</h3>
            </div>
            <ScratchCard
              reward={state.reward ?? { type: 'points', amount: 10, label: '+10 points' }}
              onReveal={() => {
                // on marque le ticket comme utilisé après 800ms pour laisser le temps au badge/confettis
                setTimeout(() => markUsed(), 800);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 sm:px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-gray-700 font-medium">Pas de ticket pour le moment</div>
            <div className="text-gray-500 text-sm">Termine un quiz pour débloquer un nouveau ticket à gratter.</div>
          </div>
        </div>
      )}

      {/* Section Partenaire - Wrapper uniforme */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-10 px-4 sm:px-6 space-y-4">
        {/* Bannière partenaire - Cliquable */}
        <button
          onClick={() => setOfferFlowOpen(true)}
          className="w-full rounded-xl shadow p-4 text-[#212E40] text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(90deg, #BCE8DF 0%, #C2F9DD 50%, #BCF7D2 100%)",
          }}
        >
          <h3 className="font-semibold text-lg sm:text-xl">🎥 Mutuelle Locale</h3>
          <p className="text-xs sm:text-sm mt-1">
            Cliquez pour découvrir la vidéo interactive et gagner des points !
          </p>
          <div className="mt-3 flex items-center text-sm text-teal-700 font-medium">
            <span>Regarder la vidéo + Quiz nutrition</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </button>

        {/* Carte détail partenaire */}
        <div className="relative bg-white rounded-xl shadow p-4 overflow-hidden">
          {/* Bande verticale gradient */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#17BFA0] to-[#BCE8DF] rounded-l-xl"></div>

          <div className="ml-4"> {/* Décale le contenu pour ne pas coller à la bande */}
            <h3 className="font-semibold text-lg text-[#212E40]">Mutuelle Locale</h3>
            <p className="text-sm text-gray-500">Partenaire officiel</p>
            <p className="mt-2 font-bold text-[#17BFA0] text-lg">
              Points doublés cette semaine ! 🎯
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Profitez de l'offre spéciale : tous vos achats rapportent 2x plus de points Kanpanya
            </p>
            <div className="mt-4 flex gap-3">
              <button className="px-5 py-2 rounded-lg bg-[#17BFA0] text-white font-semibold shadow-md hover:bg-[#14a58d] transition">
                Activer l'offre
              </button>
              <button className="px-5 py-2 rounded-lg border border-[#17BFA0] text-[#17BFA0] font-semibold hover:bg-[#F9FFFD]">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Promos Flash */}
      <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#212E40]">
          🔥 Promos Flash
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {["Pizza -50% ce soir", "Happy Hour 14h-16h", "Légumes frais -30%", "Parapharmacie -15%"].map((offer, i) => (
            <div key={i} className="rounded-2xl bg-white shadow-md p-4 sm:p-5">
              <h3 className="font-semibold text-[#212E40] text-sm">{offer}</h3>
              <p className="text-xs text-gray-500">Commerçant</p>
              <span
                className="inline-block mt-2 sm:mt-3 px-3 py-1 text-xs font-semibold rounded-full text-white"
                style={{
                  background: "linear-gradient(90deg, #F2A0A0 0%, #F2C2C2 50%, #F2D5D5 100%)",
                }}
              >
                Flash
              </span>
              <button className="mt-3 sm:mt-4 w-full py-2 rounded-lg border border-[#17BFA0] text-[#17BFA0] font-medium">
                Voir l'offre
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Explorez par catégorie */}
      <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#212E40]">
          📂 Explorez par catégorie
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: "🍔", name: "Restauration" },
            { icon: "💇‍♀️", name: "Beauté" },
            { icon: "👗", name: "Mode" },
            { icon: "🎉", name: "Loisirs" },
            { icon: "🛒", name: "Alimentation" },
            { icon: "💊", name: "Santé" },
          ].map((cat, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white shadow-md p-4 sm:p-6 flex flex-col items-center justify-center"
            >
              <span className="text-xl sm:text-2xl">{cat.icon}</span>
              <p className="mt-1 sm:mt-2 font-medium text-[#212E40] text-sm sm:text-base">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloc communauté */}
      <section
        className="max-w-7xl mx-auto mt-12 rounded-2xl shadow-lg p-6 sm:p-10 text-center"
        style={{
          background: "linear-gradient(90deg, #E9FFF6 0%, #F2FDFB 100%)",
        }}
      >
        <h2 className="text-lg sm:text-2xl font-bold text-[#212E40] mb-2 sm:mb-3">
          Rejoignez la communauté ! 🌱
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Soutenez vos commerçants locaux et gagnez des récompenses exclusives. Chaque achat compte pour votre progression !
        </p>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
          <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#17BFA0] text-white font-semibold shadow-md hover:bg-[#14a58d]">
            Découvrir
          </button>
          <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white border border-gray-200 text-[#17BFA0] font-semibold">
            En savoir plus
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto mt-10 sm:mt-12 px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { icon: "🏬", number: "89", label: "Commerçants" },
          { icon: "👥", number: "1,247", label: "Utilisateurs" },
          { icon: "🎁", number: "156", label: "Offres actives" },
          { icon: "⭐", number: "4.8", label: "Note moyenne" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white shadow-md p-4 sm:p-6 text-center flex flex-col items-center"
          >
            <span className="text-xl sm:text-2xl">{stat.icon}</span>
            <p className="text-base sm:text-lg font-bold text-[#212E40] mt-1 sm:mt-2">{stat.number}</p>
            <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Modals */}
      <OfferFlow 
        isOpen={offerFlowOpen} 
        onClose={() => setOfferFlowOpen(false)}
        onVideoEnd={handleVideoEnd}
        onStartQuiz={handleStartQuiz}
        onQuizComplete={handleQuizComplete}
      />
      
      <InteractiveOfferQuiz 
        open={quizOpen} 
        onOpenChange={setQuizOpen}
        pointsPerCorrect={15}
        onComplete={handleQuizComplete}
      />
    </div>
  );
}

