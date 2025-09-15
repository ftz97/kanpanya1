"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestMapboxAlternativePage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initialisation...');
  const [mapboxLoaded, setMapboxLoaded] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      setStatus('❌ Token manquant');
      return;
    }

    setStatus('✅ Token trouvé, chargement de Mapbox...');

    // Fonction pour charger Mapbox avec une approche différente
    const loadMapboxAlternative = () => {
      // Vérifier si Mapbox est déjà chargé
      if ((window as any).mapboxgl) {
        setMapboxLoaded(true);
        setStatus('✅ Mapbox déjà chargé, initialisation...');
        initializeMap();
        return;
      }

      // Charger le CSS d'abord
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      cssLink.crossOrigin = 'anonymous';
      cssLink.onload = () => {
        console.log('CSS Mapbox chargé');
        setStatus('✅ CSS chargé, chargement du JS...');
      };
      document.head.appendChild(cssLink);

      // Charger le JS avec une approche différente
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = false; // Chargement synchrone pour éviter les problèmes
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('Mapbox GL JS chargé avec succès');
        setMapboxLoaded(true);
        setStatus('✅ Mapbox chargé, initialisation de la carte...');
        
        // Délai pour s'assurer que tout est prêt
        setTimeout(() => {
          initializeMap();
        }, 500);
      };

      script.onerror = (e) => {
        console.error('Erreur chargement Mapbox:', e);
        setError('Impossible de charger Mapbox GL JS');
        setStatus('❌ Erreur de chargement');
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

        // Initialiser la carte avec des options plus simples
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-61.55, 16.25], // Martinique
          zoom: 12,
          attributionControl: false,
          antialias: false, // Désactiver l'antialiasing pour éviter les problèmes
          preserveDrawingBuffer: true // Préserver le buffer de dessin
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

        // Timeout de sécurité
        setTimeout(() => {
          if (!isLoaded) {
            setError('Timeout - la carte n\'a pas pu se charger');
            setStatus('❌ Timeout');
          }
        }, 10000);

      } catch (err) {
        console.error('Erreur d\'initialisation Mapbox:', err);
        setError('Impossible d\'initialiser la carte');
        setStatus('❌ Erreur d\'initialisation');
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      loadMapboxAlternative();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoaded]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-3">❌</div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Status: {status}</p>
            <div className="mt-4 p-3 bg-yellow-50 rounded">
              <p className="text-yellow-800 text-xs">
                <strong>Solution alternative :</strong> Essayez de rafraîchir la page ou vérifiez votre connexion internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte Mapbox - Approche Alternative
        </h1>
        
        {/* Status en temps réel */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">📊 Status en Temps Réel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Progression:</p>
              <p className="font-semibold text-blue-600">{status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Token:</p>
              <p className="font-semibold text-green-600">
                {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Configuré' : '❌ Manquant'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mapbox:</p>
              <p className="font-semibold text-purple-600">
                {mapboxLoaded ? '✅ Chargé' : '⏳ Chargement...'}
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
                  <p className="text-xs text-gray-500 mt-2">
                    {mapboxLoaded ? 'Initialisation de la carte...' : 'Chargement de Mapbox...'}
                  </p>
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
            <p className="text-blue-700 text-xs mt-2">
              <strong>Approche:</strong> Chargement synchrone + timeout de sécurité + options simplifiées
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Instructions</h2>
          <div className="space-y-3 text-green-700">
            <p><strong>1.</strong> Cette version utilise un chargement synchrone</p>
            <p><strong>2.</strong> Timeout de sécurité de 10 secondes</p>
            <p><strong>3.</strong> Options de carte simplifiées</p>
            <p><strong>4.</strong> Status détaillé pour chaque étape</p>
            <p><strong>5.</strong> Ouvrez la console pour voir les logs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

