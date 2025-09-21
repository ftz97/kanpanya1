"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableImport = useCallback(() => {
  import();
}, [import]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetIsLoaded = useCallback(() => {
  setIsLoaded();
}, [setIsLoaded]);

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

const stableInitMap = useCallback(() => {
  initMap();
}, [initMap]);

useEffect(() => {
  stableLog();
  stableSetError();
  stableLog();
  stableImport();
  stableLog();
  stableLog();
  stableMap();
  stableLog();
  stableOn();
  stableLog();
  stableSetIsLoaded();
  stableOn();
  stableError();
  stableSetError();
  stableError();
  stableSetError();
  stableInitMap();
}, [stableLog, stableSetError, stableLog, stableImport, stableLog, stableLog, stableMap, stableLog, stableOn, stableLog, stableSetIsLoaded, stableOn, stableError, stableSetError, stableError, stableSetError, stableInitMap]);;

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🔍 Test de la carte Mapbox</h3>
        <div className="text-sm text-blue-700">
          <p>Token: {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Présent' : '❌ Manquant'}</p>
          <p>État: {isLoaded ? '✅ Chargée' : error ? `❌ ${error}` : '⏳ Chargement...'}</p>
        </div>
      </div>
      
      <div className="h-96 border rounded-lg overflow-hidden relative">
        <div ref={mapContainer} className="w-full h-full" />
        {!isLoaded && !error && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
            <div className="text-center text-red-600">
              <p className="font-semibold">Erreur</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
