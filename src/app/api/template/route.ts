export const runtime = 'nodejs'

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, message: "GET route working" });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, message: "POST route working", data: body });
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, message: "PUT route working", data: body });
}

export async function DELETE() {
  return NextResponse.json({ ok: true, message: "DELETE route working" });
}
