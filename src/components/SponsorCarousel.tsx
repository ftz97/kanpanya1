"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % mockSponsors.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + mockSponsors.length) % mockSponsors.length);

  // autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

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
            className={`flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-gradient-to-r ${sponsor.background} text-white p-4 sm:p-6 rounded-2xl shadow-lg min-h-32 cursor-grab active:cursor-grabbing`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Infos sponsor */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-2xl sm:text-3xl">{sponsor.logo}</span>
              <div>
                <div className="bg-white/20 text-xs px-2 py-1 rounded-full mb-1">
                  Espace sponsorisé • {sponsor.name}
                </div>
                <h3 className="font-bold text-base sm:text-lg">{sponsor.title}</h3>
                <p className="text-xs sm:text-sm opacity-90">{sponsor.description}</p>
              </div>
            </div>

            {/* Zone droite : CTA uniquement */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white text-slate-800 font-bold px-4 sm:px-5 py-2 rounded-full shadow hover:scale-105 transition text-sm sm:text-base">
                {sponsor.icon} {sponsor.cta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>


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
