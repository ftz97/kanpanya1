'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type ModalAPI = {
  open: (node: React.ReactNode) => void;
  replace: (node: React.ReactNode) => void;
  close: () => void;
};

type ModalState = {
  node: React.ReactNode | null;
  key: number; // force remount
  isOpen: boolean;
};

const ModalCtx = createContext<ModalAPI | null>(null);
const MODAL_DEV_GUARD = typeof window !== 'undefined' ? (window as any).__KANPANYA_MODAL__ : undefined;

export function ModalProvider({ children }: { children: React.ReactNode }) {
  // Déclarer tous les hooks EN PREMIER (avant toute condition)
  const [state, setState] = useState<ModalState>({ node: null, key: 0, isOpen: false });
  const replacingRef = useRef(false);

  const open = useCallback((node: React.ReactNode) => {
    console.log('🔄 ModalManager.open appelé avec:', node);
    setState(s => ({ node, key: s.key + 1, isOpen: true }));
  }, []);

  const replace = useCallback((node: React.ReactNode) => {
    if (replacingRef.current) return;
    console.log('🔄 ModalManager.replace appelé avec:', node);
    replacingRef.current = true;
    // Force remount pour éviter états résiduels
    setState(s => ({ node, key: s.key + 1, isOpen: true }));
    // Libère le flag au prochain frame
    requestAnimationFrame(() => { replacingRef.current = false; });
  }, []);

  const close = useCallback(() => {
    console.log('🔄 ModalManager.close appelé');
    setState({ node: null, key: 0, isOpen: false });
  }, []);

  const api = useMemo<ModalAPI>(() => ({ open, replace, close }), [open, replace, close]);

  // Évite double Provider en dev/hot-reload (APRÈS les hooks)
  if (typeof window !== 'undefined') {
    if (MODAL_DEV_GUARD && process.env.NODE_ENV !== 'production') {
      console.warn('[ModalProvider] Duplicate provider detected — keeping single instance.');
      return <>{children}</>;
    }
    (window as any).__KANPANYA_MODAL__ = true;
  }

  // Expose pour le ModalRoot via custom event (optionnel)
  (typeof window !== 'undefined') && ((window as any).__KANPANYA_MODAL_STATE__ = state);

  return (
    <ModalCtx.Provider value={api}>
      {children}
    </ModalCtx.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error('useModal must be used inside <ModalProvider>');
  return ctx;
}
