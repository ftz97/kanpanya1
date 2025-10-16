"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QrCode, Download, Share, ArrowLeft } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase";
import StyledQRCode from "@/components/StyledQRCode";

export default function ClientQRCodePage() {
  const router = useRouter();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    async function fetchClientData() {
      try {
        // Récupérer l'utilisateur connecté
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/login");
          return;
        }

        // Récupérer les données du client
        const { data: client } = await supabase
          .from("clients")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (client) {
          setClientData(client);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données client:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClientData();
  }, []);

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `mon-qr-code-kanpanya.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon QR Code Kanpanya",
          text: `Mon QR Code de fidélité Kanpanya - ${clientData?.points} points`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Partage annulé");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Aucune donnée client trouvée</p>
        </div>
      </div>
    );
  }

  // Le QR code contient l'ID du client
  const qrValue = clientData.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#17BFA0]/10 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#17BFA0] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Titre */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#17BFA0]/10 rounded-full mb-4">
              <QrCode className="w-8 h-8 text-[#17BFA0]" />
            </div>
            <h1 className="text-2xl font-bold text-[#123456] mb-2">
              Mon QR Code Kanpanya
            </h1>
            <p className="text-gray-600">
              Présentez ce code chez vos commerçants partenaires
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <StyledQRCode
                value={qrValue}
                size={250}
                title={clientData.nom || "Client Kanpanya"}
                subtitle={`${clientData.points} points`}
                points={clientData.points}
                type="client"
              />
            </div>
          </div>

          {/* Infos client */}
          <div className="bg-[#F7F9FA] rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#17BFA0]">
                  {clientData.points}
                </div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#17BFA0]">
                  {clientData.nom || "Client"}
                </div>
                <div className="text-sm text-gray-600">Nom</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={downloadQRCode}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger</span>
            </button>
            <button
              onClick={shareQRCode}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share className="w-4 h-4" />
              <span>Partager</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              💡 Comment utiliser votre QR code
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Présentez ce code au commerçant lors de votre achat</li>
              <li>• Le commerçant scanne votre code</li>
              <li>• Vous gagnez automatiquement des points</li>
              <li>• Gardez ce code précieusement, il est unique !</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
