"use client";
import { useState, useEffect } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🧪 MODE TEST : Position forcée à Fort-de-France pour voir les badges
    // TODO: Retirer en production et utiliser la vraie géolocalisation
    setPosition({ lat: 14.6037, lon: -61.0731 });
    
    /* Version production (décommenter en prod) :
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
    */
  }, []);

  return { position, error };
}

