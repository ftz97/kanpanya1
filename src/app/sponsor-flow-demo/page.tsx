"use client";

import { useState } from "react";
import SponsorFlowModal from "@/components/SponsorFlowModal";

export default function SponsorFlowDemoPage() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎬 Démo Sponsor Flow
        </h1>
        
        <p className="text-gray-600 mb-8">
          Clique sur le bouton pour tester le flow complet :<br/>
          Vidéo → Quiz → Scratch Card
        </p>

        <button
          onClick={() => setModalVisible(true)}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🚀 Lancer le Flow Sponsor
        </button>

        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-800 mb-2">📋 Étapes du flow :</h3>
          <ol className="text-sm text-gray-600 space-y-1 text-left">
            <li>1. 🎥 Vidéo sponsor simulée</li>
            <li>2. ❓ Quiz interactif (MiniQuiz)</li>
            <li>3. 🎟️ Carte à gratter (ScratchCard)</li>
          </ol>
        </div>
      </div>

      {/* Modal Sponsor Flow */}
      <SponsorFlowModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
