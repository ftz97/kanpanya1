"use client";

import { MapPin, Star, Clock } from "lucide-react";

export default function CommercantsPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Nos commerçants partenaires</h1>
        <p className="text-muted-foreground">
          Découvrez les commerçants locaux qui participent au programme Kanpanya
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommercantCard 
          name="Pizzeria du Centre"
          category="Restauration"
          rating={4.8}
          distance="0.2 km"
          open={true}
          image="🍕"
        />
        <CommercantCard 
          name="Salon Beauté Élégance"
          category="Beauté"
          rating={4.6}
          distance="0.5 km"
          open={true}
          image="💇‍♀️"
        />
        <CommercantCard 
          name="Boulangerie Tradition"
          category="Alimentation"
          rating={4.9}
          distance="0.3 km"
          open={false}
          image="🥖"
        />
        <CommercantCard 
          name="Studio Zen"
          category="Loisirs"
          rating={4.7}
          distance="0.8 km"
          open={true}
          image="🧘‍♀️"
        />
        <CommercantCard 
          name="Pharmacie du Quartier"
          category="Santé"
          rating={4.5}
          distance="0.4 km"
          open={true}
          image="💊"
        />
        <CommercantCard 
          name="Boutique Mode & Co"
          category="Mode"
          rating={4.4}
          distance="0.6 km"
          open={true}
          image="👗"
        />
      </div>
    </div>
  );
}

function CommercantCard({ 
  name, 
  category, 
  rating, 
  distance, 
  open, 
  image 
}: {
  name: string;
  category: string;
  rating: number;
  distance: string;
  open: boolean;
  image: string;
}) {
  return (
    <div className="rounded-2xl p-6 border bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,.15)]">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{image}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {distance}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className={`flex items-center gap-1 text-sm ${open ? 'text-emerald-600' : 'text-red-600'}`}>
              <Clock className="size-4" />
              {open ? 'Ouvert' : 'Fermé'}
            </div>
          </div>

          <button className="kp-btn-green mt-4 w-full rounded-full h-10 text-sm">
            Voir les offres
          </button>
        </div>
      </div>
    </div>
  );
}
