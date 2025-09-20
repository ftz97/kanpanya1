"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  open: (modal: ReactNode) => void;
  close: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (modalContent: ReactNode) => {
    setModal(modalContent);
    setIsOpen(true);
  };

  const close = () => {
    setModal(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <button
              onClick={close}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {modal}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}