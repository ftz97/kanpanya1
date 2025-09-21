"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  
const stableError = useCallback(() => {
  error();
}, [error]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableNavigationControl = useCallback(() => {
  NavigationControl();
}, [NavigationControl]);

const stableMapboxGeocoder = useCallback(() => {
  MapboxGeocoder();
}, [MapboxGeocoder]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

useEffect(() => {
  stableError();
  stableMap();
  stableAddControl();
  stableNavigationControl();
  stableMapboxGeocoder();
  stableAddControl();
  stableRemove();
}, [stableError, stableMap, stableAddControl, stableNavigationControl, stableMapboxGeocoder, stableAddControl, stableRemove]);;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg shadow border" />
    </div>
  );
}