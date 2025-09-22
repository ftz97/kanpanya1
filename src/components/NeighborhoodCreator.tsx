"use client";

import { useEffect, useRef, useState } from 'react';
import ZoneAnalysisDashboard from './ZoneAnalysisDashboard';

interface NeighborhoodCreatorProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

interface Neighborhood {
  id: string;
  name: string;
  geometry: any;
  created_at: string;
  color: string;
}

export default function NeighborhoodCreator({ 
  className = "", 
  height = "600px",
  center = [-61.55, 16.25], // Martinique par défaut
  zoom = 12
}: NeighborhoodCreatorProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const draw = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initialisation...');
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newNeighborhoodName, setNewNeighborhoodName] = useState('');

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      setStatus('❌ Token manquant');
      return;
    }

    setStatus('✅ Token trouvé, chargement de Mapbox...');

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
        initializeMap();
      };

      script.onerror = () => {
        console.error('Erreur chargement Mapbox');
        setStatus('❌ Erreur de chargement');
        setError('Impossible de charger Mapbox GL JS');
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

        // Événements de la carte
        map.current.on('load', () => {
          console.log('Carte chargée avec succès !');
          setIsLoaded(true);
          setStatus('✅ Carte chargée avec succès !');
          initializeDrawing();
          loadExistingNeighborhoods();
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
              trash: true
            },
            defaultMode: 'simple_select'
          });

          map.current.addControl(draw.current, 'top-left');

          // Événements de dessin
          map.current.on('draw.create', (e: any) => {
            console.log('Zone créée:', e);
            handleZoneCreation(e.features[0]);
          });

          map.current.on('draw.update', (e: any) => {
            console.log('Zone mise à jour:', e);
            handleZoneUpdate(e.features[0]);
          });

          map.current.on('draw.delete', (e: any) => {
            console.log('Zone supprimée:', e);
            handleZoneDeletion(e.features[0]);
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

    const loadExistingNeighborhoods = async () => {
      try {
        const response = await fetch('/api/neighborhoods');
        if (response.ok) {
          const data = await response.json();
          setNeighborhoods(data.neighborhoods || []);
          displayNeighborhoodsOnMap(data.neighborhoods || []);
        }
      } catch (err) {
        console.error('Erreur chargement quartiers:', err);
      }
    };

    const displayNeighborhoodsOnMap = (neighborhoods: Neighborhood[]) => {
      if (!map.current || !neighborhoods.length) return;

      // Supprimer les anciennes sources
      if (map.current.getSource('neighborhoods')) {
        map.current.removeLayer('neighborhoods-fill');
        map.current.removeLayer('neighborhoods-stroke');
        map.current.removeSource('neighborhoods');
      }

      // Créer les features GeoJSON
      const features = neighborhoods.map(neighborhood => ({
        type: 'Feature',
        properties: {
          id: neighborhood.id,
          name: neighborhood.name,
          color: neighborhood.color
        },
        geometry: neighborhood.geometry
      }));

      // Ajouter les quartiers comme source
      map.current.addSource('neighborhoods', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      });

      // Ajouter le style des quartiers
      map.current.addLayer({
        id: 'neighborhoods-fill',
        type: 'fill',
        source: 'neighborhoods',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.3
        }
      });

      map.current.addLayer({
        id: 'neighborhoods-stroke',
        type: 'line',
        source: 'neighborhoods',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 3
        }
      });

      // Ajouter les labels
      map.current.addLayer({
        id: 'neighborhoods-labels',
        type: 'symbol',
        source: 'neighborhoods',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 14,
          'text-offset': [0, 0],
          'text-anchor': 'center'
        },
        paint: {
          'text-color': '#333333',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2
        }
      });

      // Événement de clic sur les quartiers
      map.current.on('click', 'neighborhoods-fill', (e: any) => {
        const feature = e.features[0];
        const neighborhood = neighborhoods.find(n => n.id === feature.properties.id);
        if (neighborhood) {
          setSelectedNeighborhood(neighborhood);
        }
      });

      // Changer le curseur au survol
      map.current.on('mouseenter', 'neighborhoods-fill', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'neighborhoods-fill', () => {
        map.current.getCanvas().style.cursor = '';
      });
    };

    const handleZoneCreation = (feature: any) => {
      setIsCreating(true);
      setNewNeighborhoodName('');
      
      // Afficher un modal pour nommer le quartier
      const name = prompt('Nom du nouveau quartier:');
      if (name && name.trim()) {
        createNeighborhood(name.trim(), feature);
      } else {
        // Supprimer la forme si pas de nom
        draw.current.delete(feature.id);
      }
      setIsCreating(false);
    };

    const handleZoneUpdate = (feature: any) => {
      // Mettre à jour le quartier existant
      const neighborhood = neighborhoods.find(n => n.id === feature.id);
      if (neighborhood) {
        updateNeighborhood(neighborhood.id, feature);
      }
    };

    const handleZoneDeletion = (feature: any) => {
      // Supprimer le quartier
      const neighborhood = neighborhoods.find(n => n.id === feature.id);
      if (neighborhood) {
        deleteNeighborhood(neighborhood.id);
      }
    };

    const createNeighborhood = async (name: string, geometry: any) => {
      try {
        const newNeighborhood: Neighborhood = {
          id: crypto.randomUUID(),
          name: name,
          geometry: geometry.geometry,
          created_at: new Date().toISOString(),
          color: colors[neighborhoods.length % colors.length]
        };

        const response = await fetch('/api/neighborhoods', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNeighborhood),
        });

        if (response.ok) {
          const updatedNeighborhoods = [...neighborhoods, newNeighborhood];
          setNeighborhoods(updatedNeighborhoods);
          displayNeighborhoodsOnMap(updatedNeighborhoods);
          setStatus(`✅ Quartier "${name}" créé avec succès !`);
        } else {
          setStatus('❌ Erreur lors de la création du quartier');
        }
      } catch (err) {
        console.error('Erreur création quartier:', err);
        setStatus('❌ Erreur lors de la création du quartier');
      }
    };

    const updateNeighborhood = async (id: string, geometry: any) => {
      try {
        const response = await fetch(`/api/neighborhoods/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ geometry: geometry.geometry }),
        });

        if (response.ok) {
          const updatedNeighborhoods = neighborhoods.map(n => 
            n.id === id ? { ...n, geometry: geometry.geometry } : n
          );
          setNeighborhoods(updatedNeighborhoods);
          displayNeighborhoodsOnMap(updatedNeighborhoods);
          setStatus('✅ Quartier mis à jour !');
        }
      } catch (err) {
        console.error('Erreur mise à jour quartier:', err);
      }
    };

    const deleteNeighborhood = async (id: string) => {
      try {
        const response = await fetch(`/api/neighborhoods/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedNeighborhoods = neighborhoods.filter(n => n.id !== id);
          setNeighborhoods(updatedNeighborhoods);
          displayNeighborhoodsOnMap(updatedNeighborhoods);
          setStatus('✅ Quartier supprimé !');
        }
      } catch (err) {
        console.error('Erreur suppression quartier:', err);
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      loadMapbox();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [center, zoom, isLoaded, neighborhoods]);

  const activateDrawingMode = (mode: string) => {
    if (!draw.current) return;
    draw.current.changeMode(mode);
    setStatus(`✅ Mode ${mode} activé - Dessinez un quartier sur la carte`);
  };

  const clearAllDrawings = () => {
    if (!draw.current) return;
    draw.current.deleteAll();
    setStatus('✅ Tous les dessins supprimés');
  };

  const analyzeNeighborhood = () => {
    if (selectedNeighborhood) {
      setShowAnalysis(true);
    }
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
      {/* Barre d'outils */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3">🏘️ Créateur de Quartiers</h3>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => activateDrawingMode('draw_rectangle')}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              📐 Rectangle
            </button>
            
            <button
              onClick={() => activateDrawingMode('draw_polygon')}
              className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              🔷 Polygone
            </button>
            
            <button
              onClick={() => activateDrawingMode('draw_circle')}
              className="px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              ⭕ Cercle
            </button>
            
            <button
              onClick={clearAllDrawings}
              className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              🗑️ Effacer
            </button>
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

      {/* Panneau des quartiers */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow max-w-sm max-h-64 overflow-y-auto">
        <h3 className="font-semibold text-gray-700 mb-2">🏘️ Quartiers ({neighborhoods.length})</h3>
        
        {neighborhoods.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun quartier créé</p>
        ) : (
          <div className="space-y-2">
            {neighborhoods.map((neighborhood) => (
              <div
                key={neighborhood.id}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  selectedNeighborhood?.id === neighborhood.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedNeighborhood(neighborhood)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: neighborhood.color }}
                  ></div>
                  <span className="text-sm font-medium">{neighborhood.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Panneau d'actions pour le quartier sélectionné */}
      {selectedNeighborhood && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg shadow max-w-xs">
          <h4 className="font-semibold text-gray-700 mb-2">Quartier sélectionné</h4>
          <p className="text-sm text-gray-600 mb-3">{selectedNeighborhood.name}</p>
          
          <div className="space-y-2">
            <button
              onClick={analyzeNeighborhood}
              className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              📊 Analyser
            </button>
            
            <button
              onClick={() => setSelectedNeighborhood(null)}
              className="w-full px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              ✋ Désélectionner
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow max-w-xs">
          <h4 className="font-semibold text-gray-700 mb-1">📝 Instructions</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Cliquez sur un outil de dessin</li>
            <li>• Dessinez une zone sur la carte</li>
            <li>• Donnez un nom au quartier</li>
            <li>• Cliquez sur un quartier pour l'analyser</li>
          </ul>
        </div>
      </div>

      {/* Modal d'analyse */}
      {showAnalysis && selectedNeighborhood && (
        <ZoneAnalysisDashboard
          zoneData={{
            name: selectedNeighborhood.name,
            feature: {
              type: 'Feature',
              properties: { id: selectedNeighborhood.id },
              geometry: selectedNeighborhood.geometry
            }
          }}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
}



