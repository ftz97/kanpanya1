"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { QrCode, Download, Share, ArrowLeft, Copy } from "lucide-react";
import StyledQRCode from "@/components/StyledQRCode";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function QRCodeContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [qrData, setQrData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const clientId = params.get("client");
  const merchantId = params.get("merchant");

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        if (clientId) {
          // QR Code client - Version simplifiée
          setQrData({
            type: "client",
            id: clientId,
            name: "Client Test",
            qr_url: `${window.location.origin}/scan?client=${clientId}`,
            points: 150
          });

        } else if (merchantId) {
          // QR Code commerçant - Version simplifiée
          setQrData({
            type: "merchant",
            id: merchantId,
            name: "Commerçant Test",
            qr_url: `${window.location.origin}/scan?merchant=${merchantId}`,
            description: "Commerçant partenaire Kanpanya"
          });

        } else {
          throw new Error("Paramètres invalides");
        }

      } catch (error: any) {
        console.error("Erreur récupération QR:", error);
        setError(error.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchQRData();
  }, [clientId, merchantId]);

  const generateQRCode = () => {
    if (!qrData) return;
    
    // Utiliser une API de génération de QR code (ex: qr-server.com)
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData.qr_url)}`;
    setQrCodeUrl(qrApiUrl);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrData.qr_url);
      alert("URL copiée dans le presse-papiers !");
    } catch (error) {
      console.error("Erreur copie:", error);
    }
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Code ${qrData.type === "client" ? "Client" : "Commerçant"}`,
          text: `Scannez ce QR code pour ${qrData.type === "client" ? "gagner des points" : "donner des points"}`,
          url: qrData.qr_url
        });
      } catch (error) {
        console.error("Erreur partage:", error);
      }
    } else {
      copyToClipboard();
    }
  };

  useEffect(() => {
    if (qrData) {
      generateQRCode();
    }
  }, [qrData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto"></div>
          <p className="text-lg font-medium text-[#212E40]">Chargement du QR Code...</p>
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
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition cursor-pointer border-none"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[#17BFA0] hover:text-[#14a58d] font-medium bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <div className="text-base sm:text-lg font-bold text-[#17BFA0]">
            Kanpanya
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#212E40] mb-2">
            {qrData?.type === "client" ? "📱 Mon QR Code" : "🏪 QR Code Commerçant"}
          </h1>
          <p className="text-gray-600">
            {qrData?.type === "client" 
              ? "Montrez ce code aux commerçants pour gagner des points"
              : "Les clients peuvent scanner ce code pour gagner des points"
            }
          </p>
        </div>

        {/* QR Code Stylisé */}
        <div className="flex justify-center mb-6">
          <StyledQRCode
            value={qrData?.qr_url || ""}
            size={250}
            title={qrData?.name}
            subtitle={qrData?.type === "merchant" ? qrData.description : "Votre code unique"}
            points={qrData?.type === "client" ? qrData.points : undefined}
            type={qrData?.type}
            showDecoration={true}
          />
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {/* URL du QR Code */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h4 className="font-semibold text-[#212E40] mb-2">🔗 URL du QR Code</h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={qrData?.qr_url || ""}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-600 hover:text-[#17BFA0] transition"
                title="Copier l'URL"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={shareQR}
              className="flex items-center justify-center gap-2 p-4 bg-[#17BFA0] text-white rounded-xl hover:bg-[#14a58d] transition"
            >
              <Share className="w-5 h-5" />
              <span>Partager</span>
            </button>
            
            <button
              onClick={() => {
                if (qrCodeUrl) {
                  const link = document.createElement('a');
                  link.href = qrCodeUrl;
                  link.download = `qr-code-${qrData.name}.png`;
                  link.click();
                }
              }}
              className="flex items-center justify-center gap-2 p-4 border border-[#17BFA0] text-[#17BFA0] rounded-xl hover:bg-[#F9FFFD] transition"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h4 className="font-semibold text-[#212E40] mb-3">
            {qrData?.type === "client" ? "📋 Comment utiliser votre QR Code" : "📋 Comment utiliser ce QR Code"}
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            {qrData?.type === "client" ? (
              <>
                <p>• Montrez ce QR Code aux commerçants partenaires</p>
                <p>• Ils le scanneront pour vous donner des points</p>
                <p>• Vous recevrez automatiquement 10 points par scan</p>
                <p>• Des tickets scratch peuvent être débloqués</p>
              </>
            ) : (
              <>
                <p>• Affichez ce QR Code dans votre commerce</p>
                <p>• Les clients le scanneront pour gagner des points</p>
                <p>• Vous pouvez aussi scanner les QR codes des clients</p>
                <p>• Chaque scan rapporte 10 points au client</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QRCodePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto"></div>
          <p className="text-lg font-medium text-[#212E40]">Chargement...</p>
        </div>
      </div>
    }>
      <QRCodeContent />
    </Suspense>
  );
}
