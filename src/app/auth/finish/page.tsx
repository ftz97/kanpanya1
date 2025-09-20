'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthFinish() {
  const router = useRouter()
  useEffect(() => {
    const supabase = createClient()
    // Si le provider a posé la session via hash, getSession suffira
    supabase.auth.getSession().then(() => {
      router.replace('/dashboard')
    })
  }, [router])
  return <p>Connexion en cours…</p>
}








