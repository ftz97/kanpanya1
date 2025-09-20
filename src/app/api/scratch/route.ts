import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, route: "scratch", message: "Scratch API working" });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, route: "scratch", data: body });
}
