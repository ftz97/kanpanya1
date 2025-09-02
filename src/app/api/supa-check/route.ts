export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClientSafe } from '@/utils/supabase/server'

export async function GET() {
  const cookieStore = cookies()
  const supabase = await createServerClientSafe(cookieStore)
  const { data: { session }, error } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ ok: false, error: error?.message ?? null }, { status: 403 })
  }

  return NextResponse.json({ ok: true, user: session.user.id })
}
