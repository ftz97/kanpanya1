"use client";

import WorkingMapboxMap from '@/components/WorkingMapboxMap';

export default function MapboxTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🗺️ Test Mapbox - Dessin de Polygones
          </h1>
          <p className="text-gray-600">
            Testez la fonctionnalité de dessin de polygones sur la carte Mapbox
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <WorkingMapboxMap />
      </div>
    </div>
  );
}
