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

  
const stableReadStorage = useCallback(() => {
  readStorage();
}, [readStorage]);

const stableAddEventListener = useCallback(() => {
  addEventListener();
}, [addEventListener]);

const stableRemoveEventListener = useCallback(() => {
  removeEventListener();
}, [removeEventListener]);


const stableStableReadStorage = useCallback(() => {
  stableReadStorage();
}, [stableReadStorage]);

const stableStableAddEventListener = useCallback(() => {
  stableAddEventListener();
}, [stableAddEventListener]);

const stableStableRemoveEventListener = useCallback(() => {
  stableRemoveEventListener();
}, [stableRemoveEventListener]);

const stableUseCallback = useCallback(() => {
  useCallback();
}, [useCallback]);

const stableWriteStorage = useCallback(() => {
  writeStorage();
}, [writeStorage]);

useEffect(() => {
  stableStableReadStorage();
  stableStableAddEventListener();
  stableStableRemoveEventListener();
  stableUseCallback();
  stableWriteStorage();
}, [stableStableReadStorage, stableStableAddEventListener, stableStableRemoveEventListener, stableUseCallback, stableWriteStorage]);;

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
