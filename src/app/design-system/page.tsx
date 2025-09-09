"use client";

export default function DesignSystem() {
  return (
    <div className="min-h-screen" style={{ background: "#F2F2F2" }}>
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#212E40] mb-4">
            🎨 Charte Graphique Kanpanya
          </h1>
          <p className="text-lg text-[#212E40]">
            Visualisation complète de la palette de couleurs et des composants
          </p>
        </div>

        {/* Couleurs Principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#212E40]">Couleurs Principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fond Global */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Fond Global</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: '#F2F2F2' }}>
                  #F2F2F2
                </div>
                <p className="text-sm text-gray-600">Gris très clair</p>
              </div>
            </div>

            {/* Couleur de Carte */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Couleur de Carte</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-gray-800 font-semibold border-2 border-gray-200" style={{ background: '#FFFFFF' }}>
                  #FFFFFF
                </div>
                <p className="text-sm text-gray-600">Blanc</p>
              </div>
            </div>

            {/* Texte Principal */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Texte Principal</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: '#212E40' }}>
                  #212E40
                </div>
                <p className="text-sm text-gray-600">Bleu foncé</p>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Couleur Logo</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: '#17BFA0' }}>
                  #17BFA0
                </div>
                <p className="text-sm text-gray-600">Vert turquoise</p>
              </div>
            </div>
          </div>
        </section>

        {/* Couleurs d'Accent */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#212E40]">Couleurs d'Accent</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primaire */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Primaire (CTA)</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: '#17BFA0' }}>
                  #17BFA0
                </div>
                <p className="text-sm text-gray-600">Vert turquoise</p>
              </div>
            </div>

            {/* Primaire Hover */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Primaire Hover</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: '#14a58d' }}>
                  #14a58d
                </div>
                <p className="text-sm text-gray-600">Vert turquoise foncé</p>
              </div>
            </div>

            {/* Carte */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Carte</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-gray-800 font-semibold border-2 border-gray-200" style={{ background: '#0D8C75' }}>
                  #0D8C75
                </div>
                <p className="text-sm text-gray-600">Vert foncé</p>
              </div>
            </div>

            {/* Teal */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Teal</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: '#0D8C75' }}>
                  #0D8C75
                </div>
                <p className="text-sm text-gray-600">Teal foncé</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#212E40]">Gradients</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gradient Partenaire */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Gradient Partenaire</h3>
              <div className="h-24 rounded-lg flex items-center justify-center text-[#212E40] font-semibold" style={{
                background: "linear-gradient(90deg, #BCE8DF 0%, #C2F9DD 50%, #BCF7D2 100%)"
              }}>
                Partenaire
              </div>
            </div>

            {/* Gradient Flash */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Gradient Flash</h3>
              <div className="h-24 rounded-lg flex items-center justify-center text-white font-semibold" style={{
                background: "linear-gradient(90deg, #F2A0A0 0%, #F2C2C2 50%, #F2D5D5 100%)"
              }}>
                Flash
              </div>
            </div>

            {/* Gradient Communauté */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Gradient Communauté</h3>
              <div className="h-24 rounded-lg flex items-center justify-center text-[#212E40] font-semibold" style={{
                background: "linear-gradient(90deg, #E9FFF6 0%, #F2FDFB 100%)"
              }}>
                Communauté
              </div>
            </div>
          </div>
        </section>

        {/* Composants de Test */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#212E40]">Composants de Test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boutons */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#212E40]">Boutons</h3>
              <div className="space-y-3">
                <button className="w-full px-6 py-3 text-white rounded-xl font-semibold transition" style={{ background: '#17BFA0' }}>
                  Bouton Primaire
                </button>
                <button className="w-full px-6 py-3 text-white rounded-xl font-semibold transition" style={{ background: '#14a58d' }}>
                  Bouton Hover
                </button>
                <button className="w-full px-6 py-3 border text-[#17BFA0] rounded-xl font-semibold hover:bg-[#F9FFFD] transition" style={{ borderColor: '#17BFA0' }}>
                  Bouton Outline
                </button>
              </div>
            </div>

            {/* Cartes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#212E40]">Cartes</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-xl shadow-md">
                  <h4 className="font-semibold text-[#212E40]">Carte Standard</h4>
                  <p className="text-sm text-gray-600">Contenu de la carte</p>
                </div>
                <div className="p-4 rounded-xl shadow-md border-l-4" style={{
                  background: "linear-gradient(to right, #E9FFF6, #F2FDFB)",
                  borderLeftColor: '#17BFA0'
                }}>
                  <h4 className="font-semibold text-[#212E40]">Carte Communauté</h4>
                  <p className="text-sm text-gray-600">Offre spéciale</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typographie */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#212E40]">Typographie</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-[#212E40]">Titre H1 - 4xl</h1>
              <h2 className="text-3xl font-bold text-[#212E40]">Titre H2 - 3xl</h2>
              <h3 className="text-2xl font-semibold text-[#212E40]">Titre H3 - 2xl</h3>
              <h4 className="text-xl font-semibold text-[#212E40]">Titre H4 - xl</h4>
              <p className="text-base text-[#212E40]">Paragraphe normal - base</p>
              <p className="text-sm text-gray-600">Texte petit - sm</p>
            </div>
          </div>
        </section>

        {/* États et Interactions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#212E40]">États et Interactions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Hover</h3>
              <button className="w-full px-4 py-2 text-white rounded-lg transition" style={{ background: '#17BFA0' }}>
                Hover me
              </button>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Focus</h3>
              <button className="w-full px-4 py-2 border-2 text-[#17BFA0] rounded-lg focus:ring-2 focus:outline-none" style={{ borderColor: '#17BFA0' }}>
                Focus me
              </button>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-[#212E40]">Actif</h3>
              <button className="w-full px-4 py-2 text-white rounded-lg active:scale-95 transition" style={{ background: '#14a58d' }}>
                Click me
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-[#212E40]">
            🎨 Design System Kanpanya - Toutes les couleurs et composants
          </p>
        </div>
      </div>
    </div>
  );
}
