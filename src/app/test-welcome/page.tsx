"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TestWelcomePage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("Sarah");
  const [language, setLanguage] = useState<'fr' | 'en' | 'es' | 'gcf'>('fr');

  const testRPC = async () => {
    setLoading(true);
    setResult("");

    try {
      const supabase = createClient();
      
      const { data, error } = await supabase.rpc('get_random_welcome_message', {
        username: username,
        lang_input: language,
      });

      if (error) {
        console.error("Erreur RPC:", error);
        setResult(`❌ Erreur: ${error.message}`);
      } else {
        console.log("Message personnalisé :", data[0].message);
        setResult(`✅ Message: ${data[0].message}`);
      }
    } catch (err: any) {
      setResult(`❌ Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Test RPC Welcome Message</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Entrez un prénom"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Langue
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'es' | 'gcf')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="gcf">🇭🇹 Créole haïtien</option>
            </select>
          </div>

          <button
            onClick={testRPC}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Test en cours..." : "Tester la fonction RPC"}
          </button>

          {result && (
            <div className={`p-3 rounded-md text-sm ${
              result.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {result}
            </div>
          )}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p><strong>Note:</strong> Cette page teste la fonction RPC Supabase.</p>
          <p>Assurez-vous que le script SQL a été exécuté dans Supabase.</p>
        </div>
      </div>
    </div>
  );
}
