"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ScratchCardAdmin from "@/components/ScratchCardAdmin";
import type { ScratchConfig } from "@/components/ScratchCardAdmin";
import Image from "next/image";

export default function ScratchCardsAdminPage() {
  const params = useSearchParams();
  const type = params.get("type") || "normal";

  const [configs, setConfigs] = useState<ScratchConfig[]>([]);
  const [skinPreview, setSkinPreview] = useState<string | null>(null); // aperçu image
  const [skinFile, setSkinFile] = useState<File | null>(null); // fichier choisi

  const handleSave = (newConfigs: ScratchConfig[]) => {
    setConfigs(newConfigs);
    console.log("Configurations sauvegardées:", { type, skinFile, configs: newConfigs });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSkinFile(file);
      setSkinPreview(URL.createObjectURL(file)); // aperçu immédiat
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                🎛️ Administration - Cartes à Gratter
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                Type de ticket : <span className="font-semibold text-blue-600 capitalize">{type}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                type === 'normal' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-cyan-100 text-cyan-800'
              }`}>
                {type === 'normal' ? '🎟️ Normal' : '💎 Premium'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Upload skin */}
        <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">🎨 Importer un skin personnalisé</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base font-medium mb-2 text-gray-700">
                Choisir une image de skin
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Formats acceptés : PNG, JPG, JPEG. Taille recommandée : 300x180px
              </p>
            </div>

            {/* Preview skin */}
            {skinPreview && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">👀 Prévisualisation avec votre skin</h3>
                <div className="relative w-64 h-40 border rounded-lg overflow-hidden shadow-lg">
                  {/* Image du skin */}
                  <Image
                    src={skinPreview}
                    alt="Skin preview"
                    fill
                    className="object-cover"
                  />

                  {/* Overlay noir semi-transparent */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xl font-bold drop-shadow-lg">
                      😢 Pas de chance…
                    </span>
                  </div>
                </div>

                {/* Nom du fichier */}
                <p className="mt-2 text-sm text-gray-500 text-center">{skinFile?.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Configurateur de récompenses */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
          <ScratchCardAdmin 
            initialConfigs={configs}
            onSave={handleSave}
          />
        </div>

        {/* Aperçu des configurations */}
        {configs.length > 0 && (
          <div className="mt-4 sm:mt-6 md:mt-8 bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-50 border-b">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                📋 Configurations actuelles ({type})
              </h3>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <pre className="bg-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-auto max-h-48 sm:max-h-60 md:max-h-96 font-mono whitespace-pre-wrap break-words">
                {JSON.stringify({ type, skinFile: skinFile?.name, configs }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
