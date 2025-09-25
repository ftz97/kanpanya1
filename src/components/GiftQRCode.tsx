"use client";

import { motion } from "framer-motion";
import StyledQRCode from "./StyledQRCode";

interface GiftQRCodeProps {
  value: string;
  rewardTitle: string;
  rewardDescription?: string;
  points?: number;
  className?: string;
}

export default function GiftQRCode({
  value,
  rewardTitle,
  rewardDescription,
  points,
  className = ""
}: GiftQRCodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {/* Container principal avec effet de cadeau */}
      <div className="relative">
        {/* Ruban décoratif */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -45 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg z-20"
        >
          🎁 CADEAU
        </motion.div>

        {/* QR Code stylisé avec type "gift" */}
        <StyledQRCode
          value={value}
          size={220}
          title={rewardTitle}
          subtitle={rewardDescription}
          points={points}
          type="gift"
          showDecoration={true}
        />

        {/* Effets de confettis */}
        <motion.div
          animate={{ 
            y: [-10, -20, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -left-2 text-2xl"
        >
          🎉
        </motion.div>

        <motion.div
          animate={{ 
            y: [-5, -15, -5],
            rotate: [0, -3, 3, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute -top-2 -right-2 text-xl"
        >
          ✨
        </motion.div>

        <motion.div
          animate={{ 
            y: [-8, -18, -8],
            rotate: [0, 4, -4, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-2 left-1/4 text-lg"
        >
          🌟
        </motion.div>

        <motion.div
          animate={{ 
            y: [-6, -16, -6],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute -bottom-2 right-1/4 text-lg"
        >
          🎊
        </motion.div>
      </div>

        {/* Message de félicitations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 font-semibold text-sm">
              🎉 Félicitations ! Scannez ce QR code pour récupérer votre récompense
            </p>
          </div>
        </motion.div>
    </motion.div>
  );
}
