"use client";

import { startEmojiRain } from "@/lib/emojiRain";

type Density = "low" | "medium" | "high";

function getCount(density: Density) {
  switch (density) {
    case "low":
      return 20;  // très peu d'emojis
    case "medium":
      return 36;  // équilibré
    case "high":
      return 60;  // pluie dense
  }
}

// 🌙 Slow Motion
export function rainSlow(density: Density = "medium") {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: getCount(density),
    durationRange: [3800, 5200],
    sizeRange: [26, 54],
    driftRange: [60, 140],
    spinRange: [0, 3],
    staggerRange: [0, 800],
  });
}

// ☁️ Medium Motion
export function rainMedium(density: Density = "medium") {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: getCount(density),
    durationRange: [2400, 3400],
    sizeRange: [24, 52],
    driftRange: [50, 120],
    spinRange: [0, 3],
    staggerRange: [0, 600],
  });
}

// ⚡ Fast Motion
export function rainFast(density: Density = "medium") {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: getCount(density),
    durationRange: [1500, 2200],
    sizeRange: [20, 48],
    driftRange: [40, 100],
    spinRange: [0, 2],
    staggerRange: [0, 400],
  });
}
