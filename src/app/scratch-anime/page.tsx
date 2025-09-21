"use client";
import { useState } from "react";
import ScratchCard from "@/components/ScratchCard";

export default function ScratchAnimePage() {
  const [currentReward, setCurrentReward] = useState(0);
  
  // Différentes récompenses pour tester les animations
  const rewards = [
    { type: "points" as const, amount: 0, label: "Pas de gain cette fois..." },
    { type: "points" as const, amount: 20, label: "+20 points bonus !" },
    { type: "points" as const, amount: 75, label: "+75 points jackpot !" },
    { type: "gift" as const, amount: 100, label: "🎁 Cadeau surprise !" },
  ];

  const nextReward = () => {
    setCurrentReward((prev) => (prev + 1) % rewards.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          🎫 Carte de Scratch avec Animations
        </h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Grattez la carte pour voir les animations d&apos;emojis !
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-6">
            <button
              onClick={nextReward}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              🎲 Changer la récompense
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Récompense actuelle :</h3>
            <p className="text-xl text-teal-600 font-bold">
              {rewards[currentReward].label}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {rewards[currentReward].type} | Montant: {rewards[currentReward].amount}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <ScratchCard
            reward={rewards[currentReward]}
            onReveal={() => {
              console.log("Récompense révélée !");
            }}
          />
        </div>

        <div className="mt-8 bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Comment ça marche :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">😢</div>
              <p className="font-medium">Pas de gain</p>
              <p className="text-gray-500">Emojis tristes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="font-medium">Petit gain</p>
              <p className="text-gray-500">Emojis heureux</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰💎🤑</div>
              <p className="font-medium">Gros gain</p>
              <p className="text-gray-500">Emojis d&apos;argent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
