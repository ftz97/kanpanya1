"use client";
import { useState } from "react";

interface ScratchTicketCardProps {
  initialTickets?: number;
  onTicketUsed?: (remainingTickets: number) => void;
  className?: string;
}

export default function ScratchTicketCard({ 
  initialTickets = 3, 
  onTicketUsed,
  className = "" 
}: ScratchTicketCardProps) {
  const [tickets, setTickets] = useState(initialTickets);

  const handleTicketUse = () => {
    const newTickets = Math.max(tickets - 1, 0);
    setTickets(newTickets);
    onTicketUsed?.(newTickets);
  };

  return (
    <div className={`relative max-w-md mx-auto mt-6 ${className}`}>
      {/* Carte principale */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-md p-6 text-center relative">
        <h2 className="text-lg font-bold flex items-center justify-center gap-2 text-[#212E40]">
          ✨🎟 Gratte ton ticket ✨
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Gratte pour découvrir ta récompense 🎁
        </p>

        {/* Badge flottant (haut droite) */}
        {tickets > 0 ? (
          <span
            className="absolute -top-2 -right-2 bg-[#17BFA0] text-white text-xs font-bold 
            px-2 py-1 rounded-full shadow-lg animate-bounce"
          >
            {tickets}
          </span>
        ) : (
          <span
            className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs font-bold 
            px-2 py-1 rounded-full shadow-lg"
          >
            🔒 0
          </span>
        )}
      </div>

      {/* Bouton pour utiliser un ticket */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleTicketUse}
          disabled={tickets === 0}
          className={`px-4 py-2 rounded-xl shadow transition ${
            tickets > 0
              ? "bg-[#17BFA0] text-white hover:bg-[#14a58d]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {tickets > 0 ? "Utiliser un ticket" : "Plus de tickets"}
        </button>
      </div>
    </div>
  );
}
