export const runtime = 'nodejs'

import { NextResponse } from "next/server";

export async function GET() {
  // 🔹 Mock data (faux chiffres pour tester sans DB)
  const stats = {
    newClients: 28,
    growth: 15,
    retention: 42,
    topFlow: "Barber Black&Gold → Snack Latino"
  };

  // Vérifier si la clé API OpenAI est disponible
  if (!process.env.OPENAI_API_KEY) {
    // Retourner un insight mock si pas de clé API
    return NextResponse.json({
      insight: `Excellente performance ! Vos ${stats.newClients} nouveaux clients via recommandations (+${stats.growth}% vs mois dernier) et votre taux de rétention de ${stats.retention}% montrent une forte attractivité. Le flux ${stats.topFlow} est particulièrement prometteur.`
    });
  }

  try {
    // Import dynamique d'OpenAI seulement si la clé est disponible
    const { default: OpenAI } = await import("openai");
    
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
    Voici des stats d'un commerçant :
    - Nouveaux clients via recommandations : ${stats.newClients}
    - Croissance par rapport au mois dernier : ${stats.growth}%
    - Taux de rétention (30j) : ${stats.retention}%
    - Flux dominant : ${stats.topFlow}

    Génère un résumé court (max 2 phrases) en français, ton positif et actionnable.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      insight: response.choices[0].message?.content,
    });
  } catch (error: unknown) {
    console.error("Erreur OpenAI:", error);
    // Fallback vers insight mock en cas d'erreur
    return NextResponse.json({
      insight: `Excellente performance ! Vos ${stats.newClients} nouveaux clients via recommandations (+${stats.growth}% vs mois dernier) et votre taux de rétention de ${stats.retention}% montrent une forte attractivité. Le flux ${stats.topFlow} est particulièrement prometteur.`
    });
  }
}
