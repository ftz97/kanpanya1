"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TicketsResponsive() {
  const [tickets, setTickets] = useState(3);
  const [showPopup, setShowPopup] = useState(false);
  const [justHitZero, setJustHitZero] = useState(false);

  useEffect(() => {
    if (tickets === 0) {
      setJustHitZero(true);
      const timer = setTimeout(() => setJustHitZero(false), 800);
      return () => clearTimeout(timer);
    }
  }, [tickets]);

  return (
    <div className="flex items-center gap-4">
      {/* Desktop : bouton distinct */}
      <motion.button
        onClick={() => setShowPopup(true)}
        className={`hidden sm:flex px-4 py-1.5 rounded-full text-sm font-medium items-center gap-2 shadow transition ${
          tickets > 1
            ? "bg-emerald-500 text-white"
            : tickets === 1
            ? "bg-yellow-500 text-white"
            : "bg-gray-400 text-white"
        }`}
        animate={
          tickets > 0
            ? { scale: [1, 1.05, 1] }
            : justHitZero
            ? { x: [-5, 5, -5, 0] }
            : {}
        }
        transition={{
          duration: tickets > 0 ? 1.5 : 0.4,
          repeat: tickets > 0 ? Infinity : 0,
        }}
      >
        🎟 Tickets {tickets > 0 ? tickets : "🔒"}
      </motion.button>

      {/* Mobile : icône animée */}
      <motion.div
        className="sm:hidden cursor-pointer px-4 py-1.5 rounded-full border text-sm font-medium"
        onClick={() => setShowPopup(true)}
        animate={
          tickets > 0
            ? { y: [0, -6, 0] }
            : justHitZero
            ? { x: [-5, 5, -5, 0] }
            : { opacity: 0.5 }
        }
        transition={{
          duration: tickets > 0 ? 0.6 : 0.4,
          repeat: tickets > 0 ? Infinity : 0,
        }}
      >
        🎟 {tickets > 0 ? tickets : "0"}
      </motion.div>

      {/* Popup tickets (indépendant du popup existant) */}
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
