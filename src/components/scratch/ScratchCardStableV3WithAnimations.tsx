"use client";

import React, { useRef, useState, useEffect } from "react";
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
  enableAdvancedAnimations?: boolean;
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

export default function ScratchCardStableV3WithAnimations({ 
  threshold = 0.4, 
  goldenTicketChance = 0.1, 
  onReveal,
  userId = "default-user",
  enableAdvancedAnimations = true
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // États pour le scratch
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // États pour les animations
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);

  // États pour le ticket et la récompense
  const [ticketGradient, setTicketGradient] = useState({ gradient: "", isGolden: false });
  const [isWinner, setIsWinner] = useState(false);
  const [reward, setReward] = useState<{ type: string; amount: number; merchant?: string } | null>(null);

  // Initialisation du ticket
  useEffect(() => {
    if (!isInitialized) {
      const gradient = getRandomTicketGradient(goldenTicketChance);
      setTicketGradient(gradient);
      setIsInitialized(true);
    }
  }, [isInitialized, goldenTicketChance]);

  // Détermination du gagnant et de la récompense
  useEffect(() => {
    if (isInitialized) {
      const variation = Math.random();
      const isWin = variation > 0.5; // 50% de chance de gagner
      setIsWinner(isWin);

      if (isWin) {
        // Récompenses gagnantes
        const winRewards = [
          { type: "points", amount: 100, merchant: "Kanpanya" },
          { type: "points", amount: 250, merchant: "Kanpanya" },
          { type: "points", amount: 500, merchant: "Kanpanya" },
          { type: "gift", amount: 1, merchant: "Partenaire" },
          { type: "discount", amount: 20, merchant: "Boutique" },
        ];
        setReward(winRewards[Math.floor(Math.random() * winRewards.length)]);
      } else {
        // Récompenses perdantes
        const loseRewards = [
          { type: "points", amount: 10, merchant: "Kanpanya" },
          { type: "points", amount: 25, merchant: "Kanpanya" },
          { type: "points", amount: 50, merchant: "Kanpanya" },
        ];
        setReward(loseRewards[Math.floor(Math.random() * loseRewards.length)]);
      }
    }
  }, [isWinner, isInitialized, ticketGradient.isGolden]);

  // Initialisation du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitialized) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Redimensionner le canvas
    const resizeCanvas = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Dessiner la surface de grattage
    const drawScratchSurface = () => {
      ctx.fillStyle = "#666666";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Ajouter un effet de texture
      ctx.fillStyle = "#888888";
      for (let i = 0; i < 100; i++) {
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          2,
          2
        );
      }
    };

    drawScratchSurface();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isInitialized]);

  // Fonction de grattage
  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    checkProgress();
  };

  // Vérification du progrès de grattage
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
      if (isWinner && enableAdvancedAnimations) {
        requestAnimationFrame(() => {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        });
      }

      // Emojis selon reward
      triggerEmojis();

      // Callback de révélation
      if (onReveal && reward) {
        onReveal(reward);
      }
    }
  };

  // Déclenchement des animations d'emojis
  const triggerEmojis = () => {
    if (!enableAdvancedAnimations) return;

    if (isWinner) {
      if (reward?.type === "points" && reward.amount >= 250) {
        setShowMoneyEmojis(true);
      } else {
        setShowHappyEmojis(true);
      }
    } else {
      setShowSadEmojis(true);
    }

    // Arrêter les animations après 3 secondes
    setTimeout(() => {
      setShowSadEmojis(false);
      setShowHappyEmojis(false);
      setShowMoneyEmojis(false);
    }, 3000);
  };

  // Gestion des événements tactiles et souris
  const handleDown = (x: number, y: number) => {
    setIsScratching(true);
    scratchAt(x, y);
  };

  const handleUp = () => {
    setIsScratching(false);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    scratchAt(x, y);
  };

  // Fonctions d'aide pour le popup
  const getPopupVariant = () => {
    if (ticketGradient.isGolden) return "banniere";
    return "banniere";
  };

  const getPopupTitle = () => {
    if (isWinner) {
      if (ticketGradient.isGolden) return "🏆 Golden Ticket !";
      return "🎉 Félicitations !";
    }
    return "😔 Dommage !";
  };

  const getPopupMessage = () => {
    if (!reward) return "";
    
    if (isWinner) {
      if (reward.type === "points") {
        return `Tu as gagné ${reward.amount} points Kanpanya !`;
      } else if (reward.type === "gift") {
        return `Tu as gagné un cadeau de ${reward.merchant} !`;
      } else if (reward.type === "discount") {
        return `Tu as gagné ${reward.amount}% de réduction chez ${reward.merchant} !`;
      }
    } else {
      return `Tu as gagné ${reward.amount} points de consolation !`;
    }
    return "";
  };

  if (!isInitialized) {
    return (
      <div className="w-80 h-44 bg-gray-200 rounded-2xl flex items-center justify-center">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-80 h-44 text-white rounded-2xl shadow-xl p-5 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400">
        {/* Contenu du ticket */}
        <div className="text-xl font-bold text-center">
          {!revealed ? (
            <div className="text-white/80">
              <div className="text-lg mb-2">🎫</div>
              <div className="text-sm">Grattez pour révéler</div>
            </div>
          ) : (
            <div className="text-white">
              <div className="text-2xl mb-2">
                {reward?.type === "points" && "💰"}
                {reward?.type === "gift" && "🎁"}
                {reward?.type === "discount" && "🏷️"}
              </div>
              <div className="text-sm">
                {reward?.amount} {reward?.type === "points" ? "points" : reward?.type === "gift" ? "cadeau" : "%"}
              </div>
            </div>
          )}
        </div>

        {/* Canvas de grattage */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 rounded-2xl touch-none"
          style={{ cursor: isScratching ? "grabbing" : "grab" }}
          onMouseDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleDown(e.clientX - rect.left, e.clientY - rect.top);
          }}
          onMouseUp={handleUp}
          onMouseMove={handleMove}
          onMouseLeave={handleUp}
          onTouchStart={(e) => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            handleDown(touch.clientX - rect.left, touch.clientY - rect.top);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleUp();
          }}
          onTouchMove={handleMove}
          role="button"
          aria-label="Carte à gratter - Grattez pour révéler votre récompense"
          tabIndex={0}
        />
      </div>

      {/* Animations d'emojis */}
      {enableAdvancedAnimations && (
        <>
          {showSadEmojis && <SadEmojiRain count={40} isWinner={false} />}
          {showHappyEmojis && <HappyEmojiRain count={50} isWinner={true} />}
          {showMoneyEmojis && <MoneyEmojiRain count={60} isWinner={true} />}
        </>
      )}

      {/* Popup de récompense */}
      {popupVisible && (
        <Popup
          variant={getPopupVariant()}
          title={getPopupTitle()}
          message={getPopupMessage()}
          isWinner={isWinner}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </>
  );
}

