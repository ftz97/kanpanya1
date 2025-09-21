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
    let changed = false;

    // Regex qui capture les require()
    const regex = /const\s+(\w+)\s*=\s*require\(["']([^"']+)["']\);?/g;

    const fixed = content.replace(regex, (match, varName, moduleName) => {
      changed = true;
      console.log(`  📝 ${varName} = require("${moduleName}") → import ${varName} from "${moduleName}"`);
      return `import ${varName} from "${moduleName}";`;
    });

    if (changed) {
      fs.writeFileSync(filePath, fixed, "utf8");
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
      } else if (file.endsWith(".test.ts") || file.endsWith(".test.tsx")) {
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

console.log("🔎 Correction des require() dans les tests...");
console.log(`📂 Dossier source : ${SRC_DIR}`);

const totalFixed = scanDir(SRC_DIR);

console.log(`🎉 Correction terminée ! ${totalFixed} fichiers corrigés.`);

