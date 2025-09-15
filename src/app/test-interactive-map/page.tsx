"use client";

import InteractiveMapWithDraw from '@/components/InteractiveMapWithDraw';

export default function TestInteractiveMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Carte Interactive avec Outils de Dessin
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive Complète</h2>
          
          <InteractiveMapWithDraw />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📍 Points</h3>
              <p className="text-blue-700 text-sm">
                Cliquez sur l'outil Point pour ajouter des marqueurs et obtenir des informations de géocodage
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🔷 Zones</h3>
              <p className="text-green-700 text-sm">
                Dessinez des polygones, rectangles ou cercles pour créer des quartiers personnalisés
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">📏 Lignes</h3>
              <p className="text-purple-700 text-sm">
                Tracez des lignes pour marquer des routes ou des frontières
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📝 Guide d'utilisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-700">
            <div>
              <h3 className="font-semibold mb-2">🎨 Créer des éléments :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Cliquez sur un outil de dessin</li>
                <li>2. Dessinez sur la carte</li>
                <li>3. Pour les zones : donnez un nom au quartier</li>
                <li>4. Les éléments s'affichent avec des couleurs uniques</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">🔧 Gestion :</h3>
              <ul className="space-y-1 text-sm">
                <li>• Cliquez sur un quartier pour le sélectionner</li>
                <li>• Utilisez l'outil poubelle pour supprimer</li>
                <li>• Les points affichent des infos de géocodage</li>
                <li>• Tous les éléments sont sauvegardés</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Fonctionnalités incluses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-green-700">
            <div className="text-center">
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm font-semibold">Points</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔷</div>
              <p className="text-sm font-semibold">Zones</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📏</div>
              <p className="text-sm font-semibold">Lignes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💾</div>
              <p className="text-sm font-semibold">Sauvegarde</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">🔧 Outils disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
            <div>
              <h3 className="font-semibold mb-2">📍 Point</h3>
              <p className="text-sm">Ajoute des marqueurs avec géocodage automatique</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔷 Polygone</h3>
              <p className="text-sm">Crée des zones aux formes complexes</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📐 Rectangle</h3>
              <p className="text-sm">Parfait pour des zones rectangulaires</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⭕ Cercle</h3>
              <p className="text-sm">Idéal pour des zones circulaires</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📏 Ligne</h3>
              <p className="text-sm">Trace des routes ou frontières</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🗑️ Effacer</h3>
              <p className="text-sm">Supprime tous les éléments dessinés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

