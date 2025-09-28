'use server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function sendMagicLink(email: string, redirectTo?: string) {
  const supabase = await createServerSupabase()
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(redirectTo ?? '/dashboard')}`
    }
  })
}




