import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: { merchantId: string } }
) {
  const { merchantId } = params;

  try {
    // 🎯 Qualité d'Attraction
    const { data: attraction, error: err1 } = await supabase.rpc(
      "get_attraction_quality",
      { mid: merchantId }
    );

    if (err1) throw err1;

    // 📊 Impact Konpanya
    const { data: impact, error: err2 } = await supabase.rpc(
      "get_konpanya_impact",
      { mid: merchantId }
    );

    if (err2) throw err2;

    return NextResponse.json({
      attraction: attraction || [],
      impact: impact || []
    });

  } catch (error: any) {
    console.error("Erreur API pro-stats:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
