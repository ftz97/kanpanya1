"use client";

import { startEmojiRain } from "@/lib/emojiRain";

export function rainMajestic() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 40,                       // densité maîtrisée
    durationRange: [4200, 6000],     // plus long → majestueux
    sizeRange: [28, 60],             // gros emojis premium
    driftRange: [80, 160],           // oscillation douce
    spinRange: [0, 2],               // micro inclinaison
    staggerRange: [0, 1000],         // entrée progressive
    fullOpacity: true,               // ⚡ 0 opacité au début, 100% à la fin
  });
}
