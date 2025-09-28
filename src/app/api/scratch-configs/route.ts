export const runtime = 'nodejs'

import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET toutes les configs
export async function GET() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("scratch_configs").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST nouvelle config
export async function POST(req: Request) {
  const supabase = await createServerSupabase();
  const body = await req.json();
  const { data, error } = await supabase.from("scratch_configs").insert(body).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
