import { NextRequest, NextResponse } from "next/server";

// Configuration des tickets statiques pour la démo
const TICKET_CONFIGS = [
  {
    id: "8b3d662b-b75d-43cf-b4d1-3f3b25dcb946",
    name: "Ticket Kanpanya Standard",
    winProbability: 0.7, // 70% chance to win
    rewards: [
      { type: 'points', value: 100, label: '⭐ +100 points Kanpanya' },
      { type: 'points', value: 50, label: '⭐ +50 points Kanpanya' },
      { type: 'coupon', value: 10, label: '🎁 -10% chez Carrefour' },
      { type: 'prize', value: 1, label: '🍩 Donut offert' }
    ]
  },
  {
    id: "premium-ticket",
    name: "Ticket Premium",
    winProbability: 0.85, // 85% chance to win
    rewards: [
      { type: 'points', value: 1000, label: '⭐ +1000 points Kanpanya' },
      { type: 'points', value: 500, label: '⭐ +500 points Kanpanya' },
      { type: 'coupon', value: 20, label: '🎁 -20% chez Monoprix' },
      { type: 'prize', value: 1, label: '🎁 Cadeau premium' }
    ]
  }
];

export async function POST(req: NextRequest) {
  try {
    const { configId, userId } = await req.json();

    if (!configId) {
      return NextResponse.json(
        { success: false, error: "configId is required" },
        { status: 400 }
      );
    }

    console.log(`🎫 Utilisation du ticket ${configId} pour l'utilisateur ${userId || 'anonyme'}`);

    // Trouver la configuration du ticket
    const config = TICKET_CONFIGS.find(c => c.id === configId);

    if (!config) {
      return NextResponse.json(
        { success: false, error: "Configuration de ticket non trouvée" },
        { status: 404 }
      );
    }

    // Simuler le résultat du scratch
    const isWin = Math.random() < config.winProbability;
    let result: any = {
      status: isWin ? "win" : "lose",
      remaining_jackpots: Math.floor(Math.random() * 50) + 10, // Nombre aléatoire de jackpots restants
    };

    if (isWin) {
      const randomReward = config.rewards[Math.floor(Math.random() * config.rewards.length)];
      result.reward = randomReward.label;
    }

    console.log("✅ Résultat du ticket:", result);
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("❌ Erreur lors de l'utilisation du ticket:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
