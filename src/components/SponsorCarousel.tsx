"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

// Données mock
const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "🏥 Mutuelle Locale",
    logo: "🏥",
    type: "video",
    title: "🎬 Vidéo Nutrition",
    description: "Découvrez les secrets d'une alimentation équilibrée",
    cta: "▶️ Regarder",
    reward: "50 points"
  },
  {
    id: "2",
    name: "🥖 Boulangerie Artisanale",
    logo: "🥖",
    type: "quiz",
    title: "🧠 Quiz Pain",
    description: "Testez vos connaissances et gagnez une récompense",
    cta: "🎯 Jouer",
    reward: "100 points + 10% off"
  },
  {
    id: "3",
    name: "☕ Café du Coin",
    logo: "☕",
    type: "scratch",
    title: "🎟️ Grattez et Gagnez",
    description: "Un ticket = une chance de gagner !",
    cta: "🎲 Gratter",
    reward: "Boisson offerte"
  },
  {
    id: "4",
    name: "🥬 Épicerie Bio",
    logo: "🥬",
    type: "simple",
    title: "💰 Offre Flash -20%",
    description: "Code valable 24h sur tous les produits",
    cta: "⚡ Profiter",
    reward: "Économisez 15€"
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
    <div className="max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10 px-3 sm:px-4 md:px-6">
      {/* Header */}
      <h2 className="text-center font-bold text-xl mb-6 text-[#123456]">
        ✨ Publicité interactive
      </h2>

      {/* Bandeau */}
      <div className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#17BFA0] to-[#14a58d] text-white p-4 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
          >
            {/* Logo + infos */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{sponsor.logo}</span>
              <div>
                <h3 className="font-bold text-lg">{sponsor.title}</h3>
                <p className="text-sm opacity-90">{sponsor.description}</p>
              </div>
            </div>

            {/* CTA */}
            <button className="bg-white text-[#17BFA0] font-bold px-4 py-2 rounded-full shadow hover:scale-110 transition">
              {sponsor.cta}
            </button>
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
                i === currentIndex ? "bg-[#17BFA0] w-6" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
