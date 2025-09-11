import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
  }
  await supabase.from("flash_offers").delete().eq("id", params.id);
  return NextResponse.redirect(new URL("/dashboard/offers", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
}
