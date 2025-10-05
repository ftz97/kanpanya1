"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const actus = [
  { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
  { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
  { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
  { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
];

export default function ActusPile() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % actus.length);
  const prev = () => setIndex((prev) => (prev - 1 + actus.length) % actus.length);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-lg font-bold text-slate-900 mb-4">📰 Actus commerçants</h2>

      <div className="relative w-80 h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <span>📌</span>
              <span className="font-semibold text-sm">{actus[index].merchant}</span>
            </div>
            <p className="font-bold text-lg mb-2">{actus[index].title}</p>
            <p className="text-sm text-gray-700">{actus[index].desc}</p>
            <button
              onClick={next}
              className="mt-auto bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Suivant →
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          ← Précédent
        </button>
        <button onClick={next} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Suivant →
        </button>
      </div>
    </section>
  );
}
