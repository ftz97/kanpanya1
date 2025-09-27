import { cookies, headers } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

export function createBrowserSupabase() {
  return createClient(supabaseEnv.url, supabaseEnv.anonKey);
}

export async function createServerSupabase() {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  // SSR helper with cookie passthrough
  return createServerClient(
    supabaseEnv.url,
    supabaseEnv.anonKey,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
      global: { headers: { "X-Forwarded-Proto": headersList.get("X-Forwarded-Proto") ?? "https" } }
    }
  );
}






