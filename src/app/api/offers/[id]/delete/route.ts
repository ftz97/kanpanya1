export const runtime = 'nodejs'

import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

// DELETE /api/offers/[id]/delete
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ 
        ok: false, 
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const { error } = await supabase
      .from("flash_offers")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ 
        ok: false, 
        error: error.message 
      }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message: `Offer ${id} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json({ 
      ok: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
}
