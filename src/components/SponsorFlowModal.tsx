"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniQuiz from "./MiniQuiz";
import ScratchCard from "./ScratchCard";
import { colors } from "@/config/colors";

export default function SponsorFlowModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"video" | "quiz" | "scratch">("video");

  if (!visible) return null;

  // Animations adaptées au design Kanpanya
  const slideX = {
    initial: { x: "100%", opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] } },
  };

  const slideY = {
    initial: { y: "100%", opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] } },
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm"
      style={{ background: 'rgba(33, 46, 64, 0.8)' }}
    >
      <div 
        className="relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl overflow-hidden"
        style={{ 
          background: colors.card,
          border: `2px solid ${colors.primary}20`
        }}
      >
        <AnimatePresence mode="wait">
          {/* 🎥 ÉTAPE 1 : VIDÉO */}
          {step === "video" && (
            <motion.div
              key="video"
              variants={slideX}
              initial="initial"
              animate="enter"
              exit="exit"
              className="p-6 sm:p-8 text-center"
            >
              {/* Header avec logo Kanpanya */}
              <div className="mb-6">
                <div className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                  Kanpanya
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Découvrez notre partenaire
                </p>
              </div>

              {/* Zone vidéo avec design Kanpanya */}
              <div 
                className="w-full aspect-video rounded-xl flex items-center justify-center text-lg font-bold mb-6 relative overflow-hidden"
                style={{ 
                  background: colors.gradients.partner,
                  border: `2px solid ${colors.primary}30`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <div style={{ color: colors.textPrimary }}>Vidéo sponsor</div>
                  <div className="text-sm font-normal mt-1" style={{ color: colors.textSecondary }}>
                    Découvrez notre partenaire
                  </div>
                </div>
              </div>

              {/* Bouton avec style Kanpanya */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setStep("quiz")}
                className="px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                style={{
                  background: colors.primary,
                  color: 'white',
                  boxShadow: `0 4px 14px 0 ${colors.primary}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.primary;
                }}
              >
                Continuer vers le quiz ➡️
              </motion.button>
            </motion.div>
          )}

          {/* ❓ ÉTAPE 2 : QUIZ */}
          {step === "quiz" && (
            <motion.div
              key="quiz"
              variants={slideX}
              initial="initial"
              animate="enter"
              exit="exit"
              className="p-6 sm:p-8 flex justify-center"
            >
              <div className="w-full max-w-md">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                    Quiz Partenaire
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Testez vos connaissances
                  </p>
                </div>
                <MiniQuiz onComplete={() => setStep("scratch")} />
              </div>
            </motion.div>
          )}

          {/* 🎟️ ÉTAPE 3 : SCRATCH */}
          {step === "scratch" && (
            <motion.div
              key="scratch"
              variants={slideY}
              initial="initial"
              animate="enter"
              exit="exit"
              className="w-full"
            >
              <div className="text-center mb-4 p-4" style={{ background: colors.gradients.community }}>
                <div className="text-lg font-bold mb-1" style={{ color: colors.primary }}>
                  🎟️ Grattez votre ticket !
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Découvrez votre récompense
                </p>
              </div>
              <ScratchCard 
                reward={{
                  type: 'points',
                  amount: 50,
                  label: '+50 points Kanpanya'
                }}
                onReveal={() => {
                  console.log('🎉 Carte révélée dans le modal sponsor !');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton fermer avec style Kanpanya */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: 90, scale: 1.1 }}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: colors.textMuted + '20',
            color: colors.textSecondary,
            border: `1px solid ${colors.textMuted}40`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.textMuted + '40';
            e.currentTarget.style.color = colors.textPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.textMuted + '20';
            e.currentTarget.style.color = colors.textSecondary;
          }}
        >
          ✕
        </motion.button>

        {/* Indicateur de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <motion.div
            className="h-full"
            style={{ background: colors.primary }}
            initial={{ width: "33%" }}
            animate={{ 
              width: step === "video" ? "33%" : step === "quiz" ? "66%" : "100%" 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}