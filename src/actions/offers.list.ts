"use client";
import { useSupa } from "@/lib/useSupa";

export function useOffersList() {
  const { supa, query } = useSupa();

  return async function list() {
    return query(async () => {
      const { data, error } = await supa
        .from("flash_offers")
        .select("*")
        .order("starts_at", { ascending: false });

      if (error) throw error; // RLS denied ? → toast "supa.rls.denied"
      return data ?? [];
    });
  };
}


