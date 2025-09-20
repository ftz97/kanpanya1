# 🧪 Scripts de génération de tests E2E

Système complet pour générer automatiquement des tests Playwright.

## 🚀 Scripts disponibles

### 1. Version simple (recommandée)
```bash
pnpm run generate-test:simple /client/rewards
```

**Génère :**
- Test de chargement basique
- Conversion automatique camelCase → PascalCase
- Structure claire et simple

### 2. Version avec i18n
```bash
pnpm run generate-test /client/rewards
```

**Génère :**
- Test de chargement basique
- Tests de traduction FR/EN intégrés
- Conversion automatique camelCase → PascalCase

### 3. Version avancée (avec options)
```bash
pnpm run generate-test:advanced /client/profile --with-i18n --with-auth
```

**Génère :**
- Test de chargement basique
- Tests de traduction (--with-i18n)
- Tests d'authentification (--with-auth)
- Tests responsive
- Tests de navigation

## 📁 Structure générée

```
tests/e2e/
├── client/
│   ├── index.spec.ts          # /client
│   ├── rewards.spec.ts        # /client/rewards
│   └── user-profile.spec.ts   # /client/user-profile
└── admin/
    └── dashboard.spec.ts      # /admin/dashboard
```

## 🎯 Exemples d'utilisation

```bash
# Test simple
pnpm run generate-test:simple /client/rewards

# Test avec i18n
pnpm run generate-test /client/rewards

# Test complet avec options
pnpm run generate-test:advanced /admin/dashboard --with-i18n --with-auth
```

## 🧪 Format des tests générés

### Version simple
```typescript
import { test, expect } from "@playwright/test";

test.describe("Page client - Rewards", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", msg => {
      if (msg.type() === "error") {
        throw new Error(`Erreur console: ${msg.text()}`);
      }
    });
  });

  test("la page se charge correctement", async ({ page }) => {
    await page.goto("/client/rewards");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
```

### Version avec i18n
```typescript
// ... même structure que la version simple +
test("i18n: le titre est traduit", async ({ page }) => {
  // Version FR
  await page.goto("/fr/client/rewards");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/.+/);

  // Version EN
  await page.goto("/en/client/rewards");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/.+/);
});
```

## 🚀 Lancer les tests

```bash
# Test spécifique
pnpm run test:e2e:dot -- tests/e2e/client/rewards.spec.ts

# Tous les tests d'un rôle
pnpm run test:e2e:dot -- tests/e2e/client/

# Tous les tests E2E
pnpm run test:e2e:dot
```

## ✨ Fonctionnalités

- **Conversion automatique** : `user-profile` → `UserProfile`
- **Structure organisée** : Par rôle (client, admin, etc.)
- **Gestion d'erreurs** : Capture des erreurs console
- **Tests modulaires** : Choisissez le niveau de test souhaité
- **Documentation claire** : README complet avec exemples