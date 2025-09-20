"use client";

import ScratchCard from "@/components/ScratchCard";
import { useScratchAvailability } from "@/hooks/useScratchAvailability";

interface ScratchSectionProps {
  isClient: boolean;
}

export default function ScratchSection({ isClient }: ScratchSectionProps) {
  const { state, markUsed } = useScratchAvailability();

  if (isClient && state.available && !state.used) {
    return (
      <div id="scratch-section" className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🎫</span>
            <h3 className="text-lg sm:text-xl font-semibold">Ticket à gratter disponible</h3>
          </div>
          <div className="flex justify-center">
            <ScratchCard
              reward={state.reward ? {
                type: state.reward.type,
                amount: state.reward.type === 'points' ? state.reward.amount : 0,
                label: state.reward.label ?? 'Récompense surprise'
              } : { type: 'points', amount: 10, label: '+10 points' }}
              onReveal={() => {
                setTimeout(() => markUsed(), 800);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <div className="animate-pulse text-gray-400">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="text-gray-700 font-medium text-sm sm:text-base">Pas de ticket pour le moment</div>
        <div className="text-gray-500 text-xs sm:text-sm">Termine un quiz pour débloquer un nouveau ticket à gratter.</div>
      </div>
    </div>
  );
}
