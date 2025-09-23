"use client";

import React, { useState } from "react";
import { useScratchAvailability } from "@/hooks/useScratchAvailability";
import SadEmojiRain from "@/components/SadEmojiRain";
import HappyEmojiRain from "@/components/HappyEmojiRain";
import MoneyEmojiRain from "@/components/MoneyEmojiRain";

// Ancien code scratch (Version 1 - Canvas Custom) - AMÉLIORÉ
function OldScratchCard() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // état
  const [isWinner] = useState<boolean>(Math.random() > 0.5);
  const [variation, setVariation] = useState<string>("");
  const [revealed, setRevealed] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupClosing, setPopupClosing] = useState(false);
  const [prize, setPrize] = useState("");
  const [reward, setReward] = useState<{ type: string; amount: number }>({ type: "none", amount: 0 });

  // État pour emojis
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);

  const lastPos = React.useRef<{ x: number; y: number } | null>(null);
  const lastCheck = React.useRef<number>(0);

  const WIN_VARIATIONS = [
    "🎉 Bravo, tu repars avec une récompense !",
    "🏆 C'est gagné !",
    "✨ Quelle chance, tu as gagné !",
    "💎 Jackpot, félicitations !",
  ];
  const LOSE_VARIATIONS = [
    "😢 Pas de chance cette fois...",
    "💔 Dommage, retente ta chance bientôt !",
    "🙃 Ce n'est pas gagné aujourd'hui...",
    "😔 Tu feras mieux la prochaine fois !",
  ];

  function getRandomPrize(won: boolean) {
    if (!won) return { type: "none", amount: 0 };
    const POINTS = [50, 100, 200];
    const REDUCTIONS = [5, 10, 15]; // en %
    if (Math.random() < 0.5) {
      return { type: "points", amount: POINTS[Math.floor(Math.random() * POINTS.length)] };
    } else {
      return { type: "reduction", amount: REDUCTIONS[Math.floor(Math.random() * REDUCTIONS.length)] };
    }
  }

  // Init texte
  React.useEffect(() => {
    setVariation(
      isWinner
        ? WIN_VARIATIONS[Math.floor(Math.random() * WIN_VARIATIONS.length)]
        : LOSE_VARIATIONS[Math.floor(Math.random() * LOSE_VARIATIONS.length)]
    );
    const chosenReward = getRandomPrize(isWinner);
    setReward(chosenReward);
    setPrize(
      chosenReward.type === "points"
        ? `+${chosenReward.amount} points Kanpanya`
        : chosenReward.type === "reduction"
        ? `-${chosenReward.amount}% réduction`
        : "Aucun gain, mais merci d'avoir participé 💡"
    );
  }, [isWinner]);

  // Resize dynamique
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#9ca3af";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#111827";
      ctx.font = `bold ${Math.floor(width / 18)}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🎁 GRATTE ICI 🎁", width / 2, height / 2);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Scratch
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
    // ⚡ Optimisation: on échantillonne 1 pixel sur 10
    for (let i = 3; i < imageData.data.length; i += 40) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = transparent / (canvas.width * canvas.height / 10);

    if (percent > 0.4 && !revealed) {
      setRevealed(true);
      setPopupVisible(true);

      // 🎊 Déclenche les emojis selon le type de récompense
      triggerEmojis();

      setTimeout(() => {
        setPopupClosing(true);
        setTimeout(() => {
          setPopupVisible(false);
          setPopupClosing(false);
        }, 1000);
      }, 3000);
    }
  };

  const triggerEmojis = () => {
    if (reward.type === "points" && reward.amount >= 100) {
      setShowMoneyEmojis(true);
      setTimeout(() => setShowMoneyEmojis(false), 5000);
    } else if (reward.type === "points" && reward.amount > 0) {
      setShowHappyEmojis(true);
      setTimeout(() => setShowHappyEmojis(false), 5000);
    } else if (reward.type === "reduction" && reward.amount >= 10) {
      setShowMoneyEmojis(true);
      setTimeout(() => setShowMoneyEmojis(false), 5000);
    } else if (reward.type === "reduction" && reward.amount > 0) {
      setShowHappyEmojis(true);
      setTimeout(() => setShowHappyEmojis(false), 5000);
    } else {
      setShowSadEmojis(true);
      setTimeout(() => setShowSadEmojis(false), 5000);
    }
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
    let x = 0, y = 0;
    if ("touches" in e) {
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
      <h2 className="text-lg font-bold mb-3 text-red-600">🔴 ANCIEN CODE AMÉLIORÉ (Canvas + Emojis)</h2>

      <div
        ref={containerRef}
        className="relative w-[300px] h-[180px] sm:w-[400px] sm:h-[240px] flex items-center justify-center rounded-lg overflow-hidden bg-white text-sm sm:text-base font-bold text-center p-2"
      >
        {variation}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            onMouseMove={handleMove}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              handleDown(e.clientX - rect.left, e.clientY - rect.top);
            }}
            onMouseUp={handleUp}
            onTouchMove={handleMove}
            onTouchStart={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              handleDown(touch.clientX - rect.left, touch.clientY - rect.top);
            }}
            onTouchEnd={handleUp}
          />
        )}
      </div>

      {popupVisible && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            z-[9999] w-80 p-6 rounded-2xl shadow-2xl text-center
            ${popupClosing ? "animate-slide-out" : "animate-slide-in"}
            ${isWinner
              ? "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-gray-900"
              : "bg-gradient-to-r from-red-400 to-red-600 text-white"
            }`}
        >
          <div className="text-4xl mb-2">{isWinner ? "🎉" : "💔"}</div>
          <h3 className="text-lg font-bold mb-2">
            {isWinner ? "Félicitations !" : "Pas de chance..."}
          </h3>
          <p className="text-sm mb-3">{prize}</p>
          <button
            onClick={() => setPopupVisible(false)}
            className="mt-2 px-4 py-2 bg-black/20 rounded-lg hover:bg-black/40"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Animations d'emojis */}
      {showSadEmojis && <SadEmojiRain count={20} speedConfig={{ duration: 3, delay: 1.5 }} />}
      {showHappyEmojis && <HappyEmojiRain count={20} speedConfig={{ duration: 3, delay: 1.5 }} />}
      {showMoneyEmojis && <MoneyEmojiRain count={20} speedConfig={{ duration: 3, delay: 1.5 }} />}
    </div>
  );
}

