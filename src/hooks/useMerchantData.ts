import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase";

export function useMerchantData(merchantId: string, refreshTrigger?: number) {
  const [offers, setOffers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    async function fetchData() {
      const { data: offersData } = await supabase
        .from("offres")
        .select("*")
        .eq("commercant_id", merchantId)
        .eq("active", true)
        .order("created_at", { ascending: false });

      const { data: clientsData } = await supabase
        .from("clients")
        .select("*, scans(points)")
        .limit(10);

      const { data: statsData } = await supabase
        .from("stats_cache")
        .select("*")
        .eq("commercant_id", merchantId)
        .order("jour", { ascending: false })
        .limit(7);

      setOffers(offersData || []);
      setClients(clientsData || []);
      setStats(statsData || []);
    }
    fetchData();
  }, [merchantId, refreshTrigger]);

  return { offers, clients, stats };
}
