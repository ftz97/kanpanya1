"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ScratchCard, { ScratchConfig } from "./ScratchCard"; // 👈 importer ton composant joueur

interface ScratchCardAdminProps {
  initialConfigs?: ScratchConfig[];
  onSave?: (configs: ScratchConfig[]) => void;
}

export default function ScratchCardAdmin({ initialConfigs = [], onSave }: ScratchCardAdminProps) {
  const [configs, setConfigs] = useState<ScratchConfig[]>(initialConfigs);
  const [current, setCurrent] = useState<ScratchConfig | null>(null);
  const [loading, setLoading] = useState(false);

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
      skin: "default",
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

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🎛️ Gestion des cartes à gratter</h2>

      {/* Liste des cartes existantes */}
      <div className="mb-6">
        {configs.length === 0 && <p className="text-gray-500">Aucune carte créée.</p>}
        {configs.map(c => (
          <div key={c.id} className="p-3 bg-white rounded-lg shadow flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">{c.badge || "Carte sans badge"}</p>
              <p className="text-sm text-gray-500">{c.sponsorName || "Sans sponsor"}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrent(c)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={() => deleteCard(c.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={createNew}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        ➕ Nouvelle carte
      </button>

      {/* Formulaire + Preview */}
      {current && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-5xl grid grid-cols-2 gap-6">
            {/* Formulaire */}
            <div>
              <h3 className="text-xl font-bold mb-4">⚙️ Configurer la carte</h3>

              {/* Badge */}
              <label className="block mb-2">🏅 Badge</label>
              <input
                value={current.badge}
                onChange={e => setCurrent({ ...current, badge: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />

              {/* Sponsor principal */}
              <label className="block mb-2">🎯 Sponsor principal</label>
              <input
                value={current.sponsorName}
                onChange={e => setCurrent({ ...current, sponsorName: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />

              {/* Quasi-perte */}
              <label className="block mb-2">😢 Quasi-perte</label>
              <input
                value={current.quasiLose}
                onChange={e => setCurrent({ ...current, quasiLose: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />

              {/* Skin */}
              <label className="block mb-2">🎨 Skin</label>
              <select
                value={current.skin}
                onChange={e => setCurrent({ ...current, skin: e.target.value as any })}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="default">Par défaut</option>
                <option value="noel">Noël 🎄</option>
                <option value="halloween">Halloween 🎃</option>
                <option value="ete">Été 🌞</option>
                <option value="rentree">Rentrée 📚</option>
              </select>

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
                <ScratchCard config={current} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
