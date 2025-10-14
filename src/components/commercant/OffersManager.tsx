"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";

interface Offer {
  id: string;
  title: string;
  description: string;
  type: "flash" | "fidelity" | "quiz";
  discount?: number;
  image: string;
  isActive: boolean;
  views: number;
  clicks: number;
}

interface OffersManagerProps {
  merchantId: string;
  position?: { lat: number; lon: number } | null;
}

export default function OffersManager({ merchantId, position }: OffersManagerProps) {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "🥖 Pain complet -20%",
      description: "Réduction sur tous nos pains complets",
      type: "flash",
      discount: 20,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
      isActive: true,
      views: 156,
      clicks: 23
    },
    {
      id: "2",
      title: "🎯 Quiz Boulangerie",
      description: "Testez vos connaissances et gagnez des points",
      type: "quiz",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=250&fit=crop",
      isActive: true,
      views: 89,
      clicks: 45
    },
    {
      id: "3",
      title: "🎟️ Carte fidélité",
      description: "10 achats = 1 pain gratuit",
      type: "fidelity",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=250&fit=crop",
      isActive: false,
      views: 234,
      clicks: 67
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const toggleOfferStatus = (id: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
  };

  const deleteOffer = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      setOffers(prev => prev.filter(offer => offer.id !== id));
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#123456]">
          🔧 Mes offres
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nouvelle offre</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            {/* Image */}
            <div className="relative h-32 w-full">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Badge type */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  offer.type === "flash" ? "bg-red-500 text-white" :
                  offer.type === "quiz" ? "bg-blue-500 text-white" :
                  "bg-green-500 text-white"
                }`}>
                  {offer.type === "flash" ? "⚡ Flash" :
                   offer.type === "quiz" ? "🧠 Quiz" : "🎟️ Fidélité"}
                </span>
              </div>

              {/* Statut */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  offer.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                }`}>
                  {offer.isActive ? "✅ Actif" : "⏸️ Inactif"}
                </span>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-4">
              <h3 className="font-bold text-[#123456] mb-1">{offer.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
              
              {/* Stats */}
              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>👁️ {offer.views} vues</span>
                <span>👆 {offer.clicks} clics</span>
                <span>{Math.round((offer.clicks / offer.views) * 100)}% taux</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleOfferStatus(offer.id)}
                  className={`flex-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                    offer.isActive 
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {offer.isActive ? "⏸️ Pauser" : "▶️ Activer"}
                </button>
                <button
                  onClick={() => setEditingOffer(offer)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteOffer(offer.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Formulaire de création/modification */}
      {(showCreateForm || editingOffer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#17BFA0]">
                {editingOffer ? "✏️ Modifier" : "➕ Nouvelle"} offre
              </h3>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingOffer(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  defaultValue={editingOffer?.title || ""}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Ex: 🥖 Pain complet -20%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  defaultValue={editingOffer?.description || ""}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  placeholder="Description de l'offre..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  defaultValue={editingOffer?.type || "flash"}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="flash">⚡ Offre flash</option>
                  <option value="quiz">🧠 Quiz</option>
                  <option value="fidelity">🎟️ Fidélité</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL Image</label>
                <input
                  type="url"
                  defaultValue={editingOffer?.image || ""}
                  className="w-full p-2 border rounded-lg"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
                >
                  💾 Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingOffer(null);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ❌ Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
