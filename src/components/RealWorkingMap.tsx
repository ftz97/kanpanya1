"use client";

import { useState, useEffect } from 'react';

export default function RealWorkingMap() {
  const [isClient, setIsClient] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    setMapboxToken(token || null);
    
    if (token && !token.includes('your_real_token_here')) {
      // Import dynamique de react-map-gl
      import('react-map-gl')
        .then(() => {
          console.log('Mapbox GL JS chargé avec succès');
          setMapLoaded(true);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement de react-map-gl:', error);
          setMapError('Erreur de chargement de Mapbox GL JS');
        });
    }
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Initialisation...</p>
        </div>
      </div>
    );
  }

  if (!mapboxToken || mapboxToken.includes('your_real_token_here')) {
    return (
      <div className="h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Token Mapbox requis</h3>
          <p className="text-red-600 text-sm mb-4">
            Configurez votre token Mapbox dans .env.local
          </p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur</h3>
          <p className="text-red-600 text-sm mb-4">{mapError}</p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-blue-600">Chargement de Mapbox GL JS...</p>
        </div>
      </div>
    );
  }

  // Une fois que tout est chargé, on peut utiliser le composant Map
  return <MapboxMapComponent token={mapboxToken} />;
}

function MapboxMapComponent({ token }: { token: string }) {
  const [viewState, setViewState] = useState({
    longitude: -61.55,
    latitude: 16.25,
    zoom: 11,
  });

  const [Map, setMap] = useState<any>(null);
  const [Source, setSource] = useState<any>(null);
  const [Layer, setLayer] = useState<any>(null);

  useEffect(() => {
    import('react-map-gl').then((mapbox) => {
      setMap(() => mapbox.default);
      setSource(() => mapbox.Source);
      setLayer(() => mapbox.Layer);
    });
  }, []);

  if (!Map || !Source || !Layer) {
    return (
      <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-blue-600">Chargement des composants Mapbox...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <Map
        mapboxApiAccessToken={token}
        {...viewState}
        onMove={(evt: any) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <Source
          id="my-data"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-61.55, 16.25],
                },
                properties: {
                  title: "Point d'intérêt",
                },
              },
            ],
          }}
        >
          <Layer
            id="point"
            type="circle"
            paint={{
              "circle-color": "#3B82F6",
              "circle-radius": 10,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            }}
          />
        </Source>
      </Map>
    </div>
  );
}

