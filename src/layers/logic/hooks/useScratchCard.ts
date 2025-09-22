"use client";

import { useState, useCallback } from 'react';
import { useScratchState } from './useScratchState';
import { ScratchService } from '../../data/services/ScratchService';

// Hook = logique pure de la scratch card
export function useScratchCard() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { state, markUsed } = useScratchState();
  const scratchService = new ScratchService();

  const handleReveal = useCallback(async (reward?: any) => {
    setIsRevealed(true);
    setShowModal(true);
    
    if (reward) {
      await scratchService.saveScratchResult({
        userId: 'current-user',
        reward: {
          type: reward.type as 'points' | 'coupon',
          amount: reward.amount,
          label: reward.label,
        },
        isWinner: true,
      });
    }
    
    markUsed();
  }, [markUsed, scratchService]);

  const handleProgress = useCallback((newProgress: number) => {
    setProgress(newProgress);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleReplay = useCallback(() => {
    setShowModal(false);
    setIsRevealed(false);
    setProgress(0);
    window.location.reload();
  }, []);

  return {
    isRevealed,
    showModal,
    progress,
    state,
    handleReveal,
    handleProgress,
    handleCloseModal,
    handleReplay,
  };
}
