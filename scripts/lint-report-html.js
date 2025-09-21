#!/usr/bin/env node
import fs from "fs";
import path from "path";

const REPORT_DIR = path.resolve("reports");
const OUTPUT_FILE = path.join(REPORT_DIR, "lint-report.html");

if (!fs.existsSync(REPORT_DIR)) {
  console.error("❌ Aucun dossier reports trouvé. Lance d'abord lint-report.js !");
  process.exit(1);
}

// Charger tous les rapports JSON
const files = fs
  .readdirSync(REPORT_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

if (files.length === 0) {
  console.error("❌ Aucun rapport JSON trouvé dans reports/");
  process.exit(1);
}

const reports = files.map((file) =>
  JSON.parse(fs.readFileSync(path.join(REPORT_DIR, file), "utf8"))
);

const labels = reports.map((r) => r.summary.timestamp);
const errors = reports.map((r) => r.summary.errors);
const warnings = reports.map((r) => r.summary.warnings);
const totals = reports.map((r) => r.summary.total);

// Générer le HTML avec Chart.js
const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rapport ESLint</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f9fafb; color: #111; }
    h1 { color: #2563eb; }
    canvas { max-width: 800px; margin: 20px auto; display: block; }
    table { border-collapse: collapse; margin-top: 20px; width: 100%; background: white; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    th { background: #2563eb; color: white; }
  </style>
</head>
<body>
  <h1>📊 Historique ESLint</h1>
  <canvas id="chart"></canvas>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Erreurs ❌</th>
        <th>Warnings ⚠️</th>
        <th>Total ✅</th>
      </tr>
    </thead>
    <tbody>
      ${reports
        .map(
          (r) => `
        <tr>
          <td>${r.summary.timestamp}</td>
          <td>${r.summary.errors}</td>
          <td>${r.summary.warnings}</td>
          <td>${r.summary.total}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <script>
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(labels)},
        datasets: [
          { label: 'Erreurs ❌', data: ${JSON.stringify(errors)}, borderColor: 'red', fill: false },
          { label: 'Warnings ⚠️', data: ${JSON.stringify(warnings)}, borderColor: 'orange', fill: false },
          { label: 'Total ✅', data: ${JSON.stringify(totals)}, borderColor: 'green', fill: false }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, html, "utf8");
console.log(`✅ Rapport HTML généré : ${OUTPUT_FILE}`);

// Copier dans public pour l'accessibilité web
const reportSrc = path.resolve("reports/lint-report.html");
const reportDest = path.resolve("public/lint-report.html");

if (fs.existsSync(reportSrc)) {
  fs.copyFileSync(reportSrc, reportDest);
  console.log("✅ Rapport ESLint copié dans /public");
}

const summarySrc = path.resolve("reports/lint-summary.json");
const summaryDest = path.resolve("public/lint-summary.json");

if (fs.existsSync(summarySrc)) {
  fs.copyFileSync(summarySrc, summaryDest);
  console.log("✅ Résumé ESLint copié dans /public");
}
