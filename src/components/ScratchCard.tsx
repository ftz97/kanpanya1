"use client";

import React from "react";
import ScratchCardStableV3 from "@/components/scratch/ScratchCardStableV3";

// Interface pour la compatibilité avec l'ancien ScratchCard
interface ScratchCardProps {
  reward: {
    type: string;
    amount: number;
    label: string;
  };
  onReveal: () => void;
}

// Composant de compatibilité qui utilise ScratchCardStableV3
export default function ScratchCard({ reward, onReveal }: ScratchCardProps) {
  return (
    <ScratchCardStableV3
      threshold={0.4}
      goldenTicketChance={0.1}
      userId="compatibility-user"
      onReveal={(newReward) => {
        console.log("🎉 Récompense révélée (compatibilité):", newReward);
        onReveal();
      }}
    />
  );
}

// Export nommé pour la compatibilité
export { ScratchCard };
