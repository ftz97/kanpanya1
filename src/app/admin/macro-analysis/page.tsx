"use client";

import FixedMacroView from '@/components/FixedMacroView';

export default function MacroAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Analyse Macro - Collectivités
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble des données urbaines, trafic, et flux commerciaux pour l'analyse territoriale
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <FixedMacroView />
      </div>
    </div>
  );
}
