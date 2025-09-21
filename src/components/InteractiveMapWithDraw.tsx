"use client";

import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useEffect, useRef, useState, useCallback } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Neighborhood {
  id: string;
  name: string;
  geometry: unknown;
  created_at: string;
  color: string;
}

export default function InteractiveMapWithDraw() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

  
const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableNavigationControl = useCallback(() => {
  NavigationControl();
}, [NavigationControl]);

const stableFullscreenControl = useCallback(() => {
  FullscreenControl();
}, [FullscreenControl]);

const stableMapboxDraw = useCallback(() => {
  MapboxDraw();
}, [MapboxDraw]);

const stableLoadNeighborhoods = useCallback(() => {
  loadNeighborhoods();
}, [loadNeighborhoods]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableFetch = useCallback(() => {
  fetch();
}, [fetch]);

const stableJson = useCallback(() => {
  json();
}, [json]);

const stableAlert = useCallback(() => {
  alert();
}, [alert]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableHandleZoneCreation = useCallback(() => {
  handleZoneCreation();
}, [handleZoneCreation]);


const stableHandleZoneUpdate = useCallback(() => {
  handleZoneUpdate();
}, [handleZoneUpdate]);


const stableHandleZoneDeletion = useCallback(() => {
  handleZoneDeletion();
}, [handleZoneDeletion]);

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

useEffect(() => {
  stableMap();
  stableAddControl();
  stableNavigationControl();
  stableAddControl();
  stableFullscreenControl();
  stableMapboxDraw();
  stableAddControl();
  stableLoadNeighborhoods();
  stableOn();
  stableFetch();
  stableJson();
  stableAlert();
  stableLog();
  stableHandleZoneCreation();
  stableOn();
  stableHandleZoneUpdate();
  stableOn();
  stableHandleZoneDeletion();
  stableRemove();
}, [stableMap, stableAddControl, stableNavigationControl, stableAddControl, stableFullscreenControl, stableMapboxDraw, stableAddControl, stableLoadNeighborhoods, stableOn, stableFetch, stableJson, stableAlert, stableLog, stableHandleZoneCreation, stableOn, stableHandleZoneUpdate, stableOn, stableHandleZoneDeletion, stableRemove]);;

  const loadNeighborhoods = async () => {
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
    if (!mapRef.current || !neighborhoods.length) return;

    // Supprimer les anciennes sources
    if (mapRef.current.getSource('neighborhoods')) {
      mapRef.current.removeLayer('neighborhoods-fill');
      mapRef.current.removeLayer('neighborhoods-stroke');
      mapRef.current.removeSource('neighborhoods');
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
    mapRef.current.addSource('neighborhoods', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    });

    // Ajouter le style des quartiers
    mapRef.current.addLayer({
      id: 'neighborhoods-fill',
      type: 'fill',
      source: 'neighborhoods',
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': 0.3
      }
    });

    mapRef.current.addLayer({
      id: 'neighborhoods-stroke',
      type: 'line',
      source: 'neighborhoods',
      paint: {
        'line-color': ['get', 'color'],
        'line-width': 3
      }
    });

    // Ajouter les labels
    mapRef.current.addLayer({
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
    mapRef.current.on('click', 'neighborhoods-fill', (e: unknown) => {
      const feature = e.features[0];
      const neighborhood = neighborhoods.find(n => n.id === feature.properties.id);
      if (neighborhood) {
        setSelectedNeighborhood(neighborhood);
      }
    });

    // Changer le curseur au survol
    mapRef.current.on('mouseenter', 'neighborhoods-fill', () => {
      if (mapRef.current) {
        mapRef.current.getCanvas().style.cursor = 'pointer';
      }
    });

    mapRef.current.on('mouseleave', 'neighborhoods-fill', () => {
      if (mapRef.current) {
        mapRef.current.getCanvas().style.cursor = '';
      }
    });
  };

  const handleZoneCreation = (feature: unknown) => {
    setIsCreating(true);
    const name = prompt('Nom du nouveau quartier:');
    if (name && name.trim()) {
      createNeighborhood(name.trim(), feature);
    } else {
      // Supprimer la forme si pas de nom
      if (draw.current) {
        draw.current.delete(feature.id);
      }
    }
    setIsCreating(false);
  };

  const handleZoneUpdate = (feature: unknown) => {
    const neighborhood = neighborhoods.find(n => n.id === feature.id);
    if (neighborhood) {
      updateNeighborhood(neighborhood.id, feature);
    }
  };

  const handleZoneDeletion = (feature: unknown) => {
    const neighborhood = neighborhoods.find(n => n.id === feature.id);
    if (neighborhood) {
      deleteNeighborhood(neighborhood.id);
    }
  };

  const createNeighborhood = async (name: string, geometry: unknown) => {
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
        alert(`✅ Quartier "${name}" créé avec succès !`);
      } else {
        alert('❌ Erreur lors de la création du quartier');
      }
    } catch (err) {
      console.error('Erreur création quartier:', err);
      alert('❌ Erreur lors de la création du quartier');
    }
  };

  const updateNeighborhood = async (id: string, geometry: unknown) => {
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
        alert('✅ Quartier mis à jour !');
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
        alert('✅ Quartier supprimé !');
      }
    } catch (err) {
      console.error('Erreur suppression quartier:', err);
    }
  };

  const activateDrawingMode = (mode: string) => {
    if (!draw.current) return;
    draw.current.changeMode(mode);
  };

  const clearAllDrawings = () => {
    if (!draw.current) return;
    draw.current.deleteAll();
  };

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold mb-2">Carte Interactive Complète</h2>
      
      {/* Barre d'outils */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">🛠️ Outils</h3>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => activateDrawingMode('draw_point')}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            📍 Point
          </button>
          
          <button
            onClick={() => activateDrawingMode('draw_line_string')}
            className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            📏 Ligne
          </button>
          
          <button
            onClick={() => activateDrawingMode('draw_polygon')}
            className="px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            🔷 Polygone
          </button>
          
          <button
            onClick={() => activateDrawingMode('draw_rectangle')}
            className="px-3 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            📐 Rectangle
          </button>
          
          <button
            onClick={() => activateDrawingMode('draw_circle')}
            className="px-3 py-2 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700"
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

      {/* Panneau des quartiers */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-64 overflow-y-auto">
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
        <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h4 className="font-semibold text-gray-700 mb-2">Quartier sélectionné</h4>
          <p className="text-sm text-gray-600 mb-3">{selectedNeighborhood.name}</p>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedNeighborhood(null)}
              className="w-full px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              ✋ Désélectionner
            </button>
          </div>
        </div>
      )}

      <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow" />
    </div>
  );
}



