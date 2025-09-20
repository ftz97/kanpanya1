"use client";

import React from "react";
import { motion } from "framer-motion";

/* ------------------------------
   EmojiRain Components
------------------------------ */

interface EmojiRainProps {
  count?: number;
  isWinner?: boolean;
}

export function SadEmojiRain({ count = 35, isWinner = false }: EmojiRainProps) {
  const emojis = ["💔", "😢", "😭", "😔", "😞", "😟", "😕", "🙁", "☹️", "😿"];
  
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800);
        
        return (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ y: -50, x: startX }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 100,
              x: startX,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeOut",
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.div>
        );
      })}
    </div>
  );
}

export function HappyEmojiRain({ count = 35, isWinner = true }: EmojiRainProps) {
  const emojis = ["🥳", "🎉", "😃", "😄", "😁", "🤗", "😊", "😍", "🤩", "✨", "🎊", "🎈"];
  
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800);
        
        return (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ y: -50, x: startX }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 100,
              x: startX,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeOut",
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.div>
        );
      })}
    </div>
  );
}

export function MoneyEmojiRain({ count = 35, isWinner = true }: EmojiRainProps) {
  const emojis = ["💰", "🤑", "💵", "💎", "🏆", "⭐", "🌟", "💫", "✨", "🎯", "💸", "💳"];
  
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800);
        
        return (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ y: -50, x: startX }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 100,
              x: startX,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeOut",
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.div>
        );
      })}
    </div>
  );
}