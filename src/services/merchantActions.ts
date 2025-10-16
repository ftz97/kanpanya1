import { createBrowserSupabase } from "@/lib/supabase";

const supabase = createBrowserSupabase();

export interface CreateOfferData {
  titre: string;
  description: string;
  type: 'promotion' | 'jeu' | 'actu';
  date_debut: string;
  date_fin: string;
  points?: number;
}

export interface ScanClientData {
  client_email: string;
  points: number;
}

export class MerchantActions {
  // Créer une nouvelle offre
  static async createOffer(merchantId: string, offerData: CreateOfferData) {
    try {
      const { data, error } = await supabase
        .from("offres")
        .insert({
          commercant_id: merchantId,
          ...offerData,
          active: true
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Erreur lors de la création de l'offre:", error);
      return { success: false, error };
    }
  }

  // Scanner un client (ajouter des points)
  static async scanClient(merchantId: string, scanData: ScanClientData) {
    try {
      // Vérifier si le client existe
      let { data: client } = await supabase
        .from("clients")
        .select("id")
        .eq("email", scanData.client_email)
        .single();

      // Créer le client s'il n'existe pas
      if (!client) {
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            email: scanData.client_email,
            nom: scanData.client_email.split('@')[0], // Nom par défaut
            points: 0
          })
          .select()
          .single();

        if (clientError) throw clientError;
        client = newClient;
      }

      // Ajouter le scan
      const { data: scan, error: scanError } = await supabase
        .from("scans")
        .insert({
          client_id: client.id,
          commercant_id: merchantId,
          points: scanData.points
        })
        .select()
        .single();

      if (scanError) throw scanError;

      // Mettre à jour les points du client
      const { error: updateError } = await supabase
        .from("clients")
        .update({ points: client.points + scanData.points })
        .eq("id", client.id);

      if (updateError) throw updateError;

      return { success: true, data: { client, scan } };
    } catch (error) {
      console.error("Erreur lors du scan client:", error);
      return { success: false, error };
    }
  }

  // Modifier une offre
  static async updateOffer(offerId: string, updateData: Partial<CreateOfferData>) {
    try {
      const { data, error } = await supabase
        .from("offres")
        .update(updateData)
        .eq("id", offerId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Erreur lors de la modification de l'offre:", error);
      return { success: false, error };
    }
  }

  // Désactiver une offre
  static async deactivateOffer(offerId: string) {
    try {
      const { data, error } = await supabase
        .from("offres")
        .update({ active: false })
        .eq("id", offerId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Erreur lors de la désactivation de l'offre:", error);
      return { success: false, error };
    }
  }

  // Obtenir les détails d'un client
  static async getClientDetails(clientId: string) {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select(`
          *,
          scans(
            points,
            created_at,
            commercants(nom)
          )
        `)
        .eq("id", clientId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Erreur lors de la récupération des détails client:", error);
      return { success: false, error };
    }
  }
}
