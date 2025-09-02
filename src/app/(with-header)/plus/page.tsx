"use client";

import { Settings, HelpCircle, Info, Shield, Gift, Users } from "lucide-react";

export default function PlusPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Plus d'options</h1>
        <p className="text-muted-foreground">
          Gérez votre compte et découvrez toutes les fonctionnalités de Kanpanya
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <OptionCard 
          icon={<Settings className="size-6" />}
          title="Paramètres"
          description="Gérez vos préférences et informations personnelles"
          href="#"
        />
        <OptionCard 
          icon={<HelpCircle className="size-6" />}
          title="Aide & Support"
          description="Consultez la FAQ et contactez notre équipe"
          href="#"
        />
        <OptionCard 
          icon={<Info className="size-6" />}
          title="À propos"
          description="Découvrez l'histoire et la mission de Kanpanya"
          href="#"
        />
        <OptionCard 
          icon={<Shield className="size-6" />}
          title="Confidentialité"
          description="Consultez notre politique de confidentialité"
          href="#"
        />
        <OptionCard 
          icon={<Gift className="size-6" />}
          title="Programme de fidélité"
          description="Découvrez comment gagner plus de points"
          href="#"
        />
        <OptionCard 
          icon={<Users className="size-6" />}
          title="Communauté"
          description="Rejoignez notre communauté d'utilisateurs"
          href="#"
        />
      </div>

      <section className="rounded-2xl p-8 border bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,.15)]">
        <h2 className="text-2xl font-semibold text-center kp-text-mint-600 mb-4">Besoin d'aide ?</h2>
        <p className="text-center text-muted-foreground mb-6">
          Notre équipe est là pour vous accompagner dans votre expérience Kanpanya
        </p>
        <div className="flex justify-center gap-4">
          <button className="kp-btn-green rounded-full px-6 h-11">
            Contacter le support
          </button>
          <button className="rounded-full px-6 h-11 border">
            Voir la FAQ
          </button>
        </div>
      </section>
    </div>
  );
}

function OptionCard({ 
  icon, 
  title, 
  description, 
  href 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl p-6 border bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,.15)] hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,.25)] transition-shadow">
      <div className="flex items-start gap-4">
        <div className="kp-text-mint-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <button className="kp-text-mint-600 text-sm font-medium hover:text-[hsl(var(--kp-mint-600))]">
            En savoir plus →
          </button>
        </div>
      </div>
    </div>
  );
}
