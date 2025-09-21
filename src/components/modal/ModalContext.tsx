'use client';
import React, { createContext, useContext, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalNode = React.ReactNode;

interface ModalContextType {
  open: (content: ModalNode) => void;
  replace: (content: ModalNode) => void;
  close: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal doit être utilisé à l\'intérieur d\'un <ModalProvider>');
  }
  return context;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [content, setContent] = useState<ModalNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);
  const isReplacingRef = useRef(false);

  const close = useCallback(() => {
    console.log('🔒 Modal fermé');
    setContent(null);
    setIsOpen(false);
  }, []);

  const open = useCallback((node: ModalNode) => {
    console.log('🔓 Modal ouvert avec:', node);
    setContent(node);
    setIsOpen(true);
    setKey(prev => prev + 1); // Force remount pour éviter les conflits
  }, []);

  const replace = useCallback((node: ModalNode) => {
    if (isReplacingRef.current) {
      console.log('⚠️ Replace ignoré - déjà en cours');
      return;
    }
    
    console.log('🔄 Modal remplacé par:', node);
    isReplacingRef.current = true;
    setContent(node);
    setKey(prev => prev + 1); // Force remount propre
    
    // Reset le flag après le prochain tick
    requestAnimationFrame(() => {
      isReplacingRef.current = false;
    });
  }, []);

  const contextValue: ModalContextType = {
    open,
    replace,
    close,
    isOpen
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalRoot 
        isOpen={isOpen} 
        content={content} 
        onClose={close}
        key={key}
      />
    </ModalContext.Provider>
  );
}

interface ModalRootProps {
  isOpen: boolean;
  content: ModalNode | null;
  onClose: () => void;
  key: number;
}

function ModalRoot({ isOpen, content, onClose, key }: ModalRootProps) {
  const [mounted, setMounted] = useState(false);

  React.
const stableSetMounted = useCallback(() => {
  setMounted();
}, [setMounted]);

const stableSetMounted = useCallback(() => {
  setMounted();
}, [setMounted]);

useEffect(() => {
  stableSetMounted();
  stableSetMounted();
}, [stableSetMounted, stableSetMounted]);;

  React.useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  React.useEffect(() => {
    console.log('📝 ModalRoot: contenu changé vers:', content);
  }, [content]);

  if (!mounted || !isOpen || !content) {
    return null;
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative z-[10000] w-[min(92vw,720px)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );

  // Portal vers le body pour éviter les problèmes de z-index
  return createPortal(modalContent, document.body);
}
