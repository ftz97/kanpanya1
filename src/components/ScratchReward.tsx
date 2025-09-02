"use client";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

export default function ScratchReward() {
  const [done, setDone] = useState(false);
  const [win, setWin] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const { width, height } = useWindowSize();

  // Simulation aléatoire (tu pourras remplacer par ta logique Supabase)
  const revealResult = () => {
    const isWinner = Math.random() > 0.5;
    setWin(isWinner);
    setDone(true);
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(isWinner ? 200 : 100);
    }
  };

  const handleScratch = () => {
    if (isScratching) return;
    
    setIsScratching(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 70) {
        clearInterval(interval);
        setTimeout(() => {
          revealResult();
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Instructions */}
      {!done && (
        <h2 className="mb-4 text-lg font-bold text-gray-700 animate-pulse">
          👉 Découvrez votre résultat en grattant !
        </h2>
      )}

      {/* Carte à gratter simulée */}
      {!done && (
        <div className="relative w-80 h-50 rounded-lg shadow-lg overflow-hidden">
          {/* Surface de grattage */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 cursor-pointer"
            onClick={handleScratch}
            style={{
              background: progress > 0 ? `linear-gradient(45deg, 
                rgba(255, 215, 0, ${Math.max(0, 1 - progress/100)}) 0%, 
                rgba(255, 193, 7, ${Math.max(0, 1 - progress/100)}) 50%, 
                rgba(255, 152, 0, ${Math.max(0, 1 - progress/100)}) 100%)` : 
                'linear-gradient(45deg, #FFD700 0%, #FFC107 50%, #FF9800 100%)'
            }}
          >
            {progress === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-lg text-yellow-800 font-semibold"
                >
                  Cliquez pour gratter ! 🎫
                </motion.span>
              </div>
            )}
          </div>
          
          {/* Contenu révélé */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <motion.span
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg text-gray-400"
            >
              Récompense cachée 🎁
            </motion.span>
          </div>
        </div>
      )}

      {/* Barre de progression */}
      {!done && (
        <>
          <div className="mt-4 w-full max-w-xs bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-green-500 h-3"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {progress > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {progress < 70
                ? `Encore un peu... ${progress}% révélé ✨`
                : "Presque fini... 👀"}
            </p>
          )}
        </>
      )}

      {/* Résultat avec animations */}
      <AnimatePresence>
        {done && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center max-w-sm w-full"
            >
              {win ? (
                <>
                  {/* 🎉 Animation victoire */}
                  <Confetti width={width} height={height} />
                  <motion.span
                    className="text-5xl block"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    🎉
                  </motion.span>
                  <h3 className="mt-2 text-xl font-bold text-green-600">
                    Super, tu as gagné !
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-4 bg-green-100 text-green-700 p-4 rounded-lg font-semibold"
                  >
                    🎁 -5% de réduction
                  </motion.div>
                </>
              ) : (
                <>
                  {/* 😢 Animation défaite */}
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-5xl">😢</span>
                  </motion.div>
                  <motion.div
                    initial={{ x: -5 }}
                    animate={{ x: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="mt-2 text-xl font-bold text-red-600">
                      Dommage, tu as perdu
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Réessaie ta chance une prochaine fois !
                    </p>
                  </motion.div>
                </>
              )}

              {/* Bouton reset */}
              <button
                onClick={() => {
                  setDone(false);
                  setWin(null);
                  setProgress(0);
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
