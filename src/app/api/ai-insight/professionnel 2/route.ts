import { NextResponse } from "next/server";

export async function GET() {
  // Données d'analyse IA spécialisées pour les professionnels
  const mockInsights = `Analyse IA Professionnelle - Optimisation Commerciale

💼 PRÉDICTIONS COMMERCIALES
• Pic de vente : Vendredi 18h-20h (+45% vs moyenne)
• Stock optimal : 120 unités (éviter rupture de stock)
• Prix optimal : -15% pour maximiser le profit
• Saisonnalité : +30% en décembre, -20% en janvier

🎯 ANALYSE CONCURRENTIELLE
• Position : 2ème sur 5 commerces similaires
• Avantage : Service client (+23% satisfaction)
• Opportunité : Digitalisation (+30% clients potentiels)
• Menace : Nouveau concurrent à 200m

👥 SEGMENTATION CLIENT
• Client type : 25-35 ans, urbain, panier moyen 45€
• Taux de fidélisation : 67% (objectif : 75%)
• Potentiel upselling : +28% de CA possible
• Churn rate : 12% (objectif : <10%)

📈 MÉTRIQUES COMMERCIALES
• ROI moyen : 340% sur les campagnes
• Coût d'acquisition client : 15€
• Valeur vie client : 180€
• Taux de conversion : 8.5% (objectif : 12%)

🚀 RECOMMANDATIONS STRATÉGIQUES
• Lancer campagne ciblée 25-35 ans
• Optimiser horaires d'ouverture (18h-20h)
• Développer programme de fidélité
• Digitaliser les ventes (click & collect)
• Améliorer l'expérience client`;

  return NextResponse.json({
    insights: mockInsights,
    generated_at: new Date().toISOString(),
    version: "1.0",
    type: "professionnel"
  });
}
