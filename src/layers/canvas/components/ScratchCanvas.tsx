"use client";

import { useRef, useEffect, useState } from 'react';
import { ScratchCanvasProps } from '../types';

export function ScratchCanvas({ onReveal, onProgress, reward }: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    drawScratchSurface();
  }, []);

  const drawScratchSurface = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Fond gris métallisé
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#dcdcdc');
    gradient.addColorStop(0.4, '#f0f0f0');
    gradient.addColorStop(0.7, '#c0c0c0');
    gradient.addColorStop(1, '#e5e5e5');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Texte au centre
    ctx.font = `600 ${height * 0.18}px 'Poppins', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const textGradient = ctx.createLinearGradient(0, 0, width, 0);
    textGradient.addColorStop(0, '#17BFA0');
    textGradient.addColorStop(1, '#14a58d');
    ctx.fillStyle = textGradient;
    
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 4;
    ctx.fillText('À toi de jouer', width / 2, height / 2);
    ctx.shadowBlur = 0;
  };

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculer le pourcentage gratté
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const newProgress = transparent / (canvas.width * canvas.height);
    setProgress(newProgress);
    onProgress?.(newProgress);

    // Révéler si plus de 30% gratté
    if (newProgress > 0.3 && !isRevealed) {
      setIsRevealed(true);
      onReveal?.();
    }
  };

  const handleDown = (x: number, y: number) => {
    lastPos.current = { x, y };
    scratchAt(x, y);
  };

  const handleMove = (x: number, y: number) => {
    if (!lastPos.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
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

  // Event handlers
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
    <div className="relative mx-auto my-6 w-[300px] md:w-[360px] aspect-[1.6/1] rounded-xl shadow-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair z-20"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      />
      
      {/* Barre de progression */}
      <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#17BFA0] transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
