# 🎨 Guide des Couleurs Kanpanya

## Utilisation des Couleurs

### 1. Import des couleurs
```tsx
import { colors } from "@/config/colors";
```

### 2. Utilisation directe
```tsx
// Couleurs principales
style={{ background: colors.background }}  // #F2F2F2
style={{ color: colors.text }}            // #212E40
style={{ background: colors.primary }}    // #17BFA0
```

### 3. Classes Tailwind personnalisées
```tsx
// Utilisez ces classes dans vos composants
className="bg-[#F2F2F2]"     // Fond global
className="text-[#212E40]"   // Texte principal
className="bg-[#17BFA0]"     // Boutons primaires
className="text-[#17BFA0]"   // Texte accent
```

## Composants Standardisés

### 1. Layout de page
```tsx
import StandardPageLayout from "@/components/StandardPageLayout";

export default function MaPage() {
  return (
    <StandardPageLayout>
      <h1>Mon contenu</h1>
    </StandardPageLayout>
  );
}
```

### 2. Titre de page
```tsx
import { PageTitle } from "@/components/StandardPageLayout";

<PageTitle 
  title="Mon titre"
  subtitle="Ma description"
/>
```

### 3. Carte standardisée
```tsx
import { StandardCard } from "@/components/StandardPageLayout";

<StandardCard>
  <h3>Contenu de la carte</h3>
</StandardCard>
```

### 4. Bouton primaire
```tsx
import { PrimaryButton } from "@/components/StandardPageLayout";

<PrimaryButton onClick={() => console.log('Action')}>
  Mon bouton
</PrimaryButton>
```

## Palette de Couleurs

### Couleurs Principales
- **Fond Global** : `#F2F2F2` (Gris très clair)
- **Carte** : `#FFFFFF` (Blanc)
- **Texte Principal** : `#212E40` (Bleu foncé)
- **Logo/CTA** : `#17BFA0` (Vert turquoise)

### Couleurs d'Accent
- **Primaire** : `#17BFA0` (Vert turquoise)
- **Primaire Hover** : `#14a58d` (Vert turquoise foncé)
- **Carte Accent** : `#0D8C75` (Vert foncé)

### Gradients
- **Partenaire** : `linear-gradient(90deg, #BCE8DF 0%, #C2F9DD 50%, #BCF7D2 100%)`
- **Flash** : `linear-gradient(90deg, #F2A0A0 0%, #F2C2C2 50%, #F2D5D5 100%)`
- **Communauté** : `linear-gradient(90deg, #E9FFF6 0%, #F2FDFB 100%)`

## Règles d'Utilisation

### ✅ À FAIRE
- Utilisez `StandardPageLayout` pour toutes les nouvelles pages
- Utilisez les composants standardisés (`PageTitle`, `StandardCard`, `PrimaryButton`)
- Respectez la hiérarchie des couleurs (texte principal, secondaire, accent)
- Utilisez les gradients pour les sections spéciales

### ❌ À ÉVITER
- N'utilisez pas de couleurs qui ne sont pas dans la palette
- N'oubliez pas d'appliquer le fond global `#F2F2F2`
- Ne mélangez pas les styles inline et les classes Tailwind

## Exemple Complet

```tsx
"use client";

import StandardPageLayout, { PageTitle, StandardCard, PrimaryButton } from "@/components/StandardPageLayout";

export default function MaPage() {
  return (
    <StandardPageLayout>
      <PageTitle 
        title="Ma Page"
        subtitle="Description de ma page"
      />
      
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <StandardCard>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#212E40' }}>
            Titre de la carte
          </h3>
          <p className="text-gray-600 mb-4">
            Description
          </p>
          <PrimaryButton onClick={() => console.log('Action')}>
            Action
          </PrimaryButton>
        </StandardCard>
      </div>
    </StandardPageLayout>
  );
}
```

## Pages Mises à Jour

Les pages suivantes ont été mises à jour avec la nouvelle charte graphique :
- ✅ Page d'accueil (`/`)
- ✅ Commerçants (`/commercants`)
- ✅ Offres (`/offres`)
- ✅ Carte (`/carte`)
- ✅ Design System (`/design-system`)

Toutes les futures pages doivent utiliser ces composants et couleurs !
