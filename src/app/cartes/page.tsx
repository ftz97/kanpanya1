"use client";
import React, { useState, useEffect } from "react";
import ScratchCard from "@/components/ScratchCard";
import type { ScratchConfig } from "@/components/ScratchCardAdmin";

export default function CartesPage() {
  const [configs, setConfigs] = useState<ScratchConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await fetch('/api/scratch-configs');
        const data = await response.json();
        setConfigs(data);
      } catch (error) {
        console.error('Erreur lors du chargement des cartes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement des cartes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🎫 Cartes à Gratter Disponibles</h1>
        
        {configs.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">Aucune carte disponible</p>
            <p className="mt-2">Créez des cartes dans l&apos;<a href="/admin/scratch-cards" className="text-blue-600 hover:underline">interface d&apos;administration</a></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {configs.map((config) => (
              <div key={config.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">{config.badge}</h3>
                  {config.sponsorName && (
                    <p className="text-sm text-gray-500">Offert par {config.sponsorName}</p>
                  )}
                </div>
                <ScratchCard 
                  reward={{ type: 'points', amount: 100 }}
                  onReveal={() => console.log('Card revealed!')}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
