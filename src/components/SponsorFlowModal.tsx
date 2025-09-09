"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniQuiz from "./MiniQuiz";
import ScratchCard from "./ScratchCard";

export default function SponsorFlowModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"video" | "quiz" | "scratch">("video");

  if (!visible) return null;

  // Animations
  const slideX = {
    initial: { x: "100%", opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const slideY = {
    initial: { y: "100%", opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {/* 🎥 ÉTAPE 1 : VIDÉO */}
          {step === "video" && (
            <motion.div
              key="video"
              variants={slideX}
              initial="initial"
              animate="enter"
              exit="exit"
              className="p-6 text-center"
            >
              <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700">
                🎥 Vidéo sponsor simulée
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setStep("quiz")}
                className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
              >
                Continuer vers le quiz
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
              className="p-6 flex justify-center"
            >
              <MiniQuiz onComplete={() => setStep("scratch")} />
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
              className="w-full h-full"
            >
              <ScratchCard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ❌ Bouton fermer */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: 90 }}
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
        >
          ✕
        </motion.button>
      </div>
    </div>
  );
}