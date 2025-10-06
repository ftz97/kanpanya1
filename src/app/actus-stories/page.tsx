"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ActusStories() {
  const [currentStory, setCurrentStory] = useState(0);

  // Données mock pour les stories
  const stories = [
    {
      id: 1,
      merchant: "📌Épicerie Bio",
      title: "🌱 Nouveaux fruits locaux",
      subtitle: "Mangez frais, achetez pays",
      cta: "→ Découvrir",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      merchant: "🍞 Boulangerie Artisanale",
      title: "🥖 Pain bio du jour",
      subtitle: "Fait avec amour chaque matin",
      cta: "→ Commander",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50"
    },
    {
      id: 3,
      merchant: "☕ Café du Coin",
      title: "☕ Nouvelle recette signature",
      subtitle: "Un café unique créé pour vous",
      cta: "→ Déguster",
      color: "from-amber-600 to-amber-800",
      bgColor: "bg-amber-50"
    },
    {
      id: 4,
      merchant: "💊 Parapharmacie",
      title: "💊 Conseils santé gratuits",
      subtitle: "Prenez soin de vous",
      cta: "→ Consulter",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        prevStory();
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextStory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentStoryData = stories[currentStory];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            📰 Actus Stories
          </h1>
          <p className="text-gray-600">
            Découvrez les dernières actualités de vos commerçants
          </p>
        </div>

        {/* Story Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className={`${currentStoryData.bgColor} rounded-3xl p-8 shadow-xl border-2 border-white`}
            >
              {/* Merchant */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {currentStoryData.merchant}
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {currentStoryData.title}
                </h2>
                <p className="text-gray-700 text-sm">
                  {currentStoryData.subtitle}
                </p>
              </div>

              {/* CTA Button */}
              <div className="text-center mb-6">
                <button 
                  className={`bg-gradient-to-r ${currentStoryData.color} text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                >
                  {currentStoryData.cta}
                </button>
              </div>

              {/* Navigation indicators */}
              <div className="flex justify-center space-x-2 mb-4">
                {stories.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentStory 
                        ? `bg-gradient-to-r ${currentStoryData.color}` 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="absolute inset-y-0 flex items-center justify-between w-full -mx-4">
            <button
              onClick={prevStory}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            >
              <span className="text-xl">⬅️</span>
            </button>
            
            <button
              onClick={nextStory}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            >
              <span className="text-xl">➡️</span>
            </button>
          </div>
        </div>

        {/* Navigation instructions */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-4 text-gray-500">
            <span className="text-sm">⬆️⬇️</span>
            <span className="text-sm">Naviguez avec les flèches</span>
          </div>
        </div>

        {/* Story counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">
            {currentStory + 1} / {stories.length}
          </span>
        </div>
      </div>

      {/* Keyboard navigation */}
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-3">
        <div className="text-xs text-gray-500 text-center">
          <div>⬆️ ⬇️</div>
          <div>Clavier</div>
        </div>
      </div>
    </div>
  );
}