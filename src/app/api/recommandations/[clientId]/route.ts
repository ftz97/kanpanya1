import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yichatlcuqmquazlmxrv.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "temp_key_for_build"
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  
  // 🔎 Étape 1 : vérifier si le client a déjà scanné
  const { count, error: countError } = await supabase
    .from("scan_logs")
    .select("*", { count: "exact", head: true })
    .eq("client_id", clientId);

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  // 🎯 Cas 1 : client a déjà scanné → recommandations personnalisées
  if (count && count > 0) {
    const { data, error } = await supabase
      .from("recommandations")
      .select("*")
      .eq("client_id", clientId)
      .order("score", { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      type: "personnalisees",
      data,
    });
  }

  // 🎯 Cas 2 : aucun scan → fallback populaires
  const { data, error } = await supabase
    .from("recommandations_populaires")
    .select("*")
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    type: "populaires",
    data,
  });
}
