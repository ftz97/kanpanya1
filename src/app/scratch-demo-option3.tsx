"use client";
import { useState } from "react";

export default function ScratchDemoOption3() {
  const [flipped, setFlipped] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const handleFlip = () => {
    setFlipped(true);
    setIsWinner(Math.random() > 0.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🎴 Carte à Retourner
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Effet de retournement 3D
          </h2>
          
          <div className="flex justify-center">
            <div className="perspective-1000">
              <div 
                className={`relative w-80 h-48 transition-transform duration-1000 transform-style-preserve-3d ${
                  flipped ? 'rotate-y-180' : 'rotate-y-0'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Face avant */}
                <div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      Cliquez pour retourner ! 🎴
                    </span>
                  </div>
                </div>
                
                {/* Face arrière */}
                <div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <span className="text-4xl block mb-2">🎁</span>
                      <span className="text-lg font-semibold">Récompense !</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleFlip}
              disabled={flipped}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold shadow-lg text-lg"
            >
              {flipped ? "Retournée !" : "🎴 Retourner la carte"}
            </button>
          </div>
          
          {flipped && (
            <div className="text-center">
              {isWinner ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">🎉 Félicitations !</h3>
                  <p className="text-lg">Vous avez gagné -5% de réduction !</p>
                </div>
              ) : (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">😢 Dommage...</h3>
                  <p className="text-lg">Réessayez votre chance une prochaine fois !</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
