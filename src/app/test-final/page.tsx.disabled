"use client";

import { useEffect, useState } from 'react';

export default function TestFinalPage() {
  const [mapboxStatus, setMapboxStatus] = useState('Chargement...');
  const [tokenStatus, setTokenStatus] = useState('Vérification...');

  useEffect(() => {
    // Vérifier le token
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (token && !token.includes('your_real_token_here')) {
      setTokenStatus('✅ Token configuré');
    } else {
      setTokenStatus('❌ Token manquant');
    }

    // Tenter de charger Mapbox
    const loadMapbox = () => {
      if ((window as any).mapboxgl) {
        setMapboxStatus('✅ Mapbox chargé');
        return;
      }

      // Charger le CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(cssLink);

      // Charger le JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = true;
      
      script.onload = () => {
        setMapboxStatus('✅ Mapbox chargé avec succès');
        console.log('Mapbox GL JS chargé');
      };

      script.onerror = () => {
        setMapboxStatus('❌ Erreur de chargement Mapbox');
        console.error('Erreur chargement Mapbox');
      };

      document.head.appendChild(script);
    };

    // Délai pour s'assurer que le DOM est prêt
    setTimeout(loadMapbox, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Final - Diagnostic Mapbox
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status du token */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🔑 Token Mapbox</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> {tokenStatus}</p>
              <p><strong>Valeur:</strong> {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? 'Présent' : 'Manquant'}</p>
            </div>
          </div>

          {/* Status de Mapbox */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🗺️ Mapbox GL JS</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> {mapboxStatus}</p>
              <p><strong>Window:</strong> {typeof window !== 'undefined' ? 'Disponible' : 'Non disponible'}</p>
            </div>
          </div>
        </div>

        {/* Carte de test simple */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">🗺️ Carte de Test</h2>
          
          <div className="relative bg-gray-100 rounded-lg" style={{ height: '400px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Carte Interactive</h3>
                <p className="text-gray-600 mb-4">Centre: Martinique (-61.55, 16.25)</p>
                <p className="text-gray-600 mb-4">Zoom: 12</p>
                <p className="text-gray-600">Style: Streets</p>
              </div>
            </div>
            
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
              <strong>Note:</strong> Cette page montre l'interface de la carte. 
              Pour une carte interactive réelle, les scripts Mapbox doivent se charger correctement.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📝 Instructions</h2>
          <div className="space-y-3 text-yellow-700">
            <p><strong>1.</strong> Vérifiez que le token Mapbox est configuré ✅</p>
            <p><strong>2.</strong> Vérifiez que Mapbox GL JS se charge ✅</p>
            <p><strong>3.</strong> Si tout est vert, la carte devrait fonctionner</p>
            <p><strong>4.</strong> Ouvrez la console du navigateur pour voir les logs</p>
          </div>
        </div>
      </div>
    </div>
  );
}



