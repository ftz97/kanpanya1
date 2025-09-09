"use client";
import React, { useState } from "react";
import ScratchCardAdmin from "@/components/ScratchCardAdmin";
import type { ScratchConfig } from "@/components/ScratchCardAdmin";

export default function ScratchCardsAdminPage() {
  const [configs, setConfigs] = useState<ScratchConfig[]>([]);

  const handleSave = (newConfigs: ScratchConfig[]) => {
    setConfigs(newConfigs);
    console.log("Configurations sauvegardées:", newConfigs);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎛️ Administration - Cartes à Gratter</h1>
        
        <ScratchCardAdmin 
          initialConfigs={configs}
          onSave={handleSave}
        />

        {/* Aperçu des configurations */}
        {configs.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">📋 Configurations actuelles</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(configs, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
