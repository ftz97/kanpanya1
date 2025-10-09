"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { colors } from "@/config/colors";
import { PrimaryButton } from "@/components/StandardPageLayout";

// -------------------------------
// Données mock
// -------------------------------
const sponsor = {
  name: "Boulangerie Artisanale",
  logo: "🥖",
  title: "🧠 Quiz Pain",
  description: "Testez vos connaissances et gagnez des récompenses",
  cta: "🎯 Jouer",
};

const tombolas = [
  { title: "☕ Café offert", desc: "10 gagnants cette semaine", cta: "Jouer" },
  { title: "🌸 Bouquet à gagner", desc: "Offert par Fleuriste Antilles", cta: "Participer" },
  { title: "🥬 Panier garni bio", desc: "Tirage vendredi", cta: "Tenter ma chance" },
];

const actus = [
  { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
  { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
  { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
  { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
];

const flashOffers = [
  { title: "🥦 Légumes frais -30%", desc: "Commerçant", cta: "Voir l'offre" },
  { title: "💊 Parapharmacie -15%", desc: "Commerçant", cta: "Voir l'offre" },
  { title: "🥖 Boulangerie -20%", desc: "Commerçant", cta: "Voir l'offre" },
  { title: "🍷 Caviste -10%", desc: "Commerçant", cta: "Voir l'offre" },
];

// -------------------------------
// Composant ActusPileSwipe (Post-it swipe haut/bas)
// -------------------------------
function ActusPileSwipe() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const next = () => {
    setDirection("up");
    setIndex((prev) => (prev + 1) % actus.length);
  };

  const prev = () => {
    setDirection("down");
    setIndex((prev) => (prev - 1 + actus.length) % actus.length);
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientY);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientY;
    if (delta > 50) next();
    if (delta < -50) prev();
    setTouchStart(null);
  };

  return (
    <div
      className="relative w-80 h-96 overflow-hidden mx-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: direction === "up" ? 100 : -100,
            rotate: direction === "up" ? 5 : -5,
          }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{
            opacity: 0,
            y: direction === "up" ? -100 : 100,
            rotate: direction === "up" ? -5 : 5,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-lg shadow-lg p-6 flex flex-col border"
          style={{ 
            background: colors.card,
            borderColor: '#E5E7EB'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span>📌</span>
            <span className="font-semibold text-sm" style={{ color: colors.primary }}>
              {actus[index].merchant}
            </span>
          </div>
          <p className="font-bold text-lg mb-2" style={{ color: colors.textPrimary }}>
            {actus[index].title}
          </p>
          <p className="text-sm flex-1" style={{ color: colors.textSecondary }}>
            {actus[index].desc}
          </p>
          <div className="mt-4 text-xs text-center" style={{ color: colors.textMuted }}>
            Swipe ↑↓ pour naviguer
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicateur */}
      <div className="absolute bottom-2 right-3 text-xs" style={{ color: colors.textMuted }}>
        {index + 1} / {actus.length}
      </div>
    </div>
  );
}

// -------------------------------
// Page Home
// -------------------------------
export default function Home() {
  const userName = "Kevin";
  const heure = new Date().getHours();
  const emoji =
    heure >= 6 && heure < 12 ? "☀️" : heure >= 12 && heure < 18 ? "🌇" : "🌙";

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
            {`Bonjour ${userName} ${emoji} — découvre les offres exclusives de tes commerçants locaux ✨`}
          </h1>
          <p className="mt-1" style={{ color: colors.textSecondary }}>
            Soutiens tes commerces de proximité et profite de récompenses uniques.
          </p>
        </header>

        {/* Sponsor */}
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="text-white p-6 rounded-2xl shadow-lg"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{sponsor.logo}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  Espace sponsorisé • {sponsor.name}
                </span>
              </div>
              <h2 className="font-bold text-xl">{sponsor.title}</h2>
              <p className="text-sm opacity-90 mb-4">{sponsor.description}</p>
              <PrimaryButton className="bg-white text-orange-600 font-bold px-5 py-2 rounded-full shadow hover:scale-105 transition">
                {sponsor.cta}
              </PrimaryButton>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Tombolas */}
        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
            🎁 Tombolas locales
          </h2>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
            Tente ta chance cette semaine et gagne des récompenses locales 🎉
          </p>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000 }}
            className="w-full"
          >
            {tombolas.map((tb, idx) => (
              <SwiperSlide key={idx} className="!w-72">
                <div className="rounded-xl shadow-md p-4 flex flex-col min-h-[160px] border"
                     style={{ 
                       background: colors.card,
                       borderColor: '#E5E7EB'
                     }}>
                  <p className="font-bold" style={{ color: colors.textPrimary }}>{tb.title}</p>
                  <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{tb.desc}</p>
                  <PrimaryButton className="mt-auto w-full rounded-lg py-2 font-semibold">
                    {tb.cta}
                  </PrimaryButton>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Actus commerçants */}
        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
            📰 Actus commerçants
          </h2>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
            Les commerçants que tu suis ont publié récemment 👇
          </p>
          <ActusPileSwipe />
        </section>

        {/* Bons plans flash */}
        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
            🔥 Bons plans flash
          </h2>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
            Des offres limitées dans le temps, à saisir vite ⚡
          </p>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3500 }}
            className="w-full"
          >
            {flashOffers.map((offer, idx) => (
              <SwiperSlide key={idx} className="!w-72">
                <div className="rounded-xl shadow-md p-4 flex flex-col min-h-[160px] border"
                     style={{ 
                       background: colors.card,
                       borderColor: '#E5E7EB'
                     }}>
                  <p className="font-bold" style={{ color: colors.textPrimary }}>{offer.title}</p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{offer.desc}</p>
                  <button className="mt-auto w-full border rounded-lg py-2 font-semibold transition"
                          style={{ 
                            borderColor: colors.primary,
                            color: colors.primary
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.primary;
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.primary;
                          }}>
                    {offer.cta}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Catégories */}
        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
            📂 Explorez par catégorie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            <div className="p-4 rounded-xl shadow text-center" style={{ background: colors.card }}>
              🍔 Restauration
            </div>
            <div className="p-4 rounded-xl shadow text-center" style={{ background: colors.card }}>
              💇‍♀️ Beauté
            </div>
            <div className="p-4 rounded-xl shadow text-center" style={{ background: colors.card }}>
              🛒 Épicerie
            </div>
            <div className="p-4 rounded-xl shadow text-center" style={{ background: colors.card }}>
              🌸 Fleuriste
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
