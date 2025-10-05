"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/config/colors";
import { PrimaryButton } from "@/components/StandardPageLayout";

export function ActusPileAnimated() {
  const [index, setIndex] = useState(0);
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
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + actus.length) % actus.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto min-h-80">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            y: 100, 
            rotate: 10,
            scale: 0.8
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotate: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -150, 
            rotate: -15,
            scale: 0.8
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-lg shadow-lg p-6 flex flex-col border"
          style={{ 
            background: colors.card,
            borderColor: '#E5E7EB'
          }}
        >
          {/* En-tête avec nom du commerçant */}
          <motion.div 
            className="mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.primary }}>
              {actus[index].merchant}
            </p>
          </motion.div>
          
          {/* Titre de l'actualité */}
          <motion.p 
            className="font-bold mb-3 text-lg" 
            style={{ color: colors.textPrimary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {actus[index].title}
          </motion.p>
          
          {/* Description */}
          <motion.p 
            className="text-sm flex-1 leading-relaxed" 
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {actus[index].desc}
          </motion.p>
          
          {/* Bouton d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <PrimaryButton
              onClick={next}
              className="mt-4 w-full"
              disabled={isAnimating}
            >
              Suivant →
            </PrimaryButton>
          </motion.div>

          {/* Indicateur de progression animé */}
          <motion.div 
            className="flex justify-center items-center space-x-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {actus.map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: i === index ? colors.primary : colors.textMuted 
                }}
                animate={{
                  scale: i === index ? 1.25 : 1,
                  opacity: i === index ? 1 : 0.3
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>
          
          {/* Compteur */}
          <motion.span 
            className="absolute bottom-2 left-3 text-xs font-medium" 
            style={{ color: colors.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {index + 1} / {actus.length}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Boutons de navigation optionnels */}
      <div className="flex justify-between items-center mt-4 px-2">
        <motion.button
          onClick={prev}
          disabled={isAnimating}
          className="px-3 py-1 text-sm rounded-lg border transition-colors disabled:opacity-50"
          style={{ 
            borderColor: colors.primary,
            color: colors.primary
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Précédent
        </motion.button>
        
        <motion.button
          onClick={next}
          disabled={isAnimating}
          className="px-3 py-1 text-sm rounded-lg border transition-colors disabled:opacity-50"
          style={{ 
            borderColor: colors.primary,
            color: colors.primary
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Suivant →
        </motion.button>
      </div>
    </div>
  );
}

export default function ActusPileAnimatedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" 
         style={{ background: colors.background }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
          📰 Actus commerçants
        </h2>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Découvrez les actualités avec des animations fluides
        </p>
      </div>
      <ActusPileAnimated />
    </div>
  );
}
