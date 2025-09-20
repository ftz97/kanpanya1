"use client";

import { ScratchCardUI } from './ScratchCardUI';
import { useScratchCard } from '../../logic/hooks/useScratchCard';

interface ScratchCardContainerProps {
  reward?: {
    type: string;
    amount: number;
    label: string;
  };
  onReveal?: () => void;
}

// Conteneur = orchestration UI + Logique
export function ScratchCardContainer({ reward, onReveal }: ScratchCardContainerProps) {
  const {
    isRevealed,
    showModal,
    progress,
    handleReveal,
    handleProgress,
    handleCloseModal,
    handleReplay,
  } = useScratchCard();

  const handleRevealWithCallback = () => {
    handleReveal(reward);
    onReveal?.();
  };

  return (
    <ScratchCardUI
      reward={reward}
      isRevealed={isRevealed}
      showModal={showModal}
      progress={progress}
      onReveal={handleRevealWithCallback}
      onProgress={handleProgress}
      onCloseModal={handleCloseModal}
      onReplay={handleReplay}
    />
  );
}
