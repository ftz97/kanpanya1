"use client";

import BasicMap from '@/components/BasicMap';

export default function TestBasicMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🗺️ Test Carte Basique
        </h1>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Carte Mapbox</h2>
          
          <BasicMap 
            height="400px"
            center={[-61.55, 16.25]} // Martinique
            zoom={12}
          />
          
          <div className="mt-3 p-3 bg-blue-50 rounded">
            <p className="text-blue-800 text-sm">
              <strong>Status:</strong> Cette carte devrait afficher la Martinique avec un marqueur vert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