// Nouveau code scratch (Version actuelle - Librairie)
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";

const ScratchCard = dynamic(() => import("react-scratchcard-v2"), { ssr: false });

function NewScratchCard() {
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);
  
  const emojiConfig = {
    count: 20,
    speedConfig: { duration: 3, delay: 1.5 }
  };

  const reward = { type: 'points' as const, amount: 50, label: '+50 points' };

  const settings = {
    width: 320,
    height: 200,
    image: "/scratch-overlay.png",
    finishPercent: 50,
    onComplete: () => {
      console.log("🎉 Scratch terminé :", reward.label);
      
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
      if (reward.type === "gift" || reward.amount >= 50) {
        setShowMoneyEmojis(true);
        setTimeout(() => setShowMoneyEmojis(false), 5000);
      } else if (reward.amount > 0) {
        setShowHappyEmojis(true);
        setTimeout(() => setShowHappyEmojis(false), 5000);
      } else {
        setShowSadEmojis(true);
        setTimeout(() => setShowSadEmojis(false), 5000);
      }
    },
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow relative text-center">
      <h2 className="text-lg font-bold mb-3 text-green-600">🟢 NOUVEAU CODE (Librairie)</h2>
      <p className="text-gray-600 mb-4">Grattez pour découvrir !</p>
      <ScratchCard {...settings}>
        <div className="w-full h-full flex items-center justify-center bg-white rounded-xl shadow">
          <p className="text-xl font-bold text-teal-600">{reward.label}</p>
        </div>
      </ScratchCard>
      
      {showSadEmojis && <SadEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
      {showHappyEmojis && <HappyEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
      {showMoneyEmojis && <MoneyEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
    </div>
  );
}

export default function TestScratchComparison() {
  const { state, activate, markUsed, clear } = useScratchAvailability();

  const resetOldCard = () => {
    window.location.reload();
  };

  const resetNewCard = () => {
    clear();
    activate({ quizId: 'test', points: 50, label: '+50 points' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎟️ Comparaison des Codes Scratch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Testez côte à côte l'ancien code (Canvas custom) et le nouveau code (Librairie react-scratchcard-v2)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ancien Code */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                🔴 Ancien Code AMÉLIORÉ (Canvas + Emojis)
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• ~250 lignes de code</p>
                <p>• Gestion manuelle des événements</p>
                <p>• Calculs optimisés (échantillonnage)</p>
                <p>• Animations d'emojis intégrées</p>
                <p>• Système de récompenses avancé</p>
                <p>• Bouton de fermeture popup</p>
              </div>
            </div>
            <OldScratchCard />
            <button 
              onClick={resetOldCard}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              🔄 Réinitialiser
            </button>
          </div>

          {/* Nouveau Code */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                🟢 Nouveau Code (Librairie)
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• ~80 lignes de code</p>
                <p>• Librairie éprouvée</p>
                <p>• Optimisations intégrées</p>
                <p>• Configuration simple</p>
                <p>• Animations confettis + emojis</p>
              </div>
            </div>
            <NewScratchCard />
            <button 
              onClick={resetNewCard}
              className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
            >
              🔄 Réinitialiser
            </button>
          </div>
        </div>

        {/* Comparaison détaillée */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 Analyse Comparative
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-4">❌ Ancien Code - Problèmes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Code complexe et difficile à maintenir</li>
                <li>• Gestion manuelle des événements mouse/touch</li>
                <li>• Calculs de pourcentage intensifs</li>
                <li>• ResizeObserver avec logique custom</li>
                <li>• Animations CSS inline avec styled-jsx</li>
                <li>• Gestion d'état complexe</li>
                <li>• Bugs potentiels sur mobile</li>
                <li>• Performance dégradée</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">✅ Nouveau Code - Avantages</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Code simple et lisible</li>
                <li>• Librairie testée et éprouvée</li>
                <li>• Optimisations de performance intégrées</li>
                <li>• Configuration déclarative</li>
                <li>• Animations confettis + emojis</li>
                <li>• Gestion d'état simplifiée</li>
                <li>• Compatibilité mobile native</li>
                <li>• Maintenance réduite</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Instructions de Test</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>1. <strong>Testez l'ancien code :</strong> Grattez la zone grise pour révéler le contenu</p>
            <p>2. <strong>Testez le nouveau code :</strong> Grattez l'image overlay pour révéler les points</p>
            <p>3. <strong>Comparez :</strong> Fluidité, réactivité, animations</p>
            <p>4. <strong>Mobile :</strong> Testez sur mobile pour voir la différence</p>
            <p>5. <strong>Performance :</strong> Ouvrez les DevTools pour comparer les performances</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInBounce {
          0% {
            transform: translate(-50%, -200%);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -55%);
          }
          100% {
            transform: translate(-50%, -50%);
          }
        }
        @keyframes slideOutUp {
          0% {
            transform: translate(-50%, -200%);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -200%);
            opacity: 0;
          }
        }
        .animate-slide-in {
          animation: slideInBounce 1.2s ease-out forwards;
        }
        .animate-slide-out {
          animation: slideOutUp 1s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
