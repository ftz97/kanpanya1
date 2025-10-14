"use client";

import { QrCode, PlusCircle, BarChart3, Users, LogOut } from "lucide-react";
import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useGeolocation } from "@/hooks/useGeolocation";
import "swiper/css";
import "swiper/css/pagination";

// Import des sections dédiées commerçant
import OffersManager from "@/components/commercant/OffersManager";
import StatsSectionCommercant from "@/components/commercant/StatsSectionCommercant";
import ClientsSection from "@/components/commercant/ClientsSection";
import ScanReceiver from "@/components/commercant/ScanReceiver";
import CommunityBlock from "@/components/dashboard/CommunityBlock";
import DashboardModals from "@/components/dashboard/DashboardModals";

// Dynamic imports pour effets visuels
const SponsorCarousel = dynamic(() => import("@/components/SponsorCarousel"), { ssr: false });

export default function DashboardCommercantPage() {
  const merchantName = "La Boulangerie du Port";
  const { position } = useGeolocation();

  const [showScanner, setShowScanner] = React.useState(false);
  const [showCreateOffer, setShowCreateOffer] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      {/* ✅ NAVBAR */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <div className="text-lg sm:text-xl font-semibold text-[#17BFA0] tracking-tight">
            Kanpanya Pro
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Recevoir scan client */}
            <button
              onClick={() => setShowScanner(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 shadow transition-all duration-200"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Recevoir scan</span>
            </button>

            {/* Créer une offre */}
            <button
              onClick={() => setShowCreateOffer(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-[#123456] text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4 text-[#17BFA0]" />
              <span className="hidden sm:inline">Nouvelle offre</span>
            </button>

            {/* Déconnexion */}
            <button
              onClick={async () => {
                const { createBrowserSupabase } = await import("@/lib/supabase");
                const supabase = createBrowserSupabase();
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 active:scale-95 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ CONTENU */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-10"
      >
        <h1 className="text-lg sm:text-2xl font-bold text-center text-[#123456] leading-snug">
          Bonjour 👋 {merchantName}
        </h1>

        {/* Carrousel sponsorisé */}
        <section>
          <SponsorCarousel />
        </section>

        {/* 📱 Scans reçus */}
        <ScanReceiver />

        {/* 🔧 Gestion des offres */}
        <OffersManager merchantId="1234" position={position} />

        {/* 📊 Statistiques */}
        <StatsSectionCommercant />

        {/* 👥 Mes clients */}
        <ClientsSection />

        {/* 🌍 Bloc communauté */}
        <CommunityBlock />
      </motion.main>

      {/* Modales */}
      <DashboardModals
        showQRPopup={showScanner}
        setShowQRPopup={setShowScanner}
        showRewardsPopup={showCreateOffer}
        setShowRewardsPopup={setShowCreateOffer}
      />
    </div>
  );
}
