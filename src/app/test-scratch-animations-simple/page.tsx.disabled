"use client";

import React, { useState } from "react";
import ScratchCardStableV3WithAnimations from "@/components/scratch/ScratchCardStableV3WithAnimations";

export default function TestScratchAnimationsSimplePage() {
  const [threshold, setThreshold] = useState(0.4);
  const [enableAdvancedAnimations, setEnableAdvancedAnimations] = useState(true);

  const handleReveal = (reward: { type: string; amount: number; merchant?: string }) => {
    console.log("🎉 RÉCOMPENSE RÉVÉLÉE:", reward);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          🎬 Test ScratchCard avec Animations
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Contrôles</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Threshold: {(threshold * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="animations"
                checked={enableAdvancedAnimations}
                onChange={(e) => setEnableAdvancedAnimations(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="animations" className="text-sm font-medium text-gray-700">
                Activer les animations avancées
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              🎫 ScratchCard avec Animations
            </h2>
            <ScratchCardStableV3WithAnimations
              threshold={threshold}
              goldenTicketChance={0.1}
              onReveal={handleReveal}
              userId="test-animations-simple"
              enableAdvancedAnimations={enableAdvancedAnimations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
