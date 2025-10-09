#!/usr/bin/env node
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");
let hasError = false;

function scanDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDir(filePath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      const content = fs.readFileSync(filePath, "utf8");
      if (content.includes('@/components/ui/Button')) {
        console.error(`❌ Import majuscule trouvé dans: ${filePath}`);
        hasError = true;
      }
    }
  }
}

scanDir(SRC_DIR);

if (hasError) {
  console.error("\n❌ Erreur: Un import '@/components/ui/Button' avec majuscule a été trouvé.");
  console.error("👉 Remplace-le par '@/components/ui/button' (minuscules).");
  process.exit(1);
} else {
  console.log("✅ Aucun import en majuscule trouvé. Tout est bon !");
}







