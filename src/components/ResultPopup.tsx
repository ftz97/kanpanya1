"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ResultPopup({
  won,
  visible,
  prize,
}: {
  won: boolean;
  visible: boolean;
  prize: string;
}) {
  const [count, setCount] = useState(0);

  // compteur qui monte
  useEffect(() => {
    if (visible && won && prize.includes("points")) {
      const value = parseInt(prize.match(/\d+/)?.[0] || "0");
      let i = 0;
      const interval = setInterval(() => {
        i += 5;
        if (i >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(i);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [visible, won, prize]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 90, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`mt-4 px-6 py-4 rounded-2xl shadow-xl text-center font-bold text-lg border-4 transform-gpu ${
        won
          ? "border-yellow-400 text-white bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 animate-gradient-x"
          : "border-gray-400 text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-600"
      }`}
    >
      <div className="flex items-center justify-center gap-2 text-xl mb-2">
        {won ? "🎁" : "💔"}
        {won ? "Carte Collector !" : "Pas de chance..."}
      </div>

      {won && prize.includes("points") ? (
        <div className="text-2xl">
          +{count} points
        </div>
      ) : (
        <div className="text-base">{prize}</div>
      )}
    </motion.div>
  );
}