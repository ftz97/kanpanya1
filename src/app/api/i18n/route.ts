export const runtime = 'nodejs'

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LOCALES, type Locale } from "@/i18n";

export async function GET() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "fr") as Locale;
  const locale = LOCALES.includes(lang) ? (lang as Locale) : "fr";
  return NextResponse.json({ locale });
}


