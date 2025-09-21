"use client";

import { useEffect, useRef, useState } from 'react';

export default function UltraSimpleMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const draw = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<unknown[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('Initialisation...');

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

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

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableNavigationControl = useCallback(() => {
  NavigationControl();
}, [NavigationControl]);

const stableDefault = useCallback(() => {
  default();
}, [default]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stablePrompt = useCallback(() => {
  prompt();
}, [prompt]);

const stableSetDrawnPolygons = useCallback(() => {
  setDrawnPolygons();
}, [setDrawnPolygons]);

const stableNow = useCallback(() => {
  now();
}, [now]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableSetIsDrawing = useCallback(() => {
  setIsDrawing();
}, [setIsDrawing]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableSetDrawnPolygons = useCallback(() => {
  setDrawnPolygons();
}, [setDrawnPolygons]);

const stableSlice = useCallback(() => {
  slice();
}, [slice]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetIsDrawing = useCallback(() => {
  setIsDrawing();
}, [setIsDrawing]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableSetIsLoaded = useCallback(() => {
  setIsLoaded();
}, [setIsLoaded]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableCatch = useCallback(() => {
  catch();
}, [catch]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetDebugInfo = useCallback(() => {
  setDebugInfo();
}, [setDebugInfo]);

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

const stableWarn = useCallback(() => {
  warn();
}, [warn]);

useEffect(() => {
  stableIncludes();
  stableSetError();
  stableSetDebugInfo();
  stableAll();
  stableImport();
  stableImport();
  stableThen();
  stableSetDebugInfo();
  stableMap();
  stableSetDebugInfo();
  stableAddControl();
  stableNavigationControl();
  stableDefault();
  stableAddControl();
  stableSetDebugInfo();
  stableOn();
  stableLog();
  stableSetDebugInfo();
  stablePrompt();
  stableSetDrawnPolygons();
  stableNow();
  stableSetDebugInfo();
  stableSetIsDrawing();
  stableOn();
  stableLog();
  stableSetDebugInfo();
  stableSetDrawnPolygons();
  stableSlice();
  stableOn();
  stableLog();
  stableSetIsDrawing();
  stableSetDebugInfo();
  stableSetDebugInfo();
  stableOn();
  stableSetIsLoaded();
  stableSetDebugInfo();
  stableLog();
  stableOn();
  stableError();
  stableSetError();
  stableSetDebugInfo();
  stableError();
  stableSetError();
  stableSetDebugInfo();
  stableCatch();
  stableError();
  stableSetError();
  stableSetDebugInfo();
  stableRemove();
  stableWarn();
}, [stableIncludes, stableSetError, stableSetDebugInfo, stableAll, stableImport, stableImport, stableThen, stableSetDebugInfo, stableMap, stableSetDebugInfo, stableAddControl, stableNavigationControl, stableDefault, stableAddControl, stableSetDebugInfo, stableOn, stableLog, stableSetDebugInfo, stablePrompt, stableSetDrawnPolygons, stableNow, stableSetDebugInfo, stableSetIsDrawing, stableOn, stableLog, stableSetDebugInfo, stableSetDrawnPolygons, stableSlice, stableOn, stableLog, stableSetIsDrawing, stableSetDebugInfo, stableSetDebugInfo, stableOn, stableSetIsLoaded, stableSetDebugInfo, stableLog, stableOn, stableError, stableSetError, stableSetDebugInfo, stableError, stableSetError, stableSetDebugInfo, stableCatch, stableError, stableSetError, stableSetDebugInfo, stableRemove, stableWarn]);;

  const startDrawing = () => {
    console.log('🎨 Tentative de démarrage du dessin...');
    setDebugInfo('Tentative de démarrage du dessin...');
    
    if (!map.current) {
      console.error('❌ map.current est null');
      setDebugInfo('❌ Carte non initialisée');
      return;
    }
    
    if (!draw.current) {
      console.error('❌ draw.current est null');
      setDebugInfo('❌ Contrôles de dessin non initialisés');
      return;
    }

    try {
      console.log('🔄 Changement de mode vers draw_polygon');
      draw.current.changeMode('draw_polygon');
      setIsDrawing(true);
      setDebugInfo('✅ Mode dessin activé - cliquez sur la carte');
    } catch (err) {
      console.error('❌ Erreur lors du démarrage du dessin:', err);
      setDebugInfo('❌ Erreur lors du démarrage du dessin');
    }
  };

  const clearAll = () => {
    console.log('🗑️ Suppression de tous les polygones...');
    setDebugInfo('Suppression de tous les polygones...');
    
    if (draw.current && map.current) {
      try {
        draw.current.deleteAll();
        setDrawnPolygons([]);
        setDebugInfo('✅ Tous les polygones supprimés');
      } catch (err) {
        console.error('❌ Erreur lors de la suppression:', err);
        setDebugInfo('❌ Erreur lors de la suppression');
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
      {/* Instructions très claires */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3 flex items-center">
          🎨 Mode Dessin - Instructions Détaillées
        </h3>
        <div className="space-y-2 text-sm text-green-700">
          <p><strong>Étape 1:</strong> Attendez que &quot;✅ Carte chargée et prête&quot; apparaisse</p>
          <p><strong>Étape 2:</strong> Cliquez sur &quot;🎨 Dessiner une zone&quot;</p>
          <p><strong>Étape 3:</strong> Cliquez sur la carte pour créer des points</p>
          <p><strong>Étape 4:</strong> Double-cliquez pour fermer le polygone</p>
          <p><strong>Étape 5:</strong> Donnez un nom à votre quartier</p>
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
          onClick={startDrawing}
          disabled={!isLoaded}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isDrawing
              ? 'bg-orange-500 text-white animate-pulse'
              : isLoaded
              ? 'bg-green-600 text-white hover:bg-green-700'
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
          📍 Zones: {drawnPolygons.length}
        </div>

        <div className="px-4 py-2 bg-blue-100 rounded-lg text-sm text-blue-600 flex items-center">
          {isLoaded ? '✅ Prêt' : '⏳ Chargement...'}
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}

        {/* Indicateur de mode dessin */}
        {isDrawing && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <div>🎨</div>
              <span className="font-medium">Mode dessin actif</span>
            </div>
            <p className="text-xs mt-1 opacity-90">Cliquez sur la carte pour dessiner</p>
          </div>
        )}

        {/* Instructions sur la carte */}
        {isLoaded && !isDrawing && (
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-2 rounded text-xs">
            <div className="font-medium text-gray-700">Instructions:</div>
            <div>1. Cliquez sur &quot;🎨 Dessiner une zone&quot;</div>
            <div>2. Cliquez sur la carte</div>
            <div>3. Double-cliquez pour fermer</div>
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
                    setDebugInfo(`Quartier "${polygon.name}" supprimé`);
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
