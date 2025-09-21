'use client';
import React, {createContext, useContext, useCallback, useEffect, useState} from 'react';
import { useCallback } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // shadcn/radix
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { usePathname } from 'next/navigation';

type ModalNode = React.ReactNode;
type Ctx = {
  open: (content: ModalNode) => void;
  replace: (content: ModalNode) => void;
  close: () => void;
  isOpen: boolean;
};

const ModalCtx = createContext<Ctx | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ModalNode | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setContent(null), []);
  const open = useCallback((node: ModalNode) => {
    // 🔥 Drastic: kill anything already open, then open the new one
    setContent(null);
    // next tick to ensure unmount
    requestAnimationFrame(() => setContent(node));
  }, []);
  const replace = useCallback((node: ModalNode) => {
    if (isReplacing) return; // évite un double replace le même tick
    console.log("🔄 ModalManager.replace appelé avec:", node);
    console.log("🔄 Contenu actuel avant remplacement:", content);
    setIsReplacing(true);
    setContent(node);
    console.log("🔄 Contenu défini, nouveau contenu:", node);
    requestAnimationFrame(() => setIsReplacing(false));
  }, [isReplacing, content]);

  // Close on route change
  useEffect(() => { setContent(null); }, [pathname]);

  // Log quand le contenu change
  useEffect(() => {
    console.log("📝 ModalManager: contenu changé vers:", content);
  }, [content]);

  // Scroll lock while open
  useEffect(() => {
    if (content) {
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [content]);

  return (
    <ModalCtx.Provider value={{ open, replace, close, isOpen: !!content }}>
      {children}
      <Dialog open={!!content} onOpenChange={(o)=>!o && close()} modal>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
          <DialogContent
            className="fixed left-1/2 top-1/2 z-[99999] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,720px)] rounded-2xl bg-white p-6 shadow-2xl outline-none"
          >
            <DialogTitle asChild>
              <VisuallyHidden>Modal</VisuallyHidden>
            </DialogTitle>
            <DialogDescription asChild>
              <VisuallyHidden>Contenu du modal</VisuallyHidden>
            </DialogDescription>
            {content}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </ModalCtx.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error('useModal must be used inside <ModalProvider>');
  return ctx;
}
