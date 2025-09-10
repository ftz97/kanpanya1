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
    const { data: recoTotal, error: err1 } = await supabase
      .from("recommandations_conversions")
      .select("nb_clients_via_reco")
      .eq("commercant_id", merchantId)
      .single();

    const { data: recoMonth, error: err2 } = await supabase
      .from("recommandations_conversions_mensuelles")
      .select("nb_clients_via_reco")
      .eq("commercant_id", merchantId)
      .single();

    return NextResponse.json({
      total_clients_via_reco: recoTotal?.nb_clients_via_reco ?? 0,
      monthly_clients_via_reco: recoMonth?.nb_clients_via_reco ?? 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
