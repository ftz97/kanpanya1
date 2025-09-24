export const runtime = 'nodejs'

import { NextResponse } from "next/server";
import { createServerSupabase } from '@/lib/supabase';

/* ----------------------------
   GET /api/neighborhoods/[id]
   Récupère un quartier par ID
---------------------------- */
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur récupération quartier:', error);
      return NextResponse.json({ error: 'Quartier non trouvé' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur API récupération quartier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/* ----------------------------
   PUT /api/neighborhoods/[id]
   Met à jour un quartier par ID
---------------------------- */
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const supabase = await createServerSupabase();
    const { geometry, name } = await req.json();

    const { data, error } = await supabase
      .from('neighborhoods')
      .update({ geometry, name })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur mise à jour quartier:', error);
      return NextResponse.json({ error: 'Erreur lors de la mise à jour du quartier' }, { status: 500 });
    }

    return NextResponse.json({
      message: "Neighborhood updated successfully",
      neighborhood: data,
    });
  } catch (error) {
    console.error('Erreur API mise à jour quartier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/* ----------------------------
   DELETE /api/neighborhoods/[id]
   Supprime un quartier par ID
---------------------------- */
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const supabase = await createServerSupabase();

    const { error } = await supabase
      .from('neighborhoods')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur suppression quartier:', error);
      return NextResponse.json({ error: 'Erreur lors de la suppression du quartier' }, { status: 500 });
    }

    return NextResponse.json({
      message: `Neighborhood ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Erreur API suppression quartier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}