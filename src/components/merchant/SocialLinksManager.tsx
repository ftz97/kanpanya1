"use client";

import { useState } from "react";
import { Plus, Trash2, Edit, Eye, Users, TrendingUp, Link as LinkIcon, Youtube, Send } from "lucide-react";

interface SocialLink {
  id: string;
  type: 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitch' | 'autre';
  titre: string;
  description: string;
  url: string;
  isLive: boolean;
  active: boolean;
  views: number;
  clicks: number;
  createdAt: string;
  notifyClients: boolean;
}

interface SocialLinksManagerProps {
  onCreateLink: () => void;
}

export function SocialLinksManager({ onCreateLink }: SocialLinksManagerProps) {
  // Données de test - À remplacer par des vraies données Supabase
  const [links] = useState<SocialLink[]>([
    {
      id: "1",
      type: 'youtube',
      titre: "Démo de nos nouveaux produits",
      description: "Découvrez notre nouvelle collection en direct",
      url: "https://youtube.com/live/abc123",
      isLive: true,
      active: true,
      views: 124,
      clicks: 87,
      createdAt: "2024-01-20",
      notifyClients: true
    },
    {
      id: "2",
      type: 'tiktok',
      titre: "Recette du jour",
      description: "Comment préparer notre spécialité",
      url: "https://tiktok.com/@restaurant/video/123",
      isLive: false,
      active: true,
      views: 256,
      clicks: 143,
      createdAt: "2024-01-18",
      notifyClients: false
    },
    {
      id: "3",
      type: 'instagram',
      titre: "Story promo du weekend",
      description: "-30% sur tous les desserts ce weekend",
      url: "https://instagram.com/p/abc123",
      isLive: false,
      active: true,
      views: 189,
      clicks: 98,
      createdAt: "2024-01-15",
      notifyClients: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'youtube': return '🎥';
      case 'tiktok': return '🎵';
      case 'instagram': return '📸';
      case 'facebook': return '👍';
      case 'twitch': return '🎮';
      default: return '🔗';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'youtube': return 'bg-red-100 text-red-700 border-red-200';
      case 'tiktok': return 'bg-black text-white border-black';
      case 'instagram': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'facebook': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'twitch': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleLinkStatus = (linkId: string) => {
    console.log("Toggle lien:", linkId);
    // Ici on mettrait à jour le statut dans Supabase
  };

  const deleteLink = (linkId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) {
      console.log("Supprimer lien:", linkId);
      // Ici on supprimerait le lien de Supabase
    }
  };

  const notifyClients = (linkId: string) => {
    console.log("Notifier les clients pour:", linkId);
    // Ici on enverrait une notification push aux clients
    alert("Notification envoyée à vos clients ! 📱");
  };

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#123456]">Mes Liens Sociaux</h2>
          <p className="text-sm text-gray-500">Partagez vos contenus live et vidéos avec vos clients</p>
        </div>
        <button
          onClick={onCreateLink}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau lien</span>
        </button>
      </div>

      <div className="space-y-4">
        {links.length > 0 ? (
          links.map((link) => (
            <div key={link.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-[#123456]">{link.titre}</h3>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColor(link.type)}`}>
                      {getIcon(link.type)} {link.type.toUpperCase()}
                    </span>
                    
                    {link.isLive && (
                      <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium animate-pulse">
                        🔴 LIVE
                      </span>
                    )}
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      link.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {link.active ? '✅ Actif' : '❌ Inactif'}
                    </span>

                    {link.notifyClients && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        🔔 Notifié
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                  
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-[#17BFA0] hover:underline break-all flex items-center gap-1 mb-3"
                  >
                    <LinkIcon className="w-3 h-3" />
                    {link.url}
                  </a>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{link.views} vues</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{link.clicks} clics</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <span>📅 {new Date(link.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => notifyClients(link.id)}
                    className="p-2 text-white bg-[#17BFA0] hover:bg-[#14a58e] rounded transition-colors"
                    title="Notifier les clients"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => window.open(link.url, '_blank')}
                    className="p-2 text-gray-400 hover:text-[#17BFA0] transition-colors"
                    title="Voir le contenu"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => console.log("Modifier lien:", link.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Modifier le lien"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => toggleLinkStatus(link.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      link.active
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {link.active ? 'Désactiver' : 'Activer'}
                  </button>
                  
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer le lien"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <LinkIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-2">Aucun lien partagé</p>
            <p className="text-sm mb-4">Partagez vos contenus live et vidéos avec vos clients</p>
            <button
              onClick={onCreateLink}
              className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
            >
              Créer un lien
            </button>
          </div>
        )}
      </div>

      {/* Statistiques globales */}
      {links.length > 0 && (
        <div className="mt-6 bg-[#F7F9FA] rounded-xl p-4">
          <h4 className="font-medium text-[#123456] mb-3">Statistiques globales</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">{links.length}</div>
              <div className="text-sm text-gray-600">Liens actifs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {links.reduce((sum, l) => sum + l.views, 0)}
              </div>
              <div className="text-sm text-gray-600">Vues totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {links.reduce((sum, l) => sum + l.clicks, 0)}
              </div>
              <div className="text-sm text-gray-600">Clics totaux</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {links.filter(l => l.isLive).length}
              </div>
              <div className="text-sm text-gray-600">Lives en cours</div>
            </div>
          </div>
        </div>
      )}

      {/* Info bulle */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
        <p className="font-medium mb-1">💡 Astuce :</p>
        <p>Cliquez sur le bouton <Send className="w-3 h-3 inline" /> pour envoyer une notification push à vos clients et les informer de votre nouveau contenu !</p>
      </div>
    </section>
  );
}
