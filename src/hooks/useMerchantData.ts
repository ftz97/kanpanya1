import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase";

interface Offer {
  id: string;
  titre: string;
  description: string;
  active: boolean;
  commercant_id: string;
  created_at: string;
}

interface Client {
  id: string;
  nom: string;
  email: string;
  points: number;
  created_at: string;
  scans?: Array<{ points: number }>;
}

interface Stat {
  jour: string;
  total_scans: number;
  total_points: number;
  total_clients: number;
  commercant_id: string;
}

export function useMerchantData(merchantId: string, refreshTrigger?: number) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    if (!merchantId) return;
    
    async function fetchData() {
      const supabase = createBrowserSupabase();
      
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
