"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Simulation d'une connexion réussie
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérification basique des identifiants
      if (formData.email === "test@example.com" && formData.password === "test123456") {
        setMessage("✅ Connexion réussie !");
        console.log("Utilisateur connecté:", formData);
        
        // Redirection vers dashboard après 2 secondes
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setMessage("❌ Email ou mot de passe incorrect");
      }

    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      setMessage("❌ Erreur lors de la connexion");
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
          <h1 className="text-xl font-bold text-gray-900 ml-2">Se connecter</h1>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center pb-4">
            <h2 className="flex items-center justify-center gap-2 text-lg font-semibold">
              <LogIn className="w-6 h-6 text-teal-600" />
              Connexion
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Ton mot de passe"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
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
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Informations de test */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🧪 Identifiants de test :</h3>
            <p className="text-sm text-blue-700">
              Email : <code>test@example.com</code><br/>
              Mot de passe : <code>test123456</code>
            </p>
          </div>

          {/* Lien vers inscription */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Tu n'as pas encore de compte ?{" "}
              <Link href="/signup" className="text-teal-600 font-semibold">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}