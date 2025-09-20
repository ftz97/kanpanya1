"use client";

import { useState } from "react";
import RealMapboxMap from '@/components/RealMapboxMap';

interface Point {
  lng: number;
  lat: number;
  label: string;
}

export default function TestEnregistrerPage() {
  const [savedPoints, setSavedPoints] = useState<Point[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = (points: Point[]) => {
    setSavedPoints(points);
    setShowSaved(true);
    console.log("💾 Points enregistrés:", points);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte avec Bouton Enregistrer
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive avec Sauvegarde</h2>
          <p className="text-gray-600 mb-4">
            Ajoutez des points en recherchant des adresses ou en cliquant sur la carte, puis cliquez sur "Enregistrer" !
          </p>
          <RealMapboxMap 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
            onSave={handleSave}
          />
        </div>

        {/* Affichage des points sauvegardés */}
        {showSaved && savedPoints.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              💾 Points Sauvegardés ({savedPoints.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedPoints.map((point, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 mb-2">
                        📍 Point #{index + 1}
                      </h4>
                      <p className="text-sm text-green-700 mb-2">
                        <strong>Adresse:</strong> {point.label}
                      </p>
                      <p className="text-xs text-green-600">
                        <strong>Coordonnées:</strong> {point.lng.toFixed(6)}, {point.lat.toFixed(6)}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                        Sauvegardé
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📋 Données JSON :</h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                {JSON.stringify(savedPoints, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏝️ Martinique - Fort-de-France</h3>
            <RealMapboxMap 
              height="400px"
              center={[-61.0742, 14.6036]} // Fort-de-France
              zoom={14}
              onSave={(points) => console.log("Points Martinique:", points)}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏙️ Paris</h3>
            <RealMapboxMap 
              height="400px"
              center={[2.3522, 48.8566]} // Paris
              zoom={13}
              onSave={(points) => console.log("Points Paris:", points)}
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Nouvelles Fonctionnalités :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Bouton "Enregistrer"</strong> - Sauvegarde tous les points sélectionnés</li>
            <li>• <strong>Callback onSave</strong> - Fonction appelée avec les points en paramètre</li>
            <li>• <strong>Géocodeur + Clic</strong> - Double méthode d'ajout de points</li>
            <li>• <strong>Marqueurs bleus</strong> - Points visibles sur la carte</li>
            <li>• <strong>Ligne verte</strong> - Relie tous les points (2+ points)</li>
            <li>• <strong>Polygone translucide</strong> - Zone fermée (3+ points)</li>
            <li>• <strong>Données JSON</strong> - Format structuré pour sauvegarde</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">🎯 Comment utiliser :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. <strong>Recherchez une adresse</strong> dans la barre en haut à gauche</li>
            <li>2. <strong>Ou cliquez directement</strong> sur la carte pour ajouter un point</li>
            <li>3. <strong>Répétez</strong> pour ajouter plusieurs points</li>
            <li>4. <strong>Cliquez sur "Enregistrer"</strong> pour sauvegarder la sélection</li>
            <li>5. <strong>Les données</strong> sont transmises via le callback onSave</li>
            <li>6. <strong>Format JSON</strong> avec coordonnées et labels</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">💡 Cas d'usage :</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>Sauvegarde de zones</strong> - Enregistrer des quartiers délimités</li>
            <li>• <strong>Itinéraires</strong> - Points de passage sauvegardés</li>
            <li>• <strong>Lieux d'intérêt</strong> - Collection de points importants</li>
            <li>• <strong>Analyse territoriale</strong> - Données pour études urbaines</li>
            <li>• <strong>Export de données</strong> - Format JSON pour intégration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
