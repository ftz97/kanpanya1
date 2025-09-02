'use client';

import { useEffect, useRef, useState } from 'react';
import type { ScratchReward } from '@/hooks/useScratchAvailability';

// Confettis léger (utilise canvas-confetti si dispo, sinon soft fallback)
async function fireConfetti(){
  try{
    const confetti = (await import('canvas-confetti')).default;
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
  }catch{
    // Fallback : petite secousse
    if (typeof window !== 'undefined') {
      document.body.animate([
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-4px)' },
        { transform: 'translateY(0px)' }
      ], { duration: 300, iterations: 2 });
    }
  }
}

export default function ScratchCard({
  reward,
  onReveal,
  width = 320,
  height = 180,
  coverText = 'Gratte ici',
}: {
  reward: ScratchReward;
  onReveal?: () => void;
  width?: number;
  height?: number;
  coverText?: string;
}){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    // Setup overlay
    canvas.width = width; canvas.height = height;
    const grd = ctx.createLinearGradient(0,0,width,height);
    grd.addColorStop(0, '#bfc7cc');
    grd.addColorStop(1, '#8b959e');
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,width,height);

    // Label
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '600 18px system-ui, -apple-system, Segoe UI, Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(coverText, width/2, height/2);
  }, [width, height, coverText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let drawing = false;
    const rect = () => canvas.getBoundingClientRect();

    const scratch = (x:number, y:number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI*2);
      ctx.fill();
      updatePercent();
    };

    const getXY = (e: PointerEvent) => {
      const r = rect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onDown = (e: PointerEvent) => { drawing = true; canvas.setPointerCapture(e.pointerId); scratch(...Object.values(getXY(e)) as [number,number]); };
    const onMove = (e: PointerEvent) => { if(!drawing) return; scratch(...Object.values(getXY(e)) as [number,number]); };
    const onUp = (e: PointerEvent) => { drawing = false; try{ canvas.releasePointerCapture(e.pointerId); }catch{} };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', onUp);

    function updatePercent(){
      try{
        const { data } = ctx.getImageData(0,0,canvas.width, canvas.height);
        let cleared = 0;
        for (let i = 3; i < data.length; i+=4) { // alpha channel
          if (data[i] === 0) cleared++;
        }
        const p = Math.round((cleared / (canvas.width * canvas.height)) * 100);
        setPercent(p);
      }catch{}
    }

    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerleave', onUp);
    };
  }, []);

  useEffect(() => {
    if (!revealed && percent >= 60){
      setRevealed(true);
      fireConfetti();
      onReveal?.();
    }
  }, [percent, revealed, onReveal]);

  const rewardBadge = () => {
    if (reward.type === 'points'){
      const label = reward.label ?? `+${reward.amount} points`;
      return <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">{label}</span>;
    }
    return <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">{reward.label}</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pop">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Ticket à gratter</h3>
        <span className="text-xs text-gray-500">{percent}%</span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Récompense (dessous) */}
        <div className="flex flex-col items-center justify-center min-h-[180px] rounded-xl border border-dashed border-primary">
          <div className="text-3xl">🎁</div>
          <div className="mt-2 mb-3 text-center text-gray-700">
            {reward.type === 'points' ? (
              <>
                <div className="text-xl font-semibold">Récompense mystère</div>
                <div className="text-sm text-gray-500">Gratte pour voir tes points</div>
              </>
            ) : (
              <>
                <div className="text-xl font-semibold">Coupon mystère</div>
                <div className="text-sm text-gray-500">Gratte pour révéler le bon plan</div>
              </>
            )}
          </div>
          <div className={`transition ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} duration-300`}>{rewardBadge()}</div>
        </div>

        {/* Overlay à gratter (dessus) */}
        <div className="relative">
          <canvas ref={canvasRef} className="rounded-xl w-full h-full touch-none select-none"></canvas>
          {/* Texture métallique légère par-dessus pour le style */}
          <div className="pointer-events-none absolute inset-0 rounded-xl" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0))',
            mixBlendMode: 'overlay'
          }} />
        </div>
      </div>

      {revealed && (
        <div className="mt-4 text-center text-sm text-gray-600">Bien joué ! Ta récompense est dévoilée.</div>
      )}
    </div>
  );
}