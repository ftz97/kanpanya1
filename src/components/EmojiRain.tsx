"use client";
import { useEffect, useState } from "react";

type EmojiRainProps = {
  mode: "hearts" | "sad"; // "hearts" = win, "sad" = lose
  running: boolean;
  durationMs?: number;
};

export default function EmojiRain({ mode, running, durationMs = 5000 }: EmojiRainProps) {
  const [emojis, setEmojis] = useState<
    { symbol: string; left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    if (!running) return;

    const WIN_EMOJIS = ["💰", "🎁", "😍", "🤩", "😎", "🎉", "✨"];
    const LOSE_EMOJIS = ["😢", "😭", "🙁", "💔"];

    const symbols = mode === "hearts" ? WIN_EMOJIS : LOSE_EMOJIS;

    const newEmojis = Array.from({ length: 40 }, () => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const left = `${Math.random() * 100}%`;
      const delay = `${Math.random() * 2}s`;
      const duration = `${3 + Math.random() * 3}s`;
      return { symbol, left, delay, duration };
    });

    setEmojis(newEmojis);

    const timer = setTimeout(() => setEmojis([]), durationMs);
    return () => clearTimeout(timer);
  }, [running, mode, durationMs]);

  if (!running || emojis.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {emojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-3xl animate-fall"
          style={{
            left: emoji.left,
            top: `-50px`,
            animationDelay: emoji.delay,
            animationDuration: emoji.duration,
          }}
        >
          {emoji.symbol}
        </span>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
      `}</style>
    </div>
  );
}