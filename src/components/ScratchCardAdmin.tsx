"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScratchCard from "./ScratchCard"; // 👈 importer ton composant joueur

// Define ScratchConfig interface locally
export interface ScratchConfig {
  id: string;
  badge: string;
  logos: string[];
  rewards: string[];
  probabilities: { win: number; lucky: number; lose: number };
  sponsorName: string;
  skin: string;
  quasiLose: string;
  validFrom: string;
  validTo: string;
  target: Record<string, any>;
  goldReward?: string;
  goldPrizes?: number;
  goldChance?: number;
}

interface ScratchCardAdminProps {
  initialConfigs?: ScratchConfig[];
  onSave?: (configs: ScratchConfig[]) => void;
}

export default function ScratchCardAdmin({ initialConfigs = [], onSave }: ScratchCardAdminProps) {
  const [configs, setConfigs] = useState<ScratchConfig[]>(initialConfigs);
  const [current, setCurrent] = useState<ScratchConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [skinPreview, setSkinPreview] = useState<string | null>(null);
  const [skinFile, setSkinFile] = useState<File | null>(null);

  // ✅ Charger toutes les cartes
  React.useEffect(() => {
    fetch("/api/scratch-configs")
      .then(res => res.json())
      .then(data => setConfigs(data))
      .catch(err => console.error("Erreur chargement:", err));
  }, []);

  // ✅ Créer une nouvelle carte vide
  const createNew = () => {
    const newConfig: ScratchConfig = {
      id: `scratch_${Date.now()}`,
      badge: "",
      logos: [],
      rewards: ["⭐ +10 points bonus"],
      probabilities: { win: 0.4, lucky: 0.2, lose: 0.4 },
      sponsorName: "",
      skin: "classic",
      quasiLose: "⭐ +5 points (presque !)",
      validFrom: new Date().toISOString().split("T")[0],
      validTo: new Date().toISOString().split("T")[0],
      target: {}
    };
    setCurrent(newConfig);
  };

  // ✅ Sauvegarder une carte
  const saveCard = async () => {
    if (!current) return;
    setLoading(true);

    try {
      if (current.id?.startsWith("scratch_")) {
        // nouvelle carte
        const res = await fetch("/api/scratch-configs", {
          method: "POST",
          body: JSON.stringify(current),
          headers: { "Content-Type": "application/json" },
        });
        const newConfig = await res.json();
        setConfigs([...configs, newConfig]);
      } else {
        // mise à jour
        const res = await fetch(`/api/scratch-configs/${current.id}`, {
          method: "PUT",
          body: JSON.stringify(current),
          headers: { "Content-Type": "application/json" },
        });
        const updated = await res.json();
        setConfigs(configs.map(c => (c.id === updated.id ? updated : c)));
      }
      setCurrent(null);
      if (onSave) onSave(configs);
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Supprimer une carte
  const deleteCard = async (id: string) => {
    if (!confirm("Supprimer cette carte ?")) return;
    
    try {
      await fetch(`/api/scratch-configs/${id}`, { method: "DELETE" });
      setConfigs(configs.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // ✅ Gérer l'upload de skin
  const handleSkinUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSkinFile(file);
      setSkinPreview(URL.createObjectURL(file));
      // Mettre à jour le skin de la carte actuelle
      if (current) {
        setCurrent({ ...current, skin: "custom" });
      }
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg sm:rounded-xl shadow-lg">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">🎛️ Gestion des cartes à gratter</h2>

      {/* Liste des cartes existantes */}
      <div className="mb-4 sm:mb-6">
        {configs.length === 0 && <p className="text-gray-500 text-sm sm:text-base">Aucune carte créée.</p>}
        {configs.map(c => (
          <div key={c.id} className="p-2 sm:p-3 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2 sm:gap-0">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base truncate">{c.badge || "Carte sans badge"}</p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{c.sponsorName || "Sans sponsor"}</p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={() => setCurrent(c)}
                className="px-2 sm:px-3 py-1 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={() => deleteCard(c.id)}
                className="px-2 sm:px-3 py-1 bg-red-600 text-white rounded text-xs sm:text-sm hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={createNew}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
      >
        ➕ Nouvelle carte
      </button>

      {/* Formulaire + Preview */}
      {current && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Formulaire */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">⚙️ Configurer la carte</h3>

              {/* Badge */}
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base">🏅 Badge</label>
              <input
                value={current.badge}
                onChange={e => setCurrent({ ...current, badge: e.target.value })}
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />

              {/* Sponsor principal */}
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base">🎯 Sponsor principal</label>
              <input
                value={current.sponsorName}
                onChange={e => setCurrent({ ...current, sponsorName: e.target.value })}
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />

              {/* Quasi-perte */}
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base">😢 Quasi-perte</label>
              <input
                value={current.quasiLose}
                onChange={e => setCurrent({ ...current, quasiLose: e.target.value })}
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />

              {/* Skin */}
              <div className="space-y-3">
                <label className="block text-sm sm:text-base font-medium">🎨 Skin</label>
                
                {/* Sélecteur de skin prédéfini */}
                <select
                  value={current.skin}
                  onChange={e => setCurrent({ ...current, skin: e.target.value as any })}
                  className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
                >
                  <option value="classic">Classique ⚪</option>
                  <option value="premium">Premium 💎</option>
                  <option value="gold">Or 🏆</option>
                  <option value="halloween">Halloween 🎃</option>
                  <option value="xmas">Noël 🎄</option>
                  <option value="custom">Personnalisé 📁</option>
                </select>

                {/* Upload de skin personnalisé */}
                {current.skin === "custom" && (
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-600">
                      Importer une image personnalisée
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSkinUpload}
                      className="block w-full text-xs sm:text-sm text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500">
                      Formats : PNG, JPG, JPEG. Taille recommandée : 300x180px
                    </p>
                    
                    {/* Aperçu du skin personnalisé */}
                    {skinPreview && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-600 mb-1">Aperçu :</p>
                        <div className="relative w-32 h-20 border border-gray-300 rounded overflow-hidden">
                          <Image
                            src={skinPreview}
                            alt="Skin preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {skinFile?.name} ({(skinFile?.size || 0 / 1024).toFixed(1)} KB)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Récompenses */}
              <label className="block mb-2">🎁 Récompenses</label>
              {current.rewards.map((r, i) => (
                <div key={i} className="flex mb-2">
                  <input
                    value={r}
                    onChange={e => {
                      const newRewards = [...current.rewards];
                      newRewards[i] = e.target.value;
                      setCurrent({ ...current, rewards: newRewards });
                    }}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      const newRewards = current.rewards.filter((_, idx) => idx !== i);
                      setCurrent({ ...current, rewards: newRewards });
                    }}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                onClick={() => setCurrent({ ...current, rewards: [...current.rewards, ""] })}
                className="mb-4 px-3 py-1 bg-gray-300 rounded"
              >
                ➕ Ajouter une récompense
              </button>

              {/* Probabilités */}
              <label className="block mb-2">📊 Probabilités (%)</label>
              <div className="flex space-x-2 mb-4">
                {["win", "lucky", "lose"].map(key => (
                  <input
                    key={key}
                    type="number"
                    value={current.probabilities[key as keyof typeof current.probabilities]}
                    onChange={e =>
                      setCurrent({
                        ...current,
                        probabilities: {
                          ...current.probabilities,
                          [key]: Number(e.target.value),
                        },
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                ))}
              </div>

              {/* JACKPOT */}
              <h4 className="text-lg font-semibold mt-6">🏆 Cadeau en or (optionnel)</h4>

              <label className="block mb-2">🎁 Description du gros lot</label>
              <input
                value={current.goldReward || ""}
                onChange={e => setCurrent({ ...current, goldReward: e.target.value })}
                className="w-full p-2 border rounded mb-4"
                placeholder="Ex: Vélo électrique d'une valeur de 500€"
              />

              <label className="block mb-2">📦 Nombre de gros lots disponibles</label>
              <input
                type="number"
                value={current.goldPrizes || 0}
                onChange={e => setCurrent({ ...current, goldPrizes: Number(e.target.value) })}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">🎲 Probabilité (0 à 1)</label>
              <input
                type="number"
                step="0.001"
                value={current.goldChance || 0}
                onChange={e => setCurrent({ ...current, goldChance: Number(e.target.value) })}
                className="w-full p-2 border rounded mb-4"
              />

              {/* Actions */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrent(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Annuler
                </button>
                <button
                  onClick={saveCard}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold mb-2">👀 Prévisualisation</h3>
              <div className="border p-4 rounded-xl bg-gray-100">
                <ScratchCard 
                  skin={current.skin as any}
                  reward={{ type: 'points', amount: 100, label: '+100 points' }}
                  onReveal={() => console.log('Card revealed!')}
                />
              </div>
              
              {/* Aperçu du skin personnalisé si uploadé */}
              {skinPreview && current.skin === "custom" && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2 text-center">🎨 Votre skin personnalisé :</h4>
                  <div className="relative w-48 h-28 border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={skinPreview}
                      alt="Skin personnalisé"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/40 backdrop-blur-sm">
                      😢 Pas de chance…
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {skinFile?.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
