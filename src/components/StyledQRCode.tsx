"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QrCode, Sparkles, Gift, Star } from "lucide-react";

interface StyledQRCodeProps {
  value: string;
  size?: number;
  title?: string;
  subtitle?: string;
  points?: number;
  type?: "client" | "merchant" | "gift";
  className?: string;
  showDecoration?: boolean;
}

export default function StyledQRCode({
  value,
  size = 200,
  title,
  subtitle,
  points,
  type = "client",
  className = "",
  showDecoration = true
}: StyledQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Générer l'URL du QR code
  useEffect(() => {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&color=000000&bgcolor=ffffff&margin=10`;
    setQrCodeUrl(qrApiUrl);
  }, [value, size]);

  // Déterminer les couleurs selon le type
  const getGradientColors = () => {
    switch (type) {
      case "gift":
        return {
          gradient: "from-green-400 via-emerald-500 to-teal-500",
          bgGradient: "from-green-50 to-emerald-50",
          accentColor: "text-green-600",
          borderColor: "border-green-200"
        };
      case "merchant":
        return {
          gradient: "from-green-400 via-emerald-500 to-teal-500",
          bgGradient: "from-green-50 to-emerald-50",
          accentColor: "text-green-600",
          borderColor: "border-green-200"
        };
      default: // client - style vert cadeau par défaut
        return {
          gradient: "from-green-400 via-emerald-500 to-teal-500",
          bgGradient: "from-green-50 to-emerald-50",
          accentColor: "text-green-600",
          borderColor: "border-green-200"
        };
    }
  };

  const colors = getGradientColors();

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {/* Container principal avec gradient de fond */}
      <div className={`relative bg-gradient-to-br ${colors.bgGradient} rounded-3xl p-8 shadow-2xl ${colors.borderColor} border-2`}>
        
        {/* Effets de décoration */}
        {showDecoration && (
          <>
            {/* Particules flottantes */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>

            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Star className="w-2.5 h-2.5 text-white" />
            </motion.div>
          </>
        )}

        {/* En-tête avec icône et titre */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl mb-4 shadow-lg`}
          >
            {type === "gift" ? (
              <Gift className="w-8 h-8 text-white" />
            ) : (
              <QrCode className="w-8 h-8 text-white" />
            )}
          </motion.div>
          
          {title && (
            <motion.h3
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold text-gray-800 mb-2"
            >
              {title}
            </motion.h3>
          )}
          
          {subtitle && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-600"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* QR Code avec effet de brillance */}
        <div className="relative flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative"
          >
            {/* Fond du QR code avec gradient */}
            <div className={`bg-gradient-to-br ${colors.gradient} p-4 rounded-2xl shadow-xl`}>
              <div className="bg-white rounded-xl p-3 shadow-inner">
                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="rounded-lg"
                    style={{ width: size, height: size }}
                    onLoad={handleImageLoad}
                  />
                )}
              </div>
            </div>

            {/* Effet de brillance */}
            <motion.div
              initial={{ x: -size - 20, opacity: 0 }}
              animate={{ x: size + 20, opacity: [0, 0.6, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Points ou informations supplémentaires */}
        {points !== undefined && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-full font-semibold shadow-lg`}>
              <Star className="w-4 h-4" />
              <span>{points.toLocaleString()} points</span>
            </div>
          </motion.div>
        )}

        {/* Bordure animée */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute inset-0 rounded-3xl border-2 ${colors.borderColor} opacity-50`}
        />
      </div>

      {/* Effet de lueur externe */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-3xl blur-xl -z-10`}
      />
    </motion.div>
  );
}
