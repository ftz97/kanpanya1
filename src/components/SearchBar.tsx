"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SearchResult {
  id: string;
  name: string;
  type: 'ville' | 'rue' | 'quartier' | 'commune';
  coordinates: [number, number];
  address?: string;
  population?: number;
  area?: number;
}

interface SearchBarProps {
  onLocationSelect: (result: SearchResult) => void;
  onMapCenter?: (coordinates: [number, number]) => void;
  clickedLocation?: unknown;
  onClearClickedLocation?: () => void;
}

// Données réelles de la Martinique
const MARTINIQUE_DATA: SearchResult[] = [
  // Communes principales
  { id: 'fort-de-france', name: 'Fort-de-France', type: 'commune', coordinates: [-61.0742, 14.6036], population: 78000, area: 44.21 },
  { id: 'le-lamentin', name: 'Le Lamentin', type: 'commune', coordinates: [-61.0014, 14.6089], population: 40000, area: 62.32 },
  { id: 'schoelcher', name: 'Schoelcher', type: 'commune', coordinates: [-61.0889, 14.6167], population: 21000, area: 21.17 },
  { id: 'saint-pierre', name: 'Saint-Pierre', type: 'commune', coordinates: [-61.1750, 14.7417], population: 4000, area: 38.72 },
  { id: 'saint-marie', name: 'Sainte-Marie', type: 'commune', coordinates: [-60.9917, 14.7917], population: 15000, area: 44.55 },
  { id: 'le-marin', name: 'Le Marin', type: 'commune', coordinates: [-60.8667, 14.4667], population: 8000, area: 31.54 },
  { id: 'le-francois', name: 'Le François', type: 'commune', coordinates: [-60.9167, 14.6167], population: 19000, area: 53.93 },
  { id: 'la-trinite', name: 'La Trinité', type: 'commune', coordinates: [-60.9667, 14.7333], population: 13000, area: 45.77 },
  { id: 'saint-joseph', name: 'Saint-Joseph', type: 'commune', coordinates: [-61.0333, 14.6667], population: 16000, area: 43.29 },
  { id: 'riviere-pilote', name: 'Rivière-Pilote', type: 'commune', coordinates: [-60.9000, 14.5167], population: 12000, area: 35.78 },
  
  // Quartiers de Fort-de-France
  { id: 'centre-ville-fdf', name: 'Centre-ville Fort-de-France', type: 'quartier', coordinates: [-61.0742, 14.6036], address: 'Fort-de-France' },
  { id: 'terres-sainville', name: 'Terres-Sainville', type: 'quartier', coordinates: [-61.0700, 14.6100], address: 'Fort-de-France' },
  { id: 'dillon', name: 'Dillon', type: 'quartier', coordinates: [-61.0800, 14.6000], address: 'Fort-de-France' },
  { id: 'volga-plage', name: 'Volga-Plage', type: 'quartier', coordinates: [-61.0600, 14.6200], address: 'Fort-de-France' },
  { id: 'pointe-des-sables', name: 'Pointe des Sables', type: 'quartier', coordinates: [-61.0500, 14.6300], address: 'Fort-de-France' },
  
  // Rues principales de Fort-de-France
  { id: 'rue-victor-hugo', name: 'Rue Victor Hugo', type: 'rue', coordinates: [-61.0742, 14.6036], address: 'Fort-de-France' },
  { id: 'rue-de-la-republique', name: 'Rue de la République', type: 'rue', coordinates: [-61.0750, 14.6040], address: 'Fort-de-France' },
  { id: 'rue-schoelcher', name: 'Rue Schoelcher', type: 'rue', coordinates: [-61.0730, 14.6050], address: 'Fort-de-France' },
  { id: 'rue-clement', name: 'Rue Clément', type: 'rue', coordinates: [-61.0720, 14.6020], address: 'Fort-de-France' },
  { id: 'rue-perrinon', name: 'Rue Perrinon', type: 'rue', coordinates: [-61.0710, 14.6010], address: 'Fort-de-France' },
  { id: 'rue-ernest-deproge', name: 'Rue Ernest Deproge', type: 'rue', coordinates: [-61.0700, 14.6000], address: 'Fort-de-France' },
  { id: 'rue-bougenot', name: 'Rue Bougenot', type: 'rue', coordinates: [-61.0690, 14.5990], address: 'Fort-de-France' },
  { id: 'rue-martin-luther-king', name: 'Rue Martin Luther King', type: 'rue', coordinates: [-61.0680, 14.5980], address: 'Fort-de-France' },
  
  // Rues du Lamentin
  { id: 'rue-de-la-paix-lamentin', name: 'Rue de la Paix', type: 'rue', coordinates: [-61.0014, 14.6089], address: 'Le Lamentin' },
  { id: 'rue-de-la-liberte-lamentin', name: 'Rue de la Liberté', type: 'rue', coordinates: [-61.0020, 14.6090], address: 'Le Lamentin' },
  { id: 'rue-du-general-de-gaulle', name: 'Rue du Général de Gaulle', type: 'rue', coordinates: [-61.0000, 14.6100], address: 'Le Lamentin' },
  
  // Zones commerciales
  { id: 'centre-commercial-cluny', name: 'Centre Commercial Cluny', type: 'quartier', coordinates: [-61.0014, 14.6089], address: 'Le Lamentin' },
  { id: 'zone-industrielle-dillon', name: 'Zone Industrielle Dillon', type: 'quartier', coordinates: [-61.0800, 14.6000], address: 'Fort-de-France' },
  { id: 'centre-ville-lamentin', name: 'Centre-ville Le Lamentin', type: 'quartier', coordinates: [-61.0014, 14.6089], address: 'Le Lamentin' },
  
  // Plages et sites touristiques
  { id: 'anse-mitan', name: 'Anse Mitan', type: 'quartier', coordinates: [-61.0500, 14.4800], address: 'Les Trois-Îlets' },
  { id: 'anse-darlet', name: 'Anse d\'Arlet', type: 'quartier', coordinates: [-61.0833, 14.4833], address: 'Anse d\'Arlet' },
  { id: 'saint-anne', name: 'Sainte-Anne', type: 'commune', coordinates: [-60.8833, 14.4333], population: 5000, area: 38.42 },
  { id: 'les-trois-ilets', name: 'Les Trois-Îlets', type: 'commune', coordinates: [-61.0333, 14.5333], population: 7000, area: 28.60 },
];

export default function SearchBar({ onLocationSelect, onMapCenter, clickedLocation, onClearClickedLocation }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'ville' | 'rue' | 'quartier' | 'commune'>('all');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mettre à jour la query quand on clique sur la carte
  
const stableSetQuery = useCallback(() => {
  setQuery();
}, [setQuery]);

const stableSetIsOpen = useCallback(() => {
  setIsOpen();
}, [setIsOpen]);

const stableUseEffect = useCallback(() => {
  useEffect();
}, [useEffect]);

const stableContains = useCallback(() => {
  contains();
}, [contains]);

const stableAddEventListener = useCallback(() => {
  addEventListener();
}, [addEventListener]);

const stableRemoveEventListener = useCallback(() => {
  removeEventListener();
}, [removeEventListener]);

useEffect(() => {
  stableSetQuery();
  stableSetIsOpen();
  stableUseEffect();
  stableContains();
  stableSetIsOpen();
  stableAddEventListener();
  stableRemoveEventListener();
}, [stableSetQuery, stableSetIsOpen, stableUseEffect, stableContains, stableSetIsOpen, stableAddEventListener, stableRemoveEventListener]);;

  // Recherche en temps réel avec API
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Recherche locale d'abord (plus rapide)
    const localFiltered = MARTINIQUE_DATA.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                          (item.address && item.address.toLowerCase().includes(query.toLowerCase()));
      
      const matchesType = selectedType === 'all' || item.type === selectedType;
      
      return matchesQuery && matchesType;
    });

    // Toujours afficher les résultats locaux s'il y en a
    if (localFiltered.length > 0) {
      setResults(localFiltered.slice(0, 5));
      setIsOpen(true);
    }

    // Recherche API Mapbox Geocoding en arrière-plan
    const searchAPI = async () => {
      try {
        // Utiliser l'API Mapbox Geocoding (plus intelligente)
        const response = await fetch(`/api/geocoding?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        
        if (data.success && data.results.length > 0) {
          // Combiner résultats locaux et Mapbox
          const combinedResults = [...localFiltered, ...data.results];
          const uniqueResults = combinedResults.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id)
          );
          
          // Trier par score de pertinence
          const sortedResults = uniqueResults.sort((a, b) => {
            const scoreA = a.score || a.relevance || 0;
            const scoreB = b.score || b.relevance || 0;
            return scoreB - scoreA;
          });
          
          setResults(sortedResults.slice(0, 10));
          setIsOpen(true);
        } else if (localFiltered.length === 0) {
          // Si pas de résultats locaux et pas de résultats Mapbox, afficher message
          setResults([]);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Erreur recherche API:', error);
        // En cas d'erreur, garder les résultats locaux
        setResults(localFiltered.slice(0, 5));
        setIsOpen(true);
      }
    };

    // Délai pour éviter trop de requêtes
    const timeoutId = setTimeout(searchAPI, 300);
    return () => clearTimeout(timeoutId);
  }, [query, selectedType]);

  const handleSelect = (result: SearchResult) => {
    setQuery(result.name);
    setIsOpen(false);
    onLocationSelect(result);
    if (onMapCenter) {
      onMapCenter(result.coordinates);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'commune': return '🏛️';
      case 'quartier': return '🏘️';
      case 'rue': return '🛣️';
      case 'ville': return '🏙️';
      case 'place': return '🏛️';
      case 'locality': return '🏘️';
      case 'neighborhood': return '🏘️';
      case 'address': return '🛣️';
      case 'poi': return '📍';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'commune': 
      case 'place': return 'text-blue-600 bg-blue-50';
      case 'quartier': 
      case 'locality':
      case 'neighborhood': return 'text-green-600 bg-green-50';
      case 'rue': 
      case 'address': return 'text-orange-600 bg-orange-50';
      case 'ville': return 'text-purple-600 bg-purple-50';
      case 'poi': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'commune': 
      case 'place': return 'Commune';
      case 'quartier': 
      case 'locality':
      case 'neighborhood': return 'Quartier';
      case 'rue': 
      case 'address': return 'Rue';
      case 'ville': return 'Ville';
      case 'poi': return 'Lieu';
      default: return 'Lieu';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Barre de recherche principale */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Icône de recherche */}
          <div className="pl-4 pr-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Input de recherche */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder="Rechercher une ville, rue, quartier..."
            className="flex-1 px-3 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          
          {/* Filtres de type */}
          <div className="flex items-center border-l border-gray-200">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as unknown)}
              className="px-3 py-4 text-sm text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="all">Tout</option>
              <option value="commune">Communes</option>
              <option value="quartier">Quartiers</option>
              <option value="rue">Rues</option>
            </select>
          </div>
          
          {/* Bouton de recherche */}
          <button
            onClick={() => query.length >= 2 && setIsOpen(true)}
            className="px-4 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Liste des résultats */}
        {isOpen && results.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleSelect(result)}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-shrink-0 mr-3">
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 truncate">
                      {result.name}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(result.type)}`}>
                      {getTypeLabel(result.type)}
                    </span>
                    {result.score && (
                      <span className="text-xs text-gray-400">
                        {Math.round(result.score)}%
                      </span>
                    )}
                  </div>
                  
                  {/* Adresse simplifiée */}
                  {result.address && (
                    <div className="text-sm text-gray-500 truncate">
                      {result.is_martinique ? (
                        <span className="text-green-600">🏝️ {result.address}</span>
                      ) : (
                        <span className="text-blue-600">🌍 {result.address}</span>
                      )}
                    </div>
                  )}
                  
                  {result.population && (
                    <p className="text-xs text-gray-400">
                      {result.population.toLocaleString()} habitants
                    </p>
                  )}
                </div>
                
                <div className="flex-shrink-0 ml-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message si aucun résultat */}
        {isOpen && query.length >= 2 && results.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
              </svg>
              <p>Aucun résultat trouvé pour "{query}"</p>
              <p className="text-sm text-gray-400 mt-1">Essayez avec un autre terme</p>
            </div>
          </div>
        )}
      </div>

      {/* Adresse cliquée sur la carte */}
      {clickedLocation && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <div>
                <div className="font-medium text-green-800">{clickedLocation.name}</div>
                <div className="text-sm text-green-600">{clickedLocation.address}</div>
              </div>
            </div>
            {onClearClickedLocation && (
              <button
                onClick={onClearClickedLocation}
                className="text-green-600 hover:text-green-800 text-sm font-medium px-2 py-1 rounded hover:bg-green-100 transition"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Statistiques de recherche */}
      {query.length >= 2 && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          {results.length > 0 ? (
            <span>{results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}</span>
          ) : (
            <span>Recherche en cours...</span>
          )}
        </div>
      )}

    </div>
  );
}
