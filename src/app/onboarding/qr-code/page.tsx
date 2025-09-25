"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, QrCode, CheckCircle } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import StyledQRCode from "@/components/StyledQRCode";

export default function QRCodePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un utilisateur pour le test
    const mockUser = {
      id: "user_" + Date.now(),
      email: "test@example.com"
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const handleContinue = () => {
    router.push("/onboarding/preferences");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/signup">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Ton QR Code</h1>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* QR Code Stylisé */}
          <StyledQRCode
            value={user.id}
            size={200}
            title="Ton code unique"
            subtitle="Ton passeport Kanpanya"
            type="client"
            showDecoration={true}
          />

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  Montre ton QR code chez les commerçants partenaires pour cumuler des points
                </p>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  Chaque achat te rapporte des points que tu peux échanger contre des récompenses
                </p>
              </div>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="text-center">
              <h3 className="font-semibold text-teal-800 mb-2">
                💡 Comment ça marche ?
              </h3>
              <p className="text-sm text-teal-700">
                Présente ce QR code au commerçant lors de tes achats. 
                Il scannera ton code et tu recevras automatiquement tes points !
              </p>
            </div>
          </div>

          {/* Bouton continuer */}
          <button
            onClick={handleContinue}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}