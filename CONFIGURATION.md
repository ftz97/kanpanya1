# Configuration Complète - Padavwa

## Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```bash
# Configuration Supabase
NEXT_PUBLIC_SUPABASE_URL=https://yichatlcuqmquazlmxrv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Configuration du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Identifiants de test E2E
E2E_TEST_EMAIL=test@example.com
E2E_TEST_PASSWORD=motdepassefort
```

## Configuration Supabase

### 1. Auth > URL de site
- **Site URL** : `http://localhost:3000`
- **Redirect URLs** : 
  - `http://localhost:3000/dashboard`
  - `http://localhost:3000/auth/callback`

### 2. RLS (Row Level Security)
- Activez RLS sur vos tables
- Configurez les politiques appropriées

## Tests E2E

### 1. Installation
```bash
npx playwright install
```

### 2. Configuration des variables
```bash
# Créez .env.e2e
BASE_URL=http://localhost:3000
E2E_TEST_EMAIL=test@example.com
E2E_TEST_PASSWORD=motdepassefort
```

### 3. Exécution
```bash
# Démarrer l'app
npm run dev

# Charger les variables
source .env.e2e

# Créer la session
npx playwright test tests/setup.auth.spec.ts

# Lancer les tests
npx playwright test -c playwright.logged.config.ts
```

## Scripts npm

- `npm run dev` : Démarre l'application
- `npm run test:e2e` : Lance la suite E2E
- `npm run typecheck` : Vérifie les types TypeScript
- `npm run create-test-user` : Crée l'utilisateur de test

## Structure des fichiers

- `src/i18n/` : Internationalisation (fr, en, gcf, es)
- `src/components/` : Composants réutilisables
- `src/lib/` : Utilitaires et configuration
- `tests/e2e/` : Tests end-to-end
- `playwright.config.ts` : Configuration Playwright de base
- `playwright.logged.config.ts` : Configuration avec session




