import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!; // clé service pour bypass RLS en seed

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "development" && process.env.APP_ENV !== "e2e") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  const body = await req.json().catch(() => ({}));
  const title = body?.title ?? "TOAST_DUPLICATE_TEST";
  const supa = createClient(url, key);

  // Créer un utilisateur de test si nécessaire
  const testUserId = "00000000-0000-0000-0000-000000000000";
  const { error: userError } = await supa.from("users").upsert({
    id: testUserId,
    email: "test@example.com"
  }, { onConflict: "id" });

  if (userError) {
    return NextResponse.json({ ok: false, error: userError }, { status: 500 });
  }

  const { error } = await supa.from("flash_offers").insert({
    title,
    description: "seed",
    starts_at: new Date().toISOString(),
    ends_at: new Date(Date.now() + 3600_000).toISOString(),
    price: 10,
    is_active: true,
    created_by: testUserId
  });

  if (error) {
    // si déjà là, on considère OK pour le seed
    if ((error as any)?.code === "23505") {
      return NextResponse.json({ ok: true, seeded: "exists" });
    }
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, seeded: "created" });
}
