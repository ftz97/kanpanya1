"use client";

import React from "react";
import ScratchCardStableV3 from "@/components/scratch/ScratchCardStableV3";

export default function TestScratchStablePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🛡️ ScratchCardStableV3 - Version Figée
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Version stable validée et figée - Ne pas modifier directement
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            🔄 Nouvelle Carte
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Version Stable Validée
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• <strong>Composant figé</strong> - Ne pas modifier directement</p>
              <p>• <strong>Performance optimisée</strong> - Canvas + requestAnimationFrame</p>
              <p>• <strong>Mobile ready</strong> - Gestion tactile native</p>
              <p>• <strong>Accessibilité</strong> - Support clavier et ARIA</p>
              <p>• <strong>Animations fluides</strong> - Emojis + confettis</p>
              <p>• <strong>Golden Ticket</strong> - Système de récompenses rare</p>
            </div>
          </div>

          <ScratchCardStableV3 
            threshold={0.4}
            goldenTicketChance={0.1}
            onReveal={(reward) => {
              console.log("🎉 Récompense révélée:", reward);
            }}
            userId="stable-test-user"
          />

          <div className="mt-8 bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">📋 Instructions</h3>
            <div className="text-sm text-green-800 space-y-2">
              <p>1. <strong>Grattez la carte</strong> pour révéler votre récompense</p>
              <p>2. <strong>Observez les animations</strong> selon le type de gain</p>
              <p>3. <strong>Testez le bouton "Nouvelle carte"</strong> pour recommencer</p>
              <p>4. <strong>Version stable</strong> - Tag Git : scratch-v3-stable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

