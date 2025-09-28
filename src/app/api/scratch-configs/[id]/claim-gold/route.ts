export const runtime = 'nodejs'

import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  try {
    // Récupérer la configuration actuelle
    const { data: config, error: fetchError } = await supabase
      .from("scratch_configs")
      .select("gold_prizes")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!config || !config.gold_prizes || config.gold_prizes <= 0) {
      return NextResponse.json({ error: "Aucun prix en or disponible" }, { status: 400 });
    }

    // Décrémenter le nombre de prix en or
    const { data, error } = await supabase
      .from("scratch_configs")
      .update({ 
        gold_prizes: config.gold_prizes - 1,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select("gold_prizes")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      remainingPrizes: data.gold_prizes,
      message: "Prix en or réclamé avec succès !"
    });

  } catch (error) {
    console.error("Erreur lors de la réclamation du prix en or:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
