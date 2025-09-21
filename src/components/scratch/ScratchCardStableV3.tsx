"use client";

import React, { useRef, useState, useEffect } from "react";
import { useCallback } from "react";
import confetti from "canvas-confetti";

// Import des pluies d'emojis custom
import { SadEmojiRain, HappyEmojiRain, MoneyEmojiRain } from "../EmojiRain";
import Popup from "../Popup";

// Types pour les props configurables
interface ScratchCardProps {
  threshold?: number;
  goldenTicketChance?: number;
  onReveal?: (reward: { type: string; amount: number; merchant?: string }) => void;
  userId?: string;
}

// Définir les dégradés pour les tickets
const ticketGradients = [
  "from-cyan-200 via-sky-300 to-blue-400",   // bleu lagon
  "from-pink-200 via-rose-300 to-orange-300",// corail
  "from-green-200 via-emerald-300 to-teal-400", // vert menthe
  "from-purple-200 via-indigo-300 to-blue-400", // violet doux
  "from-yellow-200 via-orange-200 to-pink-200", // pêche pastel
];

// Golden Ticket pour les tickets
const goldenTicketGradient = "from-yellow-300 via-yellow-400 to-yellow-500";

// Sélection aléatoire avec rareté pour les tickets
function getRandomTicketGradient(goldenTicketChance: number = 0.1) {
  const chance = Math.random();
  if (chance < goldenTicketChance) {
    return { gradient: goldenTicketGradient, isGolden: true };
  }
  return {
    gradient: ticketGradients[Math.floor(Math.random() * ticketGradients.length)],
    isGolden: false,
  };
}

