"use client";

import { useEffect, useRef, useState } from 'react';

interface SimpleMapboxMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function SimpleMapboxMap({ 
  className = "", 
  height = "400px",
  center = [2.3522, 48.8566], // Paris par défaut
  zoom = 12
}: SimpleMapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Vérifier si Mapbox est disponible
    if (typeof window === 'undefined') {
      setError('Mapbox ne peut pas être chargé côté serveur');
      return;
    }

    // Charger Mapbox dynamiquement
    const loadMapbox = async () => {
      try {
        console.log('🔄 Chargement de Mapbox...');
        
        // Charger le CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
        document.head.appendChild(link);

        // Charger le JS
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js';
        script.async = true;
        
        script.onload = () => {
          console.log('✅ Mapbox chargé avec succès');
          initializeMap();
        };
        
        script.onerror = () => {
          console.error('❌ Erreur de chargement Mapbox');
          setError('Impossible de charger Mapbox');
        };
        
        document.head.appendChild(script);
        
      } catch (err) {
        console.error('❌ Erreur de chargement Mapbox:', err);
        setError('Erreur de chargement Mapbox');
      }
    };

    const initializeMap = () => {
      try {
        // @ts-ignore - Mapbox sera chargé dynamiquement
        const mapboxgl = window.mapboxgl;
        
        if (!mapboxgl) {
          setError('Mapbox n\'est pas disponible');
          return;
        }

        // Token de démonstration (limité mais fonctionnel)
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

        console.log('🗺️ Initialisation de la carte...');
        
        // Créer la carte
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: center,
          zoom: zoom,
          attributionControl: false
        });

        // Ajouter des contrôles
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        // Marqueur principal
        new mapboxgl.Marker({ color: '#10b981' })
          .setLngLat(center)
          .addTo(map);

        // Événements
        map.on('load', () => {
          setIsLoaded(true);
          console.log('✅ Carte chargée avec succès');
        });

        map.on('error', (e) => {
          console.error('❌ Erreur Mapbox:', e);
          setError(`Erreur Mapbox: ${e.error?.message || 'Erreur inconnue'}`);
        });

        // Nettoyage
        return () => {
          map.remove();
        };

      } catch (err) {
        console.error('❌ Erreur d\'initialisation:', err);
        setError(`Erreur d'initialisation: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
      }
    };

    loadMapbox();
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
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Recharger
          </button>
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
