"use client";
import { useState } from "react";
import ScratchCard from "@/components/ScratchCard";
import SponsorFlowModal from "@/components/SponsorFlowModal";

export default function ScratchAnimePage() {
  const [currentReward, setCurrentReward] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Différentes récompenses pour tester les animations
  const rewards = [
    { type: "points" as const, amount: 0, label: "Pas de gain cette fois..." },
    { type: "points" as const, amount: 20, label: "+20 points bonus !" },
    { type: "points" as const, amount: 75, label: "+75 points jackpot !" },
    { type: "gift" as const, amount: 100, label: "🎁 Cadeau surprise !" },
  ];

  const nextReward = () => {
    setCurrentReward((prev) => (prev + 1) % rewards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Effets de fond magiques */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Particules flottantes */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Titre principal avec effet magique */}
        <div className="mb-12">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            ✨ Gratte ton Numéro Magique ✨
          </h1>
          <p className="text-xl text-blue-200 mb-6 font-medium">
            🎭 Découvre ta récompense mystique en grattant ta carte enchantée ! 🎭
          </p>
        </div>
        
        {/* Section des contrôles avec design amélioré */}
        <div className="mb-10">
          <div className="flex gap-6 justify-center flex-wrap mb-8">
            <button
              onClick={nextReward}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                🎲 Changer la récompense
                <span className="group-hover:rotate-12 transition-transform duration-300">✨</span>
              </span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                🎥 Modal Vidéo Quiz Scratch
                <span className="group-hover:animate-spin transition-transform duration-300">🎬</span>
              </span>
            </button>
          </div>
          
          {/* Carte de récompense actuelle avec design premium */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">🎁 Récompense Actuelle</h3>
            <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl p-4 border border-teal-400/30">
              <p className="text-2xl text-teal-300 font-bold mb-2">
                {rewards[currentReward].label}
              </p>
              <p className="text-sm text-blue-200">
                Type: <span className="font-semibold text-blue-300">{rewards[currentReward].type}</span> | 
                Montant: <span className="font-bold text-yellow-300">{rewards[currentReward].amount}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Zone de la carte à gratter avec effet de focus */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Halo magique autour de la carte */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse"></div>
            <div className="relative">
              <ScratchCard
                reward={rewards[currentReward]}
                onReveal={() => {
                  console.log("Récompense révélée !");
                }}
              />
            </div>
          </div>
        </div>

        {/* Guide d'utilisation avec design amélioré */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-3xl font-bold mb-8 text-yellow-300">🔮 Comment ça marche</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">😢</div>
              <p className="text-xl font-bold text-red-300 mb-2">Pas de gain</p>
              <p className="text-blue-200">Emojis tristes apparaissent</p>
            </div>
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🎉</div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Petit gain</p>
              <p className="text-blue-200">Emojis heureux dansent</p>
            </div>
            <div className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">💰💎🤑</div>
              <p className="text-xl font-bold text-green-300 mb-2">Gros gain</p>
              <p className="text-blue-200">Emojis d'argent explosent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Vidéo Quiz Scratch Card Animation */}
      <SponsorFlowModal 
        visible={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
