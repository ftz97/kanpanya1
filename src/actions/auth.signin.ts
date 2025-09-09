"use client";
import { useSupa } from "@/lib/useSupa";

export function useSignIn() {
  const { supabase } = useSupa();
  
  return async function signIn(email: string, password: string) {
    if (!supabase) throw new Error("Supabase not initialized");
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error; // "invalid_credentials" → toast i18n
    return data;
  };
}


