"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface BasicMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function BasicMap({ 
  className = "", 
  height = "400px",
  center = [-61.55, 16.25], // Martinique par défaut
  zoom = 12
}: BasicMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapboxReady, setMapboxReady] = useState(false);

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetMapboxReady = useCallback(() => {
  setMapboxReady();
}, [setMapboxReady]);

const stableCreateElement = useCallback(() => {
  createElement();
}, [createElement]);

const stableAppendChild = useCallback(() => {
  appendChild();
}, [appendChild]);


const stableLog = useCallback(() => {
  log();
}, [log]);




const stableError = useCallback(() => {
  error();
}, [error]);


const stableLoadMapbox = useCallback(() => {
  loadMapbox();
}, [loadMapbox]);

useEffect(() => {
  stableIncludes();
  stableSetError();
  stableSetMapboxReady();
  stableCreateElement();
  stableAppendChild();
  stableCreateElement();
  stableLog();
  stableSetMapboxReady();
  stableSetError();
  stableAppendChild();
  stableError();
  stableSetError();
  stableLoadMapbox();
}, [stableIncludes, stableSetError, stableSetMapboxReady, stableCreateElement, stableAppendChild, stableCreateElement, stableLog, stableSetMapboxReady, stableSetError, stableAppendChild, stableError, stableSetError, stableLoadMapbox]);;

  useEffect(() => {
    if (!mapboxReady || !mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    try {
      const mapboxgl = (window as unknown).mapboxgl;
      if (!mapboxgl) {
        setError('Mapbox GL JS non disponible');
        return;
      }

      mapboxgl.accessToken = token;

      // Initialiser la carte
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      // Ajouter des contrôles
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Marqueur principal
      new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat(center)
        .addTo(map);

      // Événements de la carte
      map.on('load', () => {
        console.log('Carte chargée avec succès');
        setIsLoaded(true);
      });

      map.on('error', (e: unknown) => {
        console.error('Erreur Mapbox:', e);
        setError('Erreur lors du chargement de la carte');
      });

    } catch (err) {
      console.error('Erreur d\'initialisation Mapbox:', err);
      setError('Impossible d\'initialiser la carte');
    }
  }, [mapboxReady, center, zoom]);

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
            <p className="text-gray-600">
              {!mapboxReady ? 'Chargement de Mapbox...' : 'Chargement de la carte...'}
            </p>
          </div>
        </div>
      )}
      
      {/* Overlay avec informations */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">📍 Centre</p>
          <p className="text-blue-600">Martinique ({center[0]}, {center[1]})</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">🎯 Zoom</p>
          <p className="text-green-600">{zoom}</p>
        </div>
      </div>
    </div>
  );
}