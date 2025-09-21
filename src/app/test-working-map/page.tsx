"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestWorkingMapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableInitializeMap = useCallback(() => {
  initializeMap();
}, [initializeMap]);

const stableQuerySelector = useCallback(() => {
  querySelector();
}, [querySelector]);

const stableCreateElement = useCallback(() => {
  createElement();
}, [createElement]);

const stableAppendChild = useCallback(() => {
  appendChild();
}, [appendChild]);

const stableCreateElement = useCallback(() => {
  createElement();
}, [createElement]);

const stableLog = useCallback(() => {
  log();
}, [log]);

const stableSetTimeout = useCallback(() => {
  setTimeout();
}, [setTimeout]);

const stableInitializeMap = useCallback(() => {
  initializeMap();
}, [initializeMap]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableAppendChild = useCallback(() => {
  appendChild();
}, [appendChild]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableNavigationControl = useCallback(() => {
  NavigationControl();
}, [NavigationControl]);

const stableMarker = useCallback(() => {
  Marker();
}, [Marker]);

const stableSetLngLat = useCallback(() => {
  setLngLat();
}, [setLngLat]);

const stableAddTo = useCallback(() => {
  addTo();
}, [addTo]);

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

const stableSetTimeout = useCallback(() => {
  setTimeout();
}, [setTimeout]);

const stableLoadMapbox = useCallback(() => {
  loadMapbox();
}, [loadMapbox]);

const stableClearTimeout = useCallback(() => {
  clearTimeout();
}, [clearTimeout]);

useEffect(() => {
  stableIncludes();
  stableSetError();
  stableInitializeMap();
  stableQuerySelector();
  stableCreateElement();
  stableAppendChild();
  stableCreateElement();
  stableLog();
  stableSetTimeout();
  stableInitializeMap();
  stableError();
  stableSetError();
  stableAppendChild();
  stableSetError();
  stableMap();
  stableAddControl();
  stableNavigationControl();
  stableMarker();
  stableSetLngLat();
  stableAddTo();
  stableOn();
  stableLog();
  stableSetIsLoaded();
  stableOn();
  stableError();
  stableSetError();
  stableError();
  stableSetError();
  stableSetTimeout();
  stableLoadMapbox();
  stableClearTimeout();
}, [stableIncludes, stableSetError, stableInitializeMap, stableQuerySelector, stableCreateElement, stableAppendChild, stableCreateElement, stableLog, stableSetTimeout, stableInitializeMap, stableError, stableSetError, stableAppendChild, stableSetError, stableMap, stableAddControl, stableNavigationControl, stableMarker, stableSetLngLat, stableAddTo, stableOn, stableLog, stableSetIsLoaded, stableOn, stableError, stableSetError, stableError, stableSetError, stableSetTimeout, stableLoadMapbox, stableClearTimeout]);;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-3">❌</div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🗺️ Test Carte Fonctionnelle
        </h1>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Carte Mapbox</h2>
          
          <div className="relative" style={{ height: '500px' }}>
            <div 
              ref={mapContainer} 
              className="w-full h-full rounded-lg"
              style={{ height: '500px' }}
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
          
          <div className="mt-3 p-3 bg-blue-50 rounded">
            <p className="text-blue-800 text-sm">
              <strong>Status:</strong> {isLoaded ? '✅ Carte chargée avec succès !' : '⏳ Chargement en cours...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



