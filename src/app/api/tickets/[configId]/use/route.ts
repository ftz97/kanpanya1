export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server";

// 🎫 API pour utiliser un ticket spécifique
// Version optimisée et fluide

interface TicketConfig {
  id: string;
  name: string;
  winProbability: number;
  rewards: {
    type: 'points' | 'coupon' | 'prize';
    value: number;
    label: string;
  }[];
}

const TICKET_CONFIGS: Record<string, TicketConfig> = {
  "8b3d662b-b75d-43cf-b4d1-3f3b25dcb946": {
    id: "8b3d662b-b75d-43cf-b4d1-3f3b25dcb946",
    name: "Ticket Kanpanya Standard",
    winProbability: 0.7,
    rewards: [
      { type: 'points', value: 50, label: '50 points Kanpanya' },
      { type: 'points', value: 100, label: '100 points Kanpanya' },
      { type: 'points', value: 200, label: '200 points Kanpanya' },
      { type: 'coupon', value: 10, label: '10% de réduction' },
      { type: 'prize', value: 1, label: 'Cadeau surprise' }
    ]
  },
  "premium-ticket": {
    id: "premium-ticket",
    name: "Ticket Premium",
    winProbability: 0.85,
    rewards: [
      { type: 'points', value: 500, label: '500 points Kanpanya' },
      { type: 'points', value: 1000, label: '1000 points Kanpanya' },
      { type: 'coupon', value: 20, label: '20% de réduction' },
      { type: 'prize', value: 1, label: 'Cadeau premium' }
    ]
  }
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ configId: string }> }
) {
  try {
    const { configId } = await params;
    const body = await req.json();
    const { userId } = body;

    console.log(`🎫 Utilisation du ticket ${configId} pour l'utilisateur ${userId || 'anonyme'}`);

    const config = TICKET_CONFIGS[configId];
    if (!config) {
      return NextResponse.json({
        success: false,
        error: "Configuration de ticket non trouvée"
      }, { status: 404 });
    }

    // Simulation du tirage avec probabilités réalistes
    const random = Math.random();
    const isWin = random <= config.winProbability;

    let result;
    if (isWin) {
      // Sélectionner une récompense aléatoire
      const randomReward = config.rewards[Math.floor(Math.random() * config.rewards.length)];
      result = {
        status: "win",
        reward: randomReward.label,
        value: randomReward.value,
        type: randomReward.type,
        configId: config.id,
        configName: config.name,
        timestamp: new Date().toISOString()
      };
    } else {
      result = {
        status: "lose",
        configId: config.id,
        configName: config.name,
        timestamp: new Date().toISOString()
      };
    }

    // Délai réaliste pour simuler le traitement
    await new Promise(resolve => setTimeout(resolve, 200));

    console.log(`✅ Résultat du ticket:`, result);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("❌ Erreur lors de l'utilisation du ticket:", error);
    return NextResponse.json({
      success: false,
      error: "Erreur lors de l'utilisation du ticket"
    }, { status: 500 });
  }
}
