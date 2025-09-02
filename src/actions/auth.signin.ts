"use client";
import { useSupa } from "@/lib/useSupa";

export function useSignIn() {
  const { supa, mutate } = useSupa();
  
  return async function signIn(email: string, password: string) {
    return mutate(async () => {
      const { data, error } = await supa.auth.signInWithPassword({ email, password });
      if (error) throw error; // "invalid_credentials" → toast i18n
      return data;
    }, { successKey: "common.toasts.saved" });
  };
}


