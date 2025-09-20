"use client";
import { useSupa } from "@/lib/useSupa";

export function useOffersList() {
  const { supabase } = useSupa();

  return async function list() {
    if (!supabase) throw new Error("Supabase not initialized");
    
    const { data, error } = await supabase
      .from("flash_offers")
      .select("*")
      .order("starts_at", { ascending: false });

    if (error) throw error; // RLS denied ? → toast "supa.rls.denied"
    return data ?? [];
  };
}


