"use client";

import { startEmojiRain } from "@/lib/emojiRain";

// 🎉 Pluie fun TikTok
export function funRain() {
  return startEmojiRain({
    emojis: ["🎉", "✨", "💖", "🔥", "⭐", "🌸"],
    duration: 5000,
    intensity: 20,
    sizeRange: [20, 50],
    driftRange: [50, 200],
    rotation: true,
  });
}

// 💰 Pluie de richesse TikTok
export function wealthRainTikTok() {
  return startEmojiRain({
    emojis: ["🎁", "🤑", "🌟", "💰"],
    duration: 8000,
    intensity: 15,
    sizeRange: [30, 60],
    driftRange: [100, 300],
    rotation: true,
  });
}

// ⚡ Pluie intense TikTok
export function intenseRain() {
  return startEmojiRain({
    emojis: ["🎊", "💫", "✨", "🌟", "💎", "🔥"],
    duration: 3000,
    intensity: 30,
    sizeRange: [15, 40],
    driftRange: [30, 150],
    rotation: false,
  });
}

// 🌧️ Pluie douce TikTok
export function gentleRain() {
  return startEmojiRain({
    emojis: ["🌸", "🦋", "✨", "💫", "🌺"],
    duration: 6000,
    intensity: 8,
    sizeRange: [25, 45],
    driftRange: [30, 100],
    rotation: true,
  });
}

// 🎆 Explosion TikTok
export function explosionRain() {
  return startEmojiRain({
    emojis: ["🎆", "🎇", "✨", "💥", "🌟", "💫"],
    duration: 4000,
    intensity: 25,
    sizeRange: [20, 55],
    driftRange: [80, 250],
    rotation: true,
  });
}
