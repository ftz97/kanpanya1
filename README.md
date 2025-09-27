# 🎯 Kanpanya - Plateforme de Récompenses Locales

Plateforme innovante de récompenses et de scratch cards pour les commerces locaux, construite avec Next.js 15, Supabase, et Playwright.

## 🚀 Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

# 🧪 Tests — Kanpanya

Ce projet utilise **Vitest** pour les tests unitaires et **Playwright** pour les tests E2E (end-to-end).

## ✅ Tests unitaires (Vitest)

### Lancer les tests unitaires
```bash
pnpm test

# Lancer avec couverture
pnpm test -- --coverage
```

Les tests unitaires couvrent :
- **Composants UI** (Button, Input, Modal, etc.)
- **Hooks personnalisés**
- **Utilitaires** (utils, emojiRain, confettiEffects)
- **Actions Supabase** (auth, offers)
- **Intégrations** (Mapbox, API, etc.)

Les mocks globaux sont définis dans `src/__tests__/setup.ts`.

## 🌐 Tests end-to-end (Playwright)

```bash
# Lancer tous les tests E2E
pnpm test:e2e

# Lancer les tests en mode debug
pnpm test:e2e:debug

# Ouvrir l'interface interactive (UI Mode)
pnpm test:e2e:ui

# Exécuter sur tous les navigateurs (Desktop + Mobile)
pnpm test:e2e:all

# Voir le dernier rapport HTML
pnpm test:e2e:report
```

## 🖥️ Navigateurs testés (Playwright)

- **Desktop Chrome** (Chromium)
- **Desktop Firefox**
- **Desktop Safari** (WebKit)
- **Mobile Chrome** (Pixel 7)
- **Mobile Safari** (iPhone 14)

Les projets sont configurés dans `playwright.config.ts`.

## 🔍 Rapports et debugging

- Les rapports HTML se trouvent dans `playwright-report/`
- Les traces + vidéos des tests échoués sont dans `test-results/`

Pour rejouer un test échoué avec trace :
```bash
npx playwright show-trace test-results/<fichier-trace>.zip
```

## 🚀 CI/CD (GitHub Actions)

Chaque push sur main ou pull request déclenche automatiquement :
- **Les tests unitaires** (Vitest)
- **Les tests E2E** (Playwright) sur 5 navigateurs en parallèle
- **Upload des rapports + traces** (consultables dans GitHub Actions → Artifacts)

---

## 🛠️ Debug rapide

### Tests unitaires spécifiques
```bash
# Tester un composant précis
pnpm test Button.test.tsx

# Tester un hook précis  
pnpm test useWelcomeMessage.test.ts

# Tests en mode watch (re-lance automatiquement)
pnpm test:watch
```

### Tests E2E spécifiques
```bash
# Tester un fichier spécifique
pnpm test:e2e scratch.spec.ts

# Tester avec un navigateur précis
pnpm test:e2e --project=chromium

# Tester avec des filtres
pnpm test:e2e --grep "scratch card"

# Mode debug interactif
pnpm test:e2e:debug scratch.spec.ts
```

### Debugging avancé
```bash
# Voir les traces d'un test échoué
npx playwright show-trace test-results/trace-*.zip

# Lancer en mode headed (voir le navigateur)
pnpm test:e2e --headed

# Lancer avec des logs détaillés
pnpm test:e2e --reporter=list --verbose
```

### Commandes utiles
```bash
# Vérification rapide avant commit
pnpm ci:check

# Tests de qualité
pnpm test:quality

# Monitoring des tests flaky
pnpm test:monitor:flaky
```

---

## 📚 Technologies

- **Framework** : Next.js 15 avec App Router
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Tests unitaires** : Vitest + Testing Library
- **Tests E2E** : Playwright
- **UI** : Tailwind CSS + Radix UI
- **Maps** : Mapbox GL JS
- **Package Manager** : pnpm

## 🔧 Développement

```bash
# Installation
pnpm install

# Développement
pnpm dev

# Build
pnpm build

# Linting
pnpm lint

# Tests complets
pnpm test && pnpm test:e2e
```
