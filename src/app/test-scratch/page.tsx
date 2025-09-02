"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ScratchCardSimple from "@/components/ScratchCardSimple";

export default function TestScratchPage() {
  const supabase = createClientComponentClient();
  const [configs, setConfigs] = useState<any[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const { data, error } = await supabase
          .from("scratch_configs")
          .select("id, badge, sponsor_name, gold_prizes, gold_reward")
          .eq("valid_from", "<=", new Date().toISOString().split("T")[0])
          .eq("valid_to", ">=", new Date().toISOString().split("T")[0]);
        
        if (error) {
          console.error("Erreur chargement configs:", error);
        } else {
          setConfigs(data || []);
          if (data && data.length > 0) {
            setSelectedConfig(data[0].id);
          }
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    loadConfigs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement des configurations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🎟️ Test des Cartes à Gratter</h1>
        
        {configs.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">Aucune configuration active trouvée</p>
            <p className="mt-2">Créez des cartes dans l'<a href="/admin/scratch-cards" className="text-blue-600 hover:underline">interface d'administration</a></p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Sélecteur de configuration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Choisir une carte à tester</h2>
              <select
                value={selectedConfig}
                onChange={(e) => setSelectedConfig(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                {configs.map((config) => (
                  <option key={config.id} value={config.id}>
                    {config.badge} - {config.sponsor_name} 
                    {config.gold_prizes > 0 && ` (${config.gold_prizes} jackpots restants)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Composant de grattage */}
            {selectedConfig && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Tester la carte</h2>
                <ScratchCardSimple 
                  configId={selectedConfig} 
                  userId="test-user-123" // ID utilisateur de test
                />
              </div>
            )}

            {/* Informations sur la configuration sélectionnée */}
            {selectedConfig && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Détails de la configuration</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(
                    configs.find(c => c.id === selectedConfig), 
                    null, 
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
