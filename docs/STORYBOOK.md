# 📚 Storybook - Design System Konpa

Documentation des stories Storybook pour le design system Konpa.

## 🎯 Vue d'ensemble

Storybook a été configuré pour documenter et tester tous les composants du design system Konpa. Chaque story permet de visualiser les composants dans différents états et contextes.

## 📁 Stories créées

### UI Components

#### 1. Button (`src/components/ui/Button.stories.tsx`)
- **Primary** - Bouton principal avec style par défaut
- **Outline** - Bouton avec bordure et fond transparent
- **Accent** - Bouton avec couleur accent
- **Danger** - Bouton avec couleur danger
- **Sizes** - Différentes tailles de boutons
- **States** - États (normal, désactivé, chargement)

#### 2. Card (`src/components/ui/Card.stories.tsx`)
- **Default** - Carte standard
- **WithGradient** - Carte avec gradient mint
- **WithBorder** - Carte avec bordure colorée
- **Compact** - Version compacte
- **WithImage** - Carte avec zone d'image
- **Grid** - Grille de cartes

#### 3. Typography (`src/components/ui/Typography.stories.tsx`)
- **Headings** - Titres H1, H2, H3
- **TextVariants** - Différentes variantes de texte
- **Colors** - Couleurs de texte
- **Responsive** - Typographie responsive

#### 4. Gradients (`src/components/ui/Gradients.stories.tsx`)
- **AllGradients** - Tous les gradients disponibles
- **MintVariations** - Variations du gradient mint
- **FlashVariations** - Variations du gradient flash
- **CommunityVariations** - Variations du gradient community
- **InCards** - Gradients utilisés dans des cartes

### Design System Overview

#### 5. DesignSystem (`src/components/DesignSystem.stories.tsx`)
- **Overview** - Vue d'ensemble complète du design system

## 🚀 Lancement de Storybook

```bash
# Lancer Storybook
pnpm run storybook

# Ou avec npx
npx storybook dev -p 6006
```

## 🎨 Configuration

### Fichier de configuration (`.storybook/preview.ts`)

```typescript
import type { Preview } from '@storybook/nextjs'
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F2F2F2" },
        { name: "dark", value: "#111827" },
      ],
    },
  },
};
```

### Fonctionnalités configurées

- ✅ **Import CSS global** - Styles du design system chargés
- ✅ **Mode sombre** - Basculement entre light/dark
- ✅ **Contrôles** - Interface pour tester les props
- ✅ **Actions** - Logs des interactions
- ✅ **Accessibilité** - Addon a11y installé
- ✅ **Tests** - Addon vitest installé

## 📖 Utilisation des stories

### Navigation
1. Ouvrir Storybook sur `http://localhost:6006`
2. Naviguer dans la sidebar par catégorie
3. Sélectionner une story pour la visualiser

### Tests interactifs
- Utiliser les contrôles pour modifier les props
- Tester les interactions (clics, hover)
- Vérifier l'accessibilité avec l'addon a11y

### Mode sombre
- Utiliser le sélecteur de background
- Tester les composants en mode sombre
- Vérifier la cohérence des couleurs

## 🎯 Bonnes pratiques

### Créer une nouvelle story

```typescript
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Category/ComponentName",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => <YourComponent />,
};

export const WithProps: StoryObj = {
  render: () => <YourComponent prop="value" />,
};
```

### Stories avec contrôles

```typescript
export const Interactive: StoryObj = {
  args: {
    title: "Titre par défaut",
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent"],
    },
  },
};
```

### Stories avec états multiples

```typescript
export const AllStates: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <YourComponent state="normal" />
      <YourComponent state="loading" />
      <YourComponent state="disabled" />
    </div>
  ),
};
```

## 🔧 Dépannage

### Storybook ne se lance pas
```bash
# Vérifier les dépendances
pnpm install

# Nettoyer le cache
rm -rf node_modules/.cache
pnpm install

# Lancer en mode debug
DEBUG=* pnpm run storybook
```

### Styles non chargés
- Vérifier l'import dans `.storybook/preview.ts`
- S'assurer que le chemin vers `globals.css` est correct
- Redémarrer Storybook après modification

### Composants non trouvés
- Vérifier les imports dans les stories
- S'assurer que les composants existent
- Vérifier la configuration dans `.storybook/main.ts`

## 📚 Ressources

- [Documentation Storybook](https://storybook.js.org/docs)
- [Addons disponibles](https://storybook.js.org/addons)
- [Best practices](https://storybook.js.org/docs/writing-stories/introduction)
