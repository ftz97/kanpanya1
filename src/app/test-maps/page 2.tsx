"use client";

import QuartierCustom from "@/components/QuartierCustom";
import SimpleMap from "@/components/SimpleMap";
import ZoneManager from "@/components/ZoneManager";

export default function TestMapsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🗺️ Test des Composants de Carte
      </h1>

      {/* Vérification du token Mapbox */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">🔑 Configuration Mapbox</h2>
        <p className="text-sm text-gray-600">
          Token Mapbox: {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? "✅ Configuré" : "❌ Manquant"}
        </p>
        {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
          <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 text-sm">
              ⚠️ Ajoutez NEXT_PUBLIC_MAPBOX_TOKEN dans votre fichier .env.local
            </p>
          </div>
        )}
      </div>

      {/* Composant QuartierCustom */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. QuartierCustom (Mock)</h2>
        <QuartierCustom />
      </section>

      {/* Composant SimpleMap */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. SimpleMap (Test Token)</h2>
        <SimpleMap />
      </section>

      {/* Composant ZoneManager */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. ZoneManager (Gestion)</h2>
        <ZoneManager />
      </section>
    </div>
  );
}
