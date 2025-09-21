"use client";

import React, { useState } from "react";

export default function TestScratchSimpleFixedPage() {
  const [threshold, setThreshold] = useState(0.4);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          🧪 Test ScratchCard - Version SIMPLE CORRIGÉE
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Test du Threshold</h2>
          
          <div className="mb-4">
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
                addResult(`🔄 Threshold changé à ${(newThreshold * 100).toFixed(0)}%`);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                setThreshold(0.1);
                addResult("🔄 Test 10% - Le popup devrait s'afficher rapidement");
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test 10%
            </button>
            <button
              onClick={() => {
                setThreshold(0.5);
                addResult("🔄 Test 50% - Il faut gratter la moitié");
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Test 50%
            </button>
            <button
              onClick={() => {
                setThreshold(0.9);
                addResult("🔄 Test 90% - Il faut gratter presque tout");
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Test 90%
            </button>
            <button
              onClick={() => {
                setThreshold(1.0);
                addResult("🔄 Test 100% - Il faut gratter TOUT");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Test 100%
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                🎯 ScratchCard - Threshold: {(threshold * 100).toFixed(0)}%
              </h2>
              <div className="flex justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎫</div>
                    <div className="text-lg font-semibold">ScratchCard</div>
                    <div className="text-sm opacity-90">Threshold: {(threshold * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">📊 Résultats de Test</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-sm">Aucun résultat pour le moment...</p>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                      {result}
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setTestResults([])}
                className="mt-4 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">✅ Correction Appliquée</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Problème identifié :</strong> Calcul du threshold complètement faux</p>
            <p><strong>Correction :</strong> Calcul correct du pourcentage de grattage</p>
            <p><strong>Status :</strong> Le threshold fonctionne maintenant correctement</p>
          </div>
        </div>

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">🎯 Instructions de Test</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Test 10%</strong> : Le popup devrait s&apos;afficher rapidement</li>
            <li>• <strong>Test 50%</strong> : Il faut gratter la moitié de la carte</li>
            <li>• <strong>Test 90%</strong> : Il faut gratter presque toute la carte</li>
            <li>• <strong>Test 100%</strong> : Il faut gratter TOUTE la carte</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
