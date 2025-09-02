"use client";

import * as React from "react";
import { useModal } from "@/components/modal/ModalManager";

export default function VideoEndModal() {
  const { replace, close } = useModal();
  
  React.useEffect(() => {
    console.log("🎉 VideoEndModal chargé et rendu");
  }, []);

  const handleStartQuiz = () => {
    console.log("🧠 Démarrage du quiz - remplacement par QuizModal");
    // Pour l'instant, on va juste fermer le modal
    close();
  };

  const handleClose = () => {
    console.log("❌ Fermeture du modal");
    close();
  };

  return (
    <div className="text-center space-y-6 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Vidéo terminée !</h2>
      <p className="text-lg text-gray-600">
        Vous avez gagné <span className="text-green-600 font-semibold">5 points</span> 🎉
      </p>
      
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Fermer
        </button>
        <button
          onClick={handleStartQuiz}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lancer le quiz nutrition
        </button>
      </div>
    </div>
  );
}
