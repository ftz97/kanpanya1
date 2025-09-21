"use client";

import { startEmojiRain } from "@/lib/emojiRain";

// 🌙 Slow – Version premium lente, majestueuse
export function rainSlow() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 32,
    durationRange: [3800, 5200],  // lent mais pas interminable
    sizeRange: [26, 54],
    driftRange: [60, 140],
    spinRange: [0, 3],
    staggerRange: [0, 800],
  });
}

// ☁️ Medium – Version équilibrée
export function rainMedium() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 34,
    durationRange: [2400, 3400],  // fluide et cinématique
    sizeRange: [24, 52],
    driftRange: [50, 120],
    spinRange: [0, 3],
    staggerRange: [0, 600],
  });
}

// ⚡ Fast – Version dynamique et punchy
export function rainFast() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 36,
    durationRange: [1500, 2200],  // rapide, effet burst
    sizeRange: [20, 48],
    driftRange: [40, 100],
    spinRange: [0, 2],
    staggerRange: [0, 400],
  });
}
