#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour supprimer les déclarations dupliquées dans un fichier
function fixDuplicatesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const seenDeclarations = new Set();
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Détecter les déclarations stable*
      const match = line.match(/const\s+(stable\w+)\s*=/);
      if (match) {
        const declarationName = match[1];
        
        if (seenDeclarations.has(declarationName)) {
          // C'est un doublon, on le supprime avec son bloc useCallback
          console.log(`Suppression du doublon: ${declarationName} dans ${filePath}`);
          
          // Supprimer le bloc useCallback complet
          let j = i;
          let braceCount = 0;
          let inCallback = false;
          
          while (j < lines.length) {
            const currentLine = lines[j];
            
            if (currentLine.includes('useCallback')) {
              inCallback = true;
            }
            
            if (inCallback) {
              braceCount += (currentLine.match(/\{/g) || []).length;
              braceCount -= (currentLine.match(/\}/g) || []).length;
              
              if (braceCount === 0 && currentLine.includes('}')) {
                // Fin du bloc useCallback
                j++;
                break;
              }
            }
            
            j++;
          }
          
          // Passer au prochain bloc
          i = j - 1;
          continue;
        } else {
          seenDeclarations.add(declarationName);
        }
      }
      
      newLines.push(line);
    }
    
    const newContent = newLines.join('\n');
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fichier corrigé: ${filePath}`);
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
      fixDuplicatesInFile(fullPath);
    }
  }
}

// Traiter le dossier src
const srcPath = path.join(__dirname, '..', 'src');
console.log('Suppression des déclarations dupliquées dans src/...');
processDirectory(srcPath);
console.log('Terminé !');
