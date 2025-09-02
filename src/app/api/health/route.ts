export const runtime = 'nodejs'

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.NODE_ENV,
    site: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    time: new Date().toISOString(),
  })
}
