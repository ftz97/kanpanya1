"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>("");
  const [revealed, setRevealed] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [prize, setPrize] = useState("");
  const [isClient, setIsClient] = useState(false);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastCheck = useRef<number>(0);

  const WIN_VARIATIONS = ["🎉 Félicitations !", "🎊 Bravo !", "🏆 Excellent !", "✨ Incroyable !"];

  const getRandomPrize = () => {
    const POINTS = ["+10 points", "+20 points", "+50 points", "+100 points"];
    return POINTS[Math.floor(Math.random() * POINTS.length)];
  };

  useEffect(() => {
    setIsClient(true);
    setIsWinner(true); // tu peux changer ici pour du random
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setVariation(WIN_VARIATIONS[Math.floor(Math.random() * WIN_VARIATIONS.length)]);
    setPrize(reward ? reward.label : getRandomPrize());
  }, [isClient, reward]);

  useEffect(() => {
    if (isClient) drawScratchSurface();
  }, [isClient]);

  // ⚡ Ajoute ce useEffect pour dessiner dès le montage
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Taille du canvas
    const size = canvas.width;

    // Fond gris métallisé pour scratch
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#c0c0c0");
    gradient.addColorStop(0.5, "#e0e0e0");
    gradient.addColorStop(1, "#a0a0a0");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, canvas.height);

    // Texte "Grattez" au-dessus
    ctx.fillStyle = "#555";
    ctx.font = `bold ${size * 0.1}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎁", size / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      canvas.width = size;
      canvas.height = size;
      drawScratchSurface();
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, []);

  const drawScratchSurface = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const size = canvas.width;
    const height = canvas.height;

    // --- Fond gris métallisé ---
    const gradient = ctx.createLinearGradient(0, 0, size, height);
    gradient.addColorStop(0, "#dcdcdc");
    gradient.addColorStop(0.4, "#f0f0f0");
    gradient.addColorStop(0.7, "#c0c0c0");
    gradient.addColorStop(1, "#e5e5e5");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, height);

    // --- Texte au centre ---
    ctx.font = `600 ${height * 0.18}px 'Poppins', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dégradé turquoise Kanpanya
    const textGradient = ctx.createLinearGradient(0, 0, size, 0);
    textGradient.addColorStop(0, "#17BFA0");
    textGradient.addColorStop(1, "#14a58d");
    ctx.fillStyle = textGradient;

    // Ombre légère
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 4;

    ctx.fillText("À toi de jouer", size / 2, height / 2);

    ctx.shadowBlur = 0;
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

  const handleMouseDown = (e: React.MouseEvent) => handleDown(e.clientX, e.clientY);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const handleMouseUp = () => handleUp();

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDown(touch.clientX, touch.clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  const handleTouchEnd = () => handleUp();

  return (
    <div className="relative">
      <div className="relative mx-auto my-6 w-[300px] md:w-[360px] aspect-[1.6/1] rounded-xl shadow-lg overflow-hidden">
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

      {/* Popup gain */}
      <AnimatePresence>
        {popupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full relative"
            >
              {isWinner && <EmojiRain mode="hearts" running={true} />}
              <motion.h2
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-3xl font-bold mb-4 text-gray-800"
              >
                {variation}
              </motion.h2>
              <p className="text-xl font-semibold text-gray-700 mb-6">{prize}</p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setPopupVisible(false)}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition"
                >
                  Fermer
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
                >
                  Rejouer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}