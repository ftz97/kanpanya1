// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClientSafe } from "@/lib/supabase-server";

export const runtime = "nodejs"; // évite l'Edge si tu utilises @supabase/ssr

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // ⬇️ le point clé : attendre le client
  const cookieStore = cookies();
  const supabase = await createServerClientSafe(cookieStore);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin)
      );
    }
    // connecté : redirige où tu veux
    const redirectTo = url.searchParams.get("redirectTo") || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, url.origin));
  }

  return NextResponse.redirect(new URL("/login?error=missing_code", url.origin));
}
