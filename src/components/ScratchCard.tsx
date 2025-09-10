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

  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>("");
  const [revealed, setRevealed] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupClosing, setPopupClosing] = useState(false);
  const [prize, setPrize] = useState("");
  const [isClient, setIsClient] = useState(false);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastCheck = useRef<number>(0);

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

  const getRandomPrize = (winner: boolean) => {
    if (!winner) return "Pas de gain";
    const POINTS = ["+10 points", "+20 points", "+50 points", "+100 points"];
    const REDUCTIONS = ["-5% réduction", "-10% réduction", "-15% réduction"];
    const pool = Math.random() < 0.5 ? POINTS : REDUCTIONS;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  useEffect(() => {
    setIsClient(true);
    if (reward) {
      setIsWinner(true);
    } else {
      setIsWinner(Math.random() > 0.5);
    }
  }, [reward]);

  useEffect(() => {
    if (!isClient) return;

    if (reward) {
      setVariation(WIN_VARIATIONS[Math.floor(Math.random() * WIN_VARIATIONS.length)]);
      setPrize(reward.label);
    } else {
      setVariation(
        isWinner
          ? WIN_VARIATIONS[Math.floor(Math.random() * WIN_VARIATIONS.length)]
          : LOSE_VARIATIONS[Math.floor(Math.random() * LOSE_VARIATIONS.length)]
      );
      setPrize(getRandomPrize(isWinner));
    }
  }, [isWinner, isClient, reward]);

  // Appel direct au montage pour dessiner la surface
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

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 300);

      canvas.width = size;
      canvas.height = size;

      if (isClient) {
        drawScratchSurface();
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isClient]);

  const drawScratchSurface = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const size = canvas.width;

    // Dégradé argenté
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#C0C0C0");
    gradient.addColorStop(0.5, "#E8E8E8");
    gradient.addColorStop(1, "#A0A0A0");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#444";
    ctx.font = `bold ${size * 0.08}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("Grattez ici", size / 2, size / 2);
  };

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 20, 0, Math.PI * 2);
    ctx.fill();

    const now = Date.now();
    if (now - lastCheck.current < 100) return;
    lastCheck.current = now;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = transparent / (canvas.width * canvas.height);

    if (percent > 0.3 && !revealed) {
      setRevealed(true);
      setPopupVisible(true);

      if (onReveal) onReveal();

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

  const handleMove = (x: number, y: number) => {
    if (!lastPos.current) return;

    const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };
    scratchAt(x, y);
  };

  const handleUp = () => {
    lastPos.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDown(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleUp();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDown(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleUp();
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: "300px", aspectRatio: "1" }}
      >
        {/* Contenu en dessous */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-yellow-100 to-orange-100 z-10">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ticket à gratter</h3>
          <p className="text-sm text-gray-600 mb-4">Grattez pour découvrir votre récompense</p>

          {revealed && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-2">{variation}</div>
              <div className="text-lg font-semibold text-gray-800">{prize}</div>
            </div>
          )}
        </div>

        {/* Surface à gratter */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair z-20"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none" }}
        />
      </div>

      {/* Popup */}
      {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-500 ${
              popupClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <div className="text-6xl mb-4">{isWinner ? "🎉" : "😔"}</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{variation}</h2>
            <p className="text-xl text-gray-600 mb-6">{prize}</p>
            {isWinner && <EmojiRain mode="hearts" running={true} />}
          </div>
        </div>
      )}
    </div>
  );
}