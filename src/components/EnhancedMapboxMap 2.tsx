"use client";

import { useEffect, useRef, useState } from 'react';

export default function EnhancedMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const draw = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      return;
    }

    // Import dynamique de Mapbox GL JS
    Promise.all([
      import('mapbox-gl'),
      import('@mapbox/mapbox-gl-draw')
    ]).then(([mapboxgl, MapboxDraw]) => {
      mapboxgl.default.accessToken = token;

      try {
        // Initialisation de la carte
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [-61.55, 16.25], // Martinique
          zoom: 10
        });

        // Ajouter des contrôles
        map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

        // Ajouter MapboxDraw avec contrôles visibles
        draw.current = new MapboxDraw.default({
          displayControlsDefault: true, // ✅ Afficher tous les contrôles par défaut
          controls: {
            polygon: true,
            trash: true,
            point: false,
            line_string: false
          },
          styles: [
            // Style pour les polygones en cours de dessin
            {
              'id': 'gl-draw-polygon-fill-inactive',
              'type': 'fill',
              'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
              'paint': {
                'fill-color': '#3fb1ce',
                'fill-outline-color': '#3fb1ce',
                'fill-opacity': 0.1
              }
            },
            {
              'id': 'gl-draw-polygon-stroke-inactive',
              'type': 'line',
              'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
              'layout': {
                'line-cap': 'round',
                'line-join': 'round'
              },
              'paint': {
                'line-color': '#3fb1ce',
                'line-width': 2
              }
            },
            // Style pour les polygones actifs
            {
              'id': 'gl-draw-polygon-fill-active',
              'type': 'fill',
              'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
              'paint': {
                'fill-color': '#fbb03b',
                'fill-outline-color': '#fbb03b',
                'fill-opacity': 0.1
              }
            },
            {
              'id': 'gl-draw-polygon-stroke-active',
              'type': 'line',
              'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
              'layout': {
                'line-cap': 'round',
                'line-join': 'round'
              },
              'paint': {
                'line-color': '#fbb03b',
                'line-width': 2
              }
            }
          ]
        });

        map.current.addControl(draw.current);

        // Événement de création de polygone
        map.current.on('draw.create', (e: any) => {
          const feature = e.features[0];
          const name = prompt("Nom du quartier ?");
          if (name) {
            setDrawnPolygons(prev => [...prev, { name, feature, id: Date.now() }]);
          }
          setIsDrawing(false);
        });

        // Événement de suppression
        map.current.on('draw.delete', () => {
          setDrawnPolygons(prev => prev.slice(0, -1));
        });

        // Événement de début de dessin
        map.current.on('draw.modechange', (e: any) => {
          setIsDrawing(e.mode === 'draw_polygon');
        });

        // Événements de la carte
        map.current.on('load', () => {
          setIsLoaded(true);
          console.log('Carte Mapbox chargée avec succès');
        });

        map.current.on('error', (e: any) => {
          console.error('Erreur Mapbox:', e);
          setError('Erreur lors du chargement de la carte');
        });

      } catch (err) {
        console.error('Erreur d\'initialisation Mapbox:', err);
        setError('Impossible d\'initialiser la carte');
      }
    }).catch((err) => {
      console.error('Erreur d\'import Mapbox:', err);
      setError('Impossible de charger Mapbox GL JS');
    });

    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const startDrawing = () => {
    if (draw.current) {
      draw.current.changeMode('draw_polygon');
      setIsDrawing(true);
    }
  };

  const clearAll = () => {
    if (draw.current) {
      draw.current.deleteAll();
      setDrawnPolygons([]);
    }
  };

  if (error) {
    return (
      <div className="h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Instructions améliorées */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
          🗺️ Instructions de dessin
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Méthode 1 : Contrôles de la carte</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Cherchez les contrôles en haut à droite de la carte</li>
              <li>• Cliquez sur l'icône <span className="font-mono bg-blue-100 px-1 rounded">□</span> (polygone)</li>
              <li>• Dessinez en cliquant sur la carte</li>
              <li>• Double-cliquez pour fermer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Méthode 2 : Boutons ci-dessous</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Utilisez le bouton "🎨 Dessiner une zone"</li>
              <li>• Plus simple et plus visible</li>
              <li>• Même fonctionnalité</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Boutons de contrôle */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={startDrawing}
          disabled={!isLoaded}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isDrawing
              ? 'bg-orange-500 text-white'
              : isLoaded
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isDrawing ? '🎨 Dessin en cours...' : '🎨 Dessiner une zone'}
        </button>
        
        <button
          onClick={clearAll}
          disabled={!isLoaded || drawnPolygons.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
        >
          🗑️ Effacer tout
        </button>

        <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 flex items-center">
          📍 Zones créées: {drawnPolygons.length}
        </div>
      </div>

      {/* Carte */}
      <div className="h-96 border rounded-lg overflow-hidden relative">
        <div 
          ref={mapContainer} 
          className="w-full h-full"
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}

        {/* Indicateur de mode dessin */}
        {isDrawing && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">🎨</div>
              <span className="font-medium">Mode dessin actif</span>
            </div>
            <p className="text-xs mt-1 opacity-90">Cliquez sur la carte pour dessiner</p>
          </div>
        )}
      </div>

      {/* Liste des polygones créés */}
      {drawnPolygons.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3 text-gray-800">📍 Quartiers créés ({drawnPolygons.length})</h3>
          <div className="space-y-2">
            {drawnPolygons.map((polygon, index) => (
              <div key={polygon.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded border border-green-200">
                <div>
                  <span className="font-medium text-gray-800">{polygon.name}</span>
                  <p className="text-xs text-gray-500 mt-1">Zone #{index + 1}</p>
                </div>
                <button 
                  onClick={() => {
                    setDrawnPolygons(prev => prev.filter((_, i) => i !== index));
                    if (draw.current) {
                      draw.current.deleteAll();
                      drawnPolygons.forEach((p, i) => {
                        if (i !== index) {
                          draw.current.add(p.feature);
                        }
                      });
                    }
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
