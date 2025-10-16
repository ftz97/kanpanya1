"use client";

import { useState, useEffect } from "react";
import { QrCode, PlusCircle, LogOut } from "lucide-react";
import ScannerQR from "@/components/ScannerQR";
import { useMerchantData } from "@/hooks/useMerchantData";
import { createBrowserSupabase } from "@/lib/supabase";

export default function DashboardCommercantPage() {
  const merchantId = "UUID_TEST";
  const { offers, clients, stats } = useMerchantData(merchantId, refreshTrigger);
  const [showScanner, setShowScanner] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleScan = async (qrData: string) => {
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
        alert("❌ Client non trouvé. QR code invalide.");
        return;
      }

      // Insérer le scan
      const { error: scanError } = await supabase.from("scans").insert({
        client_id: clientId,
        commercant_id: merchantId,
        points: 10,
      });

      if (scanError) {
        alert("❌ Erreur lors de l'enregistrement du scan");
        console.error("Erreur scan:", scanError);
        return;
      }

      // Mettre à jour les points du client
      const { error: updateError } = await supabase
        .from("clients")
        .update({ points: (client.points || 0) + 10 })
        .eq("id", clientId);

      if (updateError) {
        console.error("Erreur mise à jour points:", updateError);
      }

      // Afficher un message de succès
      alert(`✅ Scan réussi ! ${client.nom} a gagné 10 points.`);
      
      // Fermer le scanner et rafraîchir
      setShowScanner(false);
      setRefreshTrigger(prev => prev + 1);
      
    } catch (error) {
      console.error("Erreur lors du scan:", error);
      alert("❌ Une erreur est survenue");
    }
  };

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Synchronisation en temps réel avec Supabase
  useEffect(() => {
    const supabase = createBrowserSupabase();
    
    const channel = supabase
      .channel("realtime")
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

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <div className="text-lg sm:text-xl font-semibold text-[#17BFA0]">Kanpanya Pro</div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setShowScanner(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] transition-all duration-200 active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Scanner client</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 active:scale-95 transition-all duration-200">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-8">
        
        {/* Statistiques d'accueil */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-[#123456] mb-3">Bonjour 👋 Votre Commerce</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#F7F9FA] rounded-xl p-3 shadow-inner">
              <div className="text-xl font-bold text-[#17BFA0]">{stats.length}</div>
              <div className="text-sm text-gray-600">Scans du jour</div>
            </div>
            <div className="bg-[#F7F9FA] rounded-xl p-3 shadow-inner">
              <div className="text-xl font-bold text-[#17BFA0]">{clients.length}</div>
              <div className="text-sm text-gray-600">Clients actifs</div>
            </div>
            <div className="bg-[#F7F9FA] rounded-xl p-3 shadow-inner">
              <div className="text-xl font-bold text-[#17BFA0]">{offers.length}</div>
              <div className="text-sm text-gray-600">Offres actives</div>
            </div>
            <div className="bg-[#F7F9FA] rounded-xl p-3 shadow-inner">
              <div className="text-xl font-bold text-[#17BFA0]">4.8 ★</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </section>

        {/* Gestion des offres */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-[#123456]">Mes offres actives</h2>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200">
              <PlusCircle className="w-4 h-4" />
              <span>Nouvelle offre</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.length > 0 ? (
              offers.map((offer) => (
                <div key={offer.id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold text-[#123456]">{offer.titre}</h3>
                  <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      Statut : {offer.active ? "🟢 active" : "🔴 inactive"}
                    </span>
                    <button className="text-[#17BFA0] text-sm font-medium hover:underline">Modifier</button>
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

        {/* Liste des clients */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-[#123456] mb-3">Mes clients</h2>
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
                      <td className="py-2 px-3 text-[#17BFA0]">
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

      </main>

      {/* Scanner QR */}
      {showScanner && (
        <ScannerQR
          onResult={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
