import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const prenom = formData.get('prenom') as string;
    const nom = formData.get('nom') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const acceptCGU = formData.get('acceptCGU');

    console.log('Données reçues:', { prenom, nom, email, password: '***', acceptCGU });

    // Validation basique
    if (!prenom || !nom || !email || !password) {
      return NextResponse.json({ 
        error: 'Tous les champs sont requis' 
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ 
        error: 'Le mot de passe doit contenir au moins 6 caractères' 
      }, { status: 400 });
    }

    if (!acceptCGU) {
      return NextResponse.json({ 
        error: 'Tu dois accepter les conditions d\'utilisation' 
      }, { status: 400 });
    }

    // Pour l'instant, on simule un succès
    return NextResponse.json({ 
      success: true, 
      message: 'Compte créé avec succès !',
      user: { prenom, nom, email }
    });

  } catch (error) {
    console.error('Erreur lors de la création du compte:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la création du compte' 
    }, { status: 500 });
  }
}
