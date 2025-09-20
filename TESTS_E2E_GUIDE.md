# 🧪 Guide des Tests E2E - Kanpanya

## 🎯 Vue d'ensemble

Ce guide explique comment utiliser et maintenir les tests end-to-end (E2E) de l'application Kanpanya. Les tests sont construits avec Playwright et couvrent tous les scénarios utilisateur critiques.

## 🚀 Démarrage rapide

### Installation
```bash
# Installer les dépendances
npm install

# Installer les navigateurs Playwright
npx playwright install
```

### Lancer les tests
```bash
# Vérifier la configuration
npm run test:e2e:check

# Lancer tous les tests
npm run test:e2e:client

# Interface graphique (recommandé pour le développement)
npm run test:e2e:ui
```

## 📋 Scénarios couverts

### 1. Navigation Client
- ✅ Affichage de la navbar "Kanpanya"
- ✅ Navigation vers la section "Offres"
- ✅ Vérification des Promos Flash
- ✅ Gestion des erreurs JavaScript

### 2. ScratchCard
- ✅ Simulation de grattage de ticket
- ✅ Affichage des rewards
- ✅ Message "Pas de ticket pour le moment"
- ✅ Interface de grattage fonctionnelle

### 3. Modal Vidéo
- ✅ Ouverture via "Mutuelle Locale"
- ✅ Lancement de la vidéo
- ✅ Affichage du VideoEndModal
- ✅ Fermeture (bouton + Escape)

### 4. Accessibilité
- ✅ Navigation clavier
- ✅ Rôles ARIA appropriés
- ✅ Aria-labels sur les icônes
- ✅ Focus rings visibles
- ✅ Contrastes de couleurs
- ✅ Tailles tactiles (mobile)

### 5. Performance
- ✅ Chargement < 3 secondes
- ✅ Métriques Lighthouse
- ✅ Images optimisées
- ✅ Gestion mémoire
- ✅ Responsive design

## 🛠️ Structure des fichiers

```
tests/e2e/
├── navigation-client.spec.ts    # Tests de navigation
├── scratchcard.spec.ts          # Tests de grattage
├── video-modal.spec.ts          # Tests de modals
├── integration.spec.ts          # Tests d'intégration
├── accessibility.spec.ts        # Tests d'accessibilité
├── performance.spec.ts          # Tests de performance
├── run-all.spec.ts              # Test complet
├── helpers/
│   └── test-helpers.ts          # Utilitaires
└── README.md                    # Documentation détaillée
```

## 🔧 Configuration

### Fichiers de configuration
- `playwright.e2e.config.ts` - Configuration de développement
- `playwright.ci.config.ts` - Configuration CI/CD
- `playwright.logged.config.ts` - Configuration avec authentification

### Variables d'environnement
```bash
BASE_URL=http://localhost:3000  # URL de base de l'application
NODE_ENV=test                   # Environnement de test
```

## 🐛 Debug et développement

### Mode debug
```bash
# Debug d'un test spécifique
npx playwright test tests/e2e/navigation-client.spec.ts --debug

# Debug avec interface graphique
npm run test:e2e:ui
```

### Ajouter un nouveau test
1. Créer un fichier `.spec.ts` dans `tests/e2e/`
2. Importer les helpers : `import { TestHelpers } from './helpers/test-helpers'`
3. Utiliser la structure standard :
```typescript
test.describe('Mon nouveau test', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorHandling();
  });

  test('mon scénario', async ({ page }) => {
    // Votre test ici
  });
});
```

### Helpers disponibles
- `helpers.setupConsoleErrorHandling()` - Gestion des erreurs
- `helpers.waitForPageLoad()` - Attente du chargement
- `helpers.findElement(selectors)` - Recherche d'éléments
- `helpers.simulateScratching()` - Simulation de grattage
- `helpers.waitForModal()` - Attente de modals
- `helpers.closeModal()` - Fermeture de modals

## 📊 Rapports et résultats

### Rapports HTML
Les rapports sont générés dans `playwright-report/` après chaque exécution.

### Screenshots et vidéos
- Screenshots : capturés en cas d'échec
- Vidéos : enregistrées en cas d'échec
- Traces : disponibles pour le debug

### Métriques de performance
Les tests mesurent :
- Temps de chargement
- Utilisation mémoire
- Temps de réponse des interactions
- Métriques Lighthouse

## 🚀 CI/CD

### GitHub Actions
Le workflow `.github/workflows/e2e-tests.yml` :
- Lance automatiquement les tests sur push/PR
- Installe les dépendances
- Build l'application
- Lance les tests
- Upload les rapports

### Commandes CI
```bash
# Lancer les tests en mode CI
npm run test:e2e:ci

# Avec variables d'environnement
BASE_URL=https://staging.kanpanya.com npm run test:e2e:ci
```

## 🔍 Maintenance

### Mise à jour des tests
1. Identifier les changements dans l'UI
2. Mettre à jour les sélecteurs si nécessaire
3. Tester localement
4. Valider en CI

### Sélecteurs robustes
Privilégier les sélecteurs stables :
- `data-testid` (recommandé)
- `role` et `aria-label`
- Classes CSS stables
- Texte visible (en dernier recours)

### Gestion des erreurs
- Utiliser `helpers.setupConsoleErrorHandling()`
- Vérifier les timeouts
- Gérer les éléments optionnels avec `if (await element.isVisible())`

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [Guide d'accessibilité](https://www.w3.org/WAI/WCAG21/quickref/)
- [Métriques de performance](https://web.dev/performance/)

## 🤝 Contribution

Pour ajouter de nouveaux tests :
1. Créer une branche feature
2. Ajouter les tests
3. Tester localement
4. Créer une PR
5. Valider en CI

---

**Note** : Ce guide est maintenu par l'équipe de développement. Pour toute question, contactez l'équipe ou consultez la documentation Playwright.
