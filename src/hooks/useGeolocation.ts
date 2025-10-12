"use client";
import { useState, useEffect } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  }, []);

  return { position, error };
}

