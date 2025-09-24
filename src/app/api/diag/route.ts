export const runtime = 'nodejs'

import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

const TABLES = [
  "users_public",
  "notification_prefs",
  "flash_offers",
  "scans",
  "queues",
  "points_ledger",
  "tombola_draws",
  "tombola_tickets",
  "scratch_cards",
  "scratch_wins",
  "marketing_quizzes",
  "marketing_quiz_answers",
  // ajoute ici d'autres tables de ton instance (merchants, clients, sponsor_campaigns, orders, etc.)
];

export async function GET() {
  const supabase = await createServerSupabase();
  const out: any[] = [];
  for (const table of TABLES) {
    try {
      const { count, error } = await supabase
        .from(table as any)
        .select("*", { count: "exact", head: true });
      out.push({ table, ok: !error, count: count ?? null, error: error?.message ?? null });
    } catch (e: any) {
      out.push({ table, ok: false, count: null, error: e?.message ?? "UNKNOWN" });
    }
  }
  return NextResponse.json({
    ok: true,
    url_host: process.env.NEXT_PUBLIC_SUPABASE_URL,
    results: out,
    hint: "Si certaines tables échouent, vérifie leurs policies RLS, leur nom, ou l'auth.",
  });
}
