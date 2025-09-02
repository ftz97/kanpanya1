# Scripts d'automatisation

## generate-e2e-env.js

Ce script génère automatiquement le fichier `.env.e2e` avec les tokens d'authentification Supabase nécessaires pour les tests E2E.

### Utilisation

```bash
# Utilisation basique (utilise les valeurs par défaut)
npm run generate-e2e-env

# Avec des variables d'environnement personnalisées
E2E_BASE_URL=http://localhost:3001 \
E2E_TEST_EMAIL=monemail@example.com \
E2E_TEST_PASSWORD=monmotdepasse \
npm run generate-e2e-env
```

### Variables d'environnement

- **E2E_BASE_URL** : URL de base de l'application (défaut: `http://localhost:3001`)
- **E2E_TEST_EMAIL** : Email de test (défaut: `test@example.com`)
- **E2E_TEST_PASSWORD** : Mot de passe de test (défaut: `motdepassefort`)

### Fichier généré

Le script génère un fichier `.env.e2e` contenant :

```env
E2E_BASE_URL=http://localhost:3001
E2E_SB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIs...
E2E_SB_REFRESH_TOKEN=eyJhbGciOiJIUzI1NiIs...
```

### Prérequis

1. Le serveur de développement doit être en cours d'exécution
2. L'API `/api/test-tokens` doit être accessible
3. Les identifiants de test doivent être valides dans Supabase

### Gestion d'erreurs

Le script gère les erreurs suivantes :
- Échec de la requête HTTP
- Échec de l'authentification
- Erreurs de validation des données
