"use client";

import { QrCode } from "lucide-react";
import StyledQRCode from "@/components/StyledQRCode";

export default function CartePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Ma carte Kanpanya</h1>
        <p className="text-muted-foreground">
          Votre carte de fidélité numérique pour gagner des points chez vos commerçants préférés
        </p>
      </section>

      <section className="flex justify-center">
        <StyledQRCode
          value="frantz_user_1234"
          size={280}
          title="Carte de Frantz"
          subtitle="1234 5678 9012 3456"
          points={2450}
          type="client"
          showDecoration={true}
        />
      </section>

      <section className="rounded-2xl p-6 border bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,.15)]">
        <h3 className="text-lg font-semibold mb-4">Historique récent</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Pizzeria du Centre</p>
              <p className="text-sm text-muted-foreground">Pizza -50% ce soir</p>
            </div>
            <span className="kp-text-mint-600 font-medium">+150 pts</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Salon Beauté</p>
              <p className="text-sm text-muted-foreground">Happy Hour 14h–16h</p>
            </div>
            <span className="kp-text-mint-600 font-medium">+75 pts</span>
          </div>
        </div>
      </section>
    </div>
  );
}
