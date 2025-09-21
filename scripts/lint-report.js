#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const REPORT_DIR = path.resolve("reports");
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");
const JSON_FILE = path.join(REPORT_DIR, `lint-report-${TIMESTAMP}.json`);
const MD_FILE = path.join(REPORT_DIR, `lint-report-${TIMESTAMP}.md`);

if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR);
}

function getLastReport() {
  const files = fs
    .readdirSync(REPORT_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (files.length === 0) return null;
  const lastFile = path.join(REPORT_DIR, files[files.length - 1]);
  return JSON.parse(fs.readFileSync(lastFile, "utf8"));
}

try {
  console.log("🔎 Analyse du projet avec ESLint...\n");

  // Exécuter ESLint en JSON
  const result = execSync(
    "eslint 'src/**/*.{ts,tsx}' --ext .ts,.tsx -f json",
    { encoding: "utf8" }
  );

  const reports = JSON.parse(result);
  let errors = 0;
  let warnings = 0;

  for (const file of reports) {
    errors += file.errorCount;
    warnings += file.warningCount;
  }

  const summary = {
    timestamp: TIMESTAMP,
    errors,
    warnings,
    total: errors + warnings,
  };

  // Sauvegarde JSON
  fs.writeFileSync(JSON_FILE, JSON.stringify({ summary, reports }, null, 2));
  console.log(`📁 Rapport JSON sauvegardé : ${JSON_FILE}`);

  // Sauvegarde un résumé simple (toujours le même fichier)
  const SUMMARY_FILE = path.join(REPORT_DIR, "lint-summary.json");
  fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summary, null, 2));
  console.log(`📁 Résumé sauvegardé : ${SUMMARY_FILE}`);

  // Charger dernier rapport pour comparaison
  const lastReport = getLastReport();
  let diffMsg = "";

  if (lastReport && lastReport.summary) {
    const diffErrors = summary.errors - lastReport.summary.errors;
    const diffWarnings = summary.warnings - lastReport.summary.warnings;

    diffMsg = `
## 📈 Comparatif avec le dernier rapport

- Erreurs : ${lastReport.summary.errors} → ${summary.errors} (${diffErrors >= 0 ? "+" : ""}${diffErrors})
- Warnings : ${lastReport.summary.warnings} → ${summary.warnings} (${diffWarnings >= 0 ? "+" : ""}${diffWarnings})
- Total : ${lastReport.summary.total} → ${summary.total} (${summary.total - lastReport.summary.total >= 0 ? "+" : ""}${summary.total - lastReport.summary.total})
`;
  }

  // Sauvegarde Markdown
  const mdContent = `
# 📊 Rapport ESLint (${TIMESTAMP})

- ❌ **Erreurs** : ${summary.errors}
- ⚠️  **Warnings** : ${summary.warnings}
- ✅ **Total** : ${summary.total} problèmes

${
  summary.errors === 0
    ? "🎉 Plus aucune erreur bloquante !"
    : "⚠️ Il reste des erreurs à corriger manuellement."
}

${diffMsg}
`;

  fs.writeFileSync(MD_FILE, mdContent);
  console.log(`📁 Rapport Markdown sauvegardé : ${MD_FILE}`);

  // Résumé console
  console.log("\n📊 Résultat ESLint :");
  console.log(`   ❌ Erreurs : ${summary.errors}`);
  console.log(`   ⚠️  Warnings : ${summary.warnings}`);
  console.log(`   ✅ Total : ${summary.total} problèmes`);

  if (diffMsg) {
    console.log(diffMsg);
  }
} catch (err) {
  console.error("Erreur lors de l'exécution d'ESLint.");
  console.error(err.message);
}
