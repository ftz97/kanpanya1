"use client";

import { useRef, useState, useEffect } from "react";
import EmojiRain from "./EmojiRain";

interface ScratchCardProps {
  reward?: {
    type: string;
    amount: number;
    label: string;
  };
  onReveal?: () => void;
}

export default function ScratchCard({ reward, onReveal }: ScratchCardProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // état
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>("");
  const [revealed, setRevealed] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupClosing, setPopupClosing] = useState(false);
  const [prize, setPrize] = useState("");
  const [isClient, setIsClient] = useState(false);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastCheck = useRef<number>(0);

  // Variations de texte
  const WIN_VARIATIONS = [
    "🎉 Félicitations !",
    "🎊 Bravo !",
    "🏆 Excellent !",
    "✨ Incroyable !",
    "🎯 Parfait !",
  ];

  const LOSE_VARIATIONS = [
    "😢 Dommage...",
    "😞 Pas cette fois...",
    "😕 Essayez encore !",
    "🙃 Presque...",
    "😅 Raté !",
  ];

  function getRandomPrize(won: boolean): string {
    if (!won) return "Aucun gain, mais merci d'avoir participé 💡";
    const POINTS = ["+50 points Kanpanya", "+100 points", "+200 points"];
    const REDUCTIONS = ["-5% réduction", "-10% réduction", "-15% réduction"];
    const pool = Math.random() < 0.5 ? POINTS : REDUCTIONS;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Dessiner la surface à gratter
  const drawScratchSurface = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const size = canvas.width;
    
    // Fond rouge
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, size, size);
    
    // Texte "Grattez ici"
    ctx.fillStyle = "#666";
    ctx.font = `bold ${size * 0.08}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("Grattez ici", size / 2, size / 2);
  };

  // Init client-side seulement
  useEffect(() => {
    setIsClient(true);
    // Si on a des props reward, on utilise la logique de récompense
    if (reward) {
      setIsWinner(true); // Toujours gagnant si on a une récompense
    } else {
      setIsWinner(Math.random() > 0.5);
    }
  }, [reward]);

  // Init texte après hydratation
  useEffect(() => {
    if (!isClient) return;
    
    if (reward) {
      // Utiliser la récompense fournie
      setVariation(WIN_VARIATIONS[Math.floor(Math.random() * WIN_VARIATIONS.length)]);
      setPrize(reward.label);
    } else {
      // Utiliser la logique par défaut
      setVariation(
        isWinner
          ? WIN_VARIATIONS[Math.floor(Math.random() * WIN_VARIATIONS.length)]
          : LOSE_VARIATIONS[Math.floor(Math.random() * LOSE_VARIATIONS.length)]
      );
      setPrize(getRandomPrize(isWinner));
    }
  }, [isWinner, isClient, reward]);

  // Dessiner la surface de grattage après hydratation
  useEffect(() => {
    if (isClient) {
      drawScratchSurface();
    }
  }, [isClient]);

  // Resize dynamique
  useEffect(() => {
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

    // limiter le check
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
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = transparent / (canvas.width * canvas.height);

    if (percent > 0.3 && !revealed) {
      setRevealed(true);
      setPopupVisible(true);

      // Appeler onReveal si fourni
      if (onReveal) {
        onReveal();
      }

      setTimeout(() => {
        setPopupClosing(true);
        setTimeout(() => {
          setPopupVisible(false);
          setPopupClosing(false);
        }, 1000);
      }, 3000);
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
    let x = 0,
      y = 0;
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    scratchAt(x, y);
  };

  // Afficher un loader pendant l'hydratation
  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center p-6 relative">
        <h2 className="text-lg font-bold mb-3">🎟️ Gratte ton ticket !</h2>
        <div className="relative w-[300px] h-[180px] sm:w-[400px] sm:h-[240px] flex items-center justify-center rounded-lg overflow-hidden bg-white text-sm sm:text-base font-bold text-center p-2">
          <div className="animate-pulse text-gray-400">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 relative">
      <h2 className="text-lg font-bold mb-3">🎟️ Gratte ton ticket !</h2>

      {/* Conteneur responsive taille normale */}
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

      {/* pluie emojis */}
      {revealed && (
        <EmojiRain
          mode={isWinner ? "hearts" : "sad"}
          running={true}
          durationMs={5000}
        />
      )}

      {/* popup */}
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
          <div className="text-4xl mb-2">{isWinner ? "🎁" : "💔"}</div>
          <h3 className="text-lg font-bold mb-2">
            {isWinner ? "Félicitations !" : "Pas de chance..."}
          </h3>
          <p className="text-sm">{prize}</p>
        </div>
      )}

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
            transform: translate(-50%, -50%);
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