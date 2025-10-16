"use client";

import { QrCode, PlusCircle, BarChart3, Users, LogOut, Gift, MessageSquare, Link as LinkIcon, Star, FileText, Settings, X, Bell, TrendingUp, Target, Award } from "lucide-react";
import * as React from "react";
import dynamicImport from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMerchantData } from "@/hooks/useMerchantData";
import { useMerchantAuth } from "@/hooks/useMerchantAuth";
import { CreateOfferModal, ScanClientModal } from "@/components/merchant/MerchantModals";
import ScannerQR from "@/components/ScannerQR";
import { QuizCreator } from "@/components/merchant/QuizCreator";
import { QuizManager } from "@/components/merchant/QuizManager";
import { SurveyCreator } from "@/components/merchant/SurveyCreator";
import { SurveyManager } from "@/components/merchant/SurveyManager";
import { SocialLinkCreator } from "@/components/merchant/SocialLinkCreator";
import { SocialLinksManager } from "@/components/merchant/SocialLinksManager";
import { SatisfactionSurveyCreator } from "@/components/merchant/SatisfactionSurveyCreator";
import { SatisfactionSurveyManager } from "@/components/merchant/SatisfactionSurveyManager";
import { createBrowserSupabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

// Lazy imports pour perf
const SponsorCarousel = dynamicImport(() => import("@/components/SponsorCarousel"), { ssr: false });

// 🧩 Composants structurants (squelettes)
function WelcomeStats({ stats, merchantName }: { stats: any[], merchantName?: string }) {
  // Calcul des statistiques du jour
  const today = new Date().toISOString().split('T')[0];
  const todayStats = stats.find(s => s.jour === today);

  // Calculs avancés pour KPIs
  const totalScans = stats.reduce((sum, s) => sum + (s.total_scans || 0), 0);
  const totalPoints = stats.reduce((sum, s) => sum + (s.total_points || 0), 0);
  const avgDailyScans = totalScans / Math.max(stats.length, 1);
  const conversionRate = totalScans > 0 ? ((totalPoints / totalScans) * 100).toFixed(1) : "0.0";
  const weeklyGrowth = stats.length > 1 ? 
    Math.round(((todayStats?.total_scans || 0) - avgDailyScans) / Math.max(avgDailyScans, 1) * 100) : 0;

  const statsData = [
    { 
      label: "Scans du jour", 
      value: todayStats?.total_scans || 0, 
      icon: QrCode, 
      trend: weeklyGrowth > 0 ? `+${weeklyGrowth}%` : `${weeklyGrowth}%`,
      subtitle: `Moyenne: ${Math.round(avgDailyScans)}/jour`,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    { 
      label: "Points distribués", 
      value: totalPoints, 
      icon: Gift, 
      trend: "+12%",
      subtitle: "Cette semaine",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    { 
      label: "Taux conversion", 
      value: conversionRate, 
      icon: Target, 
      trend: "+8%",
      suffix: "%",
      subtitle: "Scans → Points",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    { 
      label: "Performance", 
      value: "4.8", 
      icon: Star, 
      trend: "+0.2",
      suffix: "★",
      subtitle: "Satisfaction clients",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#102A43] mb-1">
            Bonjour {merchantName || "Votre commerce"} 👋
          </h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="w-11 h-11 bg-gradient-to-br from-[#0FB493] to-[#0CA182] rounded-xl flex items-center justify-center shadow-sm">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#0FB493]/20 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold ${stat.textColor} ${stat.bgColor} px-2 py-1 rounded-full`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-[#102A43] mb-1">
              {stat.value}{stat.suffix || ''}
            </div>
            <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
            <div className="text-xs text-gray-400">{stat.subtitle}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Composant de notifications
function NotificationPanel({ notifications, onRemove }: { 
  notifications: Array<{id: string, message: string, type: 'success' | 'info' | 'warning', timestamp: Date}>,
  onRemove: (id: string) => void 
}) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`p-3 rounded-lg shadow-lg border-l-4 ${
              notification.type === 'success' ? 'bg-green-50 border-green-400 text-green-800' :
              notification.type === 'warning' ? 'bg-yellow-50 border-yellow-400 text-yellow-800' :
              'bg-blue-50 border-blue-400 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{notification.message}</p>
              <button
                onClick={() => onRemove(notification.id)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function OffersManager({ offers, onCreateOffer }: { offers: any[], onCreateOffer: () => void }) {
  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#102A43]">Mes offres actives</h2>
        <button 
          onClick={onCreateOffer}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nouvelle offre</span>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.length > 0 ? (
          offers.map((offer, i) => (
            <div key={offer.id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[#102A43]">{offer.titre}</h3>
              <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">
                  Statut : {offer.active ? "🟢 active" : "🔴 inactive"}
                </span>
                <button className="text-[#0FB493] text-sm font-medium hover:underline">Modifier</button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Aucune offre active pour le moment
          </div>
        )}
      </div>
    </section>
  );
}

function LoyaltyManager() {
  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-[#102A43] mb-3">Mes cartes fidélité</h2>
      <div className="space-y-3">
        <div className="border border-gray-200 rounded-xl p-3 flex justify-between items-center">
          <div>
            <p className="font-medium text-[#102A43]">Café : 10 achetés = 1 offert</p>
            <p className="text-xs text-gray-500">152 participants · 42 complétions</p>
          </div>
          <button className="text-[#0FB493] text-sm font-medium hover:underline">Paramètres</button>
        </div>
        <div className="border border-gray-200 rounded-xl p-3 flex justify-between items-center">
          <div>
            <p className="font-medium text-[#102A43]">Menu du midi : 5 achetés = -20%</p>
            <p className="text-xs text-gray-500">73 participants · 21 complétions</p>
          </div>
          <button className="text-[#0FB493] text-sm font-medium hover:underline">Paramètres</button>
        </div>
      </div>
    </section>
  );
}

function ClientsTracker({ clients }: { clients: any[] }) {
  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-[#102A43] mb-3">Mes clients</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-[#F7F9FA]">
            <tr>
              <th className="py-2 px-3 text-left font-medium">Nom</th>
              <th className="py-2 px-3 text-left font-medium">Email</th>
              <th className="py-2 px-3 text-left font-medium">Points</th>
              <th className="py-2 px-3 text-left font-medium">Inscription</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="py-2 px-3">{client.nom}</td>
                  <td className="py-2 px-3">{client.email}</td>
                  <td className="py-2 px-3">{client.points}</td>
                  <td className="py-2 px-3 text-[#0FB493]">
                    {new Date(client.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  Aucun client pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatsSectionCommercant({ stats }: { stats: any[] }) {
  // Calcul des statistiques mensuelles
  const totalScans = stats.reduce((acc, stat) => acc + (stat.total_scans || 0), 0);
  const totalClients = Math.max(...stats.map(stat => stat.total_clients || 0), 0);
  const totalPoints = stats.reduce((acc, stat) => acc + (stat.total_points || 0), 0);
  const tauxRetour = stats.length > 0 ? Math.round((totalClients / Math.max(totalScans, 1)) * 100) : 0;

  const statsData = [
    { label: "Scans ce mois", value: totalScans },
    { label: "Clients fidèles", value: totalClients },
    { label: "Points distribués", value: totalPoints },
    { label: "Taux de retour", value: `${tauxRetour}%` },
  ];

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-[#102A43] mb-3">Statistiques</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {statsData.map((stat, i) => (
          <div key={i} className="bg-[#F7F9FA] rounded-xl p-3 shadow-inner">
            <div className="text-xl font-bold text-[#0FB493]">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterPro() {
  return (
    <footer className="relative z-10 mt-12 bg-gradient-to-r from-white to-[#F7F9FA] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#17BFA0] to-[#14a58e] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-[#102A43]">Kanpanya Pro</span>
            </div>
            <p className="text-sm text-gray-600">
              La solution complète pour gérer votre programme de fidélité et engager vos clients.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold text-[#102A43] mb-3">Liens rapides</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">📊 Statistiques</a></li>
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">👥 Clients</a></li>
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">🎯 Offres</a></li>
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">⚙️ Paramètres</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[#102A43] mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">❓ Centre d'aide</a></li>
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">📧 Contact</a></li>
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">📚 Documentation</a></li>
              <li><a href="#" className="hover:text-[#0FB493] transition-colors">🎓 Tutoriels</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kanpanya Pro. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-[#0FB493] transition-colors">Conditions d'utilisation</a>
            <span>·</span>
            <a href="#" className="hover:text-[#0FB493] transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// 🧭 COMPOSANT PRINCIPAL
export default function DashboardCommercantPage() {
  const router = useRouter();

  // États d'abord
  const [showCreateOffer, setShowCreateOffer] = React.useState(false);
  const [showScanClient, setShowScanClient] = React.useState(false);
  const [showQRScanner, setShowQRScanner] = React.useState(false);
  const [showQuizCreator, setShowQuizCreator] = React.useState(false);
  const [showSurveyCreator, setShowSurveyCreator] = React.useState(false);
  const [showSocialLinkCreator, setShowSocialLinkCreator] = React.useState(false);
  const [showSatisfactionSurveyCreator, setShowSatisfactionSurveyCreator] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  
  // États pour améliorations
  const [notifications, setNotifications] = React.useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning', timestamp: Date}>>([]);
  const [quickActions, setQuickActions] = React.useState<Array<{id: string, label: string, icon: any, action: () => void}>>([]);
  
  // Puis les hooks qui utilisent ces états
  const { merchantId, merchantData, loading: authLoading } = useMerchantAuth();
  const { offers, clients, stats } = useMerchantData(merchantId || "", refreshTrigger);
  
  const loading = authLoading;
  
  // Fonction pour rafraîchir les données
  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };


  // Fonction de scan QR améliorée avec notifications
  const handleQRScan = async (qrData: string) => {
    console.log("QR scanné:", qrData);
    const supabase = createBrowserSupabase();

    try {
      // qrData contient le client_id
      const clientId = qrData;

      // Vérifier que le client existe
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single();

      if (clientError || !client) {
        addNotification({
          id: Date.now().toString(),
          message: "❌ Client non trouvé. QR code invalide.",
          type: 'warning',
          timestamp: new Date()
        });
        return;
      }

      // Points variables selon la fréquence
      const pointsToGive = calculatePoints(client);
      
      // Insérer le scan
      const { error: scanError } = await supabase.from("scans").insert({
        client_id: clientId,
        commercant_id: merchantId,
        points: pointsToGive,
      });

      if (scanError) {
        addNotification({
          id: Date.now().toString(),
          message: "❌ Erreur lors de l'enregistrement du scan",
          type: 'warning',
          timestamp: new Date()
        });
        console.error("Erreur scan:", scanError);
        return;
      }

      // Mettre à jour les points du client
      const { error: updateError } = await supabase
        .from("clients")
        .update({ points: (client.points || 0) + pointsToGive })
        .eq("id", clientId);

      if (updateError) {
        console.error("Erreur mise à jour points:", updateError);
      }

      // Notification de succès
      addNotification({
        id: Date.now().toString(),
        message: `✅ ${client.nom} a gagné ${pointsToGive} points !`,
        type: 'success',
        timestamp: new Date()
      });

      // Fermer le scanner et rafraîchir
      setShowQRScanner(false);
      refreshData();

    } catch (error) {
      console.error("Erreur lors du scan:", error);
      addNotification({
        id: Date.now().toString(),
        message: "❌ Une erreur est survenue",
        type: 'warning',
        timestamp: new Date()
      });
    }
  };

  // Fonction pour calculer les points selon la fréquence
  const calculatePoints = (client: any) => {
    const today = new Date().toISOString().split('T')[0];
    // Logique pour points variables (exemple)
    return client.points > 100 ? 15 : 10; // Plus de points pour clients fidèles
  };

  // Fonction pour ajouter des notifications
  const addNotification = (notification: {id: string, message: string, type: 'success' | 'info' | 'warning', timestamp: Date}) => {
    setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Garde max 5 notifications
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // Synchronisation en temps réel avec Supabase
  React.useEffect(() => {
    if (!merchantId) return;
    
    const supabase = createBrowserSupabase();
    
    const channel = supabase
      .channel("realtime-scans")
      .on("postgres_changes", 
        { 
          event: "*", 
          schema: "public", 
          table: "scans",
          filter: `commercant_id=eq.${merchantId}`
        }, 
        (payload) => {
          console.log("Changement détecté dans les scans:", payload);
          refreshData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [merchantId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0FB493]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E2F0FB]/30 rounded-full blur-3xl"></div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0FB493] to-[#0CA182] rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-[#0FB493]/20 animate-pulse">
              <span className="text-white font-bold text-4xl">K</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-t-[#0FB493] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-[#102A43] mb-2">Kanpanya Pro</h3>
          <p className="text-gray-600 animate-pulse">Chargement de votre tableau de bord...</p>
          
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#0FB493] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#0FB493] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#0FB493] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col relative overflow-hidden">
      {/* Décorations d'arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0FB493]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E2F0FB]/30 rounded-full blur-3xl"></div>
  {/* 🔹 NAVBAR */}
  <nav className="w-full bg-gradient-to-r from-white to-[#F7F9FA] border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#0FB493] to-[#0CA182] rounded-xl flex items-center justify-center shadow-md shadow-[#0FB493]/15">
          <span className="text-white font-bold text-lg">K</span>
        </div>
        <div>
          <div className="text-xl font-bold text-[#102A43]">
            Kanpanya Pro
          </div>
          <div className="text-xs text-gray-500 hidden sm:block">
            Tableau de bord commerçant
          </div>
        </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-[#0FB493] transition-colors relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Actions rapides */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setShowCreateOffer(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Offre</span>
              </button>
            </div>

            <button
              onClick={() => setShowQRScanner(true)}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0FB493] text-white text-sm font-medium hover:shadow-md hover:shadow-[#0FB493]/25 hover:bg-[#0CA182] transition-all duration-200 active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Scanner</span>
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-all duration-200 active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Quitter</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 🌿 CONTENU PRINCIPAL */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8"
      >
        <WelcomeStats stats={stats} merchantName={merchantData?.nom} />
        
        {/* Grille d'onglets/cartes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 'offres', label: 'Offres', icon: Gift, desc: 'Promotions', count: offers.length },
            { id: 'clients', label: 'Clients', icon: Users, desc: 'Base fidèle', count: clients.length },
            { id: 'stats', label: 'Statistiques', icon: BarChart3, desc: 'Analytics', count: 0 },
            { id: 'satisfaction', label: 'Satisfaction', icon: Star, desc: 'Avis clients', count: 0 },
            { id: 'quiz', label: 'Quiz', icon: FileText, desc: 'Jeux', count: 0 },
            { id: 'sondages', label: 'Sondages', icon: MessageSquare, desc: 'Enquêtes', count: 0 },
            { id: 'liens', label: 'Réseaux', icon: LinkIcon, desc: 'Social media', count: 0 },
            { id: 'fidelite', label: 'Fidélité', icon: Gift, desc: 'Programmes', count: 0 },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-[#0FB493]/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-[#DDF5F0] rounded-lg flex items-center justify-center group-hover:bg-[#0FB493] transition-colors">
                  <tab.icon className="w-5 h-5 text-[#0FB493] group-hover:text-white transition-colors" />
                </div>
                {tab.count > 0 && (
                  <div className="ml-auto w-6 h-6 bg-[#0FB493] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {tab.count}
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-[#102A43] mb-0.5 text-left">{tab.label}</h3>
              <p className="text-xs text-gray-500 text-left">{tab.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.main>

                  <FooterPro />

                  {/* Notifications */}
                  <NotificationPanel 
                    notifications={notifications}
                    onRemove={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
                  />

                  {/* Modales pour chaque onglet */}
      <AnimatePresence>
        {activeTab === 'offres' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
            <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#0FB493]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#102A43]">Mes Offres</h2>
                  <p className="text-xs text-gray-500">Gérer vos promotions</p>
                </div>
              </div>
              <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-50 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <OffersManager offers={offers} onCreateOffer={() => setShowCreateOffer(true)} />
            </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'liens' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
            <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-[#0FB493]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#102A43]">Réseaux Sociaux</h2>
                  <p className="text-xs text-gray-500">Partager vos contenus</p>
                </div>
              </div>
              <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <SocialLinksManager onCreateLink={() => setShowSocialLinkCreator(true)} />
            </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'satisfaction' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
            <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#0FB493]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#102A43]">Satisfaction Client</h2>
                  <p className="text-xs text-gray-500">Avis et retours</p>
                </div>
              </div>
              <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <SatisfactionSurveyManager onCreateSurvey={() => setShowSatisfactionSurveyCreator(true)} />
            </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
            <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0FB493]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#102A43]">Quiz</h2>
                  <p className="text-xs text-gray-500">Jeux interactifs</p>
                </div>
              </div>
              <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <QuizManager onCreateQuiz={() => setShowQuizCreator(true)} />
            </div>
          </motion.div>
        </motion.div>
      )}

        {activeTab === 'sondages' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#0FB493]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#102A43]">Sondages</h2>
                    <p className="text-xs text-gray-500">Enquêtes et feedback</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <SurveyManager onCreateSurvey={() => setShowSurveyCreator(true)} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'fidelite' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[#0FB493]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#102A43]">Programme Fidélité</h2>
                    <p className="text-xs text-gray-500">Cartes et récompenses</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <LoyaltyManager />
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0FB493]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#102A43]">Mes Clients</h2>
                    <p className="text-xs text-gray-500">Base de données fidèle</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <ClientsTracker clients={clients} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTab(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#DDF5F0] rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#0FB493]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#102A43]">Statistiques</h2>
                    <p className="text-xs text-gray-500">Analytics détaillées</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab(null)} className="w-9 h-9 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <StatsSectionCommercant stats={stats} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modales */}
      <CreateOfferModal
        isOpen={showCreateOffer}
        onClose={() => setShowCreateOffer(false)}
        merchantId={merchantId || ""}
        onSuccess={refreshData}
      />
      
      <ScanClientModal
        isOpen={showScanClient}
        onClose={() => setShowScanClient(false)}
        merchantId={merchantId || ""}
        onSuccess={refreshData}
      />
      
      {/* Scanner QR */}
      {showQRScanner && (
        <ScannerQR
          onResult={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}

      {/* Créateur de Quiz */}
      <QuizCreator
        isOpen={showQuizCreator}
        onClose={() => setShowQuizCreator(false)}
        merchantId={merchantId || ""}
        onSuccess={refreshData}
      />

      {/* Créateur de Sondage */}
      <SurveyCreator
        isOpen={showSurveyCreator}
        onClose={() => setShowSurveyCreator(false)}
        merchantId={merchantId || ""}
        onSuccess={refreshData}
      />

      {/* Créateur de Lien Social */}
      <SocialLinkCreator
        isOpen={showSocialLinkCreator}
        onClose={() => setShowSocialLinkCreator(false)}
        merchantId={merchantId || ""}
        onSuccess={refreshData}
      />

      {/* Créateur de Questionnaire de Satisfaction */}
      <SatisfactionSurveyCreator
        isOpen={showSatisfactionSurveyCreator}
        onClose={() => setShowSatisfactionSurveyCreator(false)}
        merchantId={merchantId || ""}
        onSuccess={refreshData}
      />
    </div>
  );
}