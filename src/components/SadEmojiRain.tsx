"use client";
import { motion } from "framer-motion";
import React from "react";

const SadEmojiRain = ({ count = 20 }: { count?: number }) => {
  const emojis = Array.from({ length: count });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {emojis.map((_, i) => {
        const delay = Math.random() * 2; // décalage entre les emojis
        const duration = 3 + Math.random() * 2; // durée différente
        const startX = Math.random() * window.innerWidth;
        const size = 30 + Math.random() * 20;

        return (
          <motion.div
            key={i}
            initial={{ y: -100, x: startX, opacity: 0 }}
            animate={{ y: window.innerHeight + 100, opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity }}
            style={{
              position: "absolute",
              fontSize: size,
            }}
          >
            😢
          </motion.div>
        );
      })}
    </div>
  );
};

export default SadEmojiRain;
