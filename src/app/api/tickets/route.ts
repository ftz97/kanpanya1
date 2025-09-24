export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server";

// 🎫 API de Tickets - Version Simple et Fluide
// Pas de dépendance Supabase, fonctionne immédiatement

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

// Configurations de tickets prédéfinies
const TICKET_CONFIGS: Record<string, TicketConfig> = {
  "8b3d662b-b75d-43cf-b4d1-3f3b25dcb946": {
    id: "8b3d662b-b75d-43cf-b4d1-3f3b25dcb946",
    name: "Ticket Kanpanya Standard",
    winProbability: 0.7, // 70% de chance de gagner
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
    winProbability: 0.85, // 85% de chance de gagner
    rewards: [
      { type: 'points', value: 500, label: '500 points Kanpanya' },
      { type: 'points', value: 1000, label: '1000 points Kanpanya' },
      { type: 'coupon', value: 20, label: '20% de réduction' },
      { type: 'prize', value: 1, label: 'Cadeau premium' }
    ]
  }
};

// GET - Récupérer les configurations disponibles
export async function GET() {
  try {
    const configs = Object.values(TICKET_CONFIGS).map(config => ({
      id: config.id,
      name: config.name,
      winProbability: config.winProbability
    }));

    return NextResponse.json({
      success: true,
      data: configs
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur lors de la récupération des configurations"
    }, { status: 500 });
  }
}

// POST - Utiliser un ticket (grattage)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { configId, userId } = body;

    if (!configId) {
      return NextResponse.json({
        success: false,
        error: "ID de configuration requis"
      }, { status: 400 });
    }

    const config = TICKET_CONFIGS[configId];
    if (!config) {
      return NextResponse.json({
        success: false,
        error: "Configuration de ticket non trouvée"
      }, { status: 404 });
    }

    // Simulation du tirage
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
        configName: config.name
      };
    } else {
      result = {
        status: "lose",
        configId: config.id,
        configName: config.name
      };
    }

    // Simuler un délai réseau réaliste
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Erreur API tickets:", error);
    return NextResponse.json({
      success: false,
      error: "Erreur interne du serveur"
    }, { status: 500 });
  }
}
