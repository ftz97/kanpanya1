"use client";

import { startEmojiRain } from "@/lib/emojiRain";

// Option 1 – Slow Motion Oscillating
export function rainSlowMotionOscillating() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🏆"],
    count: 36,
    durationRange: [4500, 6500],
    sizeRange: [28, 56],
    driftRange: [80, 160],
    spinRange: [0, 0],
    staggerRange: [0, 1000],
  });
}

// Option 2 – Slow Motion Depth + Glow
export function rainSlowMotionDepth() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 40,
    durationRange: [4000, 6000],
    sizeRange: [20, 60],
    driftRange: [40, 100],
    spinRange: [0, 0],
    staggerRange: [0, 800],
  });
}

// Option 3 – Pluie Organique (aléatoire, vivante)
export function rainOrganic() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 45,
    durationRange: [2000, 6500],
    sizeRange: [20, 60],
    driftRange: [30, 160],
    spinRange: [0, 5],          // micro inclinaison subtile
    staggerRange: [0, 1200],
  });
}

// Option 4 – Slow Motion Dynamic (plus rapide mais premium)
export function rainSlowMotionDynamic() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 34,                      // densité réduite
    durationRange: [2200, 3500],    // plus rapide mais encore premium
    sizeRange: [24, 52],            // gros et petit pour profondeur
    driftRange: [60, 140],          // oscillation subtile
    spinRange: [0, 3],              // micro inclinaison
    staggerRange: [0, 600],         // apparition fluide
  });
}
