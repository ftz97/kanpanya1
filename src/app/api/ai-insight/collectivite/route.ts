export const runtime = 'nodejs'

import { NextResponse } from "next/server";

export async function GET() {
  // Données d'analyse IA spécialisées pour les collectivités
  const mockInsights = `Analyse IA Collectivité - Gestion Territoriale

🗺️ ANALYSE TERRITORIALE
• Zones d'activité : Centre-ville (+45% flux), Quartier Nord (+12%)
• Mobilité piétonne : 2.3km rayon moyen de déplacement
• Impact environnemental : -15% émissions grâce aux commerces locaux
• Densité commerciale : 2.3 commerces/km² (objectif : 3.0)

👥 IMPACT SOCIAL
• Équité territoriale : 78% des quartiers bien desservis
• Accessibilité : 65% des commerces accessibles PMR
• Inclusion : +23% d'emplois locaux créés
• Cohésion sociale : 4.2/5 satisfaction citoyenne

🏙️ GESTION URBAINE
• Transport public : Ligne 3 sous-utilisée (-30% vs capacité)
• Événements : Marché du dimanche +40% d'affluence
• Aménagement : Nouveau parc +25% de fréquentation
• Circulation : -12% de trafic grâce aux zones piétonnes

📊 ENGAGEMENT CITOYEN
• Participation : 34% aux consultations citoyennes
• Satisfaction : 4.2/5 pour les services municipaux
• Retour citoyen : 67% des suggestions implémentées
• Démocratie participative : +15% cette année

🎯 RECOMMANDATIONS TERRITORIALES
• Développer transport public vers Quartier Nord
• Créer plus d'événements citoyens
• Améliorer accessibilité PMR
• Renforcer consultation citoyenne
• Optimiser gestion des espaces publics`;

  return NextResponse.json({
    insights: mockInsights,
    generated_at: new Date().toISOString(),
    version: "1.0",
    type: "collectivite"
  });
}
