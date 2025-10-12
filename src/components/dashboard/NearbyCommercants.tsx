"use client";

import { useGeolocation } from "@/hooks/useGeolocation";

export default function NearbyCommercants() {
  const { position, error } = useGeolocation();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h2 className="font-bold text-lg mb-3 text-[#123456]">📍 Commerçants autour de moi</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
          <p className="text-red-500 text-xs mt-1">Activez la géolocalisation pour voir les commerces à proximité</p>
        </div>
      )}
      
      {position ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Position détectée :</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {position.lat.toFixed(4)}, {position.lon.toFixed(4)}
            </span>
          </div>
          
          {/* Liste simulée de commerçants à proximité */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-semibold uppercase">Près de vous :</p>
            <div className="flex items-center gap-3 p-2 bg-teal-50 rounded-lg">
              <span className="text-2xl">🥖</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[#123456]">Boulangerie Artisanale</p>
                <p className="text-xs text-gray-500">À 350m</p>
              </div>
              <button className="text-xs bg-[#17BFA0] text-white px-3 py-1 rounded-lg hover:bg-[#14a58e] transition">
                Voir
              </button>
            </div>
            <div className="flex items-center gap-3 p-2 bg-teal-50 rounded-lg">
              <span className="text-2xl">☕</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[#123456]">Café du Coin</p>
                <p className="text-xs text-gray-500">À 520m</p>
              </div>
              <button className="text-xs bg-[#17BFA0] text-white px-3 py-1 rounded-lg hover:bg-[#14a58e] transition">
                Voir
              </button>
            </div>
            <div className="flex items-center gap-3 p-2 bg-teal-50 rounded-lg">
              <span className="text-2xl">💐</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[#123456]">Fleuriste Antilles</p>
                <p className="text-xs text-gray-500">À 680m</p>
              </div>
              <button className="text-xs bg-[#17BFA0] text-white px-3 py-1 rounded-lg hover:bg-[#14a58e] transition">
                Voir
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#17BFA0] border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-500 text-sm">Chargement de ta position...</p>
          </div>
        </div>
      )}
    </div>
  );
}

