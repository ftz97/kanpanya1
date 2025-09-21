"use client";

import { useEffect, useRef, useState } from 'react';

export default function StreetMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const draw = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<unknown[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableAll = useCallback(() => {
  all();
}, [all]);

const stableImport = useCallback(() => {
  import();
}, [import]);

const stableImport = useCallback(() => {
  import();
}, [import]);

const stableThen = useCallback(() => {
  then();
}, [then]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableNavigationControl = useCallback(() => {
  NavigationControl();
}, [NavigationControl]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableScaleControl = useCallback(() => {
  ScaleControl();
}, [ScaleControl]);

const stableDefault = useCallback(() => {
  default();
}, [default]);

const stableHasControl = useCallback(() => {
  hasControl();
}, [hasControl]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stablePrompt = useCallback(() => {
  prompt();
}, [prompt]);

const stableSetDrawnPolygons = useCallback(() => {
  setDrawnPolygons();
}, [setDrawnPolygons]);

const stableNow = useCallback(() => {
  now();
}, [now]);

const stableSetIsDrawing = useCallback(() => {
  setIsDrawing();
}, [setIsDrawing]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableSetDrawnPolygons = useCallback(() => {
  setDrawnPolygons();
}, [setDrawnPolygons]);

const stableSlice = useCallback(() => {
  slice();
}, [slice]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableSetIsDrawing = useCallback(() => {
  setIsDrawing();
}, [setIsDrawing]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableSetIsLoaded = useCallback(() => {
  setIsLoaded();
}, [setIsLoaded]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetPaintProperty = useCallback(() => {
  setPaintProperty();
}, [setPaintProperty]);

const stableSetPaintProperty = useCallback(() => {
  setPaintProperty();
}, [setPaintProperty]);

const stableSetPaintProperty = useCallback(() => {
  setPaintProperty();
}, [setPaintProperty]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableCatch = useCallback(() => {
  catch();
}, [catch]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableOff = useCallback(() => {
  off();
}, [off]);

const stableOff = useCallback(() => {
  off();
}, [off]);

const stableOff = useCallback(() => {
  off();
}, [off]);

const stableOff = useCallback(() => {
  off();
}, [off]);

const stableOff = useCallback(() => {
  off();
}, [off]);

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

const stableWarn = useCallback(() => {
  warn();
}, [warn]);

useEffect(() => {
  stableIncludes();
  stableSetError();
  stableAll();
  stableImport();
  stableImport();
  stableThen();
  stableMap();
  stableAddControl();
  stableNavigationControl();
  stableAddControl();
  stableScaleControl();
  stableDefault();
  stableHasControl();
  stableAddControl();
  stableOn();
  stablePrompt();
  stableSetDrawnPolygons();
  stableNow();
  stableSetIsDrawing();
  stableOn();
  stableSetDrawnPolygons();
  stableSlice();
  stableOn();
  stableSetIsDrawing();
  stableOn();
  stableSetIsLoaded();
  stableLog();
  stableSetPaintProperty();
  stableSetPaintProperty();
  stableSetPaintProperty();
  stableOn();
  stableError();
  stableSetError();
  stableError();
  stableSetError();
  stableCatch();
  stableError();
  stableSetError();
  stableOff();
  stableOff();
  stableOff();
  stableOff();
  stableOff();
  stableRemove();
  stableWarn();
}, [stableIncludes, stableSetError, stableAll, stableImport, stableImport, stableThen, stableMap, stableAddControl, stableNavigationControl, stableAddControl, stableScaleControl, stableDefault, stableHasControl, stableAddControl, stableOn, stablePrompt, stableSetDrawnPolygons, stableNow, stableSetIsDrawing, stableOn, stableSetDrawnPolygons, stableSlice, stableOn, stableSetIsDrawing, stableOn, stableSetIsLoaded, stableLog, stableSetPaintProperty, stableSetPaintProperty, stableSetPaintProperty, stableOn, stableError, stableSetError, stableError, stableSetError, stableCatch, stableError, stableSetError, stableOff, stableOff, stableOff, stableOff, stableOff, stableRemove, stableWarn]);;

  const startDrawing = () => {
    if (draw.current && map.current) {
      try {
        draw.current.changeMode('draw_polygon');
        setIsDrawing(true);
      } catch (err) {
        console.warn('Erreur lors du démarrage du dessin:', err);
      }
    }
  };

  const clearAll = () => {
    if (draw.current && map.current) {
      try {
        draw.current.deleteAll();
        setDrawnPolygons([]);
      } catch (err) {
        console.warn('Erreur lors de la suppression:', err);
      }
    }
  };

  const changeMapStyle = (style: string) => {
    if (map.current) {
      try {
        map.current.setStyle(style);
        // Réappliquer les contrôles après changement de style
        setTimeout(() => {
          if (draw.current && map.current && !map.current.hasControl(draw.current)) {
            map.current.addControl(draw.current);
          }
        }, 100);
      } catch (err) {
        console.warn('Erreur lors du changement de style:', err);
      }
    }
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
      {/* Instructions améliorées */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
          🗺️ Carte des Rues - Martinique
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">🎨 Comment dessiner</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Cliquez sur &quot;🎨 Dessiner une zone&quot;</li>
              <li>• Dessinez en cliquant sur la carte</li>
              <li>• Double-cliquez pour fermer le polygone</li>
              <li>• Donnez un nom à votre quartier</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">🗺️ Styles de carte</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• <strong>Rues</strong> : Noms des rues visibles</li>
              <li>• <strong>Satellite</strong> : Vue aérienne</li>
              <li>• <strong>Clair</strong> : Style minimaliste</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contrôles de style */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => changeMapStyle('mapbox://styles/mapbox/streets-v12')}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
        >
          🗺️ Rues
        </button>
        <button
          onClick={() => changeMapStyle('mapbox://styles/mapbox/satellite-streets-v12')}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
        >
          🛰️ Satellite
        </button>
        <button
          onClick={() => changeMapStyle('mapbox://styles/mapbox/light-v11')}
          className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition"
        >
          ☀️ Clair
        </button>
        <button
          onClick={() => changeMapStyle('mapbox://styles/mapbox/dark-v11')}
          className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-900 transition"
        >
          🌙 Sombre
        </button>
      </div>

      {/* Boutons de contrôle */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={startDrawing}
          disabled={!isLoaded}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isDrawing
              ? 'bg-orange-500 text-white'
              : isLoaded
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isDrawing ? '🎨 Dessin en cours...' : '🎨 Dessiner une zone'}
        </button>
        
        <button
          onClick={clearAll}
          disabled={!isLoaded || drawnPolygons.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
        >
          🗑️ Effacer tout
        </button>

        <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 flex items-center">
          📍 Zones créées: {drawnPolygons.length}
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

        {/* Indicateur de mode dessin */}
        {isDrawing && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">🎨</div>
              <span className="font-medium">Mode dessin actif</span>
            </div>
            <p className="text-xs mt-1 opacity-90">Cliquez sur la carte pour dessiner</p>
          </div>
        )}

        {/* Légende */}
        {isLoaded && (
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 p-3 rounded-lg shadow text-xs">
            <div className="font-semibold mb-1">Légende</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Zone en cours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded"></div>
                <span>Zone sélectionnée</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des polygones créés */}
      {drawnPolygons.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3 text-gray-800">📍 Quartiers créés ({drawnPolygons.length})</h3>
          <div className="space-y-2">
            {drawnPolygons.map((polygon, index) => (
              <div key={polygon.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded border border-green-200">
                <div>
                  <span className="font-medium text-gray-800">{polygon.name}</span>
                  <p className="text-xs text-gray-500 mt-1">Zone #{index + 1}</p>
                </div>
                <button 
                  onClick={() => {
                    setDrawnPolygons(prev => prev.filter((_, i) => i !== index));
                    if (draw.current) {
                      draw.current.deleteAll();
                      drawnPolygons.forEach((p, i) => {
                        if (i !== index) {
                          draw.current.add(p.feature);
                        }
                      });
                    }
                  }}
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
