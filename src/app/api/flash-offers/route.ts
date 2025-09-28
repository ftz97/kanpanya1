// src/app/api/flash-offers/route.ts
export const runtime = 'nodejs'
export const revalidate = 0; // pas de cache

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerSupabase } from "@/lib/supabase-server";
import { CreateOfferSchema, type CreateOfferInput, type OffersQueryParams } from "@/lib/schemas";

// GET /api/flash-offers?status=active|upcoming|expired|all&page=1&pageSize=20
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createServerSupabase();
    
    const { searchParams } = new URL(req.url);
    const queryParams: OffersQueryParams = {
      status: (searchParams.get("status") ?? "active") as "active" | "upcoming" | "expired" | "all",
      page: Math.max(1, Number(searchParams.get("page") || 1)),
      pageSize: Math.min(100, Math.max(1, Number(searchParams.get("pageSize") || 20))),
    };

    let query = supabase.from("flash_offers").select("*", { count: "exact" }).order("starts_at", { ascending: true });
    const nowIso = new Date().toISOString();

    if (queryParams.status === "active") {
      query = query.eq("is_active", true).lte("starts_at", nowIso).or(`ends_at.is.null,ends_at.gte.${nowIso}`);
    } else if (queryParams.status === "upcoming") {
      query = query.gte("starts_at", nowIso);
    } else if (queryParams.status === "expired") {
      query = query.lte("ends_at", nowIso);
    }

    const from = (queryParams.page - 1) * queryParams.pageSize;
    const to = from + queryParams.pageSize - 1;
    const { data, error, count } = await query.range(from, to);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ 
      ok: true, 
      items: data, 
      page: queryParams.page, 
      pageSize: queryParams.pageSize, 
      total: count ?? 0 
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createServerSupabase();
    
    const json = (await req.json()) as unknown;
    const parsed = CreateOfferSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const body: CreateOfferInput = parsed.data;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    const payload = {
      title: body.title,
      description: body.description || null,
      starts_at: new Date(body.starts_at).toISOString(),
      ends_at: body.ends_at ? new Date(body.ends_at).toISOString() : null,
      price: body.price ? Number(body.price) : null,
      is_active: body.is_active ?? true,
      // created_by is set by default via DB default auth.uid()
    };

    const { data, error } = await supabase
      .from("flash_offers")
      .insert(payload)
      .select("*")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, offer: data }, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
