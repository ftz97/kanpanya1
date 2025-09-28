export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/utils/supabase/server'

export async function GET() {
  const cookieStore = cookies()
  const supabase = await createServerSupabase(cookieStore)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ 
      ok: false, 
      user: null, 
      error: error?.message ?? 'Aucun utilisateur trouvé' 
    }, { status: 403 })
  }



  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_sign_in_at: user.last_sign_in_at,
    },
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({
        ok: false,
        message: 'Email et mot de passe requis',
        error: 'Paramètres manquants'
      }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = await createServerSupabase(cookieStore)
    
    // Tentative de connexion avec les identifiants fournis
    const { data: { session, user }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (signInError) {
      return NextResponse.json({
        ok: false,
        message: 'Échec de l\'authentification',
        error: signInError.message,
        code: signInError.status
      }, { status: 401 })
    }

    if (!session || !user) {
      return NextResponse.json({
        ok: false,
        message: 'Aucune session créée après authentification',
        error: 'Session invalide'
      }, { status: 500 })
    }

    // Test de la validité du token en faisant un appel à l'API
    let profileData = null;
    let apiError = null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .limit(1)
      profileData = data;
      apiError = error;
    } catch (error) {
      // Si la table n'existe pas, on continue sans erreur
      console.log('Table profiles non trouvée, test RLS ignoré');
    }

    return NextResponse.json({
      ok: true,
      user: { 
        id: user.id, 
        email: user.email 
      },
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      rls_test: profileData || []
    })

  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Erreur inattendue lors de l\'authentification',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }, { status: 500 })
  }
}
