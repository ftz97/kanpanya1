"use client";

import { startEmojiRain } from "@/lib/emojiRain";

/**
 * 1. Spawn explosif depuis le haut
 * Full visible + scale down rapide (impact)
 */
export function rainEntryExplosive() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 40,
    durationRange: [2200, 3200],
    sizeRange: [28, 56],
    driftRange: [60, 140],
    spinRange: [0, 2],
    staggerRange: [0, 600],
    // 👉 idée : scale(1.3) -> scale(1) en 200ms (dans animate)
  });
}

/**
 * 2. Perspective 3D (avant-plan vs arrière-plan)
 * Gros lents, petits rapides
 */
export function rainEntry3D() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟"],
    count: 50,
    durationRange: [1800, 3000],
    sizeRange: [18, 60],          // plus d'écart pour profondeur
    driftRange: [40, 160],
    spinRange: [0, 3],
    staggerRange: [0, 800],
  });
}

/**
 * 3. Jackpot burst
 * Trop d'emojis au début, puis ralentissement
 */
export function rainEntryJackpot() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 80,                     // densité énorme
    durationRange: [2000, 2600],
    sizeRange: [24, 52],
    driftRange: [80, 160],
    spinRange: [0, 2],
    staggerRange: [0, 400],
  });
}

/**
 * 4. Flash lumineux à l'apparition
 * Spawn direct avec effet "glow"
 */
export function rainEntryFlash() {
  return startEmojiRain({
    emojis: ["✨", "🌟", "💎", "🎁"],
    count: 36,
    durationRange: [2200, 3200],
    sizeRange: [26, 54],
    driftRange: [40, 100],
    spinRange: [0, 2],
    staggerRange: [0, 500],
    // 👉 à compléter : flash CSS derrière l'emoji (scale + opacity)
  });
}

/**
 * 5. Combo WOW Jackpot
 * Explosif + profondeur + splash au sol
 */
export function rainEntryWowJackpot() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 60,
    durationRange: [2000, 3000],
    sizeRange: [20, 60],
    driftRange: [60, 160],
    spinRange: [0, 2],
    staggerRange: [0, 600],
    // 👉 à compléter : spawn explosif + quelques éclats ✨ au sol
  });
}
