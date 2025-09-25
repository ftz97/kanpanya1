"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ScanPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "processing" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const merchantId = params.get("merchant");
  const clientId = params.get("client");

  useEffect(() => {
    const processScan = async () => {
      try {
        setStatus("processing");
        
        // Vérifier que nous avons au moins un paramètre
        if (!merchantId && !clientId) {
          throw new Error("Paramètres de scan invalides");
        }

        // Simulation du traitement du scan
        console.log("🔍 Scan en cours...");
        
        if (merchantId) {
          console.log("🔍 Scan commerçant:", merchantId);
        } else if (clientId) {
          console.log("🔍 Scan client:", clientId);
        }

        // Simuler un délai de traitement
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("✅ Scan simulé avec succès");
        setStatus("success");

        // Redirection vers la page de récompense après un court délai
        setTimeout(() => {
          router.push("/reward");
        }, 1500);

      } catch (error: any) {
        console.error("❌ Erreur scan:", error);
        setStatus("error");
        setErrorMessage(error.message || "Une erreur est survenue");
        
        // Redirection vers l'accueil après 3 secondes en cas d'erreur
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };

    processScan();
  }, [merchantId, clientId, router]);

  // Affichage selon le statut
  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto"></div>
            <p className="text-lg font-medium text-[#212E40]">Initialisation du scan...</p>
          </div>
        );

      case "processing":
        return (
          <div className="text-center space-y-4">
            <div className="animate-pulse">
              <div className="text-4xl mb-4">🔍</div>
            </div>
            <p className="text-lg font-medium text-[#212E40]">⏳ Scan en cours...</p>
            <p className="text-sm text-gray-600">
              {merchantId ? "Enregistrement de votre visite chez le commerçant" : "Enregistrement du scan client"}
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-lg font-medium text-[#17BFA0]">Scan réussi !</p>
            <p className="text-sm text-gray-600">
              Vos points ont été ajoutés. Redirection vers vos récompenses...
            </p>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-lg font-medium text-red-600">Erreur de scan</p>
            <p className="text-sm text-gray-600">{errorMessage}</p>
            <p className="text-xs text-gray-500">
              Redirection vers l'accueil dans quelques secondes...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {renderContent()}
        
        {/* Informations de debug en développement */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
            <p><strong>Debug:</strong></p>
            <p>Merchant ID: {merchantId || "Aucun"}</p>
            <p>Client ID: {clientId || "Aucun"}</p>
            <p>Status: {status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
