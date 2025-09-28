export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const { email, redirectTo } = await req.json()
  const supabase = await createServerSupabase()
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(redirectTo ?? '/dashboard')}`
    }
  })
  return NextResponse.json({ ok: true })
}
