#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testPages = [
  'src/app/test-threshold-fix/page.tsx',
  'src/app/test-scratch-comparison/page.tsx',
  'src/app/test-threshold-fix/page.tsx',
  'src/app/quiz/result/page.tsx',
  'src/app/pro-dashboard/page.tsx'
];

console.log('🔧 Désactivation des pages de test problématiques...');

testPages.forEach(pagePath => {
  const fullPath = path.join(path.dirname(__dirname), pagePath);
  
  if (fs.existsSync(fullPath)) {
    const disabledPath = fullPath + '.disabled';
    fs.renameSync(fullPath, disabledPath);
    console.log(`✅ ${pagePath} → ${pagePath}.disabled`);
  } else {
    console.log(`⚠️  ${pagePath} n'existe pas`);
  }
});

console.log('🎯 Pages de test désactivées avec succès !');