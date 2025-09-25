"use client";

import { useState } from "react";

export default function TestClicksPage() {
  const [showModal, setShowModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    setShowModal(true);
    console.log("Button clicked! Count:", clickCount + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    console.log("Modal closed");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-3xl font-bold text-center mb-8">
          🖱️ Test de Clics Ultra Simple
        </h1>

        {/* Boutons de test */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Testez ces boutons :
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={handleClick}
              className="w-full py-4 px-6 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              🎯 Cliquez-moi ! (Compteur: {clickCount})
            </button>

            <button
              onClick={() => {
                console.log("Test button clicked!");
                alert("Test réussi !");
              }}
              className="w-full py-4 px-6 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors cursor-pointer"
            >
              🧪 Test Alert
            </button>

            <button
              onClick={() => {
                console.log("Console button clicked!");
                setClickCount(0);
              }}
              className="w-full py-4 px-6 bg-purple-500 text-white rounded-xl font-bold text-lg hover:bg-purple-600 transition-colors cursor-pointer"
            >
              🔄 Reset Compteur
            </button>
          </div>
        </div>

        {/* Modal ultra simple */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-center mb-4">
                🎉 Modal Fonctionne !
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Vous avez cliqué {clickCount} fois !
              </p>
              <button
                onClick={closeModal}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors cursor-pointer"
              >
                ❌ Fermer
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">
            📋 Instructions de Test
          </h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• Ouvrez la console du navigateur (F12)</li>
            <li>• Cliquez sur les boutons ci-dessus</li>
            <li>• Vérifiez que les messages s'affichent dans la console</li>
            <li>• Le modal devrait s'ouvrir et se fermer</li>
            <li>• Si ça ne marche pas, il y a un problème de base</li>
          </ul>
        </div>
      </div>
    </div>
  );
}