"use client";

import { useEffect, useRef, useState } from 'react';

interface Point {
  id: string;
  lng: number;
  lat: number;
  label: string;
}

export default function ForceDrawingMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [debugInfo, setDebugInfo] = useState<string>('Initialisation...');

  useEffect(() => {
    if (!mapContainer.current) return;

    setDebugInfo('Chargement de Mapbox...');
    
    import('mapbox-gl').then((mapbox) => {
      if (!mapContainer.current) return;

      try {
        const mapInstance = new mapbox.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [2.3522, 48.8566], // Paris
          zoom: 13,
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
        });

        mapInstance.addControl(new mapbox.NavigationControl(), 'top-right');
        
        mapInstance.on('load', () => {
          setDebugInfo('✅ Carte chargée et prête');
          setIsLoaded(true);
        });

        mapInstance.on('click', (e) => {
          if (!isLoaded) return;
          
          const pointId = `point-${Date.now()}`;
          const newPoint: Point = {
            id: pointId,
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
            label: `Point ${points.length + 1}`
          };

          setPoints(prev => [...prev, newPoint]);
          setDebugInfo(`Point ajouté: ${newPoint.label}`);

          // Créer un marqueur
          const marker = new mapbox.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .setPopup(
              new mapbox.Popup().setText(newPoint.label)
            )
            .addTo(mapInstance);

          marker.getElement().addEventListener('click', () => {
            marker.togglePopup();
          });
        });

        mapInstance.on('error', (e) => {
          console.error('Erreur Mapbox:', e);
          setError(`Erreur de carte: ${e.error?.message || 'Erreur inconnue'}`);
          setDebugInfo('❌ Erreur lors du chargement');
        });

        map.current = mapInstance;

        return () => {
          if (map.current) {
            (map.current as any).remove();
          }
        };
      } catch (err) {
        console.error('Erreur lors de l\'initialisation:', err);
        setError(`Erreur d'initialisation: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
        setDebugInfo('❌ Erreur lors de l\'initialisation');
      }
    }).catch((err) => {
      console.error('Erreur lors du chargement de Mapbox:', err);
      setError(`Erreur de chargement: ${err.message}`);
      setDebugInfo('❌ Erreur lors du chargement');
    });
  }, [points.length]);

  const clearAllPoints = () => {
    console.log('🗑️ Suppression de tous les points...');
    setDebugInfo('Suppression de tous les points...');
    
    if (map.current) {
      try {
        // Supprimer tous les marqueurs de la carte
        document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
        setPoints([]);
        setDebugInfo('✅ Tous les points supprimés');
      } catch (err) {
        console.error('❌ Erreur lors de la suppression:', err);
        setDebugInfo('❌ Erreur lors de la suppression');
      }
    }
  };

  const removePoint = (pointId: string) => {
    setPoints(prev => prev.filter(p => p.id !== pointId));
    setDebugInfo(`Point supprimé`);
  };

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
      {/* Instructions simples */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
          📍 Mode Points Bleus - Instructions
        </h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Étape 1:</strong> Attendez que &quot;✅ Carte chargée et prête&quot; apparaisse</p>
          <p><strong>Étape 2:</strong> Cliquez directement sur la carte pour ajouter des points bleus</p>
          <p><strong>Étape 3:</strong> Chaque clic ajoute un marqueur bleu avec popup</p>
          <p><strong>Étape 4:</strong> Utilisez les boutons pour gérer vos points</p>
        </div>
      </div>

      {/* Debug info */}
      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
        <div className="text-sm font-medium text-yellow-800 mb-1">🔍 Debug Info:</div>
        <div className="text-xs text-yellow-700">{debugInfo}</div>
      </div>

      {/* Boutons de contrôle */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={clearAllPoints}
          disabled={!isLoaded || points.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
        >
          🗑️ Effacer tous les points
        </button>

        <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 flex items-center">
          📍 Points: {points.length}
        </div>

        <div className="px-4 py-2 bg-blue-100 rounded-lg text-sm text-blue-600 flex items-center">
          {isLoaded ? '✅ Prêt - Cliquez sur la carte' : '⏳ Chargement...'}
        </div>
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

        {/* Instructions sur la carte */}
        {isLoaded && (
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg shadow-lg text-xs">
            <div className="font-medium text-gray-700 mb-1">Instructions:</div>
            <div>1. Cliquez sur la carte</div>
            <div>2. Un marqueur bleu apparaît</div>
            <div>3. Cliquez sur le marqueur pour voir les détails</div>
          </div>
        )}
      </div>

      {/* Liste des points créés */}
      {points.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3 text-gray-800">📍 Points créés ({points.length})</h3>
          <div className="space-y-2">
            {points.map((point, index) => (
              <div key={point.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded border border-blue-200">
                <div>
                  <span className="font-medium text-gray-800">{point.label}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Coordonnées: {point.lng.toFixed(4)}, {point.lat.toFixed(4)}
                  </p>
                </div>
                <button 
                  onClick={() => removePoint(point.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
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
