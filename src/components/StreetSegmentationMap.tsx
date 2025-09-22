"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface StreetSegment {
  id: string;
  name: string;
  coordinates: [number, number][];
  type: 'commercial' | 'residential' | 'mixed' | 'industrial';
  population?: number;
  businesses?: number;
  footTraffic?: number;
  color: string;
}

interface StreetSegmentationMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
  segments?: StreetSegment[];
  onSegmentClick?: (segment: StreetSegment) => void;
}

export default function StreetSegmentationMap({ 
  className = "", 
  height = "600px",
  center = [2.3522, 48.8566], // Paris par défaut
  zoom = 14,
  segments = [],
  onSegmentClick
}: StreetSegmentationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<StreetSegment | null>(null);

  // Segments de démonstration pour les collectivités
  const defaultSegments: StreetSegment[] = [
    {
      id: 'rue-commerciale-1',
      name: 'Rue de Rivoli',
      coordinates: [[2.3522, 48.8566], [2.3622, 48.8576], [2.3722, 48.8586]],
      type: 'commercial',
      population: 2500,
      businesses: 45,
      footTraffic: 8500,
      color: '#3b82f6'
    },
    {
      id: 'rue-residentielle-1',
      name: 'Rue de la Paix',
      coordinates: [[2.3322, 48.8666], [2.3422, 48.8676], [2.3522, 48.8686]],
      type: 'residential',
      population: 1800,
      businesses: 12,
      footTraffic: 3200,
      color: '#22c55e'
    },
    {
      id: 'rue-mixte-1',
      name: 'Boulevard Saint-Germain',
      coordinates: [[2.3422, 48.8466], [2.3522, 48.8476], [2.3622, 48.8486]],
      type: 'mixed',
      population: 3200,
      businesses: 28,
      footTraffic: 6200,
      color: '#f59e0b'
    }
  ];

  const segmentsToUse = segments.length > 0 ? segments : defaultSegments;

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      // Contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Ajouter une source de données pour les segments
      map.current.on('load', () => {
        if (!map.current) return;

        // Ajouter les segments comme source de données
        map.current.addSource('street-segments', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: segmentsToUse.map(segment => ({
              type: 'Feature',
              properties: {
                id: segment.id,
                name: segment.name,
                type: segment.type,
                population: segment.population,
                businesses: segment.businesses,
                footTraffic: segment.footTraffic,
                color: segment.color
              },
              geometry: {
                type: 'LineString',
                coordinates: segment.coordinates
              }
            }))
          }
        });

        // Style des segments selon leur type
        map.current.addLayer({
          id: 'street-segments',
          type: 'line',
          source: 'street-segments',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 6,
            'line-opacity': 0.8
          }
        });

        // Ajouter des marqueurs pour les statistiques
        segmentsToUse.forEach(segment => {
          const [lng, lat] = segment.coordinates[Math.floor(segment.coordinates.length / 2)];
          
          const el = document.createElement('div');
          el.className = 'segment-marker';
          el.style.cssText = `
            background-color: ${segment.color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          `;

          el.addEventListener('click', () => {
            setSelectedSegment(segment);
            onSegmentClick?.(segment);
          });

          new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .addTo(map.current!);
        });

        setIsLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('Erreur Mapbox:', e);
        setError('Erreur lors du chargement de la carte');
      });

    } catch (err) {
      console.error('Erreur d\'initialisation Mapbox:', err);
      setError('Impossible d\'initialiser la carte');
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, segmentsToUse]);

  if (error) {
    return (
      <div 
        className={`bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg"
        style={{ height }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Chargement de la segmentation...</p>
          </div>
        </div>
      )}
      
      {/* Légende des types de rues */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-95 p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Types de rues</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Commerciale</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Résidentielle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Mixte</span>
          </div>
        </div>
      </div>
      
      {/* Statistiques globales */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Vue d'ensemble</h3>
        <div className="text-sm space-y-1">
          <p><span className="font-medium">Population totale:</span> {segmentsToUse.reduce((sum, s) => sum + (s.population || 0), 0).toLocaleString()}</p>
          <p><span className="font-medium">Commerces:</span> {segmentsToUse.reduce((sum, s) => sum + (s.businesses || 0), 0)}</p>
          <p><span className="font-medium">Trafic piéton:</span> {segmentsToUse.reduce((sum, s) => sum + (s.footTraffic || 0), 0).toLocaleString()}/jour</p>
        </div>
      </div>

      {/* Panneau de détails du segment sélectionné */}
      {selectedSegment && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-95 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-700">{selectedSegment.name}</h3>
            <button 
              onClick={() => setSelectedSegment(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium capitalize">{selectedSegment.type}</span>
            </div>
            <div className="flex justify-between">
              <span>Population:</span>
              <span className="font-medium">{selectedSegment.population?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Commerces:</span>
              <span className="font-medium">{selectedSegment.businesses}</span>
            </div>
            <div className="flex justify-between">
              <span>Trafic piéton:</span>
              <span className="font-medium">{selectedSegment.footTraffic?.toLocaleString()}/jour</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
