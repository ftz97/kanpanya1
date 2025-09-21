#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour corriger les imports useCallback dans un fichier
function fixUseCallbackImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si le fichier utilise useCallback
    if (!content.includes('useCallback')) {
      return;
    }
    
    // Vérifier si useCallback est déjà importé
    if (content.includes('useCallback')) {
      const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+["']react["']/);
      
      if (importMatch) {
        const imports = importMatch[1];
        if (!imports.includes('useCallback')) {
          // Ajouter useCallback à l'import existant
          const newImports = imports.trim() + ', useCallback';
          content = content.replace(
            /import\s+{([^}]+)}\s+from\s+["']react["']/,
            `import { ${newImports} } from "react"`
          );
          console.log(`Ajouté useCallback à l'import dans ${filePath}`);
        }
      } else {
        // Ajouter un nouvel import React avec useCallback
        const lines = content.split('\n');
        let insertIndex = 0;
        
        // Trouver la première ligne d'import
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import')) {
            insertIndex = i + 1;
            break;
          }
        }
        
        lines.splice(insertIndex, 0, 'import { useCallback } from "react";');
        content = lines.join('\n');
        console.log(`Ajouté nouvel import useCallback dans ${filePath}`);
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
    }
    
  } catch (error) {
    console.error(`Erreur lors du traitement de ${filePath}:`, error.message);
  }
}

// Fonction pour parcourir récursivement les fichiers
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      fixUseCallbackImports(fullPath);
    }
  }
}

// Traiter le dossier src
const srcPath = path.join(__dirname, '..', 'src');
console.log('Correction des imports useCallback dans src/...');
processDirectory(srcPath);
console.log('Terminé !');
