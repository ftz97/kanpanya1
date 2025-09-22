"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    console.log('Token Mapbox:', token ? 'Présent' : 'Manquant');

    if (!token) {
      setError('Token Mapbox manquant');
      return;
    }

    // Import dynamique de Mapbox
    const initMap = async () => {
      try {
        console.log('🔄 Début de l\'import Mapbox...');
        const mapboxgl = (await import('mapbox-gl')).default;
        console.log('✅ Mapbox importé avec succès');
        
        mapboxgl.accessToken = token;
        console.log('✅ Token Mapbox défini');

        const map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-61.0742, 14.6036], // Fort-de-France
          zoom: 12
        });

        console.log('✅ Carte Mapbox créée');

        map.on('load', () => {
          console.log('✅ Carte Mapbox chargée avec succès');
          setIsLoaded(true);
        });

        map.on('error', (e) => {
          console.error('❌ Erreur Mapbox:', e);
          setError('Erreur lors du chargement de la carte');
        });

      } catch (err) {
        console.error('❌ Erreur import Mapbox:', err);
        setError(`Erreur lors de l'import de Mapbox: ${err}`);
      }
    };

    initMap();
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🔍 Test de la carte Mapbox</h3>
        <div className="text-sm text-blue-700">
          <p>Token: {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Présent' : '❌ Manquant'}</p>
          <p>État: {isLoaded ? '✅ Chargée' : error ? `❌ ${error}` : '⏳ Chargement...'}</p>
        </div>
      </div>
      
      <div className="h-96 border rounded-lg overflow-hidden relative">
        <div ref={mapContainer} className="w-full h-full" />
        {!isLoaded && !error && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
            <div className="text-center text-red-600">
              <p className="font-semibold">Erreur</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
