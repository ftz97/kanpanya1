"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  
const stableError = useCallback(() => {
  error();
}, [error]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableRemove = useCallback(() => {
  remove();
}, [remove]);

useEffect(() => {
  stableError();
  stableMap();
  stableRemove();
}, [stableError, stableMap, stableRemove]);;

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px", border: "2px solid red" }}
    />
  );
}
