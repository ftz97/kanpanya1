import { createClient } from "@supabase/supabase-js";

export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

export function createBrowserSupabase() {
  return createClient(supabaseEnv.url, supabaseEnv.anonKey);
}






