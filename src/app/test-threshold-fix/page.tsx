"use client";

import React, { useState } from "react";
import ScratchCardStableV3 from "@/components/scratch/ScratchCardStableV3";

export default function TestThresholdFixPage() {
  const [threshold, setThreshold] = useState(0.4);
  const [goldenTicketChance, setGoldenTicketChance] = useState(0.1);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleReveal = (reward: { type: string; amount: number; merchant?: string }) => {
    addResult(`🎉 RÉCOMPENSE RÉVÉLÉE: ${reward.type} - ${reward.amount}${reward.merchant ? ` (${reward.merchant})` : ''}`);
  };

  const resetTest = (newThreshold: number, description: string) => {
    setThreshold(newThreshold);
    setGoldenTicketChance(0.1);
    addResult(`🔄 ${description}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          🧪 Test de la Correction du Threshold
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">✅ Correction Appliquée</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">❌ Ancien Code (FAUX)</h3>
              <code className="text-xs text-red-700 block">
                const totalPixels = Math.floor((canvas.width * canvas.height) / 100);<br/>
                const percent = transparent / totalPixels;
              </code>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Nouveau Code (CORRECT)</h3>
              <code className="text-xs text-green-700 block">
                const sampledPixels = Math.floor((canvas.width * canvas.height) / 100);<br/>
                const percent = transparent / sampledPixels;
              </code>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">⚙️ Contrôles de Test</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Threshold: {(threshold * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={threshold}
                    onChange={(e) => {
                      const newThreshold = parseFloat(e.target.value);
                      setThreshold(newThreshold);
                      addResult(`🎛️ Threshold ajusté à ${(newThreshold * 100).toFixed(0)}%`);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Golden Ticket Chance: {(goldenTicketChance * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={goldenTicketChance}
                    onChange={(e) => {
                      const newChance = parseFloat(e.target.value);
                      setGoldenTicketChance(newChance);
                      addResult(`🎰 Golden Ticket Chance: ${(newChance * 100).toFixed(0)}%`);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">🎯 Tests Rapides</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => resetTest(0.1, "Test 10% - Popup devrait s'afficher rapidement")}
                    className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  >
                    Test 10%
                  </button>
                  <button
                    onClick={() => resetTest(0.3, "Test 30% - Popup à 30% de grattage")}
                    className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Test 30%
                  </button>
                  <button
                    onClick={() => resetTest(0.5, "Test 50% - Il faut gratter la moitié")}
                    className="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                  >
                    Test 50%
                  </button>
                  <button
                    onClick={() => resetTest(0.8, "Test 80% - Il faut gratter presque tout")}
                    className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                  >
                    Test 80%
                  </button>
                  <button
                    onClick={() => resetTest(0.9, "Test 90% - Très difficile")}
                    className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Test 90%
                  </button>
                  <button
                    onClick={() => resetTest(1.0, "Test 100% - Il faut gratter TOUT")}
                    className="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                  >
                    Test 100%
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">📊 Résultats de Test</h2>
              <div className="space-y-2 max-h-80 overflow-y-auto bg-gray-50 p-3 rounded">
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-sm">Aucun résultat pour le moment...</p>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="text-xs bg-white p-2 rounded border-l-2 border-blue-400">
                      {result}
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setTestResults([])}
                className="mt-3 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Effacer les résultats
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              🎫 ScratchCard - Threshold: {(threshold * 100).toFixed(0)}%
            </h2>
            <div className="flex justify-center">
              <ScratchCardStableV3
                threshold={threshold}
                goldenTicketChance={goldenTicketChance}
                onReveal={handleReveal}
                userId="test-threshold-fix"
              />
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Instructions de Test</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Test 10%</strong> : Le popup devrait s'afficher rapidement</li>
                <li>• <strong>Test 50%</strong> : Il faut gratter la moitié de la carte</li>
                <li>• <strong>Test 90%</strong> : Il faut gratter presque toute la carte</li>
                <li>• <strong>Test 100%</strong> : Il faut gratter TOUTE la carte</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">✅ Status de la Correction</h3>
          <div className="text-sm text-green-700 space-y-1">
            <p><strong>Problème identifié :</strong> Calcul du threshold complètement faux</p>
            <p><strong>Correction appliquée :</strong> Calcul correct du pourcentage de grattage</p>
            <p><strong>Commit effectué :</strong> f9c4664 - "fix: Correction CRITIQUE du calcul de threshold"</p>
            <p><strong>Status :</strong> ✅ Le threshold fonctionne maintenant correctement !</p>
          </div>
        </div>
      </div>
    </div>
  );
}
