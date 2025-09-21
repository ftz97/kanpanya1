"use client";

import CompleteMap from '@/components/CompleteMap';

export default function TestCompleteMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Carte Complète avec Recherche et Dessin
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive Complète</h2>
          
          <CompleteMap 
            height="700px"
            center={[-61.55, 16.25]} // Martinique
            zoom={12}
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🔍 Recherche</h3>
              <p className="text-blue-700 text-sm">
                Tapez un nom de lieu dans la barre de recherche pour le localiser sur la carte
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">📐 Dessin de Zones</h3>
              <p className="text-green-700 text-sm">
                Utilisez les outils de dessin pour créer des rectangles et sélectionner des zones
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🛣️ Affichage des Rues</h3>
              <p className="text-purple-700 text-sm">
                Les rues s&apos;affichent automatiquement dans la zone sélectionnée
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📝 Guide d&apos;utilisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-700">
            <div>
              <h3 className="font-semibold mb-2">🔍 Recherche de lieux :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Tapez le nom d&apos;un lieu dans la barre de recherche</li>
                <li>2. Appuyez sur Entrée ou cliquez sur 🔍</li>
                <li>3. Cliquez sur un résultat pour y aller</li>
                <li>4. Un marqueur bleu apparaîtra sur la carte</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">📐 Sélection de zones :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Utilisez l&apos;outil rectangle en haut à gauche</li>
                <li>2. Dessinez un rectangle sur la carte</li>
                <li>3. Les rues dans cette zone s&apos;afficheront</li>
                <li>4. Utilisez l&apos;outil poubelle pour supprimer</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Fonctionnalités incluses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-green-700">
            <div className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-sm font-semibold">Recherche</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📐</div>
              <p className="text-sm font-semibold">Dessin</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🛣️</div>
              <p className="text-sm font-semibold">Rues</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm font-semibold">Marqueurs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



