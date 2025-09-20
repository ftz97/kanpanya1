import { NextResponse } from "next/server";

export async function GET() {
  // Mock data pour les recommandations
  const mockData = {
    recommendations: [
      {
        id: "1",
        title: "Pizza Margherita -50%",
        clicks: 45,
        impressions: 1200,
        ctr: 3.75,
        category: "Restauration",
        merchant_name: "Pizzeria Mario",
        is_active: true,
        quality_score: 8.5,
        last_updated: "2024-01-15T10:30:00Z"
      },
      {
        id: "2",
        title: "Coupe de cheveux -30%",
        clicks: 32,
        impressions: 800,
        ctr: 4.0,
        category: "Beauté",
        merchant_name: "Salon Élégance",
        is_active: true,
        quality_score: 9.2,
        last_updated: "2024-01-14T15:45:00Z"
      },
      {
        id: "3",
        title: "Café + Croissant -20%",
        clicks: 28,
        impressions: 600,
        ctr: 4.67,
        category: "Restauration",
        merchant_name: "Café du Coin",
        is_active: true,
        quality_score: 7.8,
        last_updated: "2024-01-13T08:20:00Z"
      }
    ],
    overallStats: {
      total_recommendations: 156,
      total_clicks: 2340,
      avg_ctr: 3.2,
      top_category: "Restauration",
      active_merchants: 89,
      total_clients_via_reco: 128,
      monthly_clients_via_reco: 34
    }
  };

  return NextResponse.json(mockData);
}
