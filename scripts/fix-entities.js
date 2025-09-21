#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.resolve(__dirname, "../src");

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;
    
    // Pattern pour les chaînes dans les balises JSX : >texte avec apostrophe<
    // Mais on évite les expressions JSX {variable} et les imports
    const jsxStringPattern = />([^<{]*'[^<{]*?)</g;
    content = content.replace(jsxStringPattern, (match, text) => {
      // Vérifier que ce n'est pas dans un commentaire ou une string template
      if (text.includes('//') || text.includes('/*') || text.includes('`')) {
        return match;
      }
      
      const fixed = text.replace(/'/g, "&apos;");
      if (fixed !== text) {
        modified = true;
        return '>' + fixed + '<';
      }
      return match;
    });
    
    // Pattern pour les guillemets dans les balises JSX
    const jsxQuotePattern = />([^<{]*"[^<{]*?)</g;
    content = content.replace(jsxQuotePattern, (match, text) => {
      // Vérifier que ce n'est pas dans un commentaire ou une string template
      if (text.includes('//') || text.includes('/*') || text.includes('`')) {
        return match;
      }
      
      const fixed = text.replace(/"/g, "&quot;");
      if (fixed !== text) {
        modified = true;
        return '>' + fixed + '<';
      }
      return match;
    });
    
    // Pattern pour les attributs JSX : attr="valeur avec apostrophe"
    const jsxAttrPattern = /(\w+)="([^"]*'[^"]*?)"/g;
    content = content.replace(jsxAttrPattern, (match, attr, value) => {
      const fixed = value.replace(/'/g, "&apos;");
      if (fixed !== value) {
        modified = true;
        return `${attr}="${fixed}"`;
      }
      return match;
    });
    
    // Pattern pour les attributs JSX avec guillemets simples : attr='valeur avec "guillemets"'
    const jsxAttrSinglePattern = /(\w+)='([^']*"[^']*?)'/g;
    content = content.replace(jsxAttrSinglePattern, (match, attr, value) => {
      const fixed = value.replace(/"/g, "&quot;");
      if (fixed !== value) {
        modified = true;
        return `${attr}='${fixed}'`;
      }
      return match;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Corrigé : ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

function scanDir(dir) {
  let totalFixed = 0;
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Ignorer node_modules et autres dossiers système
        if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
          totalFixed += scanDir(fullPath);
        }
      } else if (file.endsWith(".tsx")) {
        if (fixFile(fullPath)) {
          totalFixed++;
        }
      }
    }
  } catch (error) {
    console.error(`❌ Erreur lors du scan de ${dir}:`, error.message);
  }
  
  return totalFixed;
}

console.log("🔎 Correction des entités JSX en cours...");
console.log(`📂 Dossier source : ${SRC_DIR}`);

const totalFixed = scanDir(SRC_DIR);

console.log(`🎉 Correction terminée ! ${totalFixed} fichiers corrigés.`);
