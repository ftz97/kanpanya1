"use client";
import { useState } from "react";

export default function ScratchDemoOption2() {
  const [revealed, setRevealed] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    setIsWinner(Math.random() > 0.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🎲 Carte à Révélation
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Révélation progressive
          </h2>
          
          <div className="flex justify-center">
            <div className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg">
              {/* Carte fermée */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 transition-all duration-2000 ${
                  revealed ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Cliquez pour révéler ! 🎲
                  </span>
                </div>
              </div>
              
              {/* Carte ouverte */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 transition-all duration-2000 ${
                  revealed ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-4xl block mb-2">🎁</span>
                    <span className="text-lg font-semibold">Récompense révélée !</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleReveal}
              disabled={revealed}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold shadow-lg text-lg"
            >
              {revealed ? "Révélé !" : "🎲 Révéler la carte"}
            </button>
          </div>
          
          {revealed && (
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
