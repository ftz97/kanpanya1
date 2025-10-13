"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniQuiz from "./MiniQuiz";
import ScratchCard from "./ScratchCard";
import { colors } from "@/config/colors";

interface SponsorData {
  id: string;
  name: string;
  logo: string;
  logoImage?: string;
  mainImage: string;
  type: "video-quiz" | "quiz-direct";
  title: string;
  description: string;
  cta: string;
  reward?: string;
  background: string;
  icon?: string;
  theme: string;
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
  scratchRewards: Array<{
    type: "points" | "coupon" | "gift";
    amount?: number;
    label: string;
    description: string;
  }>;
}

export default function SponsorFlowModal({
  visible,
  onClose,
  sponsorData,
}: {
  visible: boolean;
  onClose: () => void;
  sponsorData?: SponsorData;
}) {
  const [step, setStep] = useState<"video" | "quiz" | "scratch">("video");
  const [quizScore, setQuizScore] = useState(0);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // ✅ CORRECTION : Attendre l'hydratation côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (visible && sponsorData) {
      setStep(sponsorData.type === "video-quiz" ? "video" : "quiz");
      setQuizScore(0);
      setSelectedReward(null);
    }
  }, [visible, sponsorData]);

  if (!visible) return null;

  // ✅ CORRECTION : Animations simplifiées pour éviter les conflits d'hydratation
  const slideX = {
    initial: { x: "100%", opacity: 0 },
    enter: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.3, 
        ease: "easeOut" // Plus simple que les courbes complexes
      } 
    },
    exit: { 
      x: "-100%", 
      opacity: 0, 
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      } 
    },
  };

  const slideY = {
    initial: { y: "100%", opacity: 0 },
    enter: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      y: "-100%", 
      opacity: 0, 
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      } 
    },
  };

  // ✅ CORRECTION : Rendu conditionnel pour éviter les erreurs d'hydratation
  if (!isClient) {
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
          <div className="p-6 sm:p-8 text-center">
            <div className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
              Kanpanya
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Chargement...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          {/* 🎥 ÉTAPE 1 : VIDÉO (seulement pour type video-quiz) */}
          {step === "video" && sponsorData?.type === "video-quiz" && (
            <motion.div
              key="video"
              variants={slideX}
              initial="initial"
              animate="enter"
              exit="exit"
              className="p-6 sm:p-8 text-center"
            >
              {/* Header avec logo sponsor */}
              <div className="mb-6">
                <div className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                  {sponsorData.name}
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {sponsorData.description}
                </p>
              </div>

              {/* Zone vidéo thématique */}
              <div 
                className="w-full aspect-video rounded-xl flex items-center justify-center text-lg font-bold mb-6 relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${sponsorData.theme === 'santé' ? '#10b981, #059669' : '#f59e0b, #d97706'})`,
                  border: `2px solid ${colors.primary}30`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center text-white">
                  <div className="text-4xl mb-2">
                    {sponsorData.theme === 'santé' ? '🏥' : '🥖'}
                  </div>
                  <div className="font-bold">Vidéo {sponsorData.theme}</div>
                  <div className="text-sm font-normal mt-1 opacity-90">
                    Découvrez les secrets de {sponsorData.name}
                  </div>
                </div>
              </div>

              {/* Bouton continuer */}
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
                    Quiz {sponsorData?.theme || "Partenaire"}
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {sponsorData?.questions.length || 4} questions pour gagner des points !
                  </p>
                </div>
                <MiniQuiz 
                  onComplete={(score: number) => {
                    setQuizScore(score);
                    // Sélectionner une récompense aléatoire basée sur le score
                    const rewards = sponsorData?.scratchRewards || [];
                    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
                    setSelectedReward(randomReward);
                    setStep("scratch");
                  }} 
                  questions={sponsorData?.questions}
                />
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
                  🎟️ Grattez votre ticket {sponsorData?.theme} !
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Score: {quizScore}/{sponsorData?.questions.length} - Découvrez votre récompense
                </p>
              </div>
              <ScratchCard 
                reward={{
                  type: selectedReward?.type || 'points',
                  amount: selectedReward?.amount || 50,
                  label: selectedReward?.label || '+50 points'
                }}
                onReveal={() => {
                  console.log('🎉 Carte révélée dans le modal sponsor !', selectedReward);
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