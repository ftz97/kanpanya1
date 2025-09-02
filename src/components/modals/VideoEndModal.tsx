"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/modal/ModalManager";
import QuizModal from "./QuizModal";

export default function VideoEndModal() {
  const { replace } = useModal();

  const handleStartQuiz = () => {
    // Remplacer par le modal de quiz
    replace(<QuizModal />);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center space-y-6"
    >
      {/* Icône de succès animée */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      {/* Message de succès */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-bold text-gray-800">Vidéo terminée !</h2>
        <p className="text-lg text-gray-600">
          Vous avez gagné <span className="text-green-600 font-semibold">5 points</span> 🎉
        </p>
      </motion.div>

      {/* Bouton pour commencer le quiz */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartQuiz}
        className="btn btn-primary btn-lg flex items-center gap-2 mx-auto"
      >
        <span className="text-lg">🧠</span>
        Lancer le quiz nutrition
      </motion.button>
    </motion.div>
  );
}
