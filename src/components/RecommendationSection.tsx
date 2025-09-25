"use client";

import { useState, useEffect } from "react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  score?: number;
  category?: string;
  merchant_id?: string;
}

interface RecommendationResponse {
  type: "personnalisees" | "populaires";
  data: Recommendation[];
}

interface RecommendationSectionProps {
  clientId?: string;
}

export default function RecommendationSection({ clientId }: RecommendationSectionProps) {
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleRecommendationClick = async (recommendationId: string, merchantId?: string) => {
    // Si pas de clientId, ne pas tracker le clic
    if (!clientId) {
      return;
    }

    try {
      await fetch('/api/recommandations/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recommendationId,
          clientId,
          merchantId,
          action: 'click'
        }),
      });
    } catch (error) {
      console.error('Erreur lors du tracking du clic:', error);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Si pas de clientId, ne pas charger les recommandations
      if (!clientId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/recommandations/${clientId}`);
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des recommandations");
        }
        
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [clientId]);

  // Si pas de clientId, ne pas afficher la section
  if (!clientId) {
    return null;
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !recommendations) {
    return null; // Ne pas afficher la section en cas d'erreur
  }

  const title = recommendations.type === "personnalisees" 
    ? "🌟 Recommandé pour toi" 
    : "🌟 Les plus populaires dans ta communauté";

  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#123456]">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.data.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleRecommendationClick(rec.id, rec.merchant_id)}
          >
            {rec.image_url && (
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src={rec.image_url}
                  alt={rec.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <h3 className="font-semibold text-[#123456] mb-2 text-sm sm:text-base">
              {rec.title}
            </h3>
            
            <p className="text-gray-600 text-xs sm:text-sm mb-3">
              {rec.description}
            </p>
            
            {rec.category && (
              <span className="inline-block px-2 py-1 bg-[#17BFA0] text-white text-xs rounded-full">
                {rec.category}
              </span>
            )}
            
            {rec.score && recommendations.type === "personnalisees" && (
              <div className="mt-2 text-xs text-gray-500">
                Score: {rec.score.toFixed(1)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
