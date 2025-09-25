"use client";

import React, { useState } from "react";
import ScratchCardStableV3 from "@/components/scratch/ScratchCardStableV3";
import { SadEmojiRain, HappyEmojiRain, MoneyEmojiRain } from "@/components/EmojiRain";

export default function TestScratchWithEmojisPage() {
  const [threshold, setThreshold] = useState(0.4);
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);

  const handleReveal = (reward: { type: string; amount: number; merchant?: string }) => {
    console.log("🎉 RÉCOMPENSE RÉVÉLÉE:", reward);
    
    // Déclencher les animations selon le type de récompense
    if (reward.type === "points" && reward.amount >= 250) {
      setShowMoneyEmojis(true);
      setTimeout(() => setShowMoneyEmojis(false), 3000);
    } else if (reward.amount >= 100) {
      setShowHappyEmojis(true);
      setTimeout(() => setShowHappyEmojis(false), 3000);
    } else {
      setShowSadEmojis(true);
      setTimeout(() => setShowSadEmojis(false), 3000);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
            🎬 Test ScratchCard avec Emojis
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

              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setShowSadEmojis(true);
                    setTimeout(() => setShowSadEmojis(false), 3000);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  😔 Test Sad
                </button>
                <button
                  onClick={() => {
                    setShowHappyEmojis(true);
                    setTimeout(() => setShowHappyEmojis(false), 3000);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  🎉 Test Happy
                </button>
                <button
                  onClick={() => {
                    setShowMoneyEmojis(true);
                    setTimeout(() => setShowMoneyEmojis(false), 3000);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  💰 Test Money
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                🎫 ScratchCard Stable V3
              </h2>
              <ScratchCardStableV3
                threshold={threshold}
                goldenTicketChance={0.1}
                onReveal={handleReveal}
                userId="test-emojis"
              />
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">🎬 Instructions</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Grattez la carte</strong> pour révéler votre récompense</li>
              <li>• <strong>Observez les animations</strong> qui se déclenchent automatiquement</li>
              <li>• <strong>Testez les boutons</strong> pour voir les différentes animations</li>
              <li>• <strong>Adjustez le threshold</strong> pour contrôler la difficulté</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animations d'emojis */}
      {showSadEmojis && <SadEmojiRain count={40} isWinner={false} />}
      {showHappyEmojis && <HappyEmojiRain count={50} isWinner={true} />}
      {showMoneyEmojis && <MoneyEmojiRain count={60} isWinner={true} />}
    </>
  );
}

