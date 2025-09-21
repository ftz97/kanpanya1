#!/usr/bin/env node

/**
 * Script de test rapide pour les tests E2E
 * Vérifie que la configuration est correcte et lance un test simple
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Test rapide des tests E2E...\n');

// Vérifier que les fichiers de test existent
const testFiles = [
  'tests/e2e/navigation-client.spec.ts',
  'tests/e2e/scratchcard.spec.ts',
  'tests/e2e/video-modal.spec.ts',
  'tests/e2e/integration.spec.ts',
  'playwright.e2e.config.ts'
];

console.log('📁 Vérification des fichiers de test...');
testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MANQUANT`);
    process.exit(1);
  }
});

// Vérifier la configuration Playwright
console.log('\n🔧 Vérification de la configuration Playwright...');
try {
  // Vérifier que le fichier de config existe et est lisible
  const configContent = fs.readFileSync('playwright.e2e.config.ts', 'utf8');
  if (configContent.includes('defineConfig') && configContent.includes('testDir')) {
    console.log('✅ Configuration Playwright valide');
  } else {
    console.log('❌ Configuration Playwright invalide');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Erreur dans la configuration Playwright:', error.message);
  process.exit(1);
}

// Vérifier que Playwright est installé
console.log('\n📦 Vérification des dépendances...');
try {
  execSync('npx playwright --version', { stdio: 'pipe' });
  console.log('✅ Playwright installé');
} catch (error) {
  console.log('❌ Playwright non installé. Installez avec: npm install @playwright/test');
  process.exit(1);
}

// Lancer un test de configuration
console.log('\n🚀 Test de configuration...');
try {
  execSync('npx playwright test --config=playwright.e2e.config.ts --list', { stdio: 'pipe' });
  console.log('✅ Configuration des tests valide');
} catch (error) {
  console.log('❌ Erreur dans la configuration des tests:', error.message);
  process.exit(1);
}

console.log('\n🎉 Tous les tests E2E sont prêts !');
console.log('\n📋 Commandes disponibles:');
console.log('  npm run test:e2e:client     # Lancer tous les tests');
console.log('  npm run test:e2e:ui         # Interface graphique');
console.log('  npx playwright test tests/e2e/navigation-client.spec.ts --debug  # Debug');
