"use client";
import { motion } from "framer-motion";

export default function PrizePopupSlide({
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
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15, // petit rebond
        }}
        className={`rounded-2xl shadow-2xl p-6 text-center w-80 
          ${won
            ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900"
            : "bg-gradient-to-r from-red-500 to-red-700 text-white"}
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