"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { QrCode, Users, Star, Gift, Scan, ArrowLeft } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MerchantPage() {
  const router = useRouter();
  const [merchantData, setMerchantData] = useState<any>(null);
  const [merchantStats, setMerchantStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        // Données simulées pour les tests
        setMerchantData({
          id: "test-merchant-123",
          nom: "Mon Commerce Test",
          description: "Commerçant partenaire Kanpanya",
          active: true
        });

        setMerchantStats({
          total_scans_given: 25,
          unique_clients_scanned: 15,
          total_points_given: 250,
          last_scan_date: new Date().toISOString()
        });

      } catch (error: any) {
        console.error("Erreur récupération données commerçant:", error);
        setError(error.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto"></div>
          <p className="text-lg font-medium text-[#212E40]">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-lg font-medium text-red-600 mb-4">Erreur</p>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <a
            href="/dashboard"
            className="px-6 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition inline-block"
          >
            Retour au tableau de bord
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          <a
            href="/dashboard"
            className="flex items-center gap-2 text-[#17BFA0] hover:text-[#14a58d] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </a>
          <div className="text-base sm:text-lg font-bold text-[#17BFA0]">
            Kanpanya
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#212E40] mb-2">
            🏪 Espace Commerçant
          </h1>
          <p className="text-gray-600">
            Gérez vos QR codes et suivez vos statistiques
          </p>
        </div>

        {/* Informations commerçant */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#212E40] mb-1">
                {merchantData?.nom || "Mon Commerce"}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {merchantData?.description || "Commerçant partenaire Kanpanya"}
              </p>
              <p className="text-xs text-gray-500">
                ID: {merchantData?.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Statut</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                merchantData?.active 
                  ? "bg-green-100 text-green-600" 
                  : "bg-red-100 text-red-600"
              }`}>
                {merchantData?.active ? "Actif" : "Inactif"}
              </span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-2xl font-bold text-[#17BFA0]">
              {merchantStats?.total_scans_given || 0}
            </p>
            <p className="text-sm text-gray-500">Scans donnés</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-[#212E40]">
              {merchantStats?.unique_clients_scanned || 0}
            </p>
            <p className="text-sm text-gray-500">Clients uniques</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-2xl font-bold text-[#17BFA0]">
              {merchantStats?.total_points_given || 0}
            </p>
            <p className="text-sm text-gray-500">Points donnés</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-sm font-bold text-[#212E40]">
              {merchantStats?.last_scan_date 
                ? new Date(merchantStats.last_scan_date).toLocaleDateString("fr-FR")
                : "Jamais"
              }
            </p>
            <p className="text-sm text-gray-500">Dernier scan</p>
          </div>
        </div>

        {/* Actions QR Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* QR Code Commerçant */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#17BFA0] rounded-lg">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#212E40]">Mon QR Code</h3>
                <p className="text-sm text-gray-600">Pour que les clients me scannent</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Les clients peuvent scanner ce code pour gagner des points chez vous.
            </p>
            <a
              href={`/profile/qr?merchant=${merchantData.id}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition"
            >
              <QrCode className="w-4 h-4" />
              <span>Voir mon QR Code</span>
            </a>
          </div>

          {/* Scanner Client */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#212E40]">Scanner Client</h3>
                <p className="text-sm text-gray-600">Pour donner des points aux clients</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Scannez le QR code d'un client pour lui donner des points.
            </p>
            <a
              href="/scan"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
            >
              <Scan className="w-4 h-4" />
              <span>Scanner un client</span>
            </a>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#212E40] mb-4">
            🚀 Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/merchant/config"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
            >
              <Gift className="w-5 h-5" />
              <span>Configurer récompenses</span>
            </a>
            
            <a
              href="/merchant/stats"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
            >
              <Star className="w-5 h-5" />
              <span>Voir statistiques</span>
            </a>
            
            <a
              href="/merchant/clients"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
            >
              <Users className="w-5 h-5" />
              <span>Mes clients</span>
            </a>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#212E40] mb-4">
            📋 Comment utiliser le système QR
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-[#17BFA0] font-bold">1.</span>
              <p>Affichez votre QR Code dans votre commerce pour que les clients puissent le scanner</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#17BFA0] font-bold">2.</span>
              <p>Vous pouvez aussi scanner les QR codes des clients pour leur donner des points</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#17BFA0] font-bold">3.</span>
              <p>Chaque scan rapporte automatiquement 10 points au client</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#17BFA0] font-bold">4.</span>
              <p>Configurez des tickets scratch et des cartes de fidélité pour fidéliser vos clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
