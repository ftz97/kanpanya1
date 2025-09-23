'use client';
import { useCallback, useEffect, useState } from 'react';
import type { ScratchReward, ScratchState } from '@/types/scratch';

const STORAGE_KEY = 'k-scratch';

function readStorage(): ScratchState {
  if (typeof window === 'undefined') return { available: false, used: true };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { available: false, used: true };
    const data = JSON.parse(raw) as ScratchState;
    return {
      available: Boolean(data.available),
      used: Boolean(data.used),
      reward: data.reward,
      ticketId: data.ticketId,
    };
  } catch {
    return { available: false, used: true };
  }
}

function writeStorage(next: ScratchState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function useScratchAvailability() {
  const [state, setState] = useState<ScratchState>(() => readStorage());

  const refresh = useCallback(() => {
    setState(readStorage());
  }, []);

  const activate = useCallback((opts: { quizId: string; points?: number; label?: string }) => {
    const reward: ScratchReward = { 
      type: 'points', 
      amount: opts.points ?? 50, 
      label: opts.label ?? `+${opts.points ?? 50} points` 
    };
    const next: ScratchState = { 
      available: true, 
      used: false, 
      reward,
      ticketId: opts.quizId
    };
    writeStorage(next);
    setState(next);
  }, []);

  const markUsed = useCallback(() => {
    const next: ScratchState = { ...state, available: false, used: true };
    writeStorage(next);
    setState(next);
  }, [state]);

  const clear = useCallback(() => {
    const next: ScratchState = { available: false, used: true };
    writeStorage(next);
    setState(next);
  }, []);

  return { state, activate, markUsed, clear, refresh };
}
