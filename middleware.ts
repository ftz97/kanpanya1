import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard"];

export function middleware(req: NextRequest) {
  console.log("🔒 MIDDLEWARE ACTIF pour:", req.nextUrl.pathname);
  
  // Rediriger TOUTES les routes /dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("🚫 REDIRECTION VERS /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
