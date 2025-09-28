export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/utils/supabase/server'

export async function GET() {
  const cookieStore = cookies()
  const supabase = await createServerSupabase(cookieStore)
  const { data: { session }, error } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ ok: false, user: null, error: error?.message ?? null }, { status: 403 })
  }

  // Ajoute un mini select si tu veux tester RLS ensuite
  return NextResponse.json({
    ok: true,
    user: {
      id: session.user.id,
      email: session.user.email,
    },
  })
}




