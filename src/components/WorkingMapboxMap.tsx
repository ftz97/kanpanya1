"use client";

import { useEffect, useRef, useState } from 'react';

export default function WorkingMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<any[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      return;
    }

    // Import dynamique de Mapbox GL JS
    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = token;

      try {
        // Initialisation de la carte
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-61.55, 16.25], // Martinique
          zoom: 10
        });

        // Ajouter des contrôles
        map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

        // Ajouter MapboxDraw
        import('@mapbox/mapbox-gl-draw').then((MapboxDraw) => {
          const draw = new MapboxDraw.default({
            displayControlsDefault: false,
            controls: {
              polygon: true,
              trash: true
            }
          });

          map.current.addControl(draw);

          // Événement de création de polygone
          map.current.on('draw.create', (e: any) => {
            const feature = e.features[0];
            const name = prompt("Nom du quartier ?");
            if (name) {
              setDrawnPolygons(prev => [...prev, { name, feature }]);
            }
          });

          // Événement de suppression
          map.current.on('draw.delete', () => {
            setDrawnPolygons(prev => prev.slice(0, -1));
          });
        });

        // Événements de la carte
        map.current.on('load', () => {
          setIsLoaded(true);
          console.log('Carte Mapbox chargée avec succès');
        });

        map.current.on('error', (e: any) => {
          console.error('Erreur Mapbox:', e);
          setError('Erreur lors du chargement de la carte');
        });

      } catch (err) {
        console.error('Erreur d\'initialisation Mapbox:', err);
        setError('Impossible d\'initialiser la carte');
      }
    }).catch((err) => {
      console.error('Erreur d\'import Mapbox:', err);
      setError('Impossible de charger Mapbox GL JS');
    });

    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">🗺️ Instructions</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Cliquez sur l'icône polygone dans la carte</li>
          <li>• Dessinez votre zone en cliquant sur la carte</li>
          <li>• Double-cliquez pour fermer le polygone</li>
          <li>• Donnez un nom à votre quartier</li>
        </ul>
      </div>

      {/* Carte */}
      <div className="h-96 border rounded-lg overflow-hidden relative">
        <div 
          ref={mapContainer} 
          className="w-full h-full"
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}
      </div>

      {/* Liste des polygones créés */}
      {drawnPolygons.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">📍 Quartiers créés ({drawnPolygons.length})</h3>
          <div className="space-y-2">
            {drawnPolygons.map((polygon, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{polygon.name}</span>
                <button 
                  onClick={() => setDrawnPolygons(prev => prev.filter((_, i) => i !== index))}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}