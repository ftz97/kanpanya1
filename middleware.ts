import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // FORCER le site à rester sur kanpanya1.vercel.app
  const hostname = request.headers.get('host') || '';
  
  // Si on est sur kanpanya1.vercel.app, on reste là
  if (hostname.includes('kanpanya1.vercel.app')) {
    return NextResponse.next();
  }
  
  // Si on est sur un autre domaine, on force vers kanpanya1.vercel.app
  return NextResponse.redirect(
    new URL(`https://kanpanya1.vercel.app${request.nextUrl.pathname}`, request.url),
    301
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
