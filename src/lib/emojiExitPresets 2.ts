"use client";

import { startEmojiRain } from "@/lib/emojiRain";

/**
 * Exit 1 – Bounce (impact léger)
 */
export function rainExitBounce() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨"],
    count: 36,
    durationRange: [2200, 3200],
    sizeRange: [24, 52],
    driftRange: [40, 120],
    spinRange: [0, 2],
    staggerRange: [0, 600],
    // 👉 à compléter dans animate(): ajouter easing "ease-out-bounce"
  });
}

/**
 * Exit 2 – Splash / éclat (mini explosion)
 */
export function rainExitSplash() {
  return startEmojiRain({
    emojis: ["✨", "💎", "🌟", "🎇"],
    count: 30,
    durationRange: [1800, 2800],
    sizeRange: [22, 46],
    driftRange: [60, 140],
    spinRange: [0, 2],
    staggerRange: [0, 500],
    // 👉 à compléter : au sol → créer 3–4 mini ✨ avec animation courte
  });
}

/**
 * Exit 3 – Glissade hors écran
 */
export function rainExitSlide() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨"],
    count: 40,
    durationRange: [2200, 3000],
    sizeRange: [20, 48],
    driftRange: [80, 160],
    spinRange: [0, 2],
    staggerRange: [0, 500],
    // 👉 fin de trajectoire : translation +100px gauche/droite
  });
}

/**
 * Exit 4 – Zoom-out & vanish
 */
export function rainExitZoomOut() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨"],
    count: 34,
    durationRange: [2000, 2800],
    sizeRange: [22, 52],
    driftRange: [40, 100],
    spinRange: [0, 2],
    staggerRange: [0, 600],
    // 👉 fin : scale(0) + fade-out rapide
  });
}

/**
 * Exit 5 – Magnétisme (vers un point central)
 */
export function rainExitMagnet() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨"],
    count: 36,
    durationRange: [2400, 3200],
    sizeRange: [20, 50],
    driftRange: [60, 140],
    spinRange: [0, 2],
    staggerRange: [0, 600],
    // 👉 fin : trajectoire qui converge vers centre écran (ex: coffre 🪙)
  });
}
