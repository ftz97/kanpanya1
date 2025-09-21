"use client";

import { useCallback } from 'react';
import { useScratchState } from './useScratchState';

// Hook = actions pures pour scratch
export function useScratchActions() {
  const { state, activate, markUsed, clear } = useScratchState();

  const generateNewTicket = useCallback((points = 25) => {
    activate({ 
      quizId: 'test-' + Date.now(), 
      points, 
      label: `+${points} points` 
    });
  }, [activate]);

  const generateTestTicket = useCallback(() => {
    activate({ 
      quizId: 'test-quiz', 
      points: 50, 
      label: '+50 points' 
    });
  }, [activate]);

  const markTicketAsUsed = useCallback(() => {
    markUsed();
  }, [markUsed]);

  const clearAllTickets = useCallback(() => {
    clear();
  }, [clear]);

  return {
    state,
    generateNewTicket,
    generateTestTicket,
    markTicketAsUsed,
    clearAllTickets,
  };
}
