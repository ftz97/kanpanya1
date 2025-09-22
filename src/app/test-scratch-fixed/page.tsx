"use client";

import React, { useState } from "react";
import ScratchCardStableV3 from "@/components/scratch/ScratchCardStableV3";

export default function TestScratchFixedPage() {
  const [threshold, setThreshold] = useState(0.4);
  const [goldenTicketChance, setGoldenTicketChance] = useState(0.1);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleReveal = (reward: { type: string; amount: number; merchant?: string }) => {
    addResult(`🎉 Récompense révélée: ${reward.type} - ${reward.amount}${reward.merchant ? ` (${reward.merchant})` : ''}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          🧪 Test ScratchCard - Version CORRIGÉE
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Contrôles de Test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
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
                onChange={(e) => setGoldenTicketChance(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                setThreshold(0.1);
                setGoldenTicketChance(0.1);
                addResult("🔄 Reset vers 10% threshold");
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test 10%
            </button>
            <button
              onClick={() => {
                setThreshold(0.5);
                setGoldenTicketChance(0.1);
                addResult("🔄 Reset vers 50% threshold");
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Test 50%
            </button>
            <button
              onClick={() => {
                setThreshold(0.9);
                setGoldenTicketChance(0.1);
                addResult("🔄 Reset vers 90% threshold");
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Test 90%
            </button>
            <button
              onClick={() => {
                setThreshold(1.0);
                setGoldenTicketChance(0.1);
                addResult("🔄 Reset vers 100% threshold");
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
                <ScratchCardStableV3
                  threshold={threshold}
                  goldenTicketChance={goldenTicketChance}
                  onReveal={handleReveal}
                  userId="test-fixed-user"
                />
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
  );
}
