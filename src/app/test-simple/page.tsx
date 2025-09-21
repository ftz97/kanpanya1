"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function TestSimplePage() {
  const mapContainer = useRef<HTMLDivElement>(null);

  
const stableError = useCallback(() => {
  error();
}, [error]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableMarker = useCallback(() => {
  Marker();
}, [Marker]);

const stableSetLngLat = useCallback(() => {
  setLngLat();
}, [setLngLat]);

const stableAddTo = useCallback(() => {
  addTo();
}, [addTo]);

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

useEffect(() => {
  stableError();
  stableMap();
  stableMarker();
  stableSetLngLat();
  stableAddTo();
  stableRemove();
}, [stableError, stableMap, stableMarker, stableSetLngLat, stableAddTo, stableRemove]);;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Simple Mapbox
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Carte Mapbox Basique</h2>
          <div 
            ref={mapContainer} 
            style={{ 
              width: "100%", 
              height: "500px", 
              border: "2px solid #10b981",
              borderRadius: "8px"
            }} 
          />
          <p className="text-gray-600 mt-4 text-center">
            Si vous voyez une carte avec un marqueur vert sur Paris, Mapbox fonctionne ! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}