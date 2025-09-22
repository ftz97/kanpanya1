"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function TestDebugPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [status, setStatus] = useState<string>("Initialisation...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus("Vérification du token...");
    
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    console.log("🔍 Token trouvé:", token ? "OUI" : "NON");
    
    if (!token) {
      setError("❌ Token Mapbox manquant");
      setStatus("ERREUR: Token manquant");
      return;
    }

    setStatus("Initialisation de Mapbox...");
    mapboxgl.accessToken = token;

    try {
      setStatus("Création de la carte...");
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.3522, 48.8566],
        zoom: 12,
        attributionControl: false,
      });

      setStatus("Ajout des contrôles...");
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

      map.current.on("load", () => {
        setStatus("✅ Carte chargée avec succès!");
        console.log("✅ Carte Mapbox chargée");
      });

      setStatus("Ajout du géocodeur...");
      const geocoder = new MapboxGeocoder({
        accessToken: token,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: "Rechercher une adresse...",
        language: "fr",
      });

      map.current.addControl(geocoder, "top-left");
      setStatus("✅ Géocodeur ajouté!");

      // Test du géocodeur
      geocoder.on("result", (e) => {
        console.log("🎯 Résultat géocodeur:", e.result);
        setStatus(`✅ Adresse trouvée: ${e.result.place_name}`);
        
        // Ajouter un marqueur de test
        new mapboxgl.Marker({ color: "#10b981" })
          .setLngLat(e.result.center)
          .addTo(map.current!);
      });

      geocoder.on("error", (e) => {
        console.error("❌ Erreur géocodeur:", e);
        setError(`Erreur géocodeur: ${e.error}`);
      });

      map.current.on("error", (e: any) => {
        console.error("❌ Erreur Mapbox:", e);
        setError(`Erreur Mapbox: ${e?.error?.message || "Inconnue"}`);
      });

    } catch (err) {
      console.error("❌ Erreur d'initialisation:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setStatus("ERREUR: Initialisation échouée");
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🔧 Debug Mapbox + Géocodeur
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Statut de Débogage</h2>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">
              <strong>Status:</strong> {status}
            </p>
            {error && (
              <p className="font-mono text-sm text-red-600 mt-2">
                <strong>Erreur:</strong> {error}
              </p>
            )}
          </div>
          
          <div 
            ref={mapContainer} 
            style={{ 
              width: "100%", 
              height: "500px", 
              border: "2px solid #3b82f6",
              borderRadius: "8px"
            }} 
          />
          
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Instructions de test:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Vérifiez que la carte se charge (pas de spinner)</li>
              <li>Cherchez une adresse dans la barre en haut à gauche</li>
              <li>Un marqueur vert devrait apparaître sur l'adresse sélectionnée</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
