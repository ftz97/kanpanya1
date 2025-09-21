#!/usr/bin/env node

/**
 * Script de test pour le Quality Gate Kanpanya
 * Vérifie que ESLint et Playwright fonctionnent correctement
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Test du Quality Gate Kanpanya\n');

// Couleurs pour la sortie
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n📋 ${description}...`, 'blue');
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    log(`✅ ${description} - SUCCÈS`, 'green');
    return { success: true, output: result };
  } catch (error) {
    log(`❌ ${description} - ÉCHEC`, 'red');
    log(`Erreur: ${error.message}`, 'red');
    return { success: false, error: error.message, output: error.stdout || error.stderr };
  }
}

// Tests du Quality Gate
async function testQualityGate() {
  let allTestsPassed = true;

  // 1. Vérifier que les fichiers de configuration existent
  log('\n🔍 Vérification des fichiers de configuration...', 'bold');
  
  const configFiles = [
    '.eslintrc.js',
    'playwright.e2e.config.ts',
    'playwright.ci.config.ts',
    '.github/workflows/quality.yml',
    '.husky/pre-commit'
  ];

  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log(`✅ ${file} existe`, 'green');
    } else {
      log(`❌ ${file} manquant`, 'red');
      allTestsPassed = false;
    }
  });

  // 2. Test ESLint
  const eslintResult = runCommand('pnpm run lint', 'ESLint - Analyse du code');
  if (!eslintResult.success) {
    allTestsPassed = false;
  }

  // 3. Test TypeScript
  const tsResult = runCommand('pnpm run typecheck', 'TypeScript - Vérification des types');
  if (!tsResult.success) {
    allTestsPassed = false;
  }

  // 4. Test de build
  const buildResult = runCommand('pnpm run build', 'Build - Compilation de l\'application');
  if (!buildResult.success) {
    allTestsPassed = false;
  }

  // 5. Test Playwright (vérification rapide)
  const playwrightCheckResult = runCommand('pnpm run test:e2e:check', 'Playwright - Vérification de la configuration');
  if (!playwrightCheckResult.success) {
    allTestsPassed = false;
  }

  // 6. Test Husky
  if (fs.existsSync('.husky/pre-commit')) {
    const huskyContent = fs.readFileSync('.husky/pre-commit', 'utf8');
    if (huskyContent.includes('pnpm run lint')) {
      log('✅ Husky pre-commit hook configuré', 'green');
    } else {
      log('❌ Husky pre-commit hook mal configuré', 'red');
      allTestsPassed = false;
    }
  }

  // Résumé final
  log('\n' + '='.repeat(50), 'bold');
  if (allTestsPassed) {
    log('🎉 QUALITY GATE - TOUS LES TESTS PASSENT !', 'green');
    log('\n✅ Votre Quality Gate est opérationnel :', 'green');
    log('   • ESLint configuré et fonctionnel', 'green');
    log('   • Playwright configuré et fonctionnel', 'green');
    log('   • GitHub Actions prêt pour CI/CD', 'green');
    log('   • Husky configuré pour les pre-commit hooks', 'green');
    log('\n🚀 Vous pouvez maintenant :', 'blue');
    log('   • Utiliser "pnpm run lint" pour vérifier le code', 'blue');
    log('   • Utiliser "pnpm run test:e2e" pour les tests E2E', 'blue');
    log('   • Utiliser "pnpm run ci:check" pour tout vérifier', 'blue');
    log('   • Les commits seront automatiquement vérifiés', 'blue');
  } else {
    log('❌ QUALITY GATE - CERTAINS TESTS ONT ÉCHOUÉ', 'red');
    log('\n🔧 Actions recommandées :', 'yellow');
    log('   • Corriger les erreurs ESLint', 'yellow');
    log('   • Résoudre les problèmes TypeScript', 'yellow');
    log('   • Vérifier la configuration Playwright', 'yellow');
    log('   • Relancer ce script après corrections', 'yellow');
  }
  log('='.repeat(50), 'bold');

  return allTestsPassed;
}

// Exécution du test
testQualityGate().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  log(`\n💥 Erreur inattendue: ${error.message}`, 'red');
  process.exit(1);
});
