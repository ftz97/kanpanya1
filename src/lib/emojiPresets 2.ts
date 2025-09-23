"use client";

import { startEmojiRain, emojiBurst } from "@/lib/emojiRain";

// 🌧️ Pluie classique
export function rainClassic() {
  return startEmojiRain({
    emojis: ["🎉", "🎊", "🥳", "⭐", "🎁"],
    count: 40, // Plus d'emojis
    durationRange: [3000, 5000], // Plus rapide
    driftRange: [100, 180], // Drift plus important
    spinRange: [0, 90],
  });
}

// 🎇 Burst (clic/tap)
export function burstClick(x: number, y: number) {
  return emojiBurst(x, y, {
    emojis: ["🎉", "🎊", "✨", "🔥", "💎"],
    count: 18,
    sizeRange: [20, 36],
  });
}

// 🎆 Explosion centrale (feu d'artifice plein écran)
export function burstCenter() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  return emojiBurst(cx, cy, {
    emojis: ["⭐", "🌟", "💫", "✨"],
    count: 40,
    sizeRange: [24, 42],
  });
}

// ⬅️➡️ Pluie horizontale (gauche → droite)
export function rainHorizontal() {
  return startEmojiRain({
    emojis: ["🍕", "🍔", "🥤", "🍟"],
    count: 35, // Plus d'emojis
    durationRange: [2500, 4000], // Plus rapide
    driftRange: [300, 500], // Drift latéral plus important
    spinRange: [0, 60],
  });
}

// ⬆️ Étoiles montantes (style feu d'artifice qui monte)
export function risingStars() {
  return startEmojiRain({
    emojis: ["⭐", "🌟", "✨", "💫"],
    count: 30, // Plus d'emojis
    durationRange: [2500, 4000], // Plus rapide
    driftRange: [80, 150], // Drift plus important
    spinRange: [0, 90],
  });
}

// 💰 Pluie de richesse (emojis riches et précieux)
export function wealthRain() {
  return startEmojiRain({
    emojis: ["🎁", "🤑", "🌟", "💰"],
    count: 80, // Plus d'emojis pour occuper l'espace
    durationRange: [4000, 6000], // Plus rapide
    driftRange: [120, 200], // Drift plus important pour occuper l'espace
    spinRange: [0, 90],
  });
}
