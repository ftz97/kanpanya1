"use client";

import React, { useState, useRef } from "react";
import VideoModalSimple from "./VideoModalSimple";
import VideoEndModal from "./VideoEndModal";
import QuizModal from "./QuizModal";

type ActiveModal = 'video' | 'video-end' | 'quiz' | null;

interface OfferFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoEnd?: () => void;
  onStartQuiz?: () => void;
  onQuizComplete?: (result: { score: number; total: number; points: number }) => void;
}

export default function OfferFlow({ 
  isOpen, 
  onClose, 
  onVideoEnd, 
  onStartQuiz, 
  onQuizComplete 
}: OfferFlowProps) {
  const [active, setActive] = useState<ActiveModal>(null);
  const didInit = useRef(false);

  // Initialiser le modal video quand OfferFlow s'ouvre
  React.useEffect(() => {
    if (isOpen && !didInit.current) {
      didInit.current = true;
      setActive('video');
    } else if (!isOpen) {
      didInit.current = false;
      setActive(null);
    }
  }, [isOpen]);

  // Fonction pour passer au modal suivant avec délai d'animation
  const nextModal = (modal: ActiveModal) => {
    setActive(null);
    setTimeout(() => setActive(modal), 200); // 200ms pour laisser l'animation de fermeture
  };

  // Handlers pour chaque modal
  const handleVideoEnd = () => {
    onVideoEnd?.();
    nextModal('video-end');
  };

  const handleStartQuiz = () => {
    onStartQuiz?.();
    nextModal('quiz');
  };

  const handleQuizComplete = (result: { score: number; total: number; points: number }) => {
    onQuizComplete?.(result);
    // Fermer complètement le flow après le quiz
    setActive(null);
    setTimeout(() => onClose(), 200);
  };

  const handleClose = () => {
    setActive(null);
    setTimeout(() => onClose(), 200);
  };

  // Ne rien afficher si OfferFlow n'est pas ouvert
  if (!isOpen) return null;

  return (
    <>
      {/* Video Modal */}
      <VideoModalSimple
        isOpen={active === 'video'}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
        onVideoEnd={handleVideoEnd}
        onStartQuiz={handleStartQuiz}
      />

      {/* Video End Modal */}
      <VideoEndModal
        isOpen={active === 'video-end'}
        onClose={() => nextModal('quiz')}
        onStartQuiz={handleStartQuiz}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={active === 'quiz'}
        onClose={handleClose}
        onComplete={handleQuizComplete}
      />
    </>
  );
}
