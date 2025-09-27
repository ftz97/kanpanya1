import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  
  const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL));
  response.cookies.delete("sb-yichatlcuqmquazlmxrv-auth-token");
  
  return response;
}
