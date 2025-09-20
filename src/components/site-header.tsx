"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";

export function SiteHeader() {
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
    </header>
  );
}