export default function ScratchCardStableV3({ 
  threshold = 0.4, 
  goldenTicketChance = 0.1, 
  onReveal,
  userId = "default-user"
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // État initial stable pour éviter les erreurs d'hydratation
  const [ticketGradient, setTicketGradient] = useState({ gradient: "from-indigo-500 via-purple-500 to-pink-400", isGolden: false });
  const [isWinner, setIsWinner] = useState(false);
  const [variation, setVariation] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [reward, setReward] = useState<{ type: string; amount: number; merchant?: string }>({ type: "none", amount: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Emojis
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastCheck = useRef(0);

  const getWinVariations = () => {
    const emoji = getEmojiSet();
    return [
      `${emoji} Bravo, tu repars avec une récompense incroyable ! 🎁🥳`,
      `${emoji} C'est gagné 🎊`,
      `${emoji} Quelle chance, tu as gagné ! 🎉`,
      `${emoji} Jackpot, félicitations 🎆`,
    ];
  };

  const getLoseVariations = () => {
    const emoji = getEmojiSet();
    return [
      `${emoji} Pas de chance cette fois... 🍀`,
      `${emoji} Dommage, retente bientôt ! 🙃`,
      `${emoji} Ce n'est pas gagné aujourd'hui... 😔`,
      `${emoji} Tu feras mieux la prochaine fois ! ✨`,
    ];
  };

  function getRandomPrize(won: boolean, isGolden: boolean) {
    if (!won) return { type: "none", amount: 0 };
    
    // Golden Ticket = récompense spéciale garantie
    if (isGolden) {
      return { type: "golden", amount: 500, merchant: "Golden Ticket" };
    }
    
    const POINTS = [50, 100, 200];
    const REDUCTIONS = [5, 10, 15];
    const OFFERS = [
      { amount: 10, merchant: "Mutuelle Locale" },
      { amount: 15, merchant: "Boulangerie du Coin" },
      { amount: 20, merchant: "Café Central" }
    ];
    
    const rand = Math.random();
    if (rand < 0.4) {
      return { type: "points", amount: POINTS[Math.floor(Math.random() * POINTS.length)] };
    } else if (rand < 0.7) {
      return { type: "reduction", amount: REDUCTIONS[Math.floor(Math.random() * REDUCTIONS.length)] };
    } else {
      const offer = OFFERS[Math.floor(Math.random() * OFFERS.length)];
      return { type: "offer", amount: offer.amount, merchant: offer.merchant };
    }
  }

  // Initialisation côté client uniquement pour éviter les erreurs d'hydratation
  
const stableGetRandomTicketGradient = useCallback(() => {
  getRandomTicketGradient();
}, [getRandomTicketGradient]);

const stableSetTicketGradient = useCallback(() => {
  setTicketGradient();
}, [setTicketGradient]);

const stableSetIsWinner = useCallback(() => {
  setIsWinner();
}, [setIsWinner]);

const stableRandom = useCallback(() => {
  random();
}, [random]);

const stableSetIsInitialized = useCallback(() => {
  setIsInitialized();
}, [setIsInitialized]);

const stableUseEffect = useCallback(() => {
  useEffect();
}, [useEffect]);

const stableGetWinVariations = useCallback(() => {
  getWinVariations();
}, [getWinVariations]);

const stableGetLoseVariations = useCallback(() => {
  getLoseVariations();
}, [getLoseVariations]);

const stableSetVariation = useCallback(() => {
  setVariation();
}, [setVariation]);

const stableFloor = useCallback(() => {
  floor();
}, [floor]);


const stableGetRandomPrize = useCallback(() => {
  getRandomPrize();
}, [getRandomPrize]);

const stableSetReward = useCallback(() => {
  setReward();
}, [setReward]);


const stableGetContext = useCallback(() => {
  getContext();
}, [getContext]);

const stableGetBoundingClientRect = useCallback(() => {
  getBoundingClientRect();
}, [getBoundingClientRect]);

const stableFillRect = useCallback(() => {
  fillRect();
}, [fillRect]);


const stableFillText = useCallback(() => {
  fillText();
}, [fillText]);

const stableResize = useCallback(() => {
  resize();
}, [resize]);

const stableResizeObserver = useCallback(() => {
  ResizeObserver();
}, [ResizeObserver]);

const stableObserve = useCallback(() => {
  observe();
}, [observe]);

const stableDisconnect = useCallback(() => {
  disconnect();
}, [disconnect]);

useEffect(() => {
  stableGetRandomTicketGradient();
  stableSetTicketGradient();
  stableSetIsWinner();
  stableRandom();
  stableSetIsInitialized();
  stableUseEffect();
  stableGetWinVariations();
  stableGetLoseVariations();
  stableSetVariation();
  stableFloor();
  stableRandom();
  stableFloor();
  stableRandom();
  stableGetRandomPrize();
  stableSetReward();
  stableUseEffect();
  stableGetContext();
  stableGetBoundingClientRect();
  stableFillRect();
  stableFloor();
  stableFillText();
  stableResize();
  stableResizeObserver();
  stableObserve();
  stableDisconnect();
}, [stableGetRandomTicketGradient, stableSetTicketGradient, stableSetIsWinner, stableRandom, stableSetIsInitialized, stableUseEffect, stableGetWinVariations, stableGetLoseVariations, stableSetVariation, stableFloor, stableRandom, stableFloor, stableRandom, stableGetRandomPrize, stableSetReward, stableUseEffect, stableGetContext, stableGetBoundingClientRect, stableFillRect, stableFloor, stableFillText, stableResize, stableResizeObserver, stableObserve, stableDisconnect]);;

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 40;

    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + 0.1, y + 0.1);
    }
    ctx.stroke();

    lastPos.current = { x, y };

    const now = Date.now();
    if (now - lastCheck.current > 200 && !revealed) {
      lastCheck.current = now;
      checkProgress();
    }
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    let totalSampled = 0;
    
    // Échantillonnage de 1 pixel sur 100 (1% des pixels)
    for (let i = 3; i < imageData.data.length; i += 100) {
      totalSampled++;
      if (imageData.data[i] === 0) transparent++;
    }
    
    // Calcul correct du pourcentage basé sur l'échantillonnage réel
    const percent = totalSampled > 0 ? transparent / totalSampled : 0;

    if (percent > threshold && !revealed) {
      setRevealed(true);
      setPopupVisible(true);

      // 🎆 Confettis avec requestAnimationFrame pour les performances (seulement pour les gains)
      if (isWinner) {
        requestAnimationFrame(() => {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        });
      }

      // Emojis selon reward
      triggerEmojis();

      // Callback onReveal si fourni
      if (onReveal) {
        onReveal(reward);
      }
    }
  };

  // Emojis cohérents par type de récompense
  const getEmojiSet = () => {
    if (!isWinner) {
      // Emojis de consolation - aléatoires mais cohérents
      const sadEmojis = ["😢", "😔", "😞", "💔", "😕", "🙁", "😟", "😿"];
      return sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
    }
    
    if (reward.type === "golden") {
      // Emojis dorés et spéciaux
      const goldenEmojis = ["🎟️", "✨", "💎", "🏆", "👑", "⭐", "🌟", "💫"];
      return goldenEmojis[Math.floor(Math.random() * goldenEmojis.length)];
    }
    
    if (reward.type === "points") {
      if (reward.amount >= 200) {
        // Gros gains - emojis d'argent
        const moneyEmojis = ["💰", "💵", "💸", "💴", "💶", "💷", "🪙", "💎"];
        return moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)];
      } else if (reward.amount >= 100) {
        // Gains moyens - emojis de joie
        const happyEmojis = ["🎉", "🎊", "🥳", "😄", "😁", "🤩", "🎈", "🎁"];
        return happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
      } else {
        // Petits gains - emojis de contentement
        const contentEmojis = ["😊", "🙂", "😌", "😇", "🥰", "😋", "🎯", "✨"];
        return contentEmojis[Math.floor(Math.random() * contentEmojis.length)];
      }
    }
    
    if (reward.type === "reduction" || reward.type === "offer") {
      if (reward.amount >= 20) {
        // Grosses réductions - emojis d'excitation
        const excitedEmojis = ["🤯", "😱", "🤩", "🔥", "💥", "⚡", "🚀", "🎆"];
        return excitedEmojis[Math.floor(Math.random() * excitedEmojis.length)];
      } else if (reward.amount >= 10) {
        // Réductions moyennes - emojis de satisfaction
        const satisfiedEmojis = ["😎", "🤗", "😏", "😉", "🙃", "😋", "🛍️", "💳"];
        return satisfiedEmojis[Math.floor(Math.random() * satisfiedEmojis.length)];
      } else {
        // Petites réductions - emojis de plaisir
        const pleasedEmojis = ["😊", "🙂", "😌", "😇", "🥰", "😋", "🎯", "✨"];
        return pleasedEmojis[Math.floor(Math.random() * pleasedEmojis.length)];
      }
    }
    
    // Par défaut - emojis neutres
    const neutralEmojis = ["😊", "🙂", "😌", "😇", "🥰", "😋", "🎯", "✨"];
    return neutralEmojis[Math.floor(Math.random() * neutralEmojis.length)];
  };

  const triggerEmojis = () => {
    if (!isWinner) {
      // Perte - emojis tristes
      setShowSadEmojis(true);
      setTimeout(() => setShowSadEmojis(false), 5000);
    } else if (reward.type === "golden") {
      // Golden Ticket - emojis d'argent (le plus rare)
      setShowMoneyEmojis(true);
      setTimeout(() => setShowMoneyEmojis(false), 5000);
    } else if (reward.type === "points") {
      if (reward.amount >= 200) {
        // Gros gains - emojis d'argent
        setShowMoneyEmojis(true);
        setTimeout(() => setShowMoneyEmojis(false), 5000);
      } else if (reward.amount >= 100) {
        // Gains moyens - emojis joyeux
        setShowHappyEmojis(true);
        setTimeout(() => setShowHappyEmojis(false), 5000);
      } else {
        // Petits gains - emojis joyeux aussi
      setShowHappyEmojis(true);
      setTimeout(() => setShowHappyEmojis(false), 5000);
      }
    } else if (reward.type === "reduction" || reward.type === "offer") {
      if (reward.amount >= 20) {
        // Grosses réductions - emojis d'argent
      setShowMoneyEmojis(true);
      setTimeout(() => setShowMoneyEmojis(false), 5000);
    } else {
      // Réductions normales - emojis joyeux
      setShowHappyEmojis(true);
      setTimeout(() => setShowHappyEmojis(false), 5000);
    }
    } else {
      // Par défaut - emojis joyeux pour les gains
      setShowHappyEmojis(true);
      setTimeout(() => setShowHappyEmojis(false), 5000);
    }
  };

  const getPopupVariant = () => {
    // Toutes les variantes utilisent maintenant la bannière
    return "banniere";
  };

  const getPopupTitle = () => {
    const emoji = getEmojiSet();
    if (!isWinner) return `${emoji} Dommage`;
    if (reward.type === "golden") return `${emoji} GOLDEN TICKET !`;
    if (reward.type === "points") return `${emoji} Félicitations !`;
    if (reward.type === "offer") return `${emoji} Offre débloquée`;
    if (reward.type === "reduction") return `${emoji} Réduction gagnée`;
    return `${emoji} Bravo !`;
  };

  const getPopupMessage = () => {
    const emoji = getEmojiSet();
    if (!isWinner) return `Aucun gain cette fois-ci. Reviens bientôt pour retenter ta chance ${emoji}`;
    if (reward.type === "golden") return `GOLDEN TICKET ! Tu as gagné ${reward.amount} points spéciaux ! ${emoji}💎`;
    if (reward.type === "points") return `Tu as gagné ${reward.amount} points Kanpanya ! ${emoji}`;
    if (reward.type === "offer") return `-${reward.amount}% de réduction chez ${reward.merchant} ! ${emoji}`;
    if (reward.type === "reduction") return `Tu as gagné ${reward.amount}% de réduction ! ${emoji}`;
    return `Merci d'avoir participé ! ${emoji}`;
  };

  const handleDown = (x: number, y: number) => {
    lastPos.current = { x, y };
    scratchAt(x, y);
  };

  const handleUp = () => {
    lastPos.current = null;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let x = 0,
      y = 0;
    if ("touches" in e) {
      // Mobile : empêcher le scroll/zoom pendant le grattage
      e.preventDefault();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    scratchAt(x, y);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 relative">
      <h2 className="text-2xl font-extrabold mb-4 text-center animate-bounce">
        🎟️✨ Gratte ton ticket magique ✨🎟️
      </h2>

      {/* Carte Kanpanya */}
      <div
        ref={containerRef}
        className={`relative w-80 h-44 text-white rounded-2xl shadow-xl p-5 flex items-center justify-center
          bg-gradient-to-br ${ticketGradient.gradient}
          ${ticketGradient.isGolden ? "ring-4 ring-yellow-400 animate-pulse" : ""}`}
      >
        <div className="text-xl font-bold text-center">
          {ticketGradient.isGolden ? "🎟️ GOLDEN TICKET 🎟️" : variation}
        </div>
        
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 rounded-2xl touch-none"
            role="button"
            aria-label="Carte à gratter - Grattez pour révéler votre récompense"
            tabIndex={0}
            onMouseMove={handleMove}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              handleDown(e.clientX - rect.left, e.clientY - rect.top);
            }}
            onMouseUp={handleUp}
            onTouchMove={handleMove}
            onTouchStart={(e) => {
              // Mobile : empêcher le scroll/zoom au début du grattage
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              handleDown(touch.clientX - rect.left, touch.clientY - rect.top);
            }}
            onTouchEnd={handleUp}
            onKeyDown={(e) => {
              // Support clavier pour l'accessibilité
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                handleDown(rect.width / 2, rect.height / 2);
              }
            }}
          />
        )}
      </div>

      {/* Popup avec accessibilité */}
      {popupVisible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-labelledby="popup-title"
          aria-describedby="popup-message"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Popup
            variant={getPopupVariant() as unknown}
            title={getPopupTitle()}
            message={getPopupMessage()}
            onClose={() => setPopupVisible(false)}
          />
        </div>
      )}

      {/* Emoji Rains */}
      {showSadEmojis && <SadEmojiRain count={35} isWinner={false} />}
      {showHappyEmojis && <HappyEmojiRain count={35} isWinner={true} />}
      {showMoneyEmojis && <MoneyEmojiRain count={35} isWinner={true} />}

    </div>
  );
}

