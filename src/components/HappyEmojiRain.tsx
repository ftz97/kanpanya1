"use client";
import { motion } from "framer-motion";
import React from "react";

const HappyEmojiRain = ({ 
  count = 20, 
  speedConfig = { duration: 4, delay: 2 } 
}: { 
  count?: number;
  speedConfig?: { duration: number; delay: number };
}) => {
  const emojis = Array.from({ length: count });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {emojis.map((_, i) => {
        // Variations aléatoires mais mouvement vertical uniquement
        const delay = Math.random() * speedConfig.delay;
        const duration = speedConfig.duration + Math.random() * 2;
        const startX = Math.random() * window.innerWidth;
        const size = 20 + Math.random() * 30;
        
        // Variations de timing et vitesse uniquement
        const speedVariation = 0.8 + Math.random() * 0.4; // Variation de vitesse ±20%
        const delayVariation = Math.random() * 0.5; // Variation de délai

        return (
          <motion.div
            key={i}
            initial={{ 
              y: -100, 
              x: startX
            }}
            animate={{ 
              y: window.innerHeight + 100,
              x: startX // Reste à la même position X
            }}
            transition={{ 
              duration: duration * speedVariation, 
              delay: delay + delayVariation, 
              repeat: Infinity,
              ease: "linear", // Mouvement linéaire vertical
              repeatType: "loop"
            }}
            style={{
              position: "absolute",
              fontSize: size,
              opacity: 1
            }}
          >
            🎉
          </motion.div>
        );
      })}
    </div>
  );
};

export default HappyEmojiRain;
