export const runtime = 'nodejs'

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, route: "quiz", message: "Quiz API working" });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, route: "quiz", data: body });
}
