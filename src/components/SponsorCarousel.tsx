"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";

// Types
interface Sponsor {
  id: string;
  name: string;
  logo: string;
  type: "video" | "quiz" | "scratch" | "simple";
  title: string;
  description: string;
  cta: string;
  reward?: string;
  background: string;
  icon?: string;
}

// Données mock
const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "Mutuelle Locale",
    logo: "🏥",
    type: "video",
    title: "🎬 Vidéo Nutrition",
    description: "Découvrez les secrets d'une alimentation équilibrée",
    cta: "Regarder",
    reward: "+50 pts",
    background: "from-teal-400 to-emerald-600",
    icon: "▶️"
  },
  {
    id: "2",
    name: "Boulangerie Artisanale",
    logo: "🥖",
    type: "quiz",
    title: "🧠 Quiz Pain",
    description: "Testez vos connaissances et gagnez des récompenses",
    cta: "Jouer",
    reward: "+100 pts",
    background: "from-amber-400 to-orange-500",
    icon: "🎯"
  },
  {
    id: "3",
    name: "Café du Coin",
    logo: "☕",
    type: "scratch",
    title: "🎟️ Grattez et Gagnez",
    description: "Un ticket = une chance de gagner !",
    cta: "Gratter",
    reward: "Boisson offerte",
    background: "from-purple-500 to-violet-700",
    icon: "🎲"
  },
  {
    id: "4",
    name: "Épicerie Bio",
    logo: "🥬",
    type: "simple",
    title: "💰 Offre Flash -20%",
    description: "Code valable 24h sur tous les produits",
    cta: "Profiter",
    reward: "Économisez 15€",
    background: "from-emerald-400 to-green-600",
    icon: "⚡"
  }
];

export default function SponsorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = () => setCurrentIndex((prev) => (prev + 1) % mockSponsors.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + mockSponsors.length) % mockSponsors.length);

  // autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const sponsor = mockSponsors[currentIndex];

  return (
    <div className="max-w-7xl mx-auto mt-6 px-3 sm:px-4 md:px-6">
      {/* Header */}
      <h2 className="text-center font-bold text-xl mb-6 text-[#123456]">
        ✨ Publicité interactive
      </h2>

      {/* Bandeau */}
      <div className="max-w-5xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center justify-between gap-6 bg-gradient-to-r ${sponsor.background} text-white p-6 rounded-2xl shadow-lg`}
          >
            {/* Infos sponsor */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{sponsor.logo}</span>
              <div>
                <div className="bg-white/20 text-xs px-2 py-1 rounded-full mb-1">
                  Espace sponsorisé • {sponsor.name}
                </div>
                <h3 className="font-bold text-lg">{sponsor.title}</h3>
                <p className="text-sm opacity-90">{sponsor.description}</p>
              </div>
            </div>

            {/* Zone droite : reward animé + CTA */}
            <div className="flex items-center gap-3">
              {sponsor.reward && (
                <motion.div
                  className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-emerald-600 font-semibold shadow"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {/* Glow animé */}
                  <span className="absolute inset-0 rounded-full bg-emerald-300 opacity-30 blur-md animate-pulse" />
                  <Gift className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{sponsor.reward}</span>
                </motion.div>
              )}
              <button className="flex items-center gap-2 bg-white text-slate-800 font-bold px-5 py-2 rounded-full shadow hover:scale-105 transition">
                {sponsor.icon} {sponsor.cta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110"
        >
          <ChevronLeft className="text-gray-700" />
        </button>
        <button
          onClick={next}
          className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110"
        >
          <ChevronRight className="text-gray-700" />
        </button>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-4">
          {mockSponsors.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-[#fff] w-6" : "bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
