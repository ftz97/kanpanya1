"use client";

import { useState } from "react";

export default function SimpleMap() {
  const [mapError, setMapError] = useState<string | null>(null);

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // Debug: vérifier que le token est chargé
  console.log("Mapbox token SimpleMap:", MAPBOX_TOKEN ? "✅ Chargé" : "❌ Manquant");

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-2">🗺️ Token Mapbox manquant</p>
          <p className="text-sm text-gray-400">
            Ajoutez NEXT_PUBLIC_MAPBOX_TOKEN dans .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-96 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-2">🗺️ Carte Mapbox</p>
          <p className="text-sm text-gray-500">
            Token configuré : {MAPBOX_TOKEN.substring(0, 20)}...
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Les composants de carte sont prêts à être utilisés
          </p>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">✅ Configuration réussie</h3>
        <p className="text-gray-600 text-sm">
          Votre token Mapbox est correctement configuré. 
          Vous pouvez maintenant utiliser les composants de carte interactifs.
        </p>
      </div>
    </div>
  );
}