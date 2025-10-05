"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActusPileSwipe from "@/components/ActusPileSwipe";

export default function Dashboard() {
  const userName = "Kevin";
  const heure = new Date().getHours();
  const emoji = heure >= 6 && heure < 12 ? "☀️" : heure >= 12 && heure < 18 ? "🌇" : "🌙";

  // Données mock pour les bon plans flash
  const flashOffers = [
    { title: "Happy Hour 14h-16h", desc: "Commerçant", cta: "Voir l'offre" },
    { title: "Légumes frais -30%", desc: "Commerçant", cta: "Voir l'offre" },
    { title: "Parapharmacie -15%", desc: "Commerçant", cta: "Voir l'offre" },
    { title: "Boulangerie -20%", desc: "Commerçant", cta: "Voir l'offre" },
    { title: "Épicerie Bio -25%", desc: "Commerçant", cta: "Voir l'offre" },
    { title: "Café du coin -10%", desc: "Commerçant", cta: "Voir l'offre" },
  ];

  // Données mock pour les catégories
  const categories = [
    { icon: "🍔", name: "Restauration" },
    { icon: "💇‍♀️", name: "Beauté" },
    { icon: "👗", name: "Mode" },
    { icon: "🎉", name: "Loisirs" },
    { icon: "🛒", name: "Alimentation" },
    { icon: "💊", name: "Santé" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Kanpanya</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Accueil</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Commerçants</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Offres</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Plus</a>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">🎟 Tickets 3</span>
              <span className="text-sm text-gray-600">🎟 3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section de bienvenue */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonsoir {userName} {emoji}
          </h1>
          <h2 className="text-xl text-gray-700 mb-2">Achète local, gagne plus.</h2>
          <p className="text-gray-600">
            Soutiens tes commerces de proximité et débloque des offres exclusives.
          </p>
        </section>

        {/* Espace sponsorisé */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏥</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                Espace sponsorisé • Mutuelle Locale
              </span>
            </div>
            <h3 className="font-bold text-xl mb-2">🎬 Vidéo Nutrition</h3>
            <p className="text-sm opacity-90 mb-4">
              Découvrez les secrets d'une alimentation équilibrée
            </p>
            <button className="bg-white text-blue-600 font-bold px-5 py-2 rounded-full shadow hover:scale-105 transition">
              ▶️ Regarder
            </button>
          </div>
        </section>

        {/* Bon Plans Flash */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            🔥 Bon Plans Flash
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashOffers.map((offer, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900">{offer.title}</p>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Flash</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{offer.desc}</p>
                <button className="w-full bg-gray-900 text-white rounded-lg py-2 font-semibold hover:bg-gray-800 transition">
                  {offer.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Actus commerçants - NOUVELLE SECTION */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📰 Actus commerçants
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Les commerçants que tu suis ont publié récemment 👇
          </p>
          <div className="flex justify-center">
            <ActusPileSwipe />
          </div>
        </section>

        {/* Catégories */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📂 Explorez par catégorie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow text-center hover:shadow-lg transition">
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="text-sm font-medium text-gray-900">{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Communauté */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Rejoignez la communauté ! 🌱</h2>
            <p className="text-lg mb-6">
              Soutenez vos commerçants locaux et gagnez des récompenses exclusives. Chaque achat compte pour votre progression !
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-green-600 font-bold px-6 py-3 rounded-full shadow hover:scale-105 transition">
                Découvrir
              </button>
              <button className="border border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-green-600 transition">
                En savoir plus
              </button>
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-2xl mb-2">🏬</div>
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-600">Commerçants</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Utilisateurs</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-2xl mb-2">🎁</div>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Offres actives</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}