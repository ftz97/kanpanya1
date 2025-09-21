"use client";

import { useEffect, useRef, useState } from 'react';

export default function TestMapboxFixedPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initialisation...');

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

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

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableSetTimeout = useCallback(() => {
  setTimeout();
}, [setTimeout]);

const stableInitializeMap = useCallback(() => {
  initializeMap();
}, [initializeMap]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableSetTimeout = useCallback(() => {
  setTimeout();
}, [setTimeout]);

const stableLoadMapboxWithRetry = useCallback(() => {
  loadMapboxWithRetry();
}, [loadMapboxWithRetry]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableAppendChild = useCallback(() => {
  appendChild();
}, [appendChild]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

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

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableOn = useCallback(() => {
  on();
}, [on]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableSetStatus = useCallback(() => {
  setStatus();
}, [setStatus]);

const stableSetTimeout = useCallback(() => {
  setTimeout();
}, [setTimeout]);

const stableLoadMapboxWithRetry = useCallback(() => {
  loadMapboxWithRetry();
}, [loadMapboxWithRetry]);

const stableClearTimeout = useCallback(() => {
  clearTimeout();
}, [clearTimeout]);

useEffect(() => {
  stableIncludes();
  stableSetError();
  stableSetStatus();
  stableSetStatus();
  stableSetStatus();
  stableInitializeMap();
  stableQuerySelector();
  stableCreateElement();
  stableAppendChild();
  stableCreateElement();
  stableLog();
  stableSetStatus();
  stableSetTimeout();
  stableInitializeMap();
  stableError();
  stableSetStatus();
  stableSetTimeout();
  stableLoadMapboxWithRetry();
  stableSetError();
  stableSetStatus();
  stableAppendChild();
  stableSetError();
  stableSetStatus();
  stableMap();
  stableAddControl();
  stableNavigationControl();
  stableMarker();
  stableSetLngLat();
  stableAddTo();
  stableOn();
  stableLog();
  stableSetIsLoaded();
  stableSetStatus();
  stableOn();
  stableError();
  stableSetError();
  stableSetStatus();
  stableError();
  stableSetError();
  stableSetStatus();
  stableSetTimeout();
  stableLoadMapboxWithRetry();
  stableClearTimeout();
}, [stableIncludes, stableSetError, stableSetStatus, stableSetStatus, stableSetStatus, stableInitializeMap, stableQuerySelector, stableCreateElement, stableAppendChild, stableCreateElement, stableLog, stableSetStatus, stableSetTimeout, stableInitializeMap, stableError, stableSetStatus, stableSetTimeout, stableLoadMapboxWithRetry, stableSetError, stableSetStatus, stableAppendChild, stableSetError, stableSetStatus, stableMap, stableAddControl, stableNavigationControl, stableMarker, stableSetLngLat, stableAddTo, stableOn, stableLog, stableSetIsLoaded, stableSetStatus, stableOn, stableError, stableSetError, stableSetStatus, stableError, stableSetError, stableSetStatus, stableSetTimeout, stableLoadMapboxWithRetry, stableClearTimeout]);;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-3">❌</div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur de carte</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Status: {status}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte Mapbox - Version Corrigée
        </h1>
        
        {/* Status en temps réel */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">📊 Status en Temps Réel</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Progression:</p>
              <p className="font-semibold text-blue-600">{status}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Token:</p>
              <p className="font-semibold text-green-600">
                {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Configuré' : '❌ Manquant'}
              </p>
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">🗺️ Carte Interactive</h2>
          
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
                  <p className="text-gray-600">{status}</p>
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
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Status Final:</strong> {isLoaded ? '✅ Carte chargée avec succès !' : '⏳ Chargement en cours...'}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Instructions</h2>
          <div className="space-y-3 text-green-700">
            <p><strong>1.</strong> Cette version inclut un système de retry automatique</p>
            <p><strong>2.</strong> Le status se met à jour en temps réel</p>
            <p><strong>3.</strong> Si la carte ne se charge pas, elle réessaiera 3 fois</p>
            <p><strong>4.</strong> Ouvrez la console pour voir les logs détaillés</p>
          </div>
        </div>
      </div>
    </div>
  );
}



