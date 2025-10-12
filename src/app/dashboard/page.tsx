"use client";

import { Gift, QrCode } from "lucide-react";
import * as React from "react";
import dynamic from "next/dynamic";
import { useDashboardWelcomeMessage } from "@/hooks/useDashboardWelcomeMessage";
import { useEmojiAnimation } from "@/hooks/useEmojiAnimation";
import { tombolas, actus, flashOffers, fidelityCards, categories, stats } from "@/data/dashboardData";
import "swiper/css";
import "swiper/css/pagination";

// Dynamic imports pour lazy loading et optimisation
const StyledQRCode = dynamic(() => import("@/components/StyledQRCode"), { ssr: false });
const ScratchCardStableV3 = dynamic(() => import("@/components/scratch/ScratchCardStableV3"), { ssr: false });
const SadEmojiRain = dynamic(() => import("@/components/EmojiRain").then(mod => ({ default: mod.SadEmojiRain })), { ssr: false });
const HappyEmojiRain = dynamic(() => import("@/components/EmojiRain").then(mod => ({ default: mod.HappyEmojiRain })), { ssr: false });
const MoneyEmojiRain = dynamic(() => import("@/components/EmojiRain").then(mod => ({ default: mod.MoneyEmojiRain })), { ssr: false });
const TicketsResponsive = dynamic(() => import("@/components/TicketsResponsive"), { ssr: false });
const SponsorCarousel = dynamic(() => import("@/components/SponsorCarousel"), { ssr: false });

// Sections du dashboard
import TombolaSection from "@/components/dashboard/TombolaSection";
import ActusSection from "@/components/dashboard/ActusSection";
import FlashOffersSection from "@/components/dashboard/FlashOffersSection";
import FidelityCardsSection from "@/components/dashboard/FidelityCardsSection";
import ExploreCategories from "@/components/dashboard/ExploreCategories";
import CommunityBlock from "@/components/dashboard/CommunityBlock";
import StatsSection from "@/components/dashboard/StatsSection";

export default function DashboardPage() {
  // 🎯 Nom d'utilisateur - à remplacer par le prénom réel du user
  const userName = "Kevin";
  
  // Hooks personnalisés
  const { welcomeMessage } = useDashboardWelcomeMessage(userName);
  const { happy, sad, money, trigger } = useEmojiAnimation();
  
  // États UI
  const [showQRPopup, setShowQRPopup] = React.useState(false);
  const [showRewardsPopup, setShowRewardsPopup] = React.useState(false);
  
  // États pour le système de tickets
  const [tickets, setTickets] = React.useState(3);
  const [isTicketPopupOpen, setIsTicketPopupOpen] = React.useState(false);
  const [ticketKey, setTicketKey] = React.useState(0);

  // Fonction pour gratter un autre ticket
  const gratterUnAutre = () => {
    setTicketKey(prev => prev + 1);
    setTickets(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      {/* ✅ NAVBAR MOBILE-FIRST */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <div className="text-lg sm:text-xl font-semibold text-[#17BFA0] tracking-tight">
            Kanpanya
          </div>

          {/* Boutons compactés sur mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <TicketsResponsive 
              tickets={tickets} 
              onTicketClick={() => setIsTicketPopupOpen(true)} 
            />
            
            <button 
              onClick={() => setShowRewardsPopup(true)}
              aria-label="Mes récompenses"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-[#123456] text-sm font-medium hover:bg-gray-50"
            >
              <Gift className="w-4 h-4 text-[#17BFA0]" />
              <span className="hidden sm:inline">Récomp.</span>
            </button>

            <button 
              onClick={() => setShowQRPopup(true)}
              aria-label="Mon QR Code"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#17BFA0] text-white text-sm font-semibold hover:bg-[#14a58e]"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Mon QR</span>
            </button>

            {/* ✅ Bouton Déconnexion */}
            <button 
              onClick={async () => {
                try {
                  const { createBrowserSupabase } = await import("@/lib/supabase");
                  const supabase = createBrowserSupabase();
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                } catch (error) {
                  console.error("Erreur de déconnexion:", error);
                }
              }}
              aria-label="Déconnexion"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 active:scale-95 transition"
              title="Déconnexion"
            >
              <span className="text-sm">[→]</span>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ CONTENU MOBILE-FIRST */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-10">
        {/* Message de bienvenue */}
        <h1 className="text-lg sm:text-2xl font-bold text-center text-[#123456] leading-snug">
          {welcomeMessage}
        </h1>

        {/* Carrousel sponsorisé */}
        <section>
          <SponsorCarousel />
        </section>

        {/* 🎁 Tombolas */}
        <TombolaSection tombolas={tombolas} />

        {/* 📰 Actus commerçants */}
        <ActusSection actus={actus} />

        {/* 🔥 Bons plans flash */}
        <FlashOffersSection offers={flashOffers} />

        {/* 🎟️ Cartes de fidélité */}
        <FidelityCardsSection cards={fidelityCards} />

        {/* 📂 Explorez par catégorie */}
        <ExploreCategories categories={categories} />
      </main>

      {/* Bloc communauté */}
      <CommunityBlock />

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Popup QR Code */}
      {showQRPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-xs text-center shadow-md relative">
            {/* Bouton fermer */}
            <button
              onClick={() => setShowQRPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Titre */}
            <h3 className="text-lg font-bold text-[#123456] mb-4">Mon QR Code</h3>

      {/* QR code simple (sans déco) */}
      <div className="flex justify-center mb-4">
        <StyledQRCode
          value={`${typeof window !== 'undefined' ? window.location.origin : 'https://kanpanya.com'}/scan?client=kevin`}
          size={160}
          type="client"
          showDecoration={false}  // 👈 enlève les bordures/icônes
        />
      </div>

            {/* Texte explicatif */}
            <p className="text-sm text-gray-600 mb-4">
              Montrez ce QR aux commerçants pour gagner des points.
            </p>

            {/* Bouton fermer */}
            <button
              onClick={() => setShowQRPopup(false)}
              className="w-full bg-[#17BFA0] text-white py-2 rounded-lg font-medium hover:bg-[#14a58e] transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup Récompenses */}
      {showRewardsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs relative shadow-lg text-center">
            {/* Bouton fermer */}
            <button
              onClick={() => setShowRewardsPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Titre */}
            <h3 className="text-lg font-bold text-[#123456] mb-4">
              🎁 Mes Récompenses
            </h3>

            {/* Liste des récompenses */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">10% chez ton coiffeur</span>
                <span className="text-xs bg-[#17BFA0] text-white px-2 py-1 rounded-lg">150 pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">1 boisson offerte</span>
                <span className="text-xs bg-[#17BFA0] text-white px-2 py-1 rounded-lg">80 pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">🎉 Ticket Tombola</span>
                <span className="text-xs bg-[#17BFA0] text-white px-2 py-1 rounded-lg">50 pts</span>
              </div>
            </div>

            {/* Petit texte fun */}
            <p className="text-sm text-gray-600 mb-4">
              Continue à scanner pour débloquer encore plus de 🎊 surprises !
            </p>

            {/* Bouton fermer */}
            <button
              onClick={() => setShowRewardsPopup(false)}
              className="w-full bg-[#17BFA0] text-white py-2 rounded-lg font-medium hover:bg-[#14a58e] active:scale-95 transition"
            >
              🚀 Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup Tickets */}
      {isTicketPopupOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 relative">
            {/* Bouton fermer */}
            <button
              onClick={() => setIsTicketPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Titre + compteur */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">🎟️ Gratte ton ticket</h2>
              {tickets > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {tickets}
                </span>
              )}
            </div>

            {/* Zone ticket avec ScratchCardStableV3 */}
            <div className="flex justify-center mb-4">
              <ScratchCardStableV3
                key={ticketKey}
                threshold={0.4}
                goldenTicketChance={1.0}
                userId="dashboard-user"
                onReveal={(reward) => {
                  console.log("🎉 Récompense révélée dans le popup:", reward);
                  
                  // Utilisation du hook useEmojiAnimation
                  if (reward.type === "points" && reward.amount >= 250) {
                    trigger("money");
                  } else if (reward.amount >= 100) {
                    trigger("happy");
                  } else {
                    trigger("sad");
                  }
                }}
              />
            </div>

            {/* Texte d'aide */}
            <p className="text-sm text-gray-600 text-center mb-4">
              Gratte pour découvrir ta récompense 🎁
            </p>

            {/* Boutons d'action */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsTicketPopupOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 py-2"
              >
                ⏸️ Plus tard
              </button>
              {tickets > 0 ? (
                <button
                  onClick={gratterUnAutre}
                  className="flex-1 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 py-2"
                >
                  🎟️ Gratter un autre
                </button>
              ) : (
                <button
                  className="flex-1 bg-gray-400 text-white rounded-xl font-semibold cursor-not-allowed py-2"
                  disabled
                >
                  🔒 Plus de tickets
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations d'emojis avec hook */}
      {sad && <SadEmojiRain count={35} isWinner={false} />}
      {happy && <HappyEmojiRain count={35} isWinner={true} />}
      {money && <MoneyEmojiRain count={35} isWinner={true} />}
    </div>
  );
}