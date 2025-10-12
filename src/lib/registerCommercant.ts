import { createClient } from "@supabase/supabase-js";
import { geocodeAddress } from "@/utils/geocodeAddress";

interface CommercantData {
  nom: string;
  adresse: string;
  telephone?: string;
  email?: string;
  categorie?: string;
  description?: string;
  [key: string]: any;
}

export async function registerCommercant(data: CommercantData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Configuration Supabase manquante");
    return { success: false, error: "Configuration invalide" };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Géocoder l'adresse pour obtenir lat/lon
  const coords = await geocodeAddress(data.adresse);

  if (!coords) {
    console.error("Impossible de géocoder l'adresse:", data.adresse);
    return { success: false, error: "Adresse invalide ou introuvable" };
  }

  // Insérer dans la table commercants
  const { data: insertedData, error } = await supabase
    .from("commercants")
    .insert([
      { 
        ...data, 
        latitude: coords.lat, 
        longitude: coords.lon,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur insertion Supabase:", error);
    return { success: false, error: error.message };
  }

  console.log("✅ Commerçant enregistré:", insertedData);
  return { success: true, data: insertedData };
}

