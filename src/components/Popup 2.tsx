"use client";
import React from "react";

type PopupVariant =
  | "rect"
  | "carre"
  | "banniere"
  | "header"
  | "cercle"
  | "luxe"
  | "glass";

interface PopupProps {
  variant: PopupVariant;
  title: string;
  message: string;
  onClose: () => void;
}

// Définir les dégradés
const gradients = [
  "from-cyan-200 via-sky-300 to-blue-400",   // bleu lagon
  "from-pink-200 via-rose-300 to-orange-300",// corail
  "from-green-200 via-emerald-300 to-teal-400", // vert menthe
  "from-purple-200 via-indigo-300 to-blue-400", // violet doux
  "from-yellow-200 via-orange-200 to-pink-200", // pêche pastel
];

// Ajouter le Golden Ticket
const goldenTicket = "from-yellow-300 via-yellow-400 to-yellow-500";

// Sélection aléatoire avec rareté
function getRandomGradient() {
  const chance = Math.random();
  if (chance < 0.1) {
    return { gradient: goldenTicket, isGolden: true };
  }
  return {
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    isGolden: false,
  };
}

export default function Popup({ variant, title, message, onClose }: PopupProps) {
  if (variant === "rect") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-80 p-6 rounded-2xl shadow-xl text-center bg-white text-gray-900">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm mt-2">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Fermer
        </button>
      </div>
    );
  }

  if (variant === "carre") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-72 h-72 rounded-3xl shadow-xl flex flex-col justify-center items-center bg-white text-gray-900">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm mt-2">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition"
        >
          Fermer
        </button>
      </div>
    );
  }

  if (variant === "banniere") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[360px] h-[160px] rounded-2xl shadow-xl flex items-center bg-white p-4">
        <div className="flex-1 flex justify-center text-4xl">🎉</div>
        <div className="flex-[2] text-left">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{message}</p>
          <button 
            onClick={onClose} 
            className="mt-3 px-3 py-1 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-80 rounded-xl shadow-xl overflow-hidden bg-white">
        <div className="bg-yellow-400 text-gray-900 font-bold text-center py-2">{title}</div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-700">{message}</p>
          <button 
            onClick={onClose} 
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  if (variant === "cercle") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-64 h-64 rounded-full shadow-2xl bg-white
        flex flex-col justify-center items-center text-center">
        <div className="text-5xl mb-2">💎</div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-3 px-4 py-1 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
        >
          Fermer
        </button>
      </div>
    );
  }

  if (variant === "luxe") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-80 p-6 rounded-xl shadow-xl text-center bg-white border-t-4 border-yellow-400">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-500 transition"
        >
          Fermer
        </button>
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-80 p-6 rounded-2xl shadow-xl text-center bg-white
        backdrop-blur-xl border border-white/30">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700 mt-1">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Fermer
        </button>
      </div>
    );
  }

  return null;
}
