"use client";
import { ActusPileProgress } from "@/components/ActusPileProgress";
import ActusPileSwipe from "@/components/ActusPileSwipe";
import { ActusPileAnimated } from "@/components/ActusPileAnimated";
import StandardPageLayout, { PageTitle } from "@/components/StandardPageLayout";
import { colors } from "@/config/colors";

export default function ActusPileTest() {
  return (
    <StandardPageLayout>
        <PageTitle 
          title="📝 Test Actus Post-it (3 variantes)"
          subtitle="Comparaison des différentes approches d'affichage des actualités commerçants"
        />

      <div className="space-y-16 py-8">
        {/* Variante 1: Compteur de progression */}
        <section className="text-center">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              1. Avec compteur de progression
            </h2>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Indicateurs visuels de progression avec points et compteur numérique
            </p>
          </div>
          <div className="flex justify-center">
            <ActusPileProgress />
          </div>
        </section>

        {/* Variante 2: Navigation tactile */}
        <section className="text-center">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              2. Navigation tactile (swipe haut/bas)
            </h2>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Support des gestes tactiles et navigation au clavier pour une expérience mobile optimisée
            </p>
          </div>
          <div className="flex justify-center">
            <ActusPileSwipe />
          </div>
        </section>

        {/* Variante 3: Animations */}
        <section className="text-center">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              3. Animation Post-it qui tombe
            </h2>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Transitions fluides avec Framer Motion et animations d'entrée/sortie
            </p>
          </div>
          <div className="flex justify-center">
            <ActusPileAnimated />
          </div>
        </section>

        {/* Comparaison des fonctionnalités */}
        <section className="mt-16">
        <h2 className="text-xl font-semibold mb-6 text-center" style={{ color: colors.textPrimary }}>
          📊 Comparaison des fonctionnalités
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Progress */}
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>
              Progress
            </h3>
            <ul className="text-sm space-y-2" style={{ color: colors.textSecondary }}>
              <li>❌ Pas d'effet pile</li>
              <li>✅ Navigation bouton</li>
              <li>✅ Indicateurs progression</li>
              <li>❌ Pas de tactile</li>
              <li>❌ Pas d'animations</li>
            </ul>
          </div>

          {/* Swipe */}
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>
              Swipe
            </h3>
            <ul className="text-sm space-y-2" style={{ color: colors.textSecondary }}>
              <li>❌ Pas d'effet pile</li>
              <li>✅ Navigation tactile</li>
              <li>✅ Indicateurs progression</li>
              <li>✅ Support clavier</li>
              <li>❌ Pas d'animations</li>
            </ul>
          </div>

          {/* Animated */}
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>
              Animated
            </h3>
            <ul className="text-sm space-y-2" style={{ color: colors.textSecondary }}>
              <li>❌ Pas d'effet pile</li>
              <li>✅ Navigation bouton</li>
              <li>✅ Indicateurs progression</li>
              <li>❌ Pas de tactile</li>
              <li>✅ Animations fluides</li>
            </ul>
          </div>
          </div>
        </section>

        {/* Recommandations */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6 text-center" style={{ color: colors.textPrimary }}>
            💡 Recommandations d'usage
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h3 className="font-semibold mb-3 text-lg" style={{ color: colors.primary }}>
                📱 Mobile
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                Pour une expérience mobile optimale, privilégiez la variante <strong>Swipe</strong> :
              </p>
              <ul className="text-sm space-y-2" style={{ color: colors.textSecondary }}>
                <li>• Navigation intuitive par gestes</li>
                <li>• Support clavier pour accessibilité</li>
                <li>• Indicateurs de progression clairs</li>
                <li>• Performance optimisée</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h3 className="font-semibold mb-3 text-lg" style={{ color: colors.primary }}>
                🖥️ Desktop
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                Pour une expérience desktop engageante, privilégiez la variante <strong>Animated</strong> :
              </p>
              <ul className="text-sm space-y-2" style={{ color: colors.textSecondary }}>
                <li>• Animations fluides et attrayantes</li>
                <li>• Navigation par boutons</li>
                <li>• Indicateurs de progression</li>
                <li>• Expérience utilisateur premium</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </StandardPageLayout>
  );
}
