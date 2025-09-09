"use client";

import StandardPageLayout, { PageTitle, StandardCard, PrimaryButton } from "@/components/StandardPageLayout";

// Template de base pour toutes les nouvelles pages
export default function PageTemplate() {
  return (
    <StandardPageLayout>
      <PageTitle 
        title="Titre de la page"
        subtitle="Description de la page"
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <StandardCard>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#212E40' }}>
            Titre de la carte
          </h3>
          <p className="text-gray-600 mb-4">
            Description de la carte
          </p>
          <PrimaryButton onClick={() => console.log('Action')}>
            Action
          </PrimaryButton>
        </StandardCard>
        
        <StandardCard>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#212E40' }}>
            Autre carte
          </h3>
          <p className="text-gray-600 mb-4">
            Autre description
          </p>
          <PrimaryButton onClick={() => console.log('Autre action')}>
            Autre action
          </PrimaryButton>
        </StandardCard>
      </div>
    </StandardPageLayout>
  );
}

// Exemple d'utilisation pour une nouvelle page
export function ExampleNewPage() {
  return (
    <StandardPageLayout>
      <PageTitle 
        title="Ma nouvelle page"
        subtitle="Cette page utilise automatiquement les couleurs Kanpanya"
      />
      
      <div className="space-y-6 mt-8">
        <StandardCard>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#212E40' }}>
            Section principale
          </h2>
          <p className="text-gray-600 mb-4">
            Le contenu de votre page ici. Toutes les couleurs sont automatiquement appliquées.
          </p>
          <div className="flex gap-3">
            <PrimaryButton onClick={() => console.log('Action principale')}>
              Action principale
            </PrimaryButton>
            <button 
              className="px-4 py-2 border rounded-lg font-semibold transition hover:bg-gray-50"
              style={{ 
                borderColor: '#17BFA0', 
                color: '#17BFA0' 
              }}
            >
              Action secondaire
            </button>
          </div>
        </StandardCard>
      </div>
    </StandardPageLayout>
  );
}
