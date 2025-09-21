"use client";

import { startEmojiRain } from "@/lib/emojiRain";

// 🌊 Pluie en vagues TikTok
export function waveRainTikTok() {
  return startEmojiRain({
    emojis: ["🌊", "💧", "✨", "💫"],
    duration: 6000,
    intensity: 12, // vagues douces
    sizeRange: [20, 45],
    driftRange: [30, 100],
    rotation: true,
  });
}

// ⚡ Pluie électrique TikTok
export function electricRainTikTok() {
  return startEmojiRain({
    emojis: ["⚡", "💥", "🔥", "✨", "💫"],
    duration: 4000,
    intensity: 25, // très intense
    sizeRange: [15, 35],
    driftRange: [50, 200],
    rotation: false, // pas de rotation pour l'effet électrique
  });
}

// 🌸 Pluie de pétales TikTok
export function petalsRainTikTok() {
  return startEmojiRain({
    emojis: ["🌸", "🌺", "🌼", "🌻", "🦋"],
    duration: 8000,
    intensity: 8, // très doux
    sizeRange: [25, 50],
    driftRange: [20, 80],
    rotation: true,
  });
}

// 💎 Pluie de diamants TikTok
export function diamondsRainTikTok() {
  return startEmojiRain({
    emojis: ["💎", "✨", "💫", "🌟", "⭐"],
    duration: 5000,
    intensity: 18,
    sizeRange: [18, 42],
    driftRange: [60, 150],
    rotation: true,
  });
}

// 🎆 Pluie de feux d'artifice TikTok
export function fireworksRainTikTok() {
  return startEmojiRain({
    emojis: ["🎆", "🎇", "✨", "💥", "🌟", "💫"],
    duration: 7000,
    intensity: 20,
    sizeRange: [22, 48],
    driftRange: [80, 250],
    rotation: true,
  });
}
