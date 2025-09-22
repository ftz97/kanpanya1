import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { geometry } = await request.json();

    const { data, error } = await supabase
      .from('neighborhoods')
      .update({ geometry })
      .eq('id', context.params.id)
      .select()
      .single();

    if (error) {
      console.error('Erreur mise à jour quartier:', error);
      return NextResponse.json({ error: 'Erreur lors de la mise à jour du quartier' }, { status: 500 });
    }

    return NextResponse.json({ neighborhood: data });
  } catch (error) {
    console.error('Erreur API mise à jour quartier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();

    const { error } = await supabase
      .from('neighborhoods')
      .delete()
      .eq('id', context.params.id);

    if (error) {
      console.error('Erreur suppression quartier:', error);
      return NextResponse.json({ error: 'Erreur lors de la suppression du quartier' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API suppression quartier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}



