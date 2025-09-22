"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestMapboxFallbackPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initialisation...');
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      setStatus('❌ Token manquant');
      setShowFallback(true);
      return;
    }

    setStatus('✅ Token trouvé, chargement de Mapbox...');

    // Timeout de sécurité - si Mapbox ne se charge pas en 5 secondes, afficher le fallback
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        setStatus('⏳ Timeout - affichage du fallback');
        setShowFallback(true);
      }
    }, 5000);

    // Fonction pour charger Mapbox
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
        setStatus('❌ Erreur de chargement - affichage du fallback');
        setShowFallback(true);
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
          setStatus('❌ Mapbox non disponible - affichage du fallback');
          setShowFallback(true);
          return;
        }

        setStatus('✅ Initialisation de la carte...');
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
          clearTimeout(fallbackTimer);
        });

        map.on('error', (e: any) => {
          console.error('Erreur Mapbox:', e);
          setError('Erreur lors du chargement de la carte');
          setStatus('❌ Erreur de carte - affichage du fallback');
          setShowFallback(true);
          clearTimeout(fallbackTimer);
        });

      } catch (err) {
        console.error('Erreur d\'initialisation Mapbox:', err);
        setError('Impossible d\'initialiser la carte');
        setStatus('❌ Erreur d\'initialisation - affichage du fallback');
        setShowFallback(true);
        clearTimeout(fallbackTimer);
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      loadMapbox();
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte Mapbox - Avec Fallback
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
              <p className="text-sm text-gray-600">Mode:</p>
              <p className="font-semibold text-purple-600">
                {showFallback ? '🔄 Fallback' : '🗺️ Mapbox'}
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
            
            {!isLoaded && !showFallback && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">{status}</p>
                </div>
              </div>
            )}

            {/* Fallback - Carte statique */}
            {showFallback && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Carte Interactive</h3>
                  <p className="text-gray-600 mb-4">Centre: Martinique (-61.55, 16.25)</p>
                  <p className="text-gray-600 mb-4">Zoom: 12</p>
                  <p className="text-gray-600 mb-4">Style: Streets</p>
                  <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Mode Fallback:</strong> Mapbox n'a pas pu se charger
                    </p>
                  </div>
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
              <strong>Status Final:</strong> {isLoaded ? '✅ Carte chargée avec succès !' : showFallback ? '🔄 Mode Fallback activé' : '⏳ Chargement en cours...'}
            </p>
            <p className="text-blue-700 text-xs mt-2">
              <strong>Fonctionnalité:</strong> {showFallback ? 'Affichage statique si Mapbox échoue' : 'Carte interactive Mapbox'}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Instructions</h2>
          <div className="space-y-3 text-green-700">
            <p><strong>1.</strong> Cette version inclut un système de fallback automatique</p>
            <p><strong>2.</strong> Si Mapbox ne se charge pas en 5 secondes, affiche une carte statique</p>
            <p><strong>3.</strong> L'interface reste fonctionnelle même sans Mapbox</p>
            <p><strong>4.</strong> Status en temps réel pour voir ce qui se passe</p>
            <p><strong>5.</strong> Ouvrez la console pour voir les logs détaillés</p>
          </div>
        </div>
      </div>
    </div>
  );
}



