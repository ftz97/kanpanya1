import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // EMPÊCHER TOUTE redirection vers padavwa.com
  const hostname = request.headers.get('host') || '';
  
  // Si on est sur un domaine Vercel, on reste là
  if (hostname.includes('vercel.app')) {
    return NextResponse.next();
  }
  
  // Si quelqu'un essaie de rediriger vers padavwa.com, on reste sur Vercel
  if (hostname.includes('padavwa.com')) {
    return NextResponse.redirect(new URL('https://kanpanya1.vercel.app' + request.nextUrl.pathname, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
