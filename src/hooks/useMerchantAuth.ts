import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase";

export function useMerchantAuth() {
  const [merchantId, setMerchantId] = useState<string | null>(null);
  const [merchantData, setMerchantData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    async function getMerchantData() {
      try {
        setLoading(true);
        
        // Récupérer l'utilisateur connecté
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        // Récupérer les données du commerçant
        const { data: commercant } = await supabase
          .from("commercants")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (commercant) {
          setMerchantId(commercant.id);
          setMerchantData(commercant);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données commerçant:", error);
      } finally {
        setLoading(false);
      }
    }

    getMerchantData();
  }, []);

  return { merchantId, merchantData, loading };
}
