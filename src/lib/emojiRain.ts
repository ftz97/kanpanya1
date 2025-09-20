"use client";

console.log("✅ emojiRain.ts chargé (version clean, full visible)");

// Types
interface EmojiRainOptions {
  emojis?: string[];
  count?: number;
  durationRange?: [number, number];
  sizeRange?: [number, number];
  driftRange?: [number, number];
  spinRange?: [number, number];
  staggerRange?: [number, number];
  zIndex?: number;
  container?: "viewport" | "body" | string;
  easing?: "dramatic" | "smooth" | "linear";
  glow?: boolean;
  oscillation?: boolean;
  fullOpacity?: boolean; // 0 opacité au début, 100% à la fin
}

interface EmojiBurstOptions {
  emojis?: string[];
  count?: number;
  sizeRange?: [number, number];
  spread?: number;
  gravity?: number;
}

// Fonction utilitaire pour générer un nombre aléatoire dans une plage
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Fonction pour créer un emoji avec animation
function createEmojiElement(
  emoji: string,
  x: number,
  y: number,
  options: EmojiRainOptions
): HTMLElement {
  const element = document.createElement("div");
  element.textContent = emoji;
  element.style.position = "fixed";
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  
  const size = randomInRange(options.sizeRange![0], options.sizeRange![1]);
  element.style.fontSize = `${size}px`;
  element.style.fontFamily = "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";
  element.style.lineHeight = "1";
  element.style.pointerEvents = "none";
  element.style.zIndex = options.zIndex?.toString() || "9999";
  element.style.userSelect = "none";
  
  // willChange selon l'option fullOpacity
  if (options.fullOpacity) {
    element.style.willChange = "transform"; // Pas d'opacity car elle est fixe
  } else {
    element.style.willChange = "transform, opacity";
  }
  
  element.style.display = "flex";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";

  // Opacité initiale selon l'option fullOpacity
  if (options.fullOpacity) {
    // FORCER l'opacité à 1 immédiatement et définitivement
    element.style.setProperty("opacity", "1", "important");
    element.setAttribute("data-full-opacity", "true"); // Marqueur pour debug
    
    // Ajouter une classe CSS pour forcer l'opacité
    element.classList.add("emoji-full-opacity");
    
    // Injecter le CSS si pas déjà fait
    if (!document.getElementById("emoji-full-opacity-style")) {
      const style = document.createElement("style");
      style.id = "emoji-full-opacity-style";
      style.textContent = `
        .emoji-full-opacity {
          opacity: 1 !important;
        }
        .emoji-full-opacity * {
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Effet de glow pour les emojis brillants
  if (options.glow && ["💎", "✨", "🌟", "⭐", "💫", "🎇"].includes(emoji)) {
    element.style.filter = "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.4))";
  }

  // Animation - PLUS FLUIDE ET NATURELLE
  const duration = randomInRange(options.durationRange![0], options.durationRange![1]);
  const drift = randomInRange(options.driftRange![0], options.driftRange![1]);
  const spin = randomInRange(0, 90);
  const stagger = randomInRange(options.staggerRange![0], options.staggerRange![1]);

  // Position finale avec oscillation
  let finalX, finalY;
  if (options.oscillation) {
    // Mouvement en S - oscillation douce
    const oscillationPhase = Math.random() * Math.PI * 2;
    const oscillationAmplitude = drift * 0.6;
    finalX = x + Math.sin(oscillationPhase) * oscillationAmplitude;
    finalY = y + window.innerHeight * 0.9;
  } else {
    finalX = x + (Math.random() - 0.5) * drift * 0.8;
    finalY = y + window.innerHeight * 0.9;
  }

  // Créer les keyframes selon le type d'easing
  let keyframes: Keyframe[];
  let easing: string;

          if (options.fullOpacity) {
            // Animation SANS opacité - seulement transform
            keyframes = [
              {
                transform: `translate(0, 0) rotate(0deg) scale(1)`,
                // PAS d'opacity ici - elle est forcée par CSS
              },
              {
                transform: `translate(0, 0) rotate(0deg) scale(1.1)`,
                offset: 0.03,
              },
              {
                transform: `translate(${(finalX - x) * 0.2}px, ${(finalY - y) * 0.2}px) rotate(${spin * 0.2}deg) scale(1.05)`,
                offset: 0.1,
              },
              {
                transform: `translate(${(finalX - x) * 0.4}px, ${(finalY - y) * 0.4}px) rotate(${spin * 0.4}deg) scale(1)`,
                offset: 0.3,
              },
              {
                transform: `translate(${(finalX - x) * 0.6}px, ${(finalY - y) * 0.6}px) rotate(${spin * 0.6}deg) scale(1)`,
                offset: 0.5,
              },
              {
                transform: `translate(${(finalX - x) * 0.8}px, ${(finalY - y) * 0.8}px) rotate(${spin * 0.8}deg) scale(1)`,
                offset: 0.7,
              },
              {
                transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(1)`,
                offset: 0.85,
              },
              {
                transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.8)`,
                offset: 0.95,
              },
              {
                transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(1)`,
                // PAS d'opacity ici non plus
              },
            ];
            easing = "ease-out";
          } else if (options.easing === "dramatic") {
    // Easing dramatique - entrée rapide puis ralenti fort
    keyframes = [
      {
        transform: `translate(0, 0) rotate(0deg) scale(0.3)`,
        opacity: 0,
      },
      {
        transform: `translate(0, 0) rotate(0deg) scale(1.2)`,
        opacity: 1,
        offset: 0.05, // Entrée très rapide
      },
      {
        transform: `translate(${(finalX - x) * 0.1}px, ${(finalY - y) * 0.1}px) rotate(${spin * 0.1}deg) scale(1.1)`,
        opacity: 1,
        offset: 0.15,
      },
      {
        transform: `translate(${(finalX - x) * 0.3}px, ${(finalY - y) * 0.3}px) rotate(${spin * 0.3}deg) scale(1)`,
        opacity: 1,
        offset: 0.4, // Ralenti progressif
      },
      {
        transform: `translate(${(finalX - x) * 0.6}px, ${(finalY - y) * 0.6}px) rotate(${spin * 0.6}deg) scale(0.95)`,
        opacity: 0.95,
        offset: 0.7, // Ralenti fort
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.8)`,
        opacity: 0.8,
        offset: 0.9, // Ralenti très fort
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.3)`,
        opacity: 0,
      },
    ];
    easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Easing dramatique
  } else if (options.easing === "smooth") {
    // Easing smooth - mouvement fluide
    keyframes = [
      {
        transform: `translate(0, 0) rotate(0deg) scale(0.6)`,
        opacity: 0,
      },
      {
        transform: `translate(0, 0) rotate(0deg) scale(1.1)`,
        opacity: 1,
        offset: 0.03,
      },
      {
        transform: `translate(${(finalX - x) * 0.15}px, ${(finalY - y) * 0.15}px) rotate(${spin * 0.15}deg) scale(1.05)`,
        opacity: 1,
        offset: 0.1,
      },
      {
        transform: `translate(${(finalX - x) * 0.35}px, ${(finalY - y) * 0.35}px) rotate(${spin * 0.35}deg) scale(1)`,
        opacity: 1,
        offset: 0.25,
      },
      {
        transform: `translate(${(finalX - x) * 0.55}px, ${(finalY - y) * 0.55}px) rotate(${spin * 0.55}deg) scale(0.98)`,
        opacity: 0.98,
        offset: 0.45,
      },
      {
        transform: `translate(${(finalX - x) * 0.75}px, ${(finalY - y) * 0.75}px) rotate(${spin * 0.75}deg) scale(0.95)`,
        opacity: 0.95,
        offset: 0.65,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.9)`,
        opacity: 0.9,
        offset: 0.8,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.6)`,
        opacity: 0.6,
        offset: 0.9,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.2)`,
        opacity: 0,
      },
    ];
    easing = "ease-out";
  } else {
    // Easing linear - mouvement constant
    keyframes = [
      {
        transform: `translate(0, 0) rotate(0deg) scale(0.6)`,
        opacity: 0,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.8)`,
        opacity: 1,
        offset: 0.5,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${spin}deg) scale(0.2)`,
        opacity: 0,
      },
    ];
    easing = "linear";
  }

  // Animation CSS avec easing personnalisé
  const animation = element.animate(keyframes, {
    duration: duration,
    delay: stagger,
    easing: easing,
    fill: "forwards",
  });

  // Si fullOpacity, forcer l'opacité après le démarrage de l'animation
  if (options.fullOpacity) {
    // Forcer l'opacité immédiatement après le démarrage
    setTimeout(() => {
      element.style.setProperty("opacity", "1", "important");
    }, 0);
    
    // Forcer l'opacité à chaque frame de l'animation
    animation.addEventListener('finish', () => {
      element.style.setProperty("opacity", "1", "important");
    });
  }

  return element;
}

// Fonction pour créer un burst d'emojis
function createBurstElement(
  emoji: string,
  x: number,
  y: number,
  options: EmojiBurstOptions
): HTMLElement {
  const element = document.createElement("div");
  element.textContent = emoji;
  element.style.position = "fixed";
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.fontSize = `${randomInRange(options.sizeRange![0], options.sizeRange![1])}px`;
  element.style.fontFamily = "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";
  element.style.lineHeight = "1";
  element.style.pointerEvents = "none";
  element.style.zIndex = "9999";
  element.style.userSelect = "none";
  element.style.willChange = "transform, opacity";
  element.style.display = "flex";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";

  // Animation burst
  const spread = options.spread || 200;
  const gravity = options.gravity || 0.5;
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * spread + 50;
  const finalX = x + Math.cos(angle) * velocity;
  const finalY = y + Math.sin(angle) * velocity + gravity * 1000;

  element.animate(
    [
      {
        transform: `translate(0, 0) rotate(0deg) scale(0.3)`,
        opacity: 0,
      },
      {
        transform: `translate(0, 0) rotate(0deg) scale(1.1)`,
        opacity: 1,
        offset: 0.1,
      },
      {
        transform: `translate(${(finalX - x) * 0.3}px, ${(finalY - y) * 0.3}px) rotate(${Math.random() * 180}deg) scale(1)`,
        opacity: 1,
        offset: 0.3,
      },
      {
        transform: `translate(${(finalX - x) * 0.7}px, ${(finalY - y) * 0.7}px) rotate(${Math.random() * 180}deg) scale(0.8)`,
        opacity: 0.8,
        offset: 0.7,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${Math.random() * 180}deg) scale(0.4)`,
        opacity: 0.4,
        offset: 0.9,
      },
      {
        transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${Math.random() * 180}deg) scale(0.1)`,
        opacity: 0,
      },
    ],
    {
      duration: 2000,
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      fill: "forwards",
    }
  );

  return element;
}

// Fonction principale pour démarrer la pluie d'emojis
export function startEmojiRain(options: EmojiRainOptions = {}): () => void {
  const {
    emojis = ["🎉", "🎊", "🎁", "⭐", "🌟"],
    count = 30,
    durationRange = [2000, 4000],
    sizeRange = [20, 40],
    driftRange = [100, 300],
    spinRange = [0, 360],
    staggerRange = [0, 1000],
    zIndex = 9999,
    container = "viewport",
  } = options;

  const containerElement = container === "viewport" 
    ? document.body 
    : container === "body" 
    ? document.body 
    : document.querySelector(container);

  if (!containerElement) {
    console.warn("Container not found, using body");
    return () => {};
  }

  const elements: HTMLElement[] = [];

  // Créer les emojis
  for (let i = 0; i < count; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const x = Math.random() * window.innerWidth;
    const y = -50;

    const element = createEmojiElement(emoji, x, y, {
      emojis,
      count,
      durationRange,
      sizeRange,
      driftRange,
      spinRange,
      staggerRange,
      zIndex,
      container,
    });

    containerElement.appendChild(element);
    elements.push(element);
  }

  // Fonction de nettoyage
  const cleanup = () => {
    elements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  };

  // Nettoyage automatique après la durée maximale
  const maxDuration = Math.max(...durationRange) + Math.max(...staggerRange);
  setTimeout(cleanup, maxDuration);

  return cleanup;
}

// Fonction pour créer un burst d'emojis
export function emojiBurst(x: number, y: number, options: EmojiBurstOptions = {}): () => void {
  const {
    emojis = ["🎉", "🎊", "✨", "🔥", "💎"],
    count = 12,
    sizeRange = [20, 36],
    spread = 200,
    gravity = 0.5,
  } = options;

  const elements: HTMLElement[] = [];

  // Créer les emojis
  for (let i = 0; i < count; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const element = createBurstElement(emoji, x, y, {
      emojis,
      count,
      sizeRange,
      spread,
      gravity,
    });

    document.body.appendChild(element);
    elements.push(element);
  }

  // Fonction de nettoyage
  const cleanup = () => {
    elements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  };

  // Nettoyage automatique
  setTimeout(cleanup, 2000);

  return cleanup;
}
