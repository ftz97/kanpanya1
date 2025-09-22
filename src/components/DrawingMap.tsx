"use client";

import { useEffect, useRef, useState } from 'react';

interface DrawingMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function DrawingMap({ 
  className = "", 
  height = "500px",
  center = [-61.55, 16.25], // Martinique par défaut
  zoom = 12
}: DrawingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const draw = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawingMode, setDrawingMode] = useState<string>('simple_select');

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token || token.includes('your_real_token_here')) {
      setError('Token Mapbox manquant ou invalide');
      return;
    }

    const loadMapbox = () => {
      if ((window as any).mapboxgl) {
        initializeMap();
        return;
      }

      // Charger le CSS
      if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        document.head.appendChild(cssLink);
      }

      // Charger Mapbox GL JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = true;
      
      script.onload = () => {
        // Charger Mapbox GL Draw
        const drawScript = document.createElement('script');
        drawScript.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.js';
        drawScript.async = true;
        
        drawScript.onload = () => {
          // Charger le CSS de Draw
          const drawCss = document.createElement('link');
          drawCss.rel = 'stylesheet';
          drawCss.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.css';
          document.head.appendChild(drawCss);
          
          initializeMap();
        };
        
        drawScript.onerror = () => {
          setError('Impossible de charger Mapbox GL Draw');
        };
        
        document.head.appendChild(drawScript);
      };

      script.onerror = () => {
        setError('Impossible de charger Mapbox GL JS');
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      try {
        const mapboxgl = (window as any).mapboxgl;
        const MapboxDraw = (window as any).MapboxDraw;
        
        mapboxgl.accessToken = token;

        // Initialiser la carte
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: center,
          zoom: zoom,
          attributionControl: false
        });

        // Ajouter des contrôles
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Initialiser Mapbox Draw
        draw.current = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            rectangle: true,
            circle: true,
            line_string: true,
            trash: true
          },
          defaultMode: 'simple_select'
        });

        map.current.addControl(draw.current);

        // Marqueur principal
        new mapboxgl.Marker({ color: '#10b981' })
          .setLngLat(center)
          .addTo(map.current);

        // Événements de la carte
        map.current.on('load', () => {
          setIsLoaded(true);
          console.log('Carte Mapbox avec dessin chargée avec succès');
        });

        map.current.on('error', (e: any) => {
          console.error('Erreur Mapbox:', e);
          setError('Erreur lors du chargement de la carte');
        });

        // Événements de dessin
        map.current.on('draw.create', (e: any) => {
          console.log('Forme créée:', e.features);
        });

        map.current.on('draw.update', (e: any) => {
          console.log('Forme mise à jour:', e.features);
        });

        map.current.on('draw.delete', (e: any) => {
          console.log('Forme supprimée:', e.features);
        });

      } catch (err) {
        console.error('Erreur d\'initialisation Mapbox:', err);
        setError('Impossible d\'initialiser la carte');
      }
    };

    loadMapbox();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom]);

  const changeMode = (mode: string) => {
    if (draw.current) {
      draw.current.changeMode(mode);
      setDrawingMode(mode);
    }
  };

  const clearAll = () => {
    if (draw.current) {
      draw.current.deleteAll();
    }
  };

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
            <p className="text-gray-600">Chargement de la carte avec outils de dessin...</p>
          </div>
        </div>
      )}
      
      {/* Contrôles de dessin */}
      {isLoaded && (
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow space-y-2">
          <div className="text-sm font-semibold text-gray-700 mb-2">🖊️ Outils de dessin</div>
          
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => changeMode('simple_select')}
              className={`px-2 py-1 text-xs rounded ${
                drawingMode === 'simple_select' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sélection
            </button>
            
            <button
              onClick={() => changeMode('draw_rectangle')}
              className={`px-2 py-1 text-xs rounded ${
                drawingMode === 'draw_rectangle' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rectangle
            </button>
            
            <button
              onClick={() => changeMode('draw_polygon')}
              className={`px-2 py-1 text-xs rounded ${
                drawingMode === 'draw_polygon' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Polygone
            </button>
            
            <button
              onClick={() => changeMode('draw_circle')}
              className={`px-2 py-1 text-xs rounded ${
                drawingMode === 'draw_circle' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cercle
            </button>
            
            <button
              onClick={() => changeMode('draw_line_string')}
              className={`px-2 py-1 text-xs rounded ${
                drawingMode === 'draw_line_string' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ligne
            </button>
          </div>
          
          <button
            onClick={clearAll}
            className="w-full px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            Effacer tout
          </button>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow max-w-xs">
        <div className="text-sm">
          <p className="font-semibold text-gray-700 mb-1">📝 Instructions</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Cliquez sur un outil pour dessiner</li>
            <li>• Rectangle : clic + glisser</li>
            <li>• Polygone : clics multiples</li>
            <li>• Cercle : clic + glisser</li>
            <li>• Sélection : clic sur forme</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



