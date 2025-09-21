"use client";

import { ChevronRight, Clock, MapPin } from "lucide-react";

export default function OffresPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Toutes les offres</h1>
        <p className="text-muted-foreground">
          Découvrez toutes les offres disponibles chez nos commerçants partenaires
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OffreCard 
          title="Pizza -50% ce soir"
          subtitle="Pizzeria du Centre"
          description="Profitez d'une réduction de 50% sur toutes nos pizzas ce soir uniquement !"
          points={150}
          expires="Ce soir"
          distance="0.2 km"
          type="flash"
        />
        <OffreCard 
          title="Happy Hour Beauté"
          subtitle="Salon Beauté Élégance"
          description="Soins du visage et manucure à prix réduits entre 14h et 16h"
          points={75}
          expires="Aujourd'hui"
          distance="0.5 km"
          type="happy-hour"
        />
        <OffreCard 
          title="Cours de Yoga offert"
          subtitle="Studio Zen"
          description="Premier cours de yoga offert pour tous les nouveaux clients"
          points={200}
          expires="Cette semaine"
          distance="0.8 km"
          type="nouveau"
        />
        <OffreCard 
          title="Pain bio -30%"
          subtitle="Boulangerie Tradition"
          description="Réduction de 30% sur tous nos pains bio et viennoiseries"
          points={50}
          expires="Demain"
          distance="0.3 km"
          type="promo"
        />
        <OffreCard 
          title="Consultation gratuite"
          subtitle="Pharmacie du Quartier"
          description="Consultation avec notre pharmacien pour un bilan santé complet"
          points={100}
          expires="Cette semaine"
          distance="0.4 km"
          type="sante"
        />
        <OffreCard 
          title="Soldes d'été"
          subtitle="Boutique Mode & Co"
          description="Jusqu'à -70% sur une sélection d'articles de mode"
          points={120}
          expires="Cette semaine"
          distance="0.6 km"
          type="soldes"
        />
      </div>
    </div>
  );
}

function OffreCard({ 
  title, 
  subtitle, 
  description, 
  points, 
  expires, 
  distance, 
  type 
}: {
  title: string;
  subtitle: string;
  description: string;
  points: number;
  expires: string;
  distance: string;
  type: string;
}) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'flash': return 'bg-rose-200/60 text-rose-800';
      case 'happy-hour': return 'bg-purple-200/60 text-purple-800';
      case 'nouveau': return 'bg-emerald-200/60 text-emerald-800';
      case 'promo': return 'bg-blue-200/60 text-blue-800';
      case 'sante': return 'bg-teal-200/60 text-teal-800';
      case 'soldes': return 'bg-orange-200/60 text-orange-800';
      default: return 'bg-gray-200/60 text-gray-800';
    }
  };

  const getBadgeText = (type: string) => {
    switch (type) {
      case 'flash': return 'Flash';
      case 'happy-hour': return 'Happy Hour';
      case 'nouveau': return 'Nouveau';
      case 'promo': return 'Promo';
      case 'sante': return 'Santé';
      case 'soldes': return 'Soldes';
      default: return 'Offre';
    }
  };

  return (
    <div className="rounded-2xl p-6 border bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,.15)]">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className={`inline-flex rounded-full px-3 py-1 text-sm ${getBadgeColor(type)}`}>
          {getBadgeText(type)}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
      <p className="text-sm mb-4">{description}</p>
      
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="size-4" />
          {expires}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="size-4" />
          {distance}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="kp-text-mint-600 font-semibold">+{points} pts</span>
        <button className="kp-btn-green rounded-full px-4 h-9 text-sm inline-flex items-center gap-1">
          Voir l&apos;offre <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
