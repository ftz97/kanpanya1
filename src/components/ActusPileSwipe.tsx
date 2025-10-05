"use client";
import { useState } from "react";
import { colors } from "@/config/colors";

export function ActusPileSwipe() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const actus = [
    { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
    { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
    { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
    { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
  ];

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % actus.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + actus.length) % actus.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || isAnimating) return;
    
    const delta = touchStart - e.changedTouches[0].clientY;
    const threshold = 50;
    
    if (delta > threshold) {
      next(); // swipe up
    } else if (delta < -threshold) {
      prev(); // swipe down
    }
    
    setTouchStart(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAnimating) return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        next();
        break;
      case 'ArrowDown':
        e.preventDefault();
        prev();
        break;
    }
  };

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 flex flex-col min-h-80 border select-none cursor-pointer transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ 
        background: colors.card,
        borderColor: '#E5E7EB',
        focusRingColor: colors.primary
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Actualités commerçants"
      aria-live="polite"
    >
      {/* En-tête avec nom du commerçant */}
      <div className="mb-3">
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.primary }}>
          {actus[index].merchant}
        </p>
      </div>
      
      {/* Titre de l'actualité */}
      <p className="font-bold mb-3 text-lg" style={{ color: colors.textPrimary }}>
        {actus[index].title}
      </p>
      
      {/* Description */}
      <p className="text-sm flex-1 leading-relaxed" style={{ color: colors.textSecondary }}>
        {actus[index].desc}
      </p>
      
      {/* Indicateur de progression */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {actus.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? 'opacity-100 scale-125' : 'opacity-30'
            }`}
            style={{ 
              backgroundColor: i === index ? colors.primary : colors.textMuted 
            }}
          />
        ))}
      </div>
      
      {/* Instructions de navigation */}
      <div className="mt-3 text-center">
        <p className="text-xs" style={{ color: colors.textMuted }}>
          <span className="hidden sm:inline">↑↓ Flèches ou </span>
          Swipe ↑↓ pour naviguer
        </p>
        <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
          {index + 1} / {actus.length}
        </p>
      </div>
    </div>
  );
}

export default function ActusPileSwipePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" 
         style={{ background: colors.background }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
          📰 Actus commerçants
        </h2>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Naviguez avec les gestes tactiles ou les flèches du clavier
        </p>
      </div>
      <ActusPileSwipe />
    </div>
  );
}
