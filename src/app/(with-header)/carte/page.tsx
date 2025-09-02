"use client";

import { QrCode } from "lucide-react";

export default function CartePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Ma carte Kanpanya</h1>
        <p className="text-muted-foreground">
          Votre carte de fidélité numérique pour gagner des points chez vos commerçants préférés
        </p>
      </section>

      <section className="rounded-2xl p-8 border bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,.15)] text-center">
        <div className="bg-[hsl(var(--kp-mint-500))] rounded-2xl p-8 mx-auto w-fit">
          <QrCode className="size-32 text-white mx-auto" />
        </div>
        <h2 className="text-xl font-semibold mt-6">Carte de Frantz</h2>
        <p className="text-muted-foreground mt-2">1234 5678 9012 3456</p>
        <div className="mt-6">
          <span className="inline-flex rounded-full px-4 py-2 text-sm bg-[hsl(var(--kp-mint-100))] kp-text-mint-600">
            2,450 points
          </span>
        </div>
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
