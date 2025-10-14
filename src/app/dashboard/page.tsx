"use client";

import { Gift, QrCode, LogOut } from "lucide-react";
import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useDashboardWelcomeMessage } from "@/hooks/useDashboardWelcomeMessage";
import { useEmojiAnimation } from "@/hooks/useEmojiAnimation";
import { useGeolocation } from "@/hooks/useGeolocation";
import { tombolas, actus, flashOffers, fidelityCards, categories, stats } from "@/data/dashboardData";
import "swiper/css";
import "swiper/css/pagination";

// Dynamic imports pour lazy loading et optimisation
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
import DashboardModals from "@/components/dashboard/DashboardModals";

export default function DashboardPage() {
  // 🎯 Nom d'utilisateur - à remplacer par le prénom réel du user
  const userName = "Kevin";
  
  // Hooks personnalisés
  const { welcomeMessage } = useDashboardWelcomeMessage(userName);
  const { happy, sad, money, trigger } = useEmojiAnimation();
  const { position } = useGeolocation();
  
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

  // Callback pour gérer la révélation des récompenses
  const handleRevealReward = (reward: { type: string; amount: number }) => {
    console.log("🎉 Récompense révélée dans le popup:", reward);
    
    // Utilisation du hook useEmojiAnimation
    if (reward.type === "points" && reward.amount >= 250) {
      trigger("money");
    } else if (reward.amount >= 100) {
      trigger("happy");
    } else {
      trigger("sad");
    }
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-[#123456] text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              <Gift className="w-4 h-4 text-[#17BFA0]" />
              <span className="hidden sm:inline">Récomp.</span>
            </button>

            <button 
              onClick={() => setShowQRPopup(true)}
              aria-label="Mon QR Code"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] shadow-[0_0_20px_rgba(23,191,160,0.4)] hover:shadow-[0_0_30px_rgba(23,191,160,0.6)] transition-all duration-200 active:scale-95"
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 active:scale-95 transition-all duration-200"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ CONTENU MOBILE-FIRST avec animation */}
      <motion.main 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-10"
      >
        {/* Message de bienvenue */}
        <h1 className="text-lg sm:text-2xl font-bold text-center text-[#123456] leading-snug">
          {welcomeMessage}
        </h1>

        {/* Carrousel sponsorisé */}
        <section>
          <SponsorCarousel />
        </section>

        {/* 🔥 Bons plans flash */}
        <FlashOffersSection offers={flashOffers} userPosition={position} />

        {/* 📰 Actus commerçants */}
        <ActusSection actus={actus} userPosition={position} />

        {/* 🎟️ Mes cartes de fidélité */}
        <FidelityCardsSection cards={fidelityCards} userPosition={position} />

        {/* 🎁 Fidélité (Tombolas) */}
        <TombolaSection tombolas={tombolas} userPosition={position} />

        {/* 📂 Explorez par catégorie */}
        <ExploreCategories categories={categories} />
      </motion.main>

      {/* Bloc communauté */}
      <CommunityBlock />

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Modales centralisées */}
      <DashboardModals
        showQRPopup={showQRPopup}
        setShowQRPopup={setShowQRPopup}
        showRewardsPopup={showRewardsPopup}
        setShowRewardsPopup={setShowRewardsPopup}
        isTicketPopupOpen={isTicketPopupOpen}
        setIsTicketPopupOpen={setIsTicketPopupOpen}
        tickets={tickets}
        ticketKey={ticketKey}
        onScratch={gratterUnAutre}
        onRevealReward={handleRevealReward}
      />

      {/* Animations d'emojis avec hook */}
      {sad && <SadEmojiRain count={35} isWinner={false} />}
      {happy && <HappyEmojiRain count={35} isWinner={true} />}
      {money && <MoneyEmojiRain count={35} isWinner={true} />}
    </div>
  );
}