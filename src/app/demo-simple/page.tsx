"use client";

import { useState } from "react";
import SimpleQRCode from "@/components/SimpleQRCode";
import FunQRCode from "@/components/FunQRCode";
import SimpleRewardModal from "@/components/SimpleRewardModal";
import FunRewardModal from "@/components/FunRewardModal";

export default function DemoSimplePage() {
  const [modalType, setModalType] = useState<"simple" | "fun" | null>(null);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const rewards = [
    {
      type: "points" as const,
      amount: 50,
      label: "+50 points bonus !"
    },
    {
      type: "points" as const,
      amount: 100,
      label: "Gros lot : 100 points !"
    },
    {
      type: "coupon" as const,
      code: "PIZZA50",
      label: "Pizza -50% ce soir"
    }
  ];

  const openModal = (reward: any, type: "simple" | "fun") => {
    console.log("Opening modal:", type, reward); // Debug
    setSelectedReward(reward);
    setModalType(type);
  };

  const closeModal = () => {
    console.log("Closing modal"); // Debug
    setModalType(null);
    setSelectedReward(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎯 Nouveaux Composants Simples
          </h1>
          <p className="text-gray-600">
            Version allégée et fun des pop-ups et QR codes
          </p>
        </div>

        {/* QR Codes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📱 QR Codes Simplifiés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QR Code Simple */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                ✨ Version Simple
              </h3>
              <SimpleQRCode
                value="simple_reward_123"
                title="Récompense Simple"
                size={150}
              />
            </div>

            {/* QR Code Fun */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                🎉 Version Fun
              </h3>
              <FunQRCode
                value="fun_reward_456"
                title="Cadeau Surprise"
                emoji="🎁"
                size={150}
              />
            </div>
          </div>
        </div>

        {/* Pop-ups de récompenses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🎊 Pop-ups de Récompenses
          </h2>
          
          {/* Boutons de test rapide */}
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Testez rapidement les modals :</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => openModal({ type: "points", amount: 50, label: "Test Simple" }, "simple")}
                className="py-2 px-6 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors cursor-pointer"
              >
                🧪 Test Modal Simple
              </button>
              <button
                onClick={() => openModal({ type: "points", amount: 100, label: "Test Fun" }, "fun")}
                className="py-2 px-6 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer"
              >
                🎉 Test Modal Fun
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-2xl mb-3">
                  {reward.type === "coupon" ? "🎫" : 
                   reward.amount && reward.amount > 50 ? "💰" : "⭐"}
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-4">
                  {reward.label}
                </h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => openModal(reward, "simple")}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Version Simple
                  </button>
                  
                  <button
                    onClick={() => openModal(reward, "fun")}
                    className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors cursor-pointer"
                  >
                    Version Fun
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparaison */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📊 Comparaison Avant/Après
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avant */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-4">
                ❌ Avant (Complexe)
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Animations Framer Motion lourdes</li>
                <li>• Effets de brillance et rotation</li>
                <li>• Particules flottantes</li>
                <li>• Gradients complexes</li>
                <li>• Bordure animée</li>
                <li>• Effet de lueur externe</li>
                <li>• Multiples composants imbriqués</li>
              </ul>
            </div>

            {/* Après */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">
                ✅ Après (Simple & Fun)
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Design épuré et moderne</li>
                <li>• Animations CSS simples</li>
                <li>• Emojis pour la personnalité</li>
                <li>• Couleurs vives et joyeuses</li>
                <li>• Code plus léger</li>
                <li>• Chargement plus rapide</li>
                <li>• Expérience utilisateur fluide</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modals */}
        {selectedReward && modalType === "simple" && (
          <SimpleRewardModal
            isOpen={true}
            onClose={closeModal}
            reward={selectedReward}
          />
        )}
        
        {selectedReward && modalType === "fun" && (
          <FunRewardModal
            isOpen={true}
            onClose={closeModal}
            reward={selectedReward}
          />
        )}
      </div>
    </div>
  );
}
