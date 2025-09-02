import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { lang } = await req.json();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("lang", lang, { path: "/", httpOnly: false, maxAge: 60*60*24*365 });
  return res;
}




