import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED = ["fr", "en", "es", "gcf"] as const;
type SupportedLocale = (typeof SUPPORTED)[number];

function detectLocale(pathname: string): SupportedLocale {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  if (SUPPORTED.includes(first as SupportedLocale)) return first as SupportedLocale;
  return "fr";
}

export function middleware(req: NextRequest) {
  const { nextUrl, headers } = req;
  
  // Ne JAMAIS intercepter les API : ça casse /api/flash-offers
  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next({ request: { headers } });
  }
  const locale = detectLocale(nextUrl.pathname);
  const res = NextResponse.next({ request: { headers } });
  // Passe la locale aux Server/Client Components
  res.headers.set("x-app-locale", locale);
  return res;
}

export const config = {
  // Exclut _next, fichiers statiques ET api
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
