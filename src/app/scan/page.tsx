// app/scan/page.tsx
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ScanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const processScan = async () => {
      const clientId = searchParams.get("client");
      const merchantId = searchParams.get("merchant");
      
      // Si on a des paramètres de QR code, traiter le scan
      if (clientId || merchantId) {
        console.log("🔍 Scan détecté:", { clientId, merchantId });
        
        try {
          // Vérifier l'authentification utilisateur actuel
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            console.error("❌ Utilisateur non authentifié");
            // Rediriger vers la page d'authentification
            router.push("/login-client");
            return;
          }
          
          // Déterminer le type de scan et les IDs
          let scannedClientId: string | null = null;
          let scannedMerchantId: string | null = null;
          
          if (clientId) {
            // Un client a été scanné (par un commerçant)
            // Vérifier que l'utilisateur actuel est un commerçant
            const { data: merchantData } = await supabase
              .from("commercants")
              .select("id")
              .eq("user_id", user.id)
              .single();
            
            if (!merchantData) {
              console.error("❌ Profil commerçant introuvable");
              router.push("/dashboard?error=not_merchant");
              return;
            }
            
            scannedClientId = clientId;
            scannedMerchantId = merchantData.id;
          } else if (merchantId) {
            // Un commerçant a été scanné (par un client)
            // Vérifier que l'utilisateur actuel est un client
            const { data: clientData } = await supabase
              .from("clients")
              .select("id")
              .eq("user_id", user.id)
              .single();
            
            if (!clientData) {
              console.error("❌ Profil client introuvable");
              router.push("/dashboard?error=not_client");
              return;
            }
            
            scannedClientId = clientData.id;
            scannedMerchantId = merchantId;
          }
          
          // Enregistrer le scan dans la table scan_logs
          // Le trigger handle_scan_rewards() s'exécutera automatiquement
          const { error: scanError } = await supabase
            .from("scan_logs")
            .insert({
              client_id: scannedClientId,
              commercant_id: scannedMerchantId,
              points: 10, // Points de base
              created_at: new Date().toISOString()
            });
          
          if (scanError) {
            console.error("❌ Erreur enregistrement scan:", scanError);
            // Rediriger quand même vers la page reward (même en cas d'erreur)
            router.push("/reward?error=scan_failed");
            return;
          }
          
          console.log("✅ Scan enregistré avec succès");
          
          // Rediriger vers la page reward pour afficher les récompenses
          router.push("/reward");
          
        } catch (error) {
          console.error("❌ Erreur lors du traitement du scan:", error);
          router.push("/reward?error=unknown");
        }
        
        return;
      }
    };
    
    processScan();
  }, [searchParams, router]);

  const clientId = searchParams.get("client");
  const merchantId = searchParams.get("merchant");
  
  // Si on traite un scan, afficher un loading
  if (clientId || merchantId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-[#123456] mb-2">
            Traitement du scan...
          </h2>
          <p className="text-gray-600">
            {clientId ? "Scan client détecté" : "Scan commerçant détecté"}
          </p>
        </div>
      </div>
    );
  }

  // Page d'accueil normale (pas de paramètres QR)
  const steps = [
    { icon: "🔍", text: "Découvre tes commerçants locaux" },
    { icon: "📲", text: "Scanne ton QR code" },
    { icon: "🎁", text: "Gagne des récompenses exclusives" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#123456] mb-6">
          👋 Bienvenue sur <span className="text-[#17BFA0]">Kanpanya</span>
        </h1>

        {/* Animation des étapes */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.6, duration: 0.6 }}
              className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm w-full"
            >
              <span className="text-2xl">{step.icon}</span>
              <p className="text-gray-700 font-medium">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Choix du profil */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login-client")}
            className="w-full bg-[#17BFA0] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#14a58a] transition"
          >
            👤 Je suis un(e) client(e)
          </button>

          <button
            onClick={() => router.push("/login-merchant")}
            className="w-full bg-[#212E40] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#1a2330] transition"
          >
            🏪 Je suis un(e) commerçant(e)
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Sélectionne ton profil pour continuer
        </p>
      </div>
    </div>
  );
}

export default function ScanLanding() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BFA0] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <ScanContent />
    </Suspense>
  );
}