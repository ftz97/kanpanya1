"use client";

import * as React from "react";
import { useModal } from "@/components/modal/ModalManager";
import QuizModal from "./QuizModal";

export default function VideoEndModal() {
  const { replace, close } = useModal();
  
  React.useEffect(() => {
    console.log("🎉 VideoEndModal chargé");
  }, []);

  const handleStartQuiz = () => {
    console.log("🧠 Démarrage du quiz");
    // Remplacer par le modal de quiz
    replace(<QuizModal />);
  };

  const handleClose = () => {
    console.log("❌ Fermeture du modal");
    close();
  };

  return (
    <div className="text-center space-y-6">
      {/* Icône de succès simple */}
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Message de succès */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Vidéo terminée !</h2>
        <p className="text-lg text-gray-600">
          Vous avez gagné <span className="text-green-600 font-semibold">5 points</span> 🎉
        </p>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleClose}
          className="btn btn-ghost"
        >
          Fermer
        </button>
        <button
          onClick={handleStartQuiz}
          className="btn btn-primary btn-lg flex items-center gap-2"
        >
          <span className="text-lg">🧠</span>
          Lancer le quiz nutrition
        </button>
      </div>
    </div>
  );
}
