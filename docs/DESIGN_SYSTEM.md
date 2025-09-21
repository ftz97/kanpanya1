# 🎨 Design System Konpa

Système de design cohérent et réutilisable pour l'application Konpa.

## 🎯 Vue d'ensemble

Le design system Konpa fournit des tokens de design, des classes utilitaires et des composants réutilisables pour maintenir la cohérence visuelle dans toute l'application.

## 🎨 Tokens de design

### Couleurs

```typescript
// lib/kanpa-theme.ts
export const colors = {
  primary: "#17BFA0",        // Vert principal
  primaryDark: "#14a58d",    // Vert foncé
  secondary: "#212E40",      // Bleu foncé
  background: "#F2F2F2",     // Gris clair
  accent: "#FFD166",         // Jaune accent
  danger: "#EF4444",         // Rouge danger
};
```

### Utilisation dans Tailwind

```tsx
// Classes Tailwind automatiques
<div className="bg-primary text-white">Couleur principale</div>
<div className="bg-accent text-secondary">Couleur accent</div>
<div className="border-danger">Bordure danger</div>
```

### Rayons (Border Radius)

```typescript
export const radius = {
  sm: "0.5rem",  // 8px
  md: "1rem",    // 16px
  lg: "1.5rem",  // 24px
  xl: "2rem",    // 32px
};
```

### Ombres (Box Shadow)

```typescript
export const shadows = {
  sm: "0 1px 3px rgba(0,0,0,0.1)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.15)",
  xl: "0 20px 25px rgba(0,0,0,0.2)",
};
```

### Espacement

```typescript
export const spacing = {
  sm: "0.5rem",
  md: "1rem",
  lg: "2rem",
  xl: "3rem",
};
```

### Gradients

```typescript
export const gradients = {
  mint: "bg-gradient-to-r from-[#BCE8DF] via-[#C2F9DD] to-[#BCF7D2]",
  flash: "bg-gradient-to-r from-[#F2A0A0] via-[#F2C2C2] to-[#F2D5D5]",
  community: "bg-gradient-to-r from-[#E9FFF6] to-[#F2FDFB]",
};
```

## 🎨 Classes utilitaires CSS

### Classes de base

```css
/* Container centralisé */
.container-kanpa {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Titres */
.h1-kanpa { /* Taille responsive, gras, couleur secondaire */ }
.h2-kanpa { /* Taille responsive, semi-gras, couleur secondaire */ }
.h3-kanpa { /* Taille responsive, semi-gras, couleur secondaire */ }
```

### Boutons

```css
/* Bouton de base */
.btn-kanpa {
  @apply inline-flex items-center justify-center font-semibold rounded-lg px-4 py-2 transition shadow-sm;
}

/* Variantes */
.btn-primary { /* Fond primary, texte blanc */ }
.btn-outline { /* Bordure primary, texte primary */ }
```

### Cartes

```css
.card-kanpa {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6;
}
```

## 🌙 Mode sombre

Le design system supporte automatiquement le mode sombre via les classes Tailwind `dark:`.

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Contenu adaptatif
</div>
```

## 🚀 Utilisation pratique

### Exemple de composant

```tsx
export function WelcomeCard() {
  return (
    <div className="card-kanpa bg-gradient-mint">
      <h1 className="h1-kanpa mb-4">Bienvenue sur Konpa 🎉</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Ceci utilise les tokens du design system.
      </p>
      <div className="flex gap-4">
        <button className="btn-primary">Commencer</button>
        <button className="btn-outline">En savoir plus</button>
      </div>
    </div>
  );
}
```

### Utilisation des tokens Tailwind

```tsx
// Couleurs
<div className="bg-primary text-white">Primary</div>
<div className="bg-accent text-secondary">Accent</div>

// Rayons
<div className="rounded-sm">Petit rayon</div>
<div className="rounded-lg">Grand rayon</div>

// Ombres
<div className="shadow-sm">Ombre légère</div>
<div className="shadow-lg">Ombre prononcée</div>

// Espacement
<div className="p-sm">Petit padding</div>
<div className="p-lg">Grand padding</div>

// Gradients
<div className="bg-gradient-mint">Gradient mint</div>
<div className="bg-gradient-flash">Gradient flash</div>
```

## 📱 Responsive Design

Le design system inclut des classes responsive par défaut :

```tsx
// Titres responsive
<h1 className="h1-kanpa">Titre qui s'adapte</h1>

// Container responsive
<div className="container-kanpa">Contenu centré</div>

// Cartes responsive
<div className="card-kanpa">Padding adaptatif</div>
```

## 🎯 Bonnes pratiques

### 1. Utilisez les classes utilitaires

```tsx
// ✅ Bon
<div className="card-kanpa">
  <h2 className="h2-kanpa">Titre</h2>
  <button className="btn-primary">Action</button>
</div>

// ❌ Évitez
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-gray-900">Titre</h2>
  <button className="bg-primary text-white px-4 py-2 rounded-lg">Action</button>
</div>
```

### 2. Respectez la hiérarchie des couleurs

```tsx
// ✅ Bon - Utilisez primary pour les actions principales
<button className="btn-primary">Action principale</button>

// ✅ Bon - Utilisez accent pour les éléments secondaires
<div className="bg-accent text-secondary">Élément secondaire</div>
```

### 3. Utilisez les gradients avec parcimonie

```tsx
// ✅ Bon - Pour les sections spéciales
<section className="bg-gradient-community">
  <h2>Section communauté</h2>
</section>

// ❌ Évitez - Trop de gradients
<div className="bg-gradient-mint">
  <div className="bg-gradient-flash">
    <div className="bg-gradient-community">Trop de gradients</div>
  </div>
</div>
```

## 🔧 Personnalisation

### Ajouter de nouvelles couleurs

1. Modifiez `lib/kanpa-theme.ts`
2. Ajoutez la couleur dans le preset Tailwind
3. Redémarrez le serveur de développement

### Ajouter de nouvelles classes utilitaires

1. Modifiez `styles/globals.css`
2. Ajoutez votre classe avec `@apply`
3. Utilisez-la dans vos composants

## 📖 Démonstration

Visitez `/design-system` pour voir une démonstration complète du design system en action.

## 🎨 Palette de couleurs complète

| Couleur | Hex | Usage |
|---------|-----|-------|
| Primary | #17BFA0 | Actions principales, liens |
| Primary Dark | #14a58d | Hover states |
| Secondary | #212E40 | Texte principal |
| Background | #F2F2F2 | Arrière-plan |
| Accent | #FFD166 | Éléments d'accent |
| Danger | #EF4444 | Erreurs, suppressions |
