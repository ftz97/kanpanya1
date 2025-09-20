"use client";
import { motion } from "framer-motion";

export default function PrizeToast({
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
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 
        rounded-2xl shadow-lg backdrop-blur-md bg-white/80 border 
        ${won ? "border-yellow-400" : "border-gray-400"} z-[9999]`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{won ? "🎁" : "💔"}</span>
        <div>
          <p className="font-bold text-gray-800">
            {won ? "Récompense !" : "Pas de chance"}
          </p>
          <p className="text-sm text-gray-600">{prize}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>
    </motion.div>
  );
}
