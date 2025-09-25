"use client";

import { useState } from "react";

export default function DesignSystemDemo() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark' : ''}`}>
      <div className="container-kanpa py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="h1-kanpa mb-4">🎨 Design System Konpa</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Démonstration des tokens et classes utilitaires
          </p>
          <button
            onClick={() => setIsDark(!isDark)}
            className="btn-primary"
          >
            {isDark ? '☀️ Mode clair' : '🌙 Mode sombre'}
          </button>
        </div>

        {/* Couleurs */}
        <section className="mb-8">
          <h2 className="h2-kanpa mb-4">🎨 Couleurs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="card-kanpa text-center">
              <div className="w-full h-16 bg-primary rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-gray-500">#17BFA0</p>
            </div>
            <div className="card-kanpa text-center">
              <div className="w-full h-16 bg-primaryDark rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary Dark</p>
              <p className="text-xs text-gray-500">#14a58d</p>
            </div>
            <div className="card-kanpa text-center">
              <div className="w-full h-16 bg-secondary rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs text-gray-500">#1E3A8A</p>
            </div>
            <div className="card-kanpa text-center">
              <div className="w-full h-16 bg-accent rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs text-gray-500">#FFD166</p>
            </div>
            <div className="card-kanpa text-center">
              <div className="w-full h-16 bg-danger rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Danger</p>
              <p className="text-xs text-gray-500">#EF4444</p>
            </div>
            <div className="card-kanpa text-center">
              <div className="w-full h-16 bg-background border-2 border-gray-300 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs text-gray-500">#F2F2F2</p>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="mb-8">
          <h2 className="h2-kanpa mb-4">🌈 Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-kanpa">
              <div className="w-full h-20 bg-gradient-mint rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Mint</p>
              <p className="text-xs text-gray-500">Dégradé menthe</p>
            </div>
            <div className="card-kanpa">
              <div className="w-full h-20 bg-gradient-flash rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Flash</p>
              <p className="text-xs text-gray-500">Dégradé flash</p>
            </div>
            <div className="card-kanpa">
              <div className="w-full h-20 bg-gradient-community rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Community</p>
              <p className="text-xs text-gray-500">Dégradé communauté</p>
            </div>
          </div>
        </section>

        {/* Boutons */}
        <section className="mb-8">
          <h2 className="h2-kanpa mb-4">🔘 Boutons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Bouton Principal</button>
            <button className="btn-outline">Bouton Outline</button>
            <button className="btn-kanpa bg-accent text-secondary hover:bg-yellow-400">
              Bouton Accent
            </button>
            <button className="btn-kanpa bg-danger text-white hover:bg-red-600">
              Bouton Danger
            </button>
          </div>
        </section>

        {/* Cartes */}
        <section className="mb-8">
          <h2 className="h2-kanpa mb-4">📦 Cartes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card-kanpa">
              <h3 className="h3-kanpa mb-2">Carte Standard</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Utilise la classe <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">card-kanpa</code>
              </p>
            </div>
            <div className="card-kanpa bg-gradient-mint">
              <h3 className="h3-kanpa mb-2">Carte avec Gradient</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fond avec dégradé mint
              </p>
            </div>
            <div className="card-kanpa border-2 border-primary">
              <h3 className="h3-kanpa mb-2">Carte Highlighted</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bordure colorée
              </p>
            </div>
          </div>
        </section>

        {/* Spacing & Radius */}
        <section className="mb-8">
          <h2 className="h2-kanpa mb-4">📏 Espacement & Rayons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-kanpa">
              <h3 className="h3-kanpa mb-4">Espacement</h3>
              <div className="space-y-2">
                <div className="bg-primary/10 p-sm rounded text-sm">p-sm (0.5rem)</div>
                <div className="bg-primary/10 p-md rounded text-sm">p-md (1rem)</div>
                <div className="bg-primary/10 p-lg rounded text-sm">p-lg (2rem)</div>
                <div className="bg-primary/10 p-xl rounded text-sm">p-xl (3rem)</div>
              </div>
            </div>
            <div className="card-kanpa">
              <h3 className="h3-kanpa mb-4">Rayons</h3>
              <div className="space-y-2">
                <div className="bg-accent/20 p-4 rounded-sm text-sm">rounded-sm (0.5rem)</div>
                <div className="bg-accent/20 p-4 rounded-md text-sm">rounded-md (1rem)</div>
                <div className="bg-accent/20 p-4 rounded-lg text-sm">rounded-lg (1.5rem)</div>
                <div className="bg-accent/20 p-4 rounded-xl text-sm">rounded-xl (2rem)</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
