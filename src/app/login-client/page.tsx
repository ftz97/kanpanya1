"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogIn, User } from "lucide-react";
import Link from "next/link";

export default function LoginClientPage() {
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
      if (formData.email === "client@example.com" && formData.password === "client123456") {
        setMessage("✅ Connexion client réussie !");
        console.log("Client connecté:", formData);
        
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
          <h1 className="text-xl font-bold text-gray-900 ml-2">Connexion Client</h1>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-2">
              <User className="w-6 h-6 text-teal-600" />
              <span>Espace Client</span>
            </div>
            <p className="text-sm text-gray-600">
              Connecte-toi pour accéder à ton dashboard et tes récompenses
            </p>
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
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="votre@email.com"
                required
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
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {message}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Identifiants de test */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">🧪 Identifiants de test :</h3>
            <p className="text-sm text-gray-600">
              Email : <code className="bg-gray-200 px-1 rounded">client@example.com</code>
            </p>
            <p className="text-sm text-gray-600">
              Mot de passe : <code className="bg-gray-200 px-1 rounded">client123456</code>
            </p>
          </div>

          {/* Lien vers l'inscription */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Tu n'as pas encore de compte ?{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                Créer un compte client
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
