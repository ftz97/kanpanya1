export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase-server";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  starts_at: z.string().datetime(), // ISO
  ends_at: z.string().datetime().optional().nullable(),
  price: z.number().optional().nullable(),
  is_active: z.boolean().optional().default(true),
  merchant_id: z.string().uuid().optional().nullable(),
});

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = await createServerSupabase();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    const { data, error } = await supabase
      .from("flash_offers")
      .select("*")
      .eq("is_active", true)
      .gte("ends_at", new Date().toISOString())
      .order("ends_at", { ascending: true })
      .limit(50);
      
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json({ ok: false, error: userError.message }, { status: 401 });
    }
    if (!user) {
      return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
    }

    const payload = {
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      starts_at: parsed.data.starts_at,
      ends_at: parsed.data.ends_at ?? null,
      price: parsed.data.price ?? null,
      is_active: parsed.data.is_active ?? true,
      merchant_id: parsed.data.merchant_id ?? null,
      // created_by is set by default via DB default auth.uid()
    } as const;

    const { data, error } = await supabase
      .from("flash_offers")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, offer: data }, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
