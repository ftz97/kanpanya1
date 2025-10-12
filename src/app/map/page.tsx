"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGeolocation } from "@/hooks/useGeolocation";
import MapCommercants from "@/components/MapCommercants";

// Données simulées de commerçants (à remplacer par Supabase)
const mockCommercants = [
  {
    id: "1",
    nom: "Boulangerie du Coin",
    latitude: 14.6037,
    longitude: -61.0731,
    adresse: "12 Rue Victor Hugo, Fort-de-France",
    categorie: "Alimentation"
  },
  {
    id: "2",
    nom: "Café Antillais",
    latitude: 14.6105,
    longitude: -61.0585,
    adresse: "5 Place de la Savane, Fort-de-France",
    categorie: "Restauration"
  },
  {
    id: "3",
    nom: "Fleuriste Tropical",
    latitude: 14.5987,
    longitude: -61.0692,
    adresse: "23 Rue de la République, Fort-de-France",
    categorie: "Beauté"
  },
  {
    id: "4",
    nom: "Épicerie Bio",
    latitude: 14.6143,
    longitude: -61.0621,
    adresse: "8 Boulevard du Général de Gaulle",
    categorie: "Alimentation"
  },
];

export default function MapPage() {
  const router = useRouter();
  const { position, error } = useGeolocation();

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#17BFA0] font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <div className="text-lg font-bold text-[#17BFA0]">Kanpanya</div>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#123456] mb-2">🗺️ Carte des commerçants</h1>
        <p className="text-gray-600 text-sm mb-6">
          Découvrez les commerçants participants autour de vous
        </p>

        {/* Notification géolocalisation */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-yellow-700 text-sm">
              ⚠️ Activez la géolocalisation pour voir votre position sur la carte
            </p>
          </div>
        )}

        {position && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-blue-700 text-sm">
              📍 Votre position : <span className="font-mono text-xs">{position.lat.toFixed(4)}, {position.lon.toFixed(4)}</span>
            </p>
          </div>
        )}

        {/* Carte */}
        <MapCommercants 
          commercants={mockCommercants} 
          userPosition={position}
        />

        {/* Légende */}
        <div className="mt-6 bg-white rounded-xl shadow p-4 border border-gray-200">
          <h3 className="font-semibold text-sm text-[#123456] mb-3">📌 Légende</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">📍</div>
              <span className="text-gray-600">Votre position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#17BFA0] text-white rounded-full px-2 py-1 text-xs">Commerce</div>
              <span className="text-gray-600">Commerçant participant</span>
            </div>
          </div>
        </div>

        {/* Liste des commerçants */}
        <div className="mt-6 bg-white rounded-xl shadow p-4 border border-gray-200">
          <h3 className="font-semibold text-sm text-[#123456] mb-3">🏪 {mockCommercants.length} commerçants sur la carte</h3>
          <div className="space-y-2">
            {mockCommercants.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                <span className="text-xl">🏪</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#123456]">{c.nom}</p>
                  <p className="text-xs text-gray-500">{c.adresse}</p>
                </div>
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">
                  {c.categorie}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

