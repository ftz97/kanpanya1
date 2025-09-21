# Tests E2E avec Playwright

Ce dossier contient les tests end-to-end (E2E) pour l'application Kanpanya.

## 🚀 Commandes disponibles

```bash
# Lancer tous les tests E2E
npm run test:e2e:client

# Lancer les tests avec l'interface UI
npm run test:e2e:ui

# Vérifier la configuration des tests
npm run test:e2e:check

# Lancer un test spécifique
npx playwright test tests/e2e/navigation-client.spec.ts

# Lancer le test complet bout en bout
npx playwright test tests/e2e/run-all.spec.ts

# Lancer les tests d'accessibilité
npx playwright test tests/e2e/accessibility.spec.ts

# Lancer les tests de performance
npx playwright test tests/e2e/performance.spec.ts

# Lancer les tests en mode debug
npx playwright test tests/e2e/navigation-client.spec.ts --debug

# Lancer tous les tests avec rapport détaillé
npx playwright test tests/e2e/ --reporter=html
```

## 📁 Structure des tests

```
tests/e2e/
├── navigation-client.spec.ts    # Tests de navigation et navbar
├── scratchcard.spec.ts          # Tests de grattage de cartes
├── video-modal.spec.ts          # Tests des modals vidéo
├── integration.spec.ts          # Tests d'intégration
├── accessibility.spec.ts        # Tests d'accessibilité
├── performance.spec.ts          # Tests de performance
├── run-all.spec.ts              # Test complet bout en bout
├── helpers/
│   └── test-helpers.ts          # Helpers et utilitaires
└── README.md                    # Ce fichier
```

## 🧪 Scénarios testés

### 1. Navigation Client (`navigation-client.spec.ts`)
- ✅ Affichage de la navbar avec "Kanpanya"
- ✅ Navigation vers la section "Offres"
- ✅ Vérification de la présence des Promos Flash
- ✅ Gestion des erreurs JavaScript

### 2. ScratchCard (`scratchcard.spec.ts`)
- ✅ Simulation de grattage de ticket
- ✅ Vérification de l'affichage des rewards
- ✅ Gestion du message "Pas de ticket pour le moment"
- ✅ Interface de grattage fonctionnelle

### 3. Modal Vidéo (`video-modal.spec.ts`)
- ✅ Ouverture du modal vidéo via "Mutuelle Locale"
- ✅ Lancement de la vidéo (bouton play)
- ✅ Affichage du VideoEndModal après la vidéo
- ✅ Fermeture du modal (bouton + Escape)
- ✅ Gestion des interactions clavier

### 4. Intégration (`integration.spec.ts`)
- ✅ Scénario complet : navigation → scratch → vidéo
- ✅ Vérification de l'accessibilité clavier
- ✅ Tests de performance et chargement

### 5. Accessibilité (`accessibility.spec.ts`)
- ✅ Navigation clavier fonctionnelle
- ✅ Boutons avec rôles appropriés
- ✅ Aria-labels sur les boutons icônes
- ✅ Focus rings visibles
- ✅ Gestion des modals avec Escape
- ✅ Contrastes de couleurs appropriés
- ✅ Tailles de police lisibles
- ✅ Interactions tactiles sur mobile

### 6. Performance (`performance.spec.ts`)
- ✅ Chargement en moins de 3 secondes
- ✅ Score Lighthouse optimisé
- ✅ Images optimisées avec alt
- ✅ Ressources sans erreurs 404/500
- ✅ Gestion mémoire correcte
- ✅ Responsive sur différentes tailles
- ✅ Interactions sans lag

### 7. Test Complet (`run-all.spec.ts`)
- ✅ Scénario bout en bout complet
- ✅ Test de stress avec interactions multiples
- ✅ Vérification de toutes les fonctionnalités

## 🔧 Configuration

Les tests utilisent la configuration `playwright.e2e.config.ts` qui :
- Lance automatiquement le serveur de développement
- Teste sur Chrome, Firefox, Safari et mobile
- Capture des screenshots et vidéos en cas d'échec
- Gère les erreurs console automatiquement

## 🛠️ Helpers disponibles

La classe `TestHelpers` fournit des méthodes utiles :
- `setupConsoleErrorHandling()` - Gestion des erreurs console
- `waitForPageLoad()` - Attente du chargement complet
- `findElement(selectors)` - Recherche d'éléments par plusieurs sélecteurs
- `simulateScratching()` - Simulation de grattage
- `waitForModal()` - Attente d'apparition de modals
- `closeModal()` - Fermeture de modals

## 🐛 Debug

Pour déboguer un test :
```bash
npx playwright test tests/e2e/navigation-client.spec.ts --debug
```

Cela ouvre le mode debug avec :
- Interface graphique
- Contrôle pas-à-pas
- Inspection des éléments
- Console interactive

## 📊 Rapports

Les rapports sont générés dans `playwright-report/` après chaque exécution.
