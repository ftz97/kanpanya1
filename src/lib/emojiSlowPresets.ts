"use client";

import { startEmojiRain } from "@/lib/emojiRain";

/**
 * Version 1 - Oscillation douce
 * Chaque emoji tombe avec un léger mouvement en S → comme une feuille qui plane.
 * Pas d'effet brusque, juste une sinusoïde subtile en X.
 */
export function rainSlowMotionOscillating() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🏆"],
    count: 30,
    durationRange: [5000, 7000],
    sizeRange: [32, 48],
    driftRange: [120, 200],          // oscillation horizontale plus prononcée
    spinRange: [0, 0],
    staggerRange: [0, 1200],
    oscillation: true,               // Active l'oscillation
    easing: "smooth",                // Easing fluide
  });
}

/**
 * Version 2 - Échelle variable
 * Les plus gros emojis tombent plus lentement.
 * Les plus petits descendent un peu plus vite.
 * Crée une impression de poids et profondeur.
 */
export function rainSlowMotionScale() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
    count: 35,
    durationRange: [3000, 8000],     // grande variation selon la taille
    sizeRange: [16, 64],             // échelle très variable
    driftRange: [40, 80],            // mouvement horizontal réduit
    spinRange: [0, 0],
    staggerRange: [0, 1000],
    easing: "smooth",                // Easing fluide pour l'échelle
  });
}

/**
 * Version 3 - Glow discret sur les emojis brillants
 * Certains (💎, ✨, 🌟) ont un scintillement léger (fade in/out).
 * Effet magique, premium.
 */
export function rainSlowMotionGlow() {
  return startEmojiRain({
    emojis: ["💎", "✨", "🌟", "⭐", "💫", "🎇"], // emojis brillants uniquement
    count: 25,
    durationRange: [4000, 6000],
    sizeRange: [24, 40],
    driftRange: [60, 120],
    spinRange: [0, 0],
    staggerRange: [0, 800],
    glow: true,                       // Active l'effet de glow
    easing: "smooth",                 // Easing fluide
  });
}

/**
 * Version 4 - Easing dramatique
 * Entrée rapide puis ralenti fort à l'arrivée (cubic-bezier dramatique).
 * Vrai slow motion cinématique.
 */
export function rainSlowMotionEasing() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🏆"],
    count: 28,
    durationRange: [6000, 8000],     // durée très longue pour l'easing
    sizeRange: [28, 44],
    driftRange: [50, 100],
    spinRange: [0, 0],
    staggerRange: [0, 1000],
    easing: "dramatic",              // Easing dramatique
  });
}

/**
 * Version FINALE - Toutes les améliorations combinées
 * Oscillation + Échelle + Glow + Easing dramatique
 */
export function rainSlowMotionUltimate() {
  return startEmojiRain({
    emojis: ["🎁", "💰", "💎", "✨", "🌟", "🏆", "💫", "⭐"],
    count: 32,
    durationRange: [4000, 9000],     // échelle variable + easing long
    sizeRange: [20, 56],             // échelle variable
    driftRange: [100, 180],          // oscillation prononcée
    spinRange: [0, 0],
    staggerRange: [0, 1200],
    oscillation: true,               // Active l'oscillation
    glow: true,                      // Active l'effet de glow
    easing: "dramatic",              // Easing dramatique
  });
}