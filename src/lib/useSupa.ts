"use client";
import { useEffect, useState } from "react";
import type { SupabaseClient, Session, User } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

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
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    setState(prev => ({ ...prev, supabase }));

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setState(prev => ({ ...prev, session, user: session?.user || null }));
    };

    getSession();
  }, []);

  return state;
}
