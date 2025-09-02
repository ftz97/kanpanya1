# Tests End-to-End (E2E) avec Playwright

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.e2e` à la racine du projet :

```bash
BASE_URL=http://localhost:3000
E2E_TEST_EMAIL=test@example.com
E2E_TEST_PASSWORD=motdepassefort
```

### 2. Installation de Playwright

```bash
npx playwright install
```

## Utilisation

### 1. Démarrer l'application

```bash
npm run dev
```

### 2. Charger les variables E2E

```bash
source .env.e2e
```

### 3. Créer la session (login)

```bash
npx playwright test tests/setup.auth.spec.ts
```

### 4. Lancer la suite de tests

```bash
npx playwright test -c playwright.logged.config.ts
```

## Scripts npm

- `npm run test:e2e` : Lance la suite complète des tests E2E
- `npm run typecheck` : Vérifie les types TypeScript

## Structure des tests

- `tests/setup.auth.spec.ts` : Crée la session authentifiée
- `tests/protected.spec.ts` : Teste l'accès aux pages protégées
- `tests/health.spec.ts` : Teste l'endpoint de santé

## Configuration Playwright

- `playwright.config.ts` : Configuration de base
- `playwright.logged.config.ts` : Configuration avec session authentifiée




