import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    
    const { data: neighborhoods, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur récupération quartiers:', error);
      return NextResponse.json({ error: 'Erreur lors de la récupération des quartiers' }, { status: 500 });
    }

    return NextResponse.json({ neighborhoods: neighborhoods || [] });
  } catch (error) {
    console.error('Erreur API quartiers:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const neighborhood = await request.json();

    const { data, error } = await supabase
      .from('neighborhoods')
      .insert([neighborhood])
      .select()
      .single();

    if (error) {
      console.error('Erreur création quartier:', error);
      return NextResponse.json({ error: 'Erreur lors de la création du quartier' }, { status: 500 });
    }

    return NextResponse.json({ neighborhood: data });
  } catch (error) {
    console.error('Erreur API création quartier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}



