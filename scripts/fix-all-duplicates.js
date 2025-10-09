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
    
    // Diviser le contenu en lignes
    const lines = content.split('\n');
    const newLines = [];
    const seenCallbacks = new Set();
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Détecter les déclarations de useCallback
      const callbackMatch = line.match(/const\s+(stable\w+)\s*=\s*useCallback/);
      
      if (callbackMatch) {
        const varName = callbackMatch[1];
        
        if (seenCallbacks.has(varName)) {
          // C'est un doublon, on le saute
          console.log(`  ⚠️  Doublon détecté: ${varName} dans ${path.basename(filePath)}`);
          
          // Sauter jusqu'à la fin du useCallback (chercher la ligne avec });)
          let j = i;
          while (j < lines.length && !lines[j].includes('});')) {
            j++;
          }
          i = j; // Continuer après le useCallback
          modified = true;
        } else {
          // Première occurrence, on la garde
          seenCallbacks.add(varName);
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    }
    
    if (modified) {
      const newContent = newLines.join('\n');
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
  
  console.log('🔍 Recherche et correction de tous les doublons de useCallback...\n');
  
  walkDirectory(srcDir, (filePath) => {
    if (fixDuplicatesInFile(filePath)) {
      totalFixed++;
    }
  });
  
  console.log(`\n✨ Correction terminée! ${totalFixed} fichiers corrigés.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fixDuplicatesInFile, walkDirectory };
