"use client";
import { useState } from "react";

export default function ScratchDemoOption4() {
  const [zoomed, setZoomed] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const handleZoom = () => {
    setZoomed(true);
    setIsWinner(Math.random() > 0.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🔍 Carte à Zoom
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Effet de zoom et révélation
          </h2>
          
          <div className="flex justify-center">
            <div className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg">
              {/* Carte normale */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 transition-all duration-1000 ${
                  zoomed ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Cliquez pour zoomer ! 🔍
                  </span>
                </div>
              </div>
              
              {/* Carte zoomée */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 transition-all duration-1000 ${
                  zoomed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-4xl block mb-2">🎁</span>
                    <span className="text-lg font-semibold">Récompense zoomée !</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleZoom}
              disabled={zoomed}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold shadow-lg text-lg"
            >
              {zoomed ? "Zoomé !" : "🔍 Zoomer la carte"}
            </button>
          </div>
          
          {zoomed && (
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
