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
  
  // MÉTHODE RADICALE : Forcer le site à rester sur le domaine Vercel
  const hostname = req.headers.get('host') || '';
  
  // Si on est sur un domaine Vercel, on reste là
  if (hostname.includes('vercel.app')) {
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
  
  // Si on est sur un autre domaine, on force la redirection vers Vercel
  return NextResponse.redirect(new URL(`https://kanpanya1.vercel.app${nextUrl.pathname}`, req.url), 301);
}

export const config = {
  // Exclut _next, fichiers statiques ET api
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
