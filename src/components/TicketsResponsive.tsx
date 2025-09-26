"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TicketsResponsiveProps {
  tickets: number;
  onTicketClick: () => void;
}

export default function TicketsResponsive({ tickets, onTicketClick }: TicketsResponsiveProps) {
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
        onClick={onTicketClick}
        className={`hidden sm:flex px-4 py-1.5 rounded-full text-sm font-medium items-center gap-2 shadow transition ${
          tickets > 1
            ? "bg-pink-500 text-white hover:bg-pink-600"
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
        className="sm:hidden cursor-pointer px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm text-sm font-medium hover:bg-gray-50 active:scale-95 transition"
        onClick={onTicketClick}
        animate={
          tickets > 0
            ? { 
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0]
              }
            : justHitZero
            ? { x: [-5, 5, -5, 0] }
            : { opacity: 0.5 }
        }
        transition={{
          duration: tickets > 0 ? 1.2 : 0.4,
          repeat: tickets > 0 ? Infinity : 0,
        }}
      >
        🎟 {tickets > 0 ? tickets : ""}
      </motion.div>
    </div>
  );
}
