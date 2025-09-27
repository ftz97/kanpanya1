"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TicketsTestPage() {
  const [tickets, setTickets] = useState(3);
  const [showPopup, setShowPopup] = useState(false);
  const [justHitZero, setJustHitZero] = useState(false);

  // Détection du passage à zéro
  useEffect(() => {
    if (tickets === 0) {
      setJustHitZero(true);
      const timer = setTimeout(() => setJustHitZero(false), 800);
      return () => clearTimeout(timer);
    }
  }, [tickets]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4">🎟 Page Test Tickets</h1>

      {/* NAVBAR SIMPLIFIÉE */}
      <div className="flex items-center gap-6 bg-white shadow rounded-full px-6 py-3 w-fit">

        {/* --- Option 1 : Icône ticket à côté de Récompenses --- */}
        <motion.button
          onClick={() => setShowPopup(true)}
          animate={justHitZero ? { x: [-5, 5, -5, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
        >
          🎁 Récompenses
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              tickets > 0 ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {tickets > 0 ? `🎟 ${tickets}` : "🔒 0"}
          </span>
        </motion.button>

        {/* --- Option 2 : Badge flottant sur Récompenses --- */}
        <div className="relative">
          <motion.button
            onClick={() => setShowPopup(true)}
            animate={justHitZero ? { x: [-5, 5, -5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="px-4 py-1.5 rounded-full border text-sm font-medium"
          >
            🎁 Récompenses
          </motion.button>
          {tickets > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              {tickets}
            </motion.span>
          )}
        </div>

        {/* --- Option 3 : Bouton ticket distinct --- */}
        <motion.button
          onClick={() => setShowPopup(true)}
          animate={
            tickets > 0
              ? { scale: [1, 1.1, 1] }
              : justHitZero
              ? { x: [-5, 5, -5, 0] }
              : {}
          }
          transition={{ duration: 0.6, repeat: tickets > 0 ? Infinity : 0 }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow ${
            tickets > 1
              ? "bg-emerald-500 text-white"
              : tickets === 1
              ? "bg-yellow-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          🎟 Tickets {tickets > 0 ? tickets : "🔒"}
        </motion.button>

        {/* --- Option 4 : Icône ticket animée --- */}
        <motion.div
          className="cursor-pointer px-4 py-1.5 rounded-full border text-sm font-medium"
          onClick={() => setShowPopup(true)}
          animate={
            tickets > 0
              ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
              : justHitZero
              ? { x: [-5, 5, -5, 0] }
              : { opacity: 0.5 }
          }
          transition={{ duration: 1.2, repeat: tickets > 0 ? Infinity : 0 }}
        >
          🎟 {tickets > 0 ? tickets : "0"}
        </motion.div>
      </div>

      {/* --- POPUP --- */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-lg font-bold mb-2">🎟 Gratte ton ticket</h2>
              <p className="text-sm text-gray-600 mb-4">
                Tu as encore <b>{tickets}</b> ticket(s).
              </p>

              {tickets > 0 ? (
                <button
                  onClick={() => setTickets((prev) => Math.max(prev - 1, 0))}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-xl shadow hover:bg-emerald-600 transition"
                >
                  Utiliser un ticket
                </button>
              ) : (
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-xl shadow cursor-not-allowed"
                  disabled
                >
                  Plus de tickets
                </button>
              )}

              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

