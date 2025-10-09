"use client";

import { ChevronRight, Gift, QrCode } from "lucide-react";
import * as React from "react";
import StyledQRCode from "@/components/StyledQRCode";
import ScratchCardStableV3 from "@/components/scratch/ScratchCardStableV3";
import { SadEmojiRain, HappyEmojiRain, MoneyEmojiRain } from "@/components/EmojiRain";
import TicketsResponsive from "@/components/TicketsResponsive";
import SponsorCarousel from "@/components/SponsorCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [isClient, setIsClient] = React.useState(false);
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [showQRPopup, setShowQRPopup] = React.useState(false);
  const [showRewardsPopup, setShowRewardsPopup] = React.useState(false);
  
  // États pour les animations d'emojis
  const [showSadEmojis, setShowSadEmojis] = React.useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = React.useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = React.useState(false);
  
  // États pour le système de tickets
  const [tickets, setTickets] = React.useState(3);
  const [isTicketPopupOpen, setIsTicketPopupOpen] = React.useState(false);
  const [ticketKey, setTicketKey] = React.useState(0); // Pour forcer le re-render du composant
  
  // États pour les barres de progression des carrousels
  const [progressTombola, setProgressTombola] = React.useState(0);
  const [progressActus, setProgressActus] = React.useState(0);
  const [progressFlash, setProgressFlash] = React.useState(0);
  
  // 🎯 Nom d'utilisateur - à remplacer par le prénom réel du user
  const userName = "Kevin";

  // 🎁 Données Tombolas
  const tombolas = [
    { title: "☕ Café offert", desc: "10 gagnants cette semaine", cta: "Jouer" },
    { title: "🌸 Bouquet à gagner", desc: "Offert par Fleuriste Antilles", cta: "Participer" },
    { title: "🥬 Panier garni bio", desc: "Tirage vendredi", cta: "Tenter ma chance" },
  ];

  // 📰 Données Actus commerçants
  const actus = [
    { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
    { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
    { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
    { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
  ];

  // 🔥 Données Bon plans flash
  const flashOffers = [
    { title: "Happy Hour 14h-16h", tag: "Flash" },
    { title: "Légumes frais -30%", tag: "Flash" },
    { title: "Parapharmacie -15%", tag: "Flash" },
    { title: "Boulangerie -20%", tag: "Flash" },
    { title: "Épicerie Bio -25%", tag: "Flash" },
    { title: "Café du coin -10%", tag: "Flash" },
  ];

  // 💬 Messages de bienvenue avec variations
  const getWelcomeMessages = () => {
    const hour = new Date().getHours();
    let period: string;
    if (hour >= 7 && hour < 12) period = 'morning';
    else if (hour >= 12 && hour < 19) period = 'afternoon';
    else period = 'evening';

    const messages = {
      morning: [
        `Bonjour ${userName} ☀️`,
        `Salut ${userName} 👋`,
        `Bon matin ${userName} 🌸`,
        `Hello ${userName} 🌞`,
        `Coucou ${userName} 🌱`
      ],
      afternoon: [
        `Bon après-midi ${userName} 🌱`,
        `Salut ${userName} 🔥`,
        `Hey ${userName} 👋`,
        `Yo ${userName} 😎`,
        `Coucou ${userName} 🛍️`
      ],
      evening: [
        `Bonsoir ${userName} 🌙`,
        `Bonne soirée ${userName} 🌟`,
        `Salut ${userName} ✨`,
        `Hey ${userName} 🛋️`,
        `Coucou ${userName} 🎉`
      ],
    };

    return messages[period as keyof typeof messages];
  };

  const messages = getWelcomeMessages();
  const welcomeMessage = messages[messageIndex % messages.length];

  // Fonction pour gratter un autre ticket
  const gratterUnAutre = () => {
    setTicketKey(prev => prev + 1); // Force le re-render du composant
    setTickets(prev => Math.max(prev - 1, 0)); // Décrémente le compteur
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F2F2F2" }}>
      
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">                                                                                                         
          {/* Logo */}
          <div className="text-base sm:text-lg font-bold text-[#17BFA0]">Kanpanya</div>

          {/* Menu desktop */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-[#123456] font-medium">
            <a href="#" className="hover:text-[#17BFA0] text-sm lg:text-base">Accueil</a>
            <a href="#" className="hover:text-[#17BFA0] text-sm lg:text-base">Commerçants</a>
            <a href="#" className="hover:text-[#17BFA0] text-sm lg:text-base">Offres</a>
            <a href="#" className="hover:text-[#17BFA0] text-sm lg:text-base">Plus</a>
          </div>

          {/* Boutons navigation */}
          <div className="flex items-center gap-3">
            {/* Composant Tickets Responsive */}
            <TicketsResponsive 
              tickets={tickets} 
              onTicketClick={() => setIsTicketPopupOpen(true)} 
            />

            {/* Bouton Récompenses */}
            <button 
              onClick={() => setShowRewardsPopup(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm text-[#123456] text-sm font-medium hover:bg-gray-50 active:scale-95 transition"
            >                        
              <Gift className="w-4 h-4 text-[#17BFA0]" />
              <span className="hidden sm:inline">Récompenses</span>
            </button>

            {/* Bouton QR */}
            <button 
              onClick={() => setShowQRPopup(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#17BFA0] text-white shadow-sm text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition"
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200 shadow-sm text-red-600 text-sm font-medium hover:bg-red-100 active:scale-95 transition"
            >
              <span className="text-sm">[→]</span>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Message de bienvenue statique */}
      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#123456] leading-relaxed">
            {welcomeMessage}
          </h1>
          <button
            onClick={() => setMessageIndex(prev => prev + 1)}
            className="text-xs text-[#17BFA0] hover:text-[#14a58d] underline"
          >
            🔄 Changer le message
          </button>
        </div>
      </div>

      {/* Header intro */}
      <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 max-w-7xl mx-auto">
        <header className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Achète local, gagne plus.</h2>
          <p className="text-sm md:text-base text-muted-foreground">Soutiens tes commerces de proximité et débloque des offres exclusives.</p>
        </header>
      </div>

      {/* Section Tickets supprimée - maintenant gérée par l'icône dans la navbar */}

      {/* Carrousel sponsorisé */}
      <SponsorCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
        {/* 🎁 Tombolas */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#123456]">🎁 Tombolas locales</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView="auto"
            centeredSlides={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            grabCursor={true}
            className="w-full"
            onSlideChange={(swiper) =>
              setProgressTombola((swiper.activeIndex + 1) / tombolas.length)
            }
          >
            {tombolas.map((tb, idx) => (
              <SwiperSlide key={idx} className="!w-80">
                <div className="bg-yellow-100 rounded-xl shadow-md p-4 flex flex-col min-h-[160px]">
                  <p className="font-bold text-[#123456]">{tb.title}</p>
                  <p className="text-gray-600 text-sm">{tb.desc}</p>
                  <button className="mt-auto bg-yellow-500 text-white rounded-lg py-2 font-semibold hover:bg-yellow-600 transition">
                    {tb.cta}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-yellow-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progressTombola * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </section>

        {/* 📰 Actus commerçants */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#123456]">📰 Actus commerçants</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView="auto"
            centeredSlides={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            grabCursor={true}
            className="w-full"
            onSlideChange={(swiper) =>
              setProgressActus((swiper.activeIndex + 1) / actus.length)
            }
          >
            {actus.map((a, idx) => (
              <SwiperSlide key={idx} className="!w-80">
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col min-h-[160px] border border-gray-200">
                  <p className="font-bold text-[#123456]">{a.title}</p>
                  <p className="text-gray-600 text-sm">{a.desc}</p>
                  <p className="mt-auto text-sm text-[#17BFA0] font-semibold">
                    {a.merchant}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-teal-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progressActus * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </section>

        {/* 🔥 Bons plans flash */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#123456]">🔥 Bons plans flash</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView="auto"
            centeredSlides={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            grabCursor={true}
            className="w-full"
            onSlideChange={(swiper) =>
              setProgressFlash((swiper.activeIndex + 1) / flashOffers.length)
            }
          >
            {flashOffers.map((offer, idx) => (
              <SwiperSlide key={idx} className="!w-80">
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col min-h-[160px] border border-gray-200">
                  <p className="font-semibold text-lg text-[#123456]">{offer.title}</p>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs mt-2 w-fit">
                    {offer.tag}
                  </span>
                  <button className="mt-auto w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 font-medium hover:bg-teal-50 transition">
                    Voir l&apos;offre
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progressFlash * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </section>
      </div>

      {/* Explorez par catégorie */}
      <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#123456]">
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
              <p className="mt-1 sm:mt-2 font-medium text-[#123456] text-sm sm:text-base">
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
        <h2 className="text-lg sm:text-2xl font-bold text-[#123456] mb-2 sm:mb-3">
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
            <p className="text-base sm:text-lg font-bold text-[#123456] mt-1 sm:mt-2">{stat.number}</p>
            <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

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
                  
                  // Déclencher les animations selon le type de récompense
                  if (reward.type === "points" && reward.amount >= 250) {
                    setShowMoneyEmojis(true);
                    setTimeout(() => setShowMoneyEmojis(false), 3000);
                  } else if (reward.amount >= 100) {
                    setShowHappyEmojis(true);
                    setTimeout(() => setShowHappyEmojis(false), 3000);
                  } else {
                    setShowSadEmojis(true);
                    setTimeout(() => setShowSadEmojis(false), 3000);
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

      {/* Animations d'emojis */}
      {showSadEmojis && <SadEmojiRain count={35} isWinner={false} />}
      {showHappyEmojis && <HappyEmojiRain count={35} isWinner={true} />}
      {showMoneyEmojis && <MoneyEmojiRain count={35} isWinner={true} />}
    </div>
  );
}