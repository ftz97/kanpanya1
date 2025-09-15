"use client";

import NeighborhoodCreator from '@/components/NeighborhoodCreator';

export default function TestNeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏘️ Créateur de Quartiers
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive pour Créer des Quartiers</h2>
          
          <NeighborhoodCreator 
            height="700px"
            center={[-61.55, 16.25]} // Martinique
            zoom={12}
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📐 Dessiner des Zones</h3>
              <p className="text-blue-700 text-sm">
                Utilisez les outils de dessin pour créer des rectangles, polygones ou cercles
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🏘️ Créer des Quartiers</h3>
              <p className="text-green-700 text-sm">
                Donnez un nom à chaque zone pour créer un quartier personnalisé
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">📊 Analyser les Quartiers</h3>
              <p className="text-purple-700 text-sm">
                Cliquez sur un quartier pour obtenir une analyse détaillée de la zone
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📝 Guide d'utilisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-700">
            <div>
              <h3 className="font-semibold mb-2">🎨 Créer un quartier :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Cliquez sur un outil de dessin (Rectangle, Polygone, Cercle)</li>
                <li>2. Dessinez une zone sur la carte</li>
                <li>3. Donnez un nom au quartier</li>
                <li>4. Le quartier apparaît avec une couleur unique</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">📊 Analyser un quartier :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Cliquez sur un quartier existant</li>
                <li>2. Cliquez sur "Analyser"</li>
                <li>3. Obtenez des données détaillées sur la zone</li>
                <li>4. Consultez les recommandations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Fonctionnalités incluses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-green-700">
            <div className="text-center">
              <div className="text-2xl mb-2">📐</div>
              <p className="text-sm font-semibold">Dessin</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏘️</div>
              <p className="text-sm font-semibold">Quartiers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-semibold">Analyse</p>
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
              <h3 className="font-semibold mb-2">📐 Rectangle</h3>
              <p className="text-sm">Parfait pour créer des quartiers rectangulaires</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔷 Polygone</h3>
              <p className="text-sm">Idéal pour des zones aux formes complexes</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⭕ Cercle</h3>
              <p className="text-sm">Excellent pour des zones circulaires</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

