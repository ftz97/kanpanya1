export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerClientSafe } from "@/lib/supabase-server";

const StreetSegmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  coordinates: z.array(z.array(z.number()).length(2)),
  type: z.enum(['commercial', 'residential', 'mixed', 'industrial']),
  population: z.number().optional(),
  businesses: z.number().optional(),
  footTraffic: z.number().optional(),
  color: z.string(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
});

// GET - Récupérer toutes les segments de rues
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createServerClientSafe(cookieStore);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    // Récupérer les segments depuis la base de données
    const { data, error } = await supabase
      .from("street_segments")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}

// POST - Créer un nouveau segment de rue
export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createServerClientSafe(cookieStore);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    const body = await req.json();
    const validatedData = StreetSegmentSchema.parse(body);

    // Insérer le nouveau segment
    const { data, error } = await supabase
      .from("street_segments")
      .insert([{
        ...validatedData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Données invalides", details: e.errors }, { status: 400 });
    }
    const errorMessage = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}

// PUT - Mettre à jour un segment existant
export async function PUT(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createServerClientSafe(cookieStore);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    const body = await req.json();
    const { id, ...updateData } = body;
    
    if (!id) return NextResponse.json({ ok: false, error: "ID requis" }, { status: 400 });

    const validatedData = StreetSegmentSchema.omit({ id: true }).partial().parse(updateData);

    // Mettre à jour le segment
    const { data, error } = await supabase
      .from("street_segments")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
      
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Données invalides", details: e.errors }, { status: 400 });
    }
    const errorMessage = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}

// DELETE - Supprimer un segment
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createServerClientSafe(cookieStore);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ ok: false, error: "ID requis" }, { status: 400 });

    // Supprimer le segment
    const { error } = await supabase
      .from("street_segments")
      .delete()
      .eq("id", id);
      
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    
    return NextResponse.json({ ok: true, message: "Segment supprimé avec succès" });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
