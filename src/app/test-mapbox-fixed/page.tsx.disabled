"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestMapboxFixedPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initialisation...');

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      setStatus('❌ Token manquant');
      return;
    }

    setStatus('✅ Token trouvé, chargement de Mapbox...');

    // Fonction pour charger Mapbox avec retry
    const loadMapboxWithRetry = (retries = 3) => {
      if ((window as any).mapboxgl) {
        setStatus('✅ Mapbox chargé, initialisation de la carte...');
        initializeMap();
        return;
      }

      // Charger le CSS
      if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        cssLink.crossOrigin = 'anonymous';
        document.head.appendChild(cssLink);
      }

      // Charger le JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('Mapbox GL JS chargé avec succès');
        setStatus('✅ Mapbox chargé, initialisation de la carte...');
        setTimeout(() => {
          initializeMap();
        }, 200);
      };

      script.onerror = () => {
        console.error('Erreur chargement Mapbox, retry...');
        if (retries > 0) {
          setStatus(`⏳ Erreur chargement, retry ${4-retries}/3...`);
          setTimeout(() => {
            loadMapboxWithRetry(retries - 1);
          }, 1000);
        } else {
          setError('Impossible de charger Mapbox GL JS après 3 tentatives');
          setStatus('❌ Échec du chargement');
        }
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

        mapboxgl.accessToken = token;

        // Initialiser la carte
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-61.55, 16.25], // Martinique
          zoom: 12,
          attributionControl: false
        });

        // Ajouter des contrôles
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Marqueur principal
        new mapboxgl.Marker({ color: '#10b981' })
          .setLngLat([-61.55, 16.25])
          .addTo(map);

        // Événements de la carte
        map.on('load', () => {
          console.log('Carte chargée avec succès !');
          setIsLoaded(true);
          setStatus('✅ Carte chargée avec succès !');
        });

        map.on('error', (e: any) => {
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

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      loadMapboxWithRetry();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte Mapbox - Version Corrigée
        </h1>
        
        {/* Status en temps réel */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">📊 Status en Temps Réel</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Progression:</p>
              <p className="font-semibold text-blue-600">{status}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Token:</p>
              <p className="font-semibold text-green-600">
                {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Configuré' : '❌ Manquant'}
              </p>
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">🗺️ Carte Interactive</h2>
          
          <div className="relative" style={{ height: '500px' }}>
            <div 
              ref={mapContainer} 
              className="w-full h-full rounded-lg"
              style={{ height: '500px' }}
            />
            
            {!isLoaded && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">{status}</p>
                </div>
              </div>
            )}
            
            {/* Overlay avec informations */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
              <div className="text-sm">
                <p className="font-semibold text-gray-700">📍 Centre</p>
                <p className="text-blue-600">Martinique (-61.55, 16.25)</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
              <div className="text-sm">
                <p className="font-semibold text-gray-700">🎯 Zoom</p>
                <p className="text-green-600">12</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Status Final:</strong> {isLoaded ? '✅ Carte chargée avec succès !' : '⏳ Chargement en cours...'}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Instructions</h2>
          <div className="space-y-3 text-green-700">
            <p><strong>1.</strong> Cette version inclut un système de retry automatique</p>
            <p><strong>2.</strong> Le status se met à jour en temps réel</p>
            <p><strong>3.</strong> Si la carte ne se charge pas, elle réessaiera 3 fois</p>
            <p><strong>4.</strong> Ouvrez la console pour voir les logs détaillés</p>
          </div>
        </div>
      </div>
    </div>
  );
}



