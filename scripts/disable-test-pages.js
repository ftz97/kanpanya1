#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pages de test problématiques connues
const problematicPages = [
  'test-debug',
  'test-scratch-simple',
  'test-scratch-stable',
  'test-working-map',
  'test-scratch-with-emojis',
  'test-threshold-fix',
  'test-mapbox-fixed',
  'test-final',
  'test-simple',
  'test-basic',
  'test-map',
  'test-mapbox',
  'test-real-map',
  'test-real-mapbox',
  'test-simple-map',
  'test-simple-mapbox',
  'test-ultra-simple',
  'test-basic-map',
  'test-complete-map',
  'test-simulated-map',
  'test-mapbox-fallback',
  'test-mapbox-alternative',
  'test-all-maps',
  'test-simple-working',
  'test-interactive-map',
  'test-carte-quartier',
  'test-neighborhoods',
  'test-geocoder',
  'test-macro',
  'test-search',
  'test-enregistrer',
  'test-clic',
  'test-bouton',
  'test-page',
  'test-confetti',
  'test-emoji',
  'test-emoji-wow',
  'test-popup-variants',
  'test-dashboard',
  'test-quiz',
  'test-scratch-animations',
  'test-scratch-animations-simple',
  'test-scratch-fixed',
  'test-scratch-simple-fixed',
  'admin/mapbox-test',
  'admin/quiz-tester',
  'quiz/result'
];

// Fonction pour désactiver une page
function disablePage(pagePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'src', 'app', pagePath, 'page.tsx');
    
    if (fs.existsSync(fullPath)) {
      const backupPath = fullPath + '.disabled';
      fs.renameSync(fullPath, backupPath);
      console.log(`Page désactivée: ${pagePath}`);
    }
  } catch (error) {
    console.error(`Erreur lors de la désactivation de ${pagePath}:`, error.message);
  }
}

// Désactiver toutes les pages problématiques
console.log('Désactivation des pages de test problématiques...');
problematicPages.forEach(disablePage);
console.log('Terminé !');
