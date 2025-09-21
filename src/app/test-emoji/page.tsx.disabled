"use client";
import SadEmojiRain from "@/components/SadEmojiRain";
import HappyEmojiRain from "@/components/HappyEmojiRain";
import MoneyEmojiRain from "@/components/MoneyEmojiRain";
import { useState } from "react";

export default function TestEmojiPage() {
  const [showSad, setShowSad] = useState(false);
  const [showHappy, setShowHappy] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  
  // Contrôles de vitesse et nombre
  const [speedLevel, setSpeedLevel] = useState(2); // 1-4
  const [countLevel, setCountLevel] = useState(2); // 1-4
  
  const speedConfig = {
    1: { duration: 6, delay: 3 }, // Très lent
    2: { duration: 4, delay: 2 }, // Lent
    3: { duration: 2, delay: 1 }, // Rapide
    4: { duration: 1, delay: 0.5 } // Très rapide
  };
  
  const countConfig = {
    1: 5,   // Très peu
    2: 15,  // Peu
    3: 30,  // Beaucoup
    4: 50   // Énormément
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Test Emoji Rain</h1>
        <p className="text-lg mb-8">Choisissez le type d&apos;emoji et contrôlez la vitesse et le nombre</p>
        
        {/* Contrôles de vitesse et nombre */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contrôles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contrôle de vitesse */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vitesse: {speedLevel === 1 ? 'Très lent' : speedLevel === 2 ? 'Lent' : speedLevel === 3 ? 'Rapide' : 'Très rapide'}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSpeedLevel(level)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      speedLevel === level
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Contrôle du nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre: {countConfig[countLevel as keyof typeof countConfig]} emojis
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCountLevel(level)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      countLevel === level
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Boutons d'emojis */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <button 
            onClick={() => {
              setShowSad(!showSad);
              setShowHappy(false);
              setShowMoney(false);
            }}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showSad 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showSad ? 'Masquer' : 'Afficher'} Emojis Tristes 😢
          </button>
          
          <button 
            onClick={() => {
              setShowHappy(!showHappy);
              setShowSad(false);
              setShowMoney(false);
            }}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showHappy 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showHappy ? 'Masquer' : 'Afficher'} Emojis Heureux 🎉
          </button>

          <button 
            onClick={() => {
              setShowMoney(!showMoney);
              setShowSad(false);
              setShowHappy(false);
            }}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showMoney 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showMoney ? 'Masquer' : 'Afficher'} Emojis Argent 💰
          </button>
        </div>
      </div>
      
      {showSad && <SadEmojiRain count={countConfig[countLevel as keyof typeof countConfig]} speedConfig={speedConfig[speedLevel as keyof typeof speedConfig]} />}
      {showHappy && <HappyEmojiRain count={countConfig[countLevel as keyof typeof countConfig]} speedConfig={speedConfig[speedLevel as keyof typeof speedConfig]} />}
      {showMoney && <MoneyEmojiRain count={countConfig[countLevel as keyof typeof countConfig]} speedConfig={speedConfig[speedLevel as keyof typeof speedConfig]} />}
    </div>
  );
}
