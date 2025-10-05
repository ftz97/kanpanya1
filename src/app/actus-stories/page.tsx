"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const actus = [
  { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
  { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
  { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
  { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
];

export default function ActusStories() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % actus.length);
  const prev = () => setIndex((prev) => (prev - 1 + actus.length) % actus.length);

  return (
    <section className="relative w-full h-screen bg-gray-100 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl shadow-lg p-8 w-80 h-[70%] flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span>📌</span>
              <span className="font-semibold text-sm">{actus[index].merchant}</span>
            </div>
            <p className="font-bold text-xl mb-2">{actus[index].title}</p>
            <p className="text-sm text-gray-700 flex-1">{actus[index].desc}</p>
            <p className="mt-4 text-right text-slate-600 text-sm">→ Découvrir</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contrôles swipe-like */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-6">
        <button onClick={prev} className="bg-gray-200 px-4 py-2 rounded-lg">⬆️</button>
        <button onClick={next} className="bg-gray-200 px-4 py-2 rounded-lg">⬇️</button>
      </div>
    </section>
  );
}
