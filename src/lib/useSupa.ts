"use client";
import { useEffect, useState } from "react";
import type { SupabaseClient, Session, User } from "@supabase/supabase-js";

type UseSupaState = {
  supabase: SupabaseClient | null;
  session: Session | null;
  user: User | null;
};

export function useSupa(): UseSupaState {
  const [state, setState] = useState<UseSupaState>({
    supabase: null,
    session: null,
    user: null,
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { createBrowserClient } = await import("@supabase/ssr"); // @supabase/auth-helpers-nextjs v0.7+ → @supabase/ssr
      const supabase = createBrowserClient(
        String(process.env.NEXT_PUBLIC_SUPABASE_URL),
        String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      );
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setState({
        supabase,
        session: data.session ?? null,
        user: data.session?.user ?? null,
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
