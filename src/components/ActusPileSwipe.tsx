"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ActusPileSwipe() {
  // -------------------------------
  // 1. Données mock (actus commerçants)
  // -------------------------------
  const actus = [
    {
      merchant: "Épicerie Bio",
      title: "🌱 Nouveaux fruits locaux",
      desc: "Mangez frais, achetez pays",
    },
    {
      merchant: "Café du Coin",
      title: "🎶 Soirée Jazz vendredi",
      desc: "Ambiance live dès 20h",
    },
    {
      merchant: "Fleuriste Antilles",
      title: "💐 Atelier bouquet samedi",
      desc: "Apprenez à composer le vôtre",
    },
    {
      merchant: "Boulangerie Artisanale",
      title: "🥖 Pain complet dispo",
      desc: "Cuit ce matin, encore chaud",
    },
  ];

  // -------------------------------
  // 2. États
  // -------------------------------
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down">("up");

  // -------------------------------
  // 3. Navigation (suivant / précédent)
  // -------------------------------
  const next = () => {
    setDirection("up");
    setIndex((prev) => (prev + 1) % actus.length);
  };

  const prev = () => {
    setDirection("down");
    setIndex((prev) => (prev - 1 + actus.length) % actus.length);
  };

  // -------------------------------
  // 4. Gestion du swipe tactile
  // -------------------------------
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientY);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientY;

    if (delta > 50) next();     // Swipe vers le haut → suivant
    if (delta < -50) prev();    // Swipe vers le bas → précédent

    setTouchStart(null);
  };

  // -------------------------------
  // 5. Rendu
  // -------------------------------
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Titre */}
      <h2 className="text-lg font-bold text-slate-900 mb-6">
        📰 Actus commerçants
      </h2>

      {/* Zone swipe */}
      <div
        className="relative w-80 h-96 overflow-hidden"
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
            className="absolute inset-0 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg p-6 flex flex-col"
          >
            {/* Header commerçant */}
            <div className="flex items-center gap-2 mb-3">
              <span>📌</span>
              <span className="font-semibold text-sm">
                {actus[index].merchant}
              </span>
            </div>

            {/* Contenu */}
            <p className="font-bold text-lg mb-2">{actus[index].title}</p>
            <p className="text-sm text-gray-700 flex-1">{actus[index].desc}</p>

            {/* Footer */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Swipe ↑↓ pour naviguer
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateur de progression */}
      <div className="mt-3 text-sm text-gray-500">
        {index + 1} / {actus.length}
      </div>
    </section>
  );
}