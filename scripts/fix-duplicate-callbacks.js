#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour corriger les doublons dans un fichier
function fixDuplicatesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Pattern pour détecter les doublons de useCallback
    const duplicatePattern = /const (stable\w+) = useCallback\(\(\) => \{\s*\n\s*\w+\(\);\s*\n\}, \[\w+\]\);\s*\n\s*const \1 = useCallback\(\(\) => \{\s*\n\s*\w+\(\);\s*\n\}, \[\w+\]\);/g;
    
    // Remplacer les doublons par une seule occurrence
    const newContent = content.replace(duplicatePattern, (match, varName) => {
      modified = true;
      return `const ${varName} = useCallback(() => {
  ${varName.replace('stable', '').toLowerCase()}();
}, [${varName.replace('stable', '').toLowerCase()}]);`;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour parcourir récursivement les dossiers
function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDirectory(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      callback(filePath);
    }
  }
}

// Fonction principale
function main() {
  const srcDir = path.join(__dirname, '..', 'src');
  let totalFixed = 0;
  
  console.log('🔍 Recherche de doublons de useCallback...\n');
  
  walkDirectory(srcDir, (filePath) => {
    if (fixDuplicatesInFile(filePath)) {
      totalFixed++;
    }
  });
  
  console.log(`\n✨ Correction terminée! ${totalFixed} fichiers corrigés.`);
}

// Exécuter si c'est le script principal
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fixDuplicatesInFile, walkDirectory };
