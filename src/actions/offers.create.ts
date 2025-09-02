"use client";
import { useSupa } from "@/lib/useSupa";

export function useCreateOffer() {
  const { supa, mutate } = useSupa();

  return async function createOffer(input: {
    title: string;
    description?: string;
    starts_at: string | Date;
    ends_at: string | Date;
    price: number;
    is_active: boolean;
  }) {
    return mutate(async () => {
      const { data, error } = await supa
        .from("flash_offers")
        .insert({
          title: input.title,
          description: input.description ?? null,
          starts_at: input.starts_at,
          ends_at: input.ends_at,
          price: input.price,
          is_active: input.is_active,
        })
        .select("id")
        .single();

      if (error) throw error; // capté par mutate → normalizeSupaError → toast i18n
      return data;
    }, { successKey: "common.toasts.saved" });
  };
}


