"use client";

import { useState } from "react";
import { X, Save, Link as LinkIcon, Bell } from "lucide-react";

interface SocialLinkCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess: () => void;
}

export function SocialLinkCreator({ isOpen, onClose, merchantId, onSuccess }: SocialLinkCreatorProps) {
  const [link, setLink] = useState({
    type: 'youtube' as 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitch' | 'autre',
    titre: "",
    description: "",
    url: "",
    isLive: false,
    notifyClients: false,
    active: true
  });

  const [loading, setLoading] = useState(false);

  const platforms = [
    { value: 'youtube', label: 'YouTube', icon: '🎥', placeholder: 'https://youtube.com/live/...', color: 'bg-red-100 text-red-700' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵', placeholder: 'https://tiktok.com/@user/video/...', color: 'bg-black text-white' },
    { value: 'instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/p/...', color: 'bg-pink-100 text-pink-700' },
    { value: 'facebook', label: 'Facebook', icon: '👍', placeholder: 'https://facebook.com/watch/...', color: 'bg-blue-100 text-blue-700' },
    { value: 'twitch', label: 'Twitch', icon: '🎮', placeholder: 'https://twitch.tv/...', color: 'bg-purple-100 text-purple-700' },
    { value: 'autre', label: 'Autre', icon: '🔗', placeholder: 'https://...', color: 'bg-gray-100 text-gray-700' }
  ];

  const selectedPlatform = platforms.find(p => p.value === link.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de l'URL
    try {
      new URL(link.url);
    } catch (error) {
      alert("❌ Veuillez entrer une URL valide");
      return;
    }

    setLoading(true);

    try {
      // Ici on pourrait sauvegarder le lien dans Supabase
      console.log("Lien créé:", { ...link, merchantId });
      
      // Si notification demandée
      if (link.notifyClients) {
        console.log("📱 Envoi de notifications aux clients...");
        // Ici on enverrait des notifications push
      }
      
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
      onClose();
      
      // Reset form
      setLink({
        type: 'youtube',
        titre: "",
        description: "",
        url: "",
        isLive: false,
        notifyClients: false,
        active: true
      });
      
    } catch (error) {
      console.error("Erreur création lien:", error);
      alert("❌ Erreur lors de la création du lien");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#123456]">Partager un Lien Social</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Choix de la plateforme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plateforme
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.value}
                  type="button"
                  onClick={() => setLink({ ...link, type: platform.value as any })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    link.type === platform.value
                      ? 'border-[#17BFA0] bg-[#17BFA0]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{platform.icon}</div>
                  <div className="text-sm font-medium">{platform.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Informations du lien */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={link.titre}
              onChange={(e) => setLink({ ...link, titre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              placeholder="Ex: Découvrez nos nouveaux produits en live"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={link.description}
              onChange={(e) => setLink({ ...link, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              rows={3}
              placeholder="Décrivez brièvement le contenu..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL du contenu
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={link.url}
                onChange={(e) => setLink({ ...link, url: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                placeholder={selectedPlatform?.placeholder}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Copiez-collez le lien complet depuis {selectedPlatform?.label}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700">Options</h3>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={link.isLive}
                onChange={(e) => setLink({ ...link, isLive: e.target.checked })}
                className="w-4 h-4 text-[#17BFA0] border-gray-300 rounded focus:ring-[#17BFA0]"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  🔴 C'est un live en direct
                </div>
                <div className="text-xs text-gray-500">
                  Affichera un badge "LIVE" pour attirer l'attention
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={link.notifyClients}
                onChange={(e) => setLink({ ...link, notifyClients: e.target.checked })}
                className="w-4 h-4 text-[#17BFA0] border-gray-300 rounded focus:ring-[#17BFA0]"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  🔔 Notifier mes clients
                </div>
                <div className="text-xs text-gray-500">
                  Enverra une notification push à tous vos clients fidèles
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={link.active}
                onChange={(e) => setLink({ ...link, active: e.target.checked })}
                className="w-4 h-4 text-[#17BFA0] border-gray-300 rounded focus:ring-[#17BFA0]"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  ✅ Activer immédiatement
                </div>
                <div className="text-xs text-gray-500">
                  Le lien sera visible dans l'app client
                </div>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Publication...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Publier le lien
                </>
              )}
            </button>
          </div>
        </form>

        {/* Aperçu */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-2">Aperçu</h4>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${selectedPlatform?.color}`}>
                {selectedPlatform?.icon} {selectedPlatform?.label}
              </span>
              {link.isLive && (
                <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium">
                  🔴 LIVE
                </span>
              )}
            </div>
            <h5 className="font-semibold text-sm text-gray-900 mb-1">
              {link.titre || "Titre du contenu"}
            </h5>
            <p className="text-xs text-gray-600 mb-2">
              {link.description || "Description du contenu..."}
            </p>
            {link.url && (
              <a className="text-xs text-[#17BFA0] break-all hover:underline">
                {link.url}
              </a>
            )}
          </div>
        </div>

        {/* Info notification */}
        {link.notifyClients && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            <div className="flex items-start gap-2">
              <Bell className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Notification automatique</p>
                <p className="text-xs mt-1">
                  Vos clients recevront une notification : "{link.titre || 'Nouveau contenu disponible'}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
