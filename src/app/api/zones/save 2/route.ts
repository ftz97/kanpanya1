import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { name, geometry, municipality, analysis_data } = await request.json();

    if (!name || !geometry) {
      return NextResponse.json(
        { error: 'Nom et géométrie requis' },
        { status: 400 }
      );
    }

    // Sauvegarder la zone en base de données
    const { data, error } = await supabase
      .from('municipality_zones')
      .insert({
        name,
        geometry: JSON.stringify(geometry),
        municipality: municipality || 'Martinique',
        analysis_data: analysis_data || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      zone: data,
      message: `Zone "${name}" sauvegardée avec succès`
    });

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Récupérer toutes les zones
    const { data, error } = await supabase
      .from('municipality_zones')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      zones: data || []
    });

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
