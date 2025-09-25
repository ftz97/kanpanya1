"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex flex-col">
      {/* Header avec logo */}
      <header className="w-full px-4 py-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kanpanya</h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Scanne, cumule, gagne !
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Découvre les commerçants de ton quartier et cumule des points à chaque achat
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-4">
          <Link href="/signup" className="block">
            <Button 
              className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg"
              size="lg"
            >
              Créer un compte
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <Link href="/login" className="block">
            <Button 
              variant="outline" 
              className="w-full h-14 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 text-lg font-semibold rounded-xl"
              size="lg"
            >
              Se connecter
            </Button>
          </Link>
        </div>

        {/* Footer avec informations */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            En continuant, tu acceptes nos{" "}
            <Link href="/terms" className="text-teal-600 underline">
              Conditions d'utilisation
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}