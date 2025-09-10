import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function GET() {
  // 🔹 Mock data (faux chiffres pour tester sans DB)
  const stats = {
    newClients: 28,
    growth: 15,
    retention: 42,
    topFlow: "Barber Black&Gold → Snack Latino"
  };

  const prompt = `
  Voici des stats d'un commerçant :
  - Nouveaux clients via recommandations : ${stats.newClients}
  - Croissance par rapport au mois dernier : ${stats.growth}%
  - Taux de rétention (30j) : ${stats.retention}%
  - Flux dominant : ${stats.topFlow}

  Génère un résumé court (max 2 phrases) en français, ton positif et actionnable.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      insight: response.choices[0].message?.content,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
