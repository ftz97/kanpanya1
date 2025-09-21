#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const REPORT_DIR = path.resolve("reports");
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");
const SUMMARY_FILE = path.join(REPORT_DIR, "lint-summary.json");

if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR);
}

try {
  console.log("🔎 Analyse du projet avec ESLint...\n");

  // Exécuter ESLint en format standard
  let result;
  try {
    result = execSync(
      "pnpm exec eslint 'src/**/*.{ts,tsx}' --ext .ts,.tsx --max-warnings=100",
      { encoding: "utf8" }
    );
  } catch (err) {
    // Capturer la sortie même en cas d'erreur
    result = err.stdout || "";
    console.log("⚠️ ESLint a trouvé des erreurs, mais on continue...\n");
  }

  // Compter les erreurs et warnings
  const lines = result.split('\n');
  let errors = 0;
  let warnings = 0;
  
  for (const line of lines) {
    if (line.includes(' error ')) errors++;
    if (line.includes(' warning ')) warnings++;
  }

  const summary = {
    timestamp: TIMESTAMP,
    errors,
    warnings,
    total: errors + warnings,
  };

  // Sauvegarde du résumé
  fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summary, null, 2));
  console.log(`📁 Résumé sauvegardé : ${SUMMARY_FILE}`);

  // Copier dans public pour l'accessibilité web
  const summaryDest = path.resolve("public/lint-summary.json");
  fs.copyFileSync(SUMMARY_FILE, summaryDest);
  console.log("✅ Résumé ESLint copié dans /public");

  // Résumé console
  console.log("\n📊 Résultat ESLint :");
  console.log(`   ❌ Erreurs : ${summary.errors}`);
  console.log(`   ⚠️  Warnings : ${summary.warnings}`);
  console.log(`   ✅ Total : ${summary.total} problèmes`);

  if (summary.errors === 0) {
    console.log("\n🎉 Plus aucune erreur bloquante !");
  } else {
    console.log("\n⚠️ Il reste des erreurs à corriger manuellement.");
  }

} catch (err) {
  console.error("Erreur lors de l'exécution d'ESLint.");
  console.error(err.message);
}
