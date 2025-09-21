"use client";

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';

export default function TestSearchPage() {
  const [selectedLocation, setSelectedLocation] = useState<unknown>(null);
  const [searchHistory, setSearchHistory] = useState<unknown[]>([]);

  const handleLocationSelect = (result: unknown) => {
    setSelectedLocation(result);
    setSearchHistory(prev => [result, ...prev.slice(0, 4)]); // Garder les 5 dernières recherches
  };

  const handleMapCenter = (coordinates: [number, number]) => {
    console.log('Centrer sur:', coordinates);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Test de Recherche Intelligente</h1>
          <p className="text-gray-600 mb-8">
            Testez la recherche avec Mapbox Geocoding + données locales Martinique
          </p>

          {/* Barre de recherche */}
          <div className="mb-8">
            <SearchBar 
              onLocationSelect={handleLocationSelect}
              onMapCenter={handleMapCenter}
              showAdvancedFilters={true}
            />
          </div>

          {/* Localisation sélectionnée */}
          {selectedLocation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">📍 Localisation sélectionnée</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">Informations principales</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li><strong>Nom:</strong> {selectedLocation.name}</li>
                    <li><strong>Type:</strong> {selectedLocation.type}</li>
                    <li><strong>Coordonnées:</strong> {selectedLocation.coordinates.join(', ')}</li>
                    {selectedLocation.score && (
                      <li><strong>Score de pertinence:</strong> {Math.round(selectedLocation.score)}%</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">Localisation</h3>
                  <div className="text-sm text-blue-700">
                    {selectedLocation.is_martinique ? (
                      <div className="flex items-center gap-2">
                        <span>🏝️</span>
                        <span className="text-green-600">{selectedLocation.address}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>🌍</span>
                        <span className="text-blue-600">{selectedLocation.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Historique des recherches */}
          {searchHistory.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🕒 Historique des recherches</h2>
              <div className="space-y-2">
                {searchHistory.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`}
                    className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedLocation(item)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.type === 'commune' ? '🏛️' : item.type === 'quartier' ? '🏘️' : '📍'}</span>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.address_details?.city || item.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.score ? `${Math.round(item.score)}%` : 'Local'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions de test */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-900 mb-4">🧪 Tests à effectuer</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800">
              <div>
                <h3 className="font-medium mb-2">Recherches avec fautes de frappe :</h3>
                <ul className="space-y-1">
                  <li>• &quot;fort de france&quot; (sans tirets)</li>
                  <li>• &quot;lamentin&quot; (sans majuscule)</li>
                  <li>• &quot;schoelcher&quot; (sans accent)</li>
                  <li>• &quot;saint pierre&quot; (sans tiret)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Recherches partielles :</h3>
                <ul className="space-y-1">
                  <li>• &quot;fort&quot; → devrait trouver Fort-de-France</li>
                  <li>• &quot;rue victor&quot; → devrait trouver Rue Victor Hugo</li>
                  <li>• &quot;anse&quot; → devrait trouver Anse Mitan</li>
                  <li>• &quot;saint&quot; → devrait trouver Saint-Pierre, Sainte-Marie</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
