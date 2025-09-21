"use client";

import { useEffect, useRef, useState } from 'react';

export default function WorkingMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<unknown[]>([]);

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

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

const stableImport = useCallback(() => {
  import();
}, [import]);

const stableThen = useCallback(() => {
  then();
}, [then]);

const stableDefault = useCallback(() => {
  default();
}, [default]);

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

const stableSetIsLoaded = useCallback(() => {
  setIsLoaded();
}, [setIsLoaded]);

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

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

useEffect(() => {
  stableIncludes();
  stableSetError();
  stableImport();
  stableThen();
  stableMap();
  stableAddControl();
  stableNavigationControl();
  stableImport();
  stableThen();
  stableDefault();
  stableAddControl();
  stableOn();
  stablePrompt();
  stableSetDrawnPolygons();
  stableOn();
  stableSetDrawnPolygons();
  stableSlice();
  stableOn();
  stableSetIsLoaded();
  stableLog();
  stableOn();
  stableError();
  stableSetError();
  stableError();
  stableSetError();
  stableCatch();
  stableError();
  stableSetError();
  stableRemove();
}, [stableIncludes, stableSetError, stableImport, stableThen, stableMap, stableAddControl, stableNavigationControl, stableImport, stableThen, stableDefault, stableAddControl, stableOn, stablePrompt, stableSetDrawnPolygons, stableOn, stableSetDrawnPolygons, stableSlice, stableOn, stableSetIsLoaded, stableLog, stableOn, stableError, stableSetError, stableError, stableSetError, stableCatch, stableError, stableSetError, stableRemove]);;

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
          <li>• Cliquez sur l&apos;icône polygone dans la carte</li>
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