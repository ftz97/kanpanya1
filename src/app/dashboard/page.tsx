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
  
  // États pour les barres de progression des carrousels (initialisés à 1ère slide)
  const [progressTombola, setProgressTombola] = React.useState(1 / 3); // 3 tombolas
  const [progressActus, setProgressActus] = React.useState(1 / 4); // 4 actus
  const [progressFlash, setProgressFlash] = React.useState(1 / 6); // 6 offres
  
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

  // 🎟️ Données Cartes de fidélité
  const fidelityCards = [
    { merchant: "🥖 Boulangerie", type: "purchases", goal: 10, current: 7, reward: "1 pain gratuit" },
    { merchant: "☕ Café du Coin", type: "purchases", goal: 5, current: 3, reward: "1 café offert" },
    { merchant: "🛒 Supermarché Local", type: "amount", goal: 250, current: 150, reward: "10€ offerts" },
    { merchant: "💐 Fleuriste", type: "amount", goal: 100, current: 75, reward: "5€ offerts" },
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
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-[#123456] text-sm font-medium hover:bg-gray-50"
            >
              <Gift className="w-4 h-4 text-[#17BFA0]" />
              <span>Récomp.</span>
            </button>

            <button 
              onClick={() => setShowQRPopup(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#17BFA0] text-white text-sm font-semibold hover:bg-[#14a58e]"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Mon QR</span>
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
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">🎁 Tombolas locales</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            className="overflow-visible"
            onSlideChange={(swiper) =>
              setProgressTombola((swiper.activeIndex + 1) / tombolas.length)
            }
          >
            {tombolas.map((tb, idx) => (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-yellow-50 rounded-xl shadow p-4 min-h-[150px] flex flex-col">
                  <p className="font-bold text-[#123456] truncate">{tb.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{tb.desc}</p>
                  <button className="mt-auto bg-yellow-500 text-white rounded-lg py-2 text-sm font-semibold hover:bg-yellow-600">
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
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </div>
        </section>

        {/* 📰 Actus commerçants */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">📰 Actus commerçants</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            className="overflow-visible"
            onSlideChange={(swiper) =>
              setProgressActus((swiper.activeIndex + 1) / actus.length)
            }
          >
            {actus.map((a, idx) => (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[150px] border border-gray-200">
                  <p className="font-bold text-[#123456] truncate">{a.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{a.desc}</p>
                  <p className="mt-auto text-xs sm:text-sm text-[#17BFA0] font-semibold truncate">
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
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </div>
        </section>

        {/* 🔥 Bons plans flash */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">🔥 Bons plans flash</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            className="overflow-visible"
            onSlideChange={(swiper) =>
              setProgressFlash((swiper.activeIndex + 1) / flashOffers.length)
            }
          >
            {flashOffers.map((offer, idx) => (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[150px] border border-gray-200">
                  <p className="font-semibold text-base text-[#123456] truncate">{offer.title}</p>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs mt-2 w-fit">
                    {offer.tag}
                  </span>
                  <button className="mt-auto w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50">
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
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </div>
        </section>

        {/* 🎟️ Cartes de fidélité */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">🎟️ Mes cartes de fidélité</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            className="overflow-visible"
          >
            {fidelityCards.map((card, idx) => (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[180px] border border-gray-200">
                  {/* Header avec merchant et progression */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-sm text-[#123456] truncate">{card.merchant}</h3>
                    {card.type === "purchases" ? (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">{card.current}/{card.goal}</span>
                    ) : (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">{card.current}€/{card.goal}€</span>
                    )}
                  </div>

                  {/* Carte par achats avec tampons */}
                  {card.type === "purchases" && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {Array.from({ length: card.goal }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            i < card.current
                              ? "bg-[#17BFA0] text-white border-[#17BFA0]"
                              : "bg-gray-100 border-gray-300 text-gray-400"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Carte par montant avec barre de progression */}
                  {card.type === "amount" && (
                    <div className="mb-3">
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#17BFA0]"
                          style={{ width: `${(card.current / card.goal) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Récompense */}
                  <p className="text-xs sm:text-sm text-gray-600 mt-auto">
                    🎁 Récompense : <span className="font-semibold text-[#123456]">{card.reward}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 📂 Explorez par catégorie */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-[#123456]">📂 Explorez par catégorie</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            className="overflow-visible"
          >
            {[
              { icon: "🍔", name: "Restauration" },
              { icon: "💇‍♀️", name: "Beauté" },
              { icon: "👗", name: "Mode" },
              { icon: "🎉", name: "Loisirs" },
              { icon: "🛒", name: "Alimentation" },
              { icon: "💊", name: "Santé" },
            ].map((cat, i) => (
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
      </main>

      {/* Bloc communauté */}
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

      {/* Stats */}
      <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-3 sm:px-6 pb-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { icon: "🏬", number: "89", label: "Commerçants" },
          { icon: "👥", number: "1,247", label: "Utilisateurs" },
          { icon: "🎁", number: "156", label: "Offres actives" },
          { icon: "⭐", number: "4.8", label: "Note moyenne" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl bg-white shadow p-3 sm:p-6 text-center flex flex-col items-center"
          >
            <span className="text-xl sm:text-2xl">{stat.icon}</span>
            <p className="text-sm sm:text-lg font-bold text-[#123456] mt-1">{stat.number}</p>
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