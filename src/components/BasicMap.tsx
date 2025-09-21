"use client";

import { useEffect, useRef } from 'react';

export default function BasicMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic map implementation
    if (mapRef.current) {
      mapRef.current.innerHTML = '<div style="width: 100%; height: 400px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">Carte basique</div>';
    }
  }, []);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
  );
}
