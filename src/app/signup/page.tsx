"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    acceptCGU: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted with data:", formData);
    
    if (!formData.acceptCGU) {
      setMessage("❌ Tu dois accepter les conditions d'utilisation");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("❌ Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ VRAIE création d'utilisateur avec Supabase
      const { createBrowserSupabase } = await import("@/lib/supabase");
      const supabase = createBrowserSupabase();
      
      // Debug: Vérifier la configuration Supabase
      console.log("🔧 Debug Supabase:", {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Présent" : "❌ Manquant",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Présent" : "❌ Manquant"
      });
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            prenom: formData.prenom,
            nom: formData.nom,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`
        }
      });

      if (error) {
        console.error("Erreur Supabase:", error);
        setMessage(`❌ Erreur: ${error.message}`);
        return;
      }

      if (!error) {
        router.push("/auth/success");
      }

    } catch (error: any) {
      console.error("Erreur lors de la création du compte:", error);
      setMessage("❌ Erreur lors de la création du compte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Créer un compte</h1>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center pb-4">
            <h2 className="flex items-center justify-center gap-2 text-lg font-semibold">
              <UserPlus className="w-6 h-6 text-teal-600" />
              Rejoins Kanpanya
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Prénom */}
            <div className="space-y-2">
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                placeholder="Ton prénom"
                value={formData.prenom}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                required
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Nom */}
            <div className="space-y-2">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                placeholder="Ton nom"
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                required
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="ton@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimum 6 caractères"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Checkbox CGU */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                id="acceptCGU"
                type="checkbox"
                checked={formData.acceptCGU}
                onChange={(e) => handleInputChange("acceptCGU", e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptCGU" className="text-sm text-gray-600">
                J'accepte les{" "}
                <Link href="/terms" className="text-teal-600 underline">
                  Conditions d'utilisation
                </Link>
              </label>
            </div>

            {/* Message de statut */}
            {message && (
              <div className={`p-3 rounded-lg text-center ${
                message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {message}
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          {/* Lien vers connexion */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Tu as déjà un compte ?{" "}
              <Link href="/login" className="text-teal-600 font-semibold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}