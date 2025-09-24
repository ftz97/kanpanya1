export const runtime = 'nodejs'

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yichatlcuqmquazlmxrv.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "temp_key_for_build"
);

export async function POST(req: Request) {
  try {
    const { recommendationId, clientId, merchantId, action = 'click' } = await req.json();

    if (!recommendationId || !clientId) {
      return NextResponse.json(
        { error: "recommendationId et clientId sont requis" },
        { status: 400 }
      );
    }

    // Enregistrer le clic dans la table de tracking
    const { data, error } = await supabase
      .from("recommendation_clicks")
      .insert({
        recommendation_id: recommendationId,
        client_id: clientId,
        merchant_id: merchantId,
        action: action, // 'click', 'view', 'conversion'
        clicked_at: new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown'
      });

    if (error) {
      console.error("Erreur lors de l'enregistrement du clic:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement du clic" },
        { status: 500 }
      );
    }

    // Mettre à jour les stats de la recommandation
    const { error: updateError } = await supabase.rpc('increment_recommendation_clicks', {
      rec_id: recommendationId
    });

    if (updateError) {
      console.error("Erreur lors de la mise à jour des stats:", updateError);
      // On ne retourne pas d'erreur car le clic a été enregistré
    }

    return NextResponse.json({ 
      success: true, 
      message: "Clic enregistré avec succès" 
    });

  } catch (error) {
    console.error("Erreur dans track-click API:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Fonction pour récupérer les stats d'une recommandation
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const recommendationId = url.searchParams.get('recommendationId');
    const merchantId = url.searchParams.get('merchantId');

    if (!recommendationId && !merchantId) {
      return NextResponse.json(
        { error: "recommendationId ou merchantId requis" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("recommendation_clicks")
      .select("*");

    if (recommendationId) {
      query = query.eq('recommendation_id', recommendationId);
    }

    if (merchantId) {
      query = query.eq('merchant_id', merchantId);
    }

    const { data, error } = await query
      .order('clicked_at', { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Calculer les stats
    const stats = {
      total_clicks: data?.length || 0,
      unique_clients: new Set(data?.map(click => click.client_id)).size,
      clicks_by_action: data?.reduce((acc, click) => {
        acc[click.action] = (acc[click.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {},
      recent_clicks: data?.slice(0, 10) || []
    };

    return NextResponse.json({ stats });

  } catch (error) {
    console.error("Erreur dans track-click GET:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
