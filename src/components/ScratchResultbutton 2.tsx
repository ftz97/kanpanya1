"use client";

import { useCallback, useState } from "react";
import { startEmojiRain, emojiBurst } from "@/lib/emojiRain";

type SpeedPreset = "slow" | "normal" | "fast";

export default function ScratchResultButton() {
  const [speed, setSpeed] = useState<SpeedPreset>("normal");

  const getSpeedConfig = (preset: SpeedPreset) => {
    switch (preset) {
      case "slow":
        return {
          count: 25,
          durationRange: [3000, 4500] as [number, number],
          sizeRange: [35, 50] as [number, number],
          staggerRange: [0, 800] as [number, number],
        };
      case "fast":
        return {
          count: 35,
          durationRange: [2000, 3500] as [number, number],
          sizeRange: [30, 45] as [number, number],
          staggerRange: [0, 400] as [number, number],
        };
      default: // normal
        return {
          count: 30,
          durationRange: [2500, 4000] as [number, number],
          sizeRange: [32, 48] as [number, number],
          staggerRange: [0, 600] as [number, number],
        };
    }
  };

  const onWin = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const config = getSpeedConfig(speed);
    
    // petit burst là où l'utilisateur clique (sensation immédiate)
    emojiBurst(e.clientX, e.clientY, {
      emojis: ["🎉","🪄","🏆","💎","🥳","🌈"],
      count: Math.floor(config.count / 3),
      sizeRange: [config.sizeRange[0] * 0.8, config.sizeRange[1] * 0.8],
    });

    // pluie globale avec vitesse configurée
    const stop = startEmojiRain({
      emojis: ["🎉","🎊","🎁","⭐","🌟","🥳","🏆","💎","💫","✨"],
      count: config.count,
      durationRange: config.durationRange,
      sizeRange: config.sizeRange,
      driftRange: [100, 260],
      spinRange: [160, 540],
      staggerRange: config.staggerRange,
      zIndex: 99999,
      container: "viewport",
    });

    // Optionnel: stopper manuellement plus tôt si tu affiches un modal
    // setTimeout(() => stop(), 2000);
  }, [speed]);

  return (
    <div className="space-y-4">
      {/* Contrôle de vitesse */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setSpeed("slow")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            speed === "slow" 
              ? "bg-red-500 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          🐌 Lent
        </button>
        <button
          onClick={() => setSpeed("normal")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            speed === "normal" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          ⚡ Normal
        </button>
        <button
          onClick={() => setSpeed("fast")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            speed === "fast" 
              ? "bg-green-500 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          🚀 Rapide
        </button>
      </div>

      {/* Bouton principal */}
      <button
        onClick={onWin}
        className="px-6 py-3 rounded-2xl bg-black text-white font-semibold hover:opacity-90 active:scale-95 transition"
      >
        Révéler / Gagné ✨
      </button>
    </div>
  );
}
