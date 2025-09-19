"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import SadEmojiRain from "./SadEmojiRain";
import HappyEmojiRain from "./HappyEmojiRain";
import MoneyEmojiRain from "./MoneyEmojiRain";

// ⚠️ Import dynamique (désactive SSR pour éviter le bug Next.js)
const ScratchCard = dynamic(() => import("react-scratchcard-v2"), { ssr: false });

type Reward = { type: "points" | "gift"; amount: number; label: string };

export default function ScratchCardComponent({
  reward,
  onReveal,
}: {
  reward: Reward;
  onReveal?: () => void;
}) {
  // États pour les animations d'emojis
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);
  
  // Configuration des emojis
  const emojiConfig = {
    count: 20,
    speedConfig: { duration: 3, delay: 1.5 }
  };

  const settings = {
    width: 320,
    height: 200,
    image: "/scratch-overlay.png", // ✅ image dans /public
    finishPercent: 50,
    onComplete: () => {
      console.log("🎉 Scratch terminé :", reward.label);
      
      // Animation confettis
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
      // Déclencher les animations d'emojis selon le type de récompense
      if (reward.type === "gift" || reward.amount >= 50) {
        // Gros gain = emojis d'argent
        setShowMoneyEmojis(true);
        setTimeout(() => setShowMoneyEmojis(false), 5000);
      } else if (reward.amount > 0) {
        // Petit gain = emojis heureux
        setShowHappyEmojis(true);
        setTimeout(() => setShowHappyEmojis(false), 5000);
      } else {
        // Pas de gain = emojis tristes
        setShowSadEmojis(true);
        setTimeout(() => setShowSadEmojis(false), 5000);
      }
      
      onReveal?.();
    },
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow relative text-center">
      <p className="text-gray-600 mb-4">Grattez pour découvrir !</p>
      <ScratchCard {...settings}>
        <div className="w-full h-full flex items-center justify-center bg-white rounded-xl shadow">
          <p className="text-xl font-bold text-teal-600">{reward.label}</p>
        </div>
      </ScratchCard>
      
      {/* Animations d'emojis */}
      {showSadEmojis && <SadEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
      {showHappyEmojis && <HappyEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
      {showMoneyEmojis && <MoneyEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
    </div>
  );
}