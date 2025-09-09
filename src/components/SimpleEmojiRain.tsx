"use client";
import { useEffect, useState } from "react";

const SAD_SET = ["\u{1F622}", "\u{1F62D}", "\u{1F614}"]; // 😢 😭 😔
const HAPPY_SET = ["\u{1F604}", "\u{1F60D}", "\u{1F929}", "\u{1F60E}"]; // 😄 😍 🤩 😎

export default function EmojiRain({
  won = false,
  running = false,
  durationMs = 3000,
  density = "medium", // "light" | "medium" | "heavy"
  onEnd,
}: {
  won?: boolean;
  running?: boolean;
  durationMs?: number;
  density?: "light" | "medium" | "heavy";
  onEnd?: () => void;
}) {
  const [emojis, setEmojis] = useState<
    { id: number; emoji: string; left: number; duration: number }[]
  >([]);

  useEffect(() => {
    if (!running) return;

    const set = won ? HAPPY_SET : SAD_SET;

    // fréquence ajustée (+20% densité supplémentaire)
    const intervalDelay =
      density === "light" ? 256 : density === "heavy" ? 64 : 128;

    const interval = setInterval(() => {
      setEmojis(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          emoji: set[Math.floor(Math.random() * set.length)],
          left: Math.random() * 100, // position horizontale %
          duration: 3 + Math.random() * 2, // vitesse descente 3–5s
        },
      ]);
    }, intervalDelay);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onEnd?.();
    }, durationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [running, won, durationMs, density, onEnd]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {emojis.map(e => (
        <span
          key={e.id}
          className="absolute text-4xl animate-fall"
          style={{
            left: `${e.left}%`,
            animationDuration: `${e.duration}s`,
            top: "-50px",
          }}
        >
          {e.emoji}
        </span>
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(110vh);
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}