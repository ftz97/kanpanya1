"use client";

import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue sur Padavwa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Application en cours de développement
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🚧 Maintenance en cours
            </h2>
            <p className="text-gray-600">
              Nous travaillons actuellement sur l'amélioration de l'application. 
              Merci de votre patience !
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
