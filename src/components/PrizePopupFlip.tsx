"use client";
import { motion } from "framer-motion";

export default function PrizePopupFlip({
  visible,
  won,
  prize,
  onClose,
}: {
  visible: boolean;
  won: boolean;
  prize: string;
  onClose: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative w-80 rounded-2xl shadow-2xl p-6 text-center transform-gpu
          ${won
            ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900 border-4 border-yellow-500"
            : "bg-gradient-to-r from-red-500 via-rose-600 to-red-700 text-white border-4 border-gray-400"}
        `}
      >
        <div className="text-5xl mb-3">{won ? "🎁" : "💔"}</div>
        <h2 className="text-2xl font-bold mb-2">
          {won ? "Félicitations !" : "Pas de chance..."}
        </h2>
        <p className="text-lg font-semibold">{prize}</p>
        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 rounded-lg bg-white/80 text-gray-800 font-bold shadow hover:scale-105 transition"
        >
          Continuer
        </button>
      </motion.div>
    </div>
  );
}
