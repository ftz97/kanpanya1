# 🚀 Workflow Husky + Tests E2E Automatiques

Système complet pour générer des tests et les exécuter automatiquement.

## 🔄 Workflow complet

### 1. Génération d'un test
```bash
pnpm run generate-test:simple /client/rewards
```

**Ce qui se passe :**
- ✅ Crée `tests/e2e/client/rewards.spec.ts`
- ✅ Sauvegarde le chemin dans `.last-test`
- ✅ Affiche le chemin sauvegardé

### 2. Exécution automatique
```bash
pnpm run test:last
```

**Ce qui se passe :**
- ✅ Lit le chemin depuis `.last-test`
- ✅ Lance Playwright sur ce test spécifique
- ✅ Affiche le résultat (✅ succès ou ❌ échec)

### 3. Hook Husky (optionnel)
```bash
.husky/post-generate
```

**Ce qui se passe :**
- ✅ Exécute automatiquement `pnpm run test:last`
- ✅ Bloque si le test échoue
- ✅ Continue si le test passe

## 🧪 Exemples d'utilisation

### Génération + Test immédiat
```bash
# Générer un test
pnpm run generate-test:simple /client/rewards

# Tester immédiatement
pnpm run test:last
```

### Workflow complet avec hook
```bash
# Générer un test (déclenche automatiquement le test)
pnpm run generate-test:simple /client/rewards
.husky/post-generate
```

## 📁 Fichiers créés/modifiés

### Scripts de génération
- `scripts/generate-test.js` - Version avec i18n
- `scripts/generate-test-simple.js` - Version simple
- `scripts/generate-test-advanced.js` - Version avec options

### Configuration Husky
- `.husky/post-generate` - Hook d'exécution automatique
- `.last-test` - Fichier temporaire avec le chemin du dernier test

### Scripts package.json
```json
{
  "generate-test": "node scripts/generate-test.js",
  "generate-test:simple": "node scripts/generate-test-simple.js",
  "generate-test:advanced": "node scripts/generate-test-advanced.js",
  "test:last": "npx playwright test $(cat .last-test)"
}
```

## 🎯 Avantages du workflow

### ✅ Qualité garantie
- Chaque test généré est immédiatement testé
- Détection rapide des problèmes
- Pas de tests cassés dans le repo

### ✅ Productivité
- Génération automatique de tests
- Exécution immédiate
- Feedback instantané

### ✅ Intégration Git
- Hook Husky pour validation
- Blocage des commits si tests échouent
- Workflow cohérent en équipe

## 🚨 Gestion des erreurs

### Test échoue ❌
```bash
Error: Erreur console: Failed to load resource: the server responded with a status of 500
```
**Solution :** Vérifier que la page existe et que le serveur fonctionne

### Page inexistante
```bash
Error: page.goto: Test ended.
```
**Solution :** Créer la page ou utiliser une page existante

### Hook ne fonctionne pas
```bash
husky - DEPRECATED
```
**Solution :** Mettre à jour la syntaxe Husky (déjà fait)

## 🔧 Personnalisation

### Modifier le hook Husky
```bash
# Éditer .husky/post-generate
echo "pnpm run test:last" > .husky/post-generate
chmod +x .husky/post-generate
```

### Ajouter des tests supplémentaires
```bash
# Modifier les scripts de génération
# Ajouter des tests dans le template
```

### Changer le comportement d'erreur
```bash
# Modifier le script test:last
# Ajouter des options Playwright
```
