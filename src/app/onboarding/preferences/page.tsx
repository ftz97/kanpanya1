"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, Bell, Video, HelpCircle, Trophy } from "lucide-react";
import Link from "next/link";

export default function PreferencesPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    promotions: true,
    videos: true,
    quiz: true,
    jeux_concours: true,
    avant_premiere: true
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSavePreferences = async () => {
    setSaving(true);

    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sauvegarder dans localStorage
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
      
      alert("Préférences sauvegardées !");
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde:", error);
      alert("Erreur lors de la sauvegarde des préférences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/onboarding/qr-code">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Préférences</h1>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Card préférences */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="pb-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Settings className="w-6 h-6 text-teal-600" />
                Mes notifications
              </h2>
              <p className="text-sm text-gray-600">
                Choisis les types de notifications que tu souhaites recevoir
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Promotions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <div>
                    <label className="text-base font-medium">
                      📣 Promotions
                    </label>
                    <p className="text-sm text-gray-600">
                      Offres spéciales et réductions
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.promotions}
                  onChange={(e) => handlePreferenceChange("promotions", e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
              </div>

              {/* Vidéos */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-500" />
                  <div>
                    <label className="text-base font-medium">
                      🎥 Vidéos
                    </label>
                    <p className="text-sm text-gray-600">
                      Contenu vidéo des commerçants
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.videos}
                  onChange={(e) => handlePreferenceChange("videos", e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
              </div>

              {/* Quiz */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-base font-medium">
                      ❓ Quiz
                    </label>
                    <p className="text-sm text-gray-600">
                      Questions et défis pour gagner des points
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.quiz}
                  onChange={(e) => handlePreferenceChange("quiz", e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
              </div>

              {/* Jeux concours */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <label className="text-base font-medium">
                      🏆 Jeux concours
                    </label>
                    <p className="text-sm text-gray-600">
                      Concours et jeux pour gagner des prix
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.jeux_concours}
                  onChange={(e) => handlePreferenceChange("jeux_concours", e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Informations */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="text-center">
              <h3 className="font-semibold text-teal-800 mb-2">
                💡 Tu peux modifier ces préférences à tout moment
              </h3>
              <p className="text-sm text-teal-700">
                Va dans les paramètres de ton profil pour ajuster tes notifications
              </p>
            </div>
          </div>

          {/* Bouton sauvegarder */}
          <button
            onClick={handleSavePreferences}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={saving}
          >
            {saving ? "Sauvegarde..." : "Enregistrer mes préférences"}
          </button>
        </div>
      </div>
    </div>
  );
}