"use client";

import * as React from "react";
import { registerCommercant } from "@/lib/registerCommercant";

export default function RegisterCommercantForm() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nom: formData.get("nom") as string,
      adresse: formData.get("adresse") as string,
      telephone: formData.get("telephone") as string,
      email: formData.get("email") as string,
      categorie: formData.get("categorie") as string,
      description: formData.get("description") as string,
    };

    const result = await registerCommercant(data);

    if (result.success) {
      setMessage({ type: "success", text: "✅ Commerçant enregistré avec succès !" });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: `❌ Erreur : ${result.error}` });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#123456] mb-6">📝 Enregistrer un commerçant</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-[#123456] mb-1">
            Nom du commerce *
          </label>
          <input
            type="text"
            name="nom"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent outline-none"
            placeholder="Ex: Boulangerie du Coin"
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-[#123456] mb-1">
            Adresse complète *
          </label>
          <input
            type="text"
            name="adresse"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent outline-none"
            placeholder="Ex: 12 Rue Victor Hugo, Fort-de-France, Martinique"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 L&apos;adresse sera automatiquement géocodée pour obtenir les coordonnées GPS
          </p>
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-[#123456] mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="telephone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent outline-none"
            placeholder="Ex: 0596 12 34 56"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#123456] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent outline-none"
            placeholder="Ex: contact@boulangerie.fr"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-[#123456] mb-1">
            Catégorie
          </label>
          <select
            name="categorie"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent outline-none"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="restauration">🍔 Restauration</option>
            <option value="beaute">💇‍♀️ Beauté</option>
            <option value="mode">👗 Mode</option>
            <option value="loisirs">🎉 Loisirs</option>
            <option value="alimentation">🛒 Alimentation</option>
            <option value="sante">💊 Santé</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#123456] mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent outline-none resize-none"
            placeholder="Décrivez votre commerce en quelques mots..."
          />
        </div>

        {/* Message de feedback */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Bouton submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#17BFA0] text-white hover:bg-[#14a58e] active:scale-95"
          }`}
        >
          {loading ? "⏳ Enregistrement en cours..." : "✅ Enregistrer le commerçant"}
        </button>
      </form>
    </div>
  );
}

