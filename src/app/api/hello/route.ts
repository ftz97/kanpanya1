import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, route: "hello", message: "Hello from Next.js 15 API!" });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, route: "hello", data: body });
}
