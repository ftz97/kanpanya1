"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ChevronRight, Gift, Star, Ticket } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface RewardData {
  client_points: number;
  total_scans: number;
  total_points_earned: number;
  total_tickets_received: number;
  last_scan_date: string;
  recent_rewards: Array<{
    id: string;
    points_attributed: number;
    fidelite_incremented: boolean;
    ticket_attribue: boolean;
    created_at: string;
    merchant_name: string;
  }>;
}

export default function RewardPage() {
  const router = useRouter();
  const [rewardData, setRewardData] = useState<RewardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        // Données simulées pour les tests
        setRewardData({
          client_points: 150,
          total_scans: 8,
          total_points_earned: 80,
          total_tickets_received: 2,
          last_scan_date: new Date().toISOString(),
          recent_rewards: [
            {
              id: "1",
              points_attributed: 10,
              fidelite_incremented: true,
              ticket_attribue: false,
              created_at: new Date().toISOString(),
              merchant_name: "Boulangerie Test"
            },
            {
              id: "2",
              points_attributed: 10,
              fidelite_incremented: false,
              ticket_attribue: true,
              created_at: new Date(Date.now() - 86400000).toISOString(),
              merchant_name: "Pharmacie Test"
            }
          ]
        });

      } catch (error: any) {
        console.error("Erreur récupération récompenses:", error);
        setError(error.message || "Erreur lors du chargement des récompenses");
      } finally {
        setLoading(false);
      }
    };

    fetchRewardData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto"></div>
          <p className="text-lg font-medium text-[#212E40]">Chargement de vos récompenses...</p>
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
          <div className="text-base sm:text-lg font-bold text-[#17BFA0]">
            Kanpanya
          </div>
          <a
            href="/dashboard"
            className="px-4 py-2 text-[#17BFA0] hover:text-[#14a58d] font-medium"
          >
            ← Retour
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#212E40] mb-2">
            🎉 Vos Récompenses
          </h1>
          <p className="text-gray-600">
            Découvrez vos points, tickets et récompenses gagnés
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-2xl font-bold text-[#17BFA0]">
              {rewardData?.client_points || 0}
            </p>
            <p className="text-sm text-gray-500">Points actuels</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-2xl font-bold text-[#212E40]">
              {rewardData?.total_scans || 0}
            </p>
            <p className="text-sm text-gray-500">Scans effectués</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <p className="text-2xl font-bold text-[#17BFA0]">
              {rewardData?.total_points_earned || 0}
            </p>
            <p className="text-sm text-gray-500">Points gagnés</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🎟️</div>
            <p className="text-2xl font-bold text-[#212E40]">
              {rewardData?.total_tickets_received || 0}
            </p>
            <p className="text-sm text-gray-500">Tickets reçus</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#212E40] mb-4">
            🚀 Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/dashboard"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
            >
              <Gift className="w-5 h-5" />
              <span>Voir les offres</span>
            </a>
            
            <a
              href="/tickets"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
            >
              <Ticket className="w-5 h-5" />
              <span>Mes tickets</span>
            </a>
            
            <a
              href="/profile"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
            >
              <Star className="w-5 h-5" />
              <span>Mon profil</span>
            </a>
          </div>
        </div>

        {/* Historique des récompenses */}
        {rewardData?.recent_rewards && rewardData.recent_rewards.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#212E40] mb-4">
              📈 Activité récente
            </h2>
            <div className="space-y-3">
              {rewardData.recent_rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {reward.ticket_attribue ? "🎟️" : "⭐"}
                    </div>
                    <div>
                      <p className="font-medium text-[#212E40]">
                        {reward.merchant_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(reward.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#17BFA0]">
                      +{reward.points_attributed} pts
                    </p>
                    <div className="flex gap-1 text-xs">
                      {reward.fidelite_incremented && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                          Fidélité
                        </span>
                      )}
                      {reward.ticket_attribue && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
                          Ticket
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucune activité */}
        {(!rewardData?.recent_rewards || rewardData.recent_rewards.length === 0) && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-[#212E40] mb-2">
              Aucune activité récente
            </h3>
            <p className="text-gray-600 mb-6">
              Scannez des QR codes chez nos commerçants partenaires pour commencer à gagner des points !
            </p>
            <a
              href="/dashboard"
              className="px-6 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition inline-block"
            >
              Découvrir les commerçants
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
