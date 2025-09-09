import confetti from "canvas-confetti";

// ❤️ Victoire : pluie de cœurs façon TikTok
export function heartsRain(durationMs = 3000) {
  if (typeof window === "undefined") return;

  const end = Date.now() + durationMs;
  (function loop() {
    confetti({
      particleCount: 8,
      spread: 30,
      angle: 90,
      startVelocity: 15,
      ticks: 300,
      gravity: 1,
      scalar: 3,
      emojis: ["❤️", "💖", "💘", "💝"], // vrais emojis
    });
    if (Date.now() < end) requestAnimationFrame(loop);
  })();
}

// 😢 Défaite : pluie triste
export function sadRain(durationMs = 3000) {
  if (typeof window === "undefined") return;

  const end = Date.now() + durationMs;
  (function loop() {
    confetti({
      particleCount: 10,
      spread: 20,
      angle: 90,
      startVelocity: 10,
      ticks: 300,
      gravity: 1.5,
      scalar: 3,
      emojis: ["😢", "💔", "😭"], // vrais emojis
    });
    if (Date.now() < end) requestAnimationFrame(loop);
  })();
}