export const runtime = 'nodejs'

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  
  if (!body?.title) {
    return NextResponse.json({ 
      ok: false, 
      error: { code: "offer.missing_title" } 
    }, { status: 400 });
  }
  
  if (body.starts_at && body.ends_at && new Date(body.starts_at) >= new Date(body.ends_at)) {
    return NextResponse.json({ 
      ok: false, 
      error: { code: "offer.date_invalid" } 
    }, { status: 400 });
  }
  
  // ... logique de création ...
  
  return NextResponse.json({ ok: true, id: "offer_123" });
}


