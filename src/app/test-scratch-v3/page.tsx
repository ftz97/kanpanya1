"use client";

import React from "react";
import ScratchCardV3 from "@/components/ScratchCardV3";

export default function TestScratchV3() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🆕 Test ScratchCard V3 Factorisé
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Version ultra-optimisée avec EmojiRain générique, mapping intelligent, et code 50% plus court
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
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              🚀 Fonctionnalités V3 Factorisé
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">✨ Optimisations Majeures</h3>
                <ul className="space-y-1">
                  <li>• <strong>EmojiRain générique</strong> (1 composant au lieu de 3)</li>
                  <li>• <strong>Mapping intelligent</strong> des récompenses → emojis</li>
                  <li>• <strong>Code 50% plus court</strong> (150 lignes vs 300)</li>
                  <li>• <strong>requestAnimationFrame</strong> pour les performances</li>
                  <li>• <strong>Threshold configurable</strong> dans useScratchCard</li>
                  <li>• <strong>Architecture DRY</strong> et maintenable</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🔧 Améliorations Techniques</h3>
                <ul className="space-y-1">
                  <li>• <strong>EmojiRain unifié</strong> avec Framer Motion</li>
                  <li>• <strong>Logique centralisée</strong> des récompenses</li>
                  <li>• <strong>Hooks optimisés</strong> avec paramètres</li>
                  <li>• <strong>Performance maximale</strong> avec canvas réduit</li>
                  <li>• <strong>Code réutilisable</strong> et modulaire</li>
                  <li>• <strong>Intégration Supabase</strong> prête</li>
                </ul>
              </div>
            </div>
          </div>

          <ScratchCardV3 
            threshold={0.99}
            goldenTicketChance={0.1}
            onReveal={(reward) => {
              console.log("🎉 Récompense révélée:", reward);
            }}
            userId="test-user"
          />

          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Instructions de Test</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>1. <strong>Grattez la carte</strong> pour révéler votre récompense</p>
              <p>2. <strong>Observez les animations</strong> Framer Motion dans la popup</p>
              <p>3. <strong>Regardez les emojis</strong> selon le type de gain</p>
              <p>4. <strong>Testez le bouton "Nouvelle carte"</strong> pour recommencer</p>
              <p>5. <strong>Testez sur mobile</strong> pour voir la responsivité</p>
              <p>6. <strong>Ouvrez les DevTools</strong> pour voir les performances</p>
            </div>
          </div>

          <div className="mt-6 bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">📊 Comparaison des Versions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-red-600 mb-2">V1 - Original</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• ~200 lignes</li>
                  <li>• Canvas custom</li>
                  <li>• Animations CSS</li>
                  <li>• Performance basique</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-orange-600 mb-2">V2 - Amélioré</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• ~250 lignes</li>
                  <li>• + Emojis</li>
                  <li>• + Optimisations</li>
                  <li>• + UX améliorée</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-blue-600 mb-2">V3 - Pro</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• ~300 lignes</li>
                  <li>• + Hooks modulaires</li>
                  <li>• + Framer Motion</li>
                  <li>• + Accessibilité</li>
                  <li>• + Performance optimisée</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-500">
                <h4 className="font-semibold text-green-600 mb-2">V3 Factorisé ⭐</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <strong>~150 lignes</strong></li>
                  <li>• <strong>EmojiRain générique</strong></li>
                  <li>• <strong>Mapping intelligent</strong></li>
                  <li>• <strong>Code DRY</strong></li>
                  <li>• <strong>Performance maximale</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
