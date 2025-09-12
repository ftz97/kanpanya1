"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface RealMapboxMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function RealMapboxMap({ 
  className = "", 
  height = "400px",
  center = [2.3522, 48.8566], // Paris par défaut
  zoom = 12
}: RealMapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      return;
    }

    // Configuration de Mapbox
    mapboxgl.accessToken = token;

    try {
      // Initialisation de la carte
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
        setIsLoaded(true);
        console.log('Carte Mapbox chargée avec succès');
      });

      map.current.on('error', (e) => {
        console.error('Erreur Mapbox:', e);
        setError('Erreur lors du chargement de la carte');
      });

    } catch (err) {
      console.error('Erreur d\'initialisation Mapbox:', err);
      setError('Impossible d\'initialiser la carte');
    }

    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom]);

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
            <p className="text-gray-600">Chargement de la carte...</p>
          </div>
        </div>
      )}
      
      {/* Overlay avec informations */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">📍 Zone d'activité</p>
          <p className="text-blue-600">47 commerces actifs</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">🎯 Statistiques</p>
          <p className="text-green-600">1,247 scans aujourd'hui</p>
        </div>
      </div>
    </div>
  );
}