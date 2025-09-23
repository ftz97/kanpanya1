"use client";

import { useState, useEffect, useCallback } from 'react';
import { ScratchState } from '../types';

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

function writeStorage(state: ScratchState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useScratchState() {
  const [state, setState] = useState<ScratchState>(() => readStorage());

  useEffect(() => {
    // Synchronisation entre onglets
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const activate = useCallback((opts: { quizId: string; points?: number; label?: string }) => {
    const reward = { 
      type: 'points' as const, 
      amount: opts.points ?? 50, 
      label: opts.label ?? `+${opts.points ?? 50} points` 
    };
    const newState: ScratchState = { 
      available: true, 
      used: false, 
      reward,
      ticketId: opts.quizId
    };
    writeStorage(newState);
    setState(newState);
  }, []);

  const markUsed = useCallback(() => {
    const newState: ScratchState = { ...state, available: false, used: true };
    writeStorage(newState);
    setState(newState);
  }, [state]);

  const clear = useCallback(() => {
    const newState: ScratchState = { available: false, used: true };
    writeStorage(newState);
    setState(newState);
  }, []);

  const refresh = useCallback(() => {
    setState(readStorage());
  }, []);

  return { 
    state, 
    activate, 
    markUsed, 
    clear, 
    refresh 
  };
}
