"use client";

import Link from "next/link";
import { QrCode, Ticket } from "lucide-react";
import { useState, useEffect } from "react";

export function SiteHeader() {
  // État pour simuler les tickets disponibles
  const [tickets, setTickets] = useState(3);
  const [showBounce, setShowBounce] = useState(false);

  // Effet pour déclencher le bounce quand il y a des tickets
  useEffect(() => {
    if (tickets > 0) {
      setShowBounce(true);
      // Arrêter le bounce après 3 secondes
      const timer = setTimeout(() => setShowBounce(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [tickets]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b">
      <div className="container max-w-6xl mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-2xl">
          <span className="text-primary">Kanpanya</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <Link href="/">Accueil</Link>
          <Link href="/commercants">Commerçants</Link>
          <Link href="/offres">Offres</Link>
          <Link href="/plus">Plus</Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Bouton Tickets avec effet bounce */}
          {tickets > 0 && (
            <Link
              href="/dashboard"
              className={`inline-flex items-center gap-2 rounded-2xl px-4 h-11
                         bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white
                         shadow-[0_10px_28px_-10px_rgba(251,191,36,.55)]
                         transition-all duration-300 ${showBounce ? 'animate-bounce' : ''}`}
            >
              <Ticket className="size-4" />
              <span className="font-semibold">Tickets</span>
              <span className="bg-white text-orange-500 font-bold text-xs px-2 py-1 rounded-full">
                {tickets}
              </span>
            </Link>
          )}

          {/* Bouton Ma carte */}
          <Link
            href="/carte"
            className="inline-flex items-center gap-2 rounded-2xl px-4 h-11
                       bg-[#17BFA0] hover:bg-gradient-to-r hover:from-[#17BFA0] hover:to-[#BDF2D0] text-white
                       shadow-[0_10px_28px_-10px_rgba(23,191,160,.55)]"
          >
            <QrCode className="size-4" />
            Ma carte
          </Link>
        </div>
      </div>
    </header>
  );
}
