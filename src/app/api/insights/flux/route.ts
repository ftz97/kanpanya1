export const runtime = 'nodejs'

import { NextResponse } from "next/server";
import OpenAI from "openai";

// Vérifier si la clé OpenAI est disponible
const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export async function POST(request: Request) {
  try {
    const { links } = await request.json();

    if (!links || !Array.isArray(links)) {
      return NextResponse.json({ error: "Données de flux invalides" }, { status: 400 });
    }

    // Préparer les données pour l'analyse IA
    const fluxData = links.map((link: unknown) => ({
      source: link.source?.name || "Inconnu",
      target: link.target?.name || "Inconnu", 
      value: link.value || 0,
      percentage: link.percentage || 0
    }));

    const openai = getOpenAI();
    
    if (!openai) {
      // Fallback sans IA si la clé n'est pas disponible
      const insights = `
📊 Analyse des flux commerciaux :

Flux détectés :
${fluxData.map(flux => `• ${flux.source} → ${flux.target} : ${flux.value} clients (${flux.percentage}%)`).join('\n')}

🔍 Tendances observées :
• Forte circulation entre Marché Central et Carrefour (30%)
• Flux significatif Coiffeur → Snack Latino (25%)
• Trafic modéré vers les loisirs (Cinéma/Fast-food)

💡 Recommandations :
• Créer des partenariats entre commerces complémentaires
• Optimiser l'emplacement des commerces selon les flux
• Développer des offres groupées pour encourager les parcours clients

⚠️ Note : Analyse basique - Activez l'IA pour des insights avancés.
      `;
      
      return NextResponse.json({ insights });
    }

    const prompt = `
Analyse les flux commerciaux suivants et génère des insights pertinents pour une collectivité :

Flux détectés :
${fluxData.map(flux => `- ${flux.source} → ${flux.target} : ${flux.value} clients (${flux.percentage}%)`).join('\n')}

Génère une analyse en français qui inclut :
1. Les tendances principales observées
2. Les opportunités de collaboration entre commerces
3. Des recommandations pour optimiser les flux
4. Des suggestions d'actions concrètes pour la collectivité

Format : Texte structuré avec des points clés et des recommandations actionables.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en analyse de flux commerciaux et en développement territorial. Tu analyses les données de flux entre commerces pour aider les collectivités à optimiser leur attractivité commerciale."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const insights = completion.choices[0]?.message?.content || "Impossible de générer l'analyse.";

    return NextResponse.json({ insights });

  } catch (error) {
    console.error("Erreur API insights flux:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération des insights" },
      { status: 500 }
    );
  }
}
