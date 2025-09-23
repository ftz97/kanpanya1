"use client";

import { useEffect, useRef, useState } from 'react';

interface CompleteMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function CompleteMap({ 
  className = "", 
  height = "600px",
  center = [-61.55, 16.25], // Martinique par défaut
  zoom = 12
}: CompleteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const draw = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initialisation...');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [streets, setStreets] = useState<any[]>([]);
  const [drawingMode, setDrawingMode] = useState('simple_select');
  const [isDrawingActive, setIsDrawingActive] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      setStatus('❌ Token manquant');
      return;
    }

    setStatus('✅ Token trouvé, chargement de Mapbox...');

    // Timeout de sécurité
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        setStatus('⏳ Timeout - affichage du fallback');
        setError('Mapbox n\'a pas pu se charger');
      }
    }, 10000);

    // Charger Mapbox
    const loadMapbox = () => {
      if ((window as any).mapboxgl) {
        setStatus('✅ Mapbox déjà chargé, initialisation...');
        initializeMap();
        return;
      }

      // Charger le CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      cssLink.crossOrigin = 'anonymous';
      document.head.appendChild(cssLink);

      // Charger le JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('Mapbox GL JS chargé avec succès');
        setStatus('✅ Mapbox chargé, initialisation de la carte...');
        clearTimeout(fallbackTimer);
        initializeMap();
      };

      script.onerror = () => {
        console.error('Erreur chargement Mapbox');
        setStatus('❌ Erreur de chargement');
        setError('Impossible de charger Mapbox GL JS');
        clearTimeout(fallbackTimer);
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapContainer.current) return;

      try {
        const mapboxgl = (window as any).mapboxgl;
        if (!mapboxgl) {
          setError('Mapbox GL JS non disponible');
          setStatus('❌ Mapbox non disponible');
          return;
        }

        setStatus('✅ Initialisation de la carte...');
        mapboxgl.accessToken = token;

        // Initialiser la carte
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: center,
          zoom: zoom,
          attributionControl: false
        });

        // Ajouter des contrôles
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        // Marqueur principal
        new mapboxgl.Marker({ color: '#10b981' })
          .setLngLat(center)
          .addTo(map.current);

        // Événements de la carte
        map.current.on('load', () => {
          console.log('Carte chargée avec succès !');
          setIsLoaded(true);
          setStatus('✅ Carte chargée avec succès !');
          initializeDrawing();
        });

        map.current.on('error', (e: any) => {
          console.error('Erreur Mapbox:', e);
          setError('Erreur lors du chargement de la carte');
          setStatus('❌ Erreur de carte');
        });

      } catch (err) {
        console.error('Erreur d\'initialisation Mapbox:', err);
        setError('Impossible d\'initialiser la carte');
        setStatus('❌ Erreur d\'initialisation');
      }
    };

    const initializeDrawing = () => {
      if (!map.current) return;

      try {
        // Charger Mapbox Draw
        const drawScript = document.createElement('script');
        drawScript.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.js';
        drawScript.onload = () => {
          const MapboxDraw = (window as any).MapboxDraw;
          
          // Initialiser Mapbox Draw
          draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              polygon: true,
              rectangle: true,
              circle: true,
              line_string: true,
              trash: true
            },
            defaultMode: 'simple_select'
          });

          map.current.addControl(draw.current, 'top-left');

          // Événements de dessin
          map.current.on('draw.create', (e: any) => {
            console.log('Forme créée:', e);
            handleAreaSelection(e.features[0]);
          });

          map.current.on('draw.update', (e: any) => {
            console.log('Forme mise à jour:', e);
            handleAreaSelection(e.features[0]);
          });

          map.current.on('draw.delete', () => {
            console.log('Forme supprimée');
            setSelectedArea(null);
            setStreets([]);
          });

          setStatus('✅ Outils de dessin chargés !');
        };

        drawScript.onerror = () => {
          console.error('Erreur chargement Mapbox Draw');
          setStatus('⚠️ Outils de dessin non disponibles');
        };

        document.head.appendChild(drawScript);

        // Charger le CSS de Mapbox Draw
        const drawCss = document.createElement('link');
        drawCss.rel = 'stylesheet';
        drawCss.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.css';
        document.head.appendChild(drawCss);

      } catch (err) {
        console.error('Erreur initialisation dessin:', err);
      }
    };

    const handleAreaSelection = (feature: any) => {
      if (!feature || !map.current) return;

      setSelectedArea(feature);
      
      // Obtenir les coordonnées de la zone sélectionnée
      const coordinates = feature.geometry.coordinates[0];
      
      // Calculer les limites de la zone
      const lngs = coordinates.map((coord: any) => coord[0]);
      const lats = coordinates.map((coord: any) => coord[1]);
      
      const bounds = [
        [Math.min(...lngs), Math.min(...lats)], // Sud-Ouest
        [Math.max(...lngs), Math.max(...lats)]  // Nord-Est
      ];

      // Rechercher les rues dans cette zone
      searchStreetsInArea(bounds);
    };

    const searchStreetsInArea = async (bounds: any) => {
      if (!map.current) return;

      try {
        setStatus('🔍 Recherche des rues dans la zone...');
        
        // Utiliser l'API de géocodage inversé de Mapbox
        const [sw, ne] = bounds;
        const center = [
          (sw[0] + ne[0]) / 2,
          (sw[1] + ne[1]) / 2
        ];

        // Requête pour obtenir les rues
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/street.json?bbox=${sw[0]},${sw[1]},${ne[0]},${ne[1]}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
        );

        if (response.ok) {
          const data = await response.json();
          const streetFeatures = data.features.filter((feature: any) => 
            feature.place_type.includes('street') || 
            feature.place_type.includes('road')
          );
          
          setStreets(streetFeatures);
          setStatus(`✅ ${streetFeatures.length} rues trouvées dans la zone`);
          
          // Afficher les rues sur la carte
          displayStreetsOnMap(streetFeatures);
        } else {
          console.error('Erreur API géocodage');
          setStatus('❌ Erreur lors de la recherche des rues');
        }
      } catch (err) {
        console.error('Erreur recherche rues:', err);
        setStatus('❌ Erreur lors de la recherche des rues');
      }
    };

    const displayStreetsOnMap = (streetFeatures: any[]) => {
      if (!map.current || !streetFeatures.length) return;

      // Supprimer les anciennes sources
      if (map.current.getSource('streets')) {
        map.current.removeLayer('streets');
        map.current.removeSource('streets');
      }

      // Ajouter les rues comme source
      map.current.addSource('streets', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: streetFeatures
        }
      });

      // Ajouter le style des rues
      map.current.addLayer({
        id: 'streets',
        type: 'circle',
        source: 'streets',
        paint: {
          'circle-color': '#ff6b6b',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Ajouter les labels des rues
      map.current.addLayer({
        id: 'street-labels',
        type: 'symbol',
        source: 'streets',
        layout: {
          'text-field': ['get', 'text'],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 12,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#333333',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2
        }
      });
    };

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      loadMapbox();
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [center, zoom, isLoaded]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !map.current) return;

    try {
      setStatus('🔍 Recherche en cours...');
      
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&country=MQ&limit=5`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.features);
        setStatus(`✅ ${data.features.length} résultats trouvés`);
      } else {
        console.error('Erreur recherche');
        setStatus('❌ Erreur lors de la recherche');
      }
    } catch (err) {
      console.error('Erreur recherche:', err);
      setStatus('❌ Erreur lors de la recherche');
    }
  };

  const handleResultClick = (result: any) => {
    if (!map.current) return;

    const [lng, lat] = result.center;
    map.current.flyTo({ center: [lng, lat], zoom: 16 });
    
    // Ajouter un marqueur
    new (window as any).mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat([lng, lat])
      .setPopup(new (window as any).mapboxgl.Popup().setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${result.place_name}</h3>
          <p class="text-sm text-gray-600">${result.properties?.category || 'Lieu'}</p>
        </div>
      `))
      .addTo(map.current);
  };

  const activateDrawingMode = (mode: string) => {
    if (!draw.current) return;
    
    setDrawingMode(mode);
    setIsDrawingActive(true);
    draw.current.changeMode(mode);
    setStatus(`✅ Mode ${mode} activé - Dessinez sur la carte`);
  };

  const deactivateDrawing = () => {
    if (!draw.current) return;
    
    setIsDrawingActive(false);
    draw.current.changeMode('simple_select');
    setStatus('✅ Mode dessin désactivé');
  };

  const clearAllDrawings = () => {
    if (!draw.current) return;
    
    draw.current.deleteAll();
    setSelectedArea(null);
    setStreets([]);
    setStatus('✅ Tous les dessins supprimés');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-3">❌</div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Status: {status}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Barre de recherche */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Rechercher un lieu..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🔍
            </button>
          </div>
          
          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <div className="mt-2 max-h-40 overflow-y-auto">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                >
                  <p className="text-sm font-medium">{result.place_name}</p>
                  <p className="text-xs text-gray-500">{result.properties?.category || 'Lieu'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barre d'outils de dessin */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3">🛠️ Outils de dessin</h3>
          
          <div className="space-y-2">
            {/* Boutons de mode de dessin */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => activateDrawingMode('draw_rectangle')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  drawingMode === 'draw_rectangle' && isDrawingActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📐 Rectangle
              </button>
              
              <button
                onClick={() => activateDrawingMode('draw_circle')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  drawingMode === 'draw_circle' && isDrawingActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⭕ Cercle
              </button>
              
              <button
                onClick={() => activateDrawingMode('draw_polygon')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  drawingMode === 'draw_polygon' && isDrawingActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔷 Polygone
              </button>
              
              <button
                onClick={() => activateDrawingMode('draw_line_string')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  drawingMode === 'draw_line_string' && isDrawingActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📏 Ligne
              </button>
            </div>
            
            {/* Boutons de contrôle */}
            <div className="flex space-x-2">
              <button
                onClick={deactivateDrawing}
                className="flex-1 px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                ✋ Arrêter
              </button>
              
              <button
                onClick={clearAllDrawings}
                className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                🗑️ Effacer
              </button>
            </div>
            
            {/* Indicateur de mode actif */}
            {isDrawingActive && (
              <div className="text-xs text-blue-600 font-medium text-center">
                Mode actif: {drawingMode}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carte */}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg"
        style={{ height }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">{status}</p>
          </div>
        </div>
      )}

      {/* Panneau d'informations */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow max-w-sm">
        <h3 className="font-semibold text-gray-700 mb-2">📊 Informations</h3>
        <div className="space-y-1 text-sm">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Zone sélectionnée:</strong> {selectedArea ? 'Oui' : 'Non'}</p>
          <p><strong>Rues trouvées:</strong> {streets.length}</p>
          <p><strong>Mode dessin:</strong> {isDrawingActive ? drawingMode : 'Inactif'}</p>
        </div>
        
        {streets.length > 0 && (
          <div className="mt-3 max-h-32 overflow-y-auto">
            <h4 className="font-semibold text-gray-700 mb-1">Rues dans la zone:</h4>
            {streets.slice(0, 5).map((street, index) => (
              <p key={index} className="text-xs text-gray-600">
                • {street.place_name}
              </p>
            ))}
            {streets.length > 5 && (
              <p className="text-xs text-gray-500">
                ... et {streets.length - 5} autres
              </p>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow max-w-xs">
        <h4 className="font-semibold text-gray-700 mb-1">📝 Instructions</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Utilisez la barre de recherche</li>
          <li>• Cliquez sur un outil de dessin</li>
          <li>• Dessinez sur la carte</li>
          <li>• Les rues s'afficheront automatiquement</li>
        </ul>
      </div>
    </div>
  );
}
