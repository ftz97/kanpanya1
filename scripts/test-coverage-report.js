#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script pour générer un rapport de couverture de tests détaillé
 */

const COVERAGE_DIR = './coverage';
const REPORT_DIR = './reports';

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCoverageData() {
  const coverageFile = path.join(COVERAGE_DIR, 'coverage-final.json');
  
  if (!fs.existsSync(coverageFile)) {
    console.error('❌ Fichier de couverture non trouvé. Exécutez d\'abord: npm run test:coverage');
    process.exit(1);
  }
  
  return JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
}

function calculateFileCoverage(filePath, coverageData) {
  const fileCoverage = coverageData[filePath];
  if (!fileCoverage) return null;
  
  const statements = Object.keys(fileCoverage.s);
  const functions = Object.keys(fileCoverage.f);
  const branches = Object.keys(fileCoverage.b);
  const lines = Object.keys(fileCoverage.statementMap);
  
  const coveredStatements = statements.filter(key => fileCoverage.s[key] > 0).length;
  const coveredFunctions = functions.filter(key => fileCoverage.f[key] > 0).length;
  const coveredBranches = branches.filter(key => fileCoverage.b[key][0] > 0 || fileCoverage.b[key][1] > 0).length;
  const coveredLines = lines.filter(key => {
    const statement = fileCoverage.statementMap[key];
    return statements.some(sKey => {
      const s = fileCoverage.s[sKey];
      return s > 0 && fileCoverage.s[sKey] !== undefined;
    });
  }).length;
  
  return {
    statements: { total: statements.length, covered: coveredStatements },
    functions: { total: functions.length, covered: coveredFunctions },
    branches: { total: branches.length, covered: coveredBranches },
    lines: { total: lines.length, covered: coveredLines },
  };
}

function generateHTMLReport(coverageData) {
  const files = Object.keys(coverageData).filter(file => 
    file.includes('src/') && 
    !file.includes('__tests__') && 
    !file.includes('.test.') && 
    !file.includes('.spec.')
  );
  
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport de Couverture - Kanpanya</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .metric h3 { margin: 0 0 10px 0; color: #666; font-size: 14px; text-transform: uppercase; }
        .metric .value { font-size: 24px; font-weight: bold; color: #333; }
        .metric .percentage { font-size: 18px; margin-top: 5px; }
        .good { color: #28a745; }
        .warning { color: #ffc107; }
        .danger { color: #dc3545; }
        .files { margin-top: 30px; }
        .file { background: #f8f9fa; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 4px solid #ddd; }
        .file-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .file-name { font-weight: bold; color: #333; }
        .file-coverage { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .coverage-item { text-align: center; }
        .coverage-item .label { font-size: 12px; color: #666; }
        .coverage-item .value { font-weight: bold; }
        .progress-bar { width: 100%; height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden; margin-top: 5px; }
        .progress-fill { height: 100%; transition: width 0.3s ease; }
        .progress-good { background: #28a745; }
        .progress-warning { background: #ffc107; }
        .progress-danger { background: #dc3545; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Rapport de Couverture de Tests - Kanpanya</h1>
        
        <div class="summary">
            <div class="metric">
                <h3>Statements</h3>
                <div class="value" id="statements-value">0</div>
                <div class="percentage" id="statements-percentage">0%</div>
            </div>
            <div class="metric">
                <h3>Functions</h3>
                <div class="value" id="functions-value">0</div>
                <div class="percentage" id="functions-percentage">0%</div>
            </div>
            <div class="metric">
                <h3>Branches</h3>
                <div class="value" id="branches-value">0</div>
                <div class="percentage" id="branches-percentage">0%</div>
            </div>
            <div class="metric">
                <h3>Lines</h3>
                <div class="value" id="lines-value">0</div>
                <div class="percentage" id="lines-percentage">0%</div>
            </div>
        </div>
        
        <div class="files">
            <h2>📁 Détail par Fichier</h2>
            <div id="files-list"></div>
        </div>
    </div>
    
    <script>
        const coverageData = ${JSON.stringify(coverageData)};
        
        function calculatePercentage(covered, total) {
            return total === 0 ? 100 : Math.round((covered / total) * 100);
        }
        
        function getColorClass(percentage) {
            if (percentage >= 80) return 'good';
            if (percentage >= 60) return 'warning';
            return 'danger';
        }
        
        function getProgressClass(percentage) {
            if (percentage >= 80) return 'progress-good';
            if (percentage >= 60) return 'progress-warning';
            return 'progress-danger';
        }
        
        function updateSummary() {
            let totalStatements = 0, coveredStatements = 0;
            let totalFunctions = 0, coveredFunctions = 0;
            let totalBranches = 0, coveredBranches = 0;
            let totalLines = 0, coveredLines = 0;
            
            Object.keys(coverageData).forEach(file => {
                if (file.includes('src/') && !file.includes('__tests__') && !file.includes('.test.') && !file.includes('.spec.')) {
                    const coverage = calculateFileCoverage(file, coverageData);
                    if (coverage) {
                        totalStatements += coverage.statements.total;
                        coveredStatements += coverage.statements.covered;
                        totalFunctions += coverage.functions.total;
                        coveredFunctions += coverage.functions.covered;
                        totalBranches += coverage.branches.total;
                        coveredBranches += coverage.branches.covered;
                        totalLines += coverage.lines.total;
                        coveredLines += coverage.lines.covered;
                    }
                }
            });
            
            const statementsPct = calculatePercentage(coveredStatements, totalStatements);
            const functionsPct = calculatePercentage(coveredFunctions, totalFunctions);
            const branchesPct = calculatePercentage(coveredBranches, totalBranches);
            const linesPct = calculatePercentage(coveredLines, totalLines);
            
            document.getElementById('statements-value').textContent = coveredStatements + '/' + totalStatements;
            document.getElementById('statements-percentage').textContent = statementsPct + '%';
            document.getElementById('statements-percentage').className = 'percentage ' + getColorClass(statementsPct);
            
            document.getElementById('functions-value').textContent = coveredFunctions + '/' + totalFunctions;
            document.getElementById('functions-percentage').textContent = functionsPct + '%';
            document.getElementById('functions-percentage').className = 'percentage ' + getColorClass(functionsPct);
            
            document.getElementById('branches-value').textContent = coveredBranches + '/' + totalBranches;
            document.getElementById('branches-percentage').textContent = branchesPct + '%';
            document.getElementById('branches-percentage').className = 'percentage ' + getColorClass(branchesPct);
            
            document.getElementById('lines-value').textContent = coveredLines + '/' + totalLines;
            document.getElementById('lines-percentage').textContent = linesPct + '%';
            document.getElementById('lines-percentage').className = 'percentage ' + getColorClass(linesPct);
        }
        
        function calculateFileCoverage(filePath, coverageData) {
            const fileCoverage = coverageData[filePath];
            if (!fileCoverage) return null;
            
            const statements = Object.keys(fileCoverage.s);
            const functions = Object.keys(fileCoverage.f);
            const branches = Object.keys(fileCoverage.b);
            const lines = Object.keys(fileCoverage.statementMap);
            
            const coveredStatements = statements.filter(key => fileCoverage.s[key] > 0).length;
            const coveredFunctions = functions.filter(key => fileCoverage.f[key] > 0).length;
            const coveredBranches = branches.filter(key => fileCoverage.b[key][0] > 0 || fileCoverage.b[key][1] > 0).length;
            const coveredLines = lines.filter(key => {
                const statement = fileCoverage.statementMap[key];
                return statements.some(sKey => {
                    const s = fileCoverage.s[sKey];
                    return s > 0 && fileCoverage.s[sKey] !== undefined;
                });
            }).length;
            
            return {
                statements: { total: statements.length, covered: coveredStatements },
                functions: { total: functions.length, covered: coveredFunctions },
                branches: { total: branches.length, covered: coveredBranches },
                lines: { total: lines.length, covered: coveredLines },
            };
        }
        
        function renderFiles() {
            const files = Object.keys(coverageData).filter(file => 
                file.includes('src/') && 
                !file.includes('__tests__') && 
                !file.includes('.test.') && 
                !file.includes('.spec.')
            );
            
            const filesList = document.getElementById('files-list');
            filesList.innerHTML = '';
            
            files.forEach(file => {
                const coverage = calculateFileCoverage(file, coverageData);
                if (!coverage) return;
                
                const statementsPct = calculatePercentage(coverage.statements.covered, coverage.statements.total);
                const functionsPct = calculatePercentage(coverage.functions.covered, coverage.functions.total);
                const branchesPct = calculatePercentage(coverage.branches.covered, coverage.branches.total);
                const linesPct = calculatePercentage(coverage.lines.covered, coverage.lines.total);
                
                const fileDiv = document.createElement('div');
                fileDiv.className = 'file';
                fileDiv.innerHTML = \`
                    <div class="file-header">
                        <div class="file-name">\${file.replace(process.cwd() + '/', '')}</div>
                    </div>
                    <div class="file-coverage">
                        <div class="coverage-item">
                            <div class="label">Statements</div>
                            <div class="value \${getColorClass(statementsPct)}">\${coverage.statements.covered}/\${coverage.statements.total}</div>
                            <div class="progress-bar">
                                <div class="progress-fill \${getProgressClass(statementsPct)}" style="width: \${statementsPct}%"></div>
                            </div>
                        </div>
                        <div class="coverage-item">
                            <div class="label">Functions</div>
                            <div class="value \${getColorClass(functionsPct)}">\${coverage.functions.covered}/\${coverage.functions.total}</div>
                            <div class="progress-bar">
                                <div class="progress-fill \${getProgressClass(functionsPct)}" style="width: \${functionsPct}%"></div>
                            </div>
                        </div>
                        <div class="coverage-item">
                            <div class="label">Branches</div>
                            <div class="value \${getColorClass(branchesPct)}">\${coverage.branches.covered}/\${coverage.branches.total}</div>
                            <div class="progress-bar">
                                <div class="progress-fill \${getProgressClass(branchesPct)}" style="width: \${branchesPct}%"></div>
                            </div>
                        </div>
                        <div class="coverage-item">
                            <div class="label">Lines</div>
                            <div class="value \${getColorClass(linesPct)}">\${coverage.lines.covered}/\${coverage.lines.total}</div>
                            <div class="progress-bar">
                                <div class="progress-fill \${getProgressClass(linesPct)}" style="width: \${linesPct}%"></div>
                            </div>
                        </div>
                    </div>
                \`;
                filesList.appendChild(fileDiv);
            });
        }
        
        updateSummary();
        renderFiles();
    </script>
</body>
</html>
  `;
  
  return html;
}

function generateJSONReport(coverageData) {
  const files = Object.keys(coverageData).filter(file => 
    file.includes('src/') && 
    !file.includes('__tests__') && 
    !file.includes('.test.') && 
    !file.includes('.spec.')
  );
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      statements: { total: 0, covered: 0, percentage: 0 },
      functions: { total: 0, covered: 0, percentage: 0 },
      branches: { total: 0, covered: 0, percentage: 0 },
      lines: { total: 0, covered: 0, percentage: 0 },
    },
    files: {},
  };
  
  files.forEach(file => {
    const coverage = calculateFileCoverage(file, coverageData);
    if (coverage) {
      report.summary.statements.total += coverage.statements.total;
      report.summary.statements.covered += coverage.statements.covered;
      report.summary.functions.total += coverage.functions.total;
      report.summary.functions.covered += coverage.functions.covered;
      report.summary.branches.total += coverage.branches.total;
      report.summary.branches.covered += coverage.branches.covered;
      report.summary.lines.total += coverage.lines.total;
      report.summary.lines.covered += coverage.lines.covered;
      
      report.files[file] = coverage;
    }
  });
  
  // Calculate percentages
  report.summary.statements.percentage = report.summary.statements.total === 0 ? 100 : 
    Math.round((report.summary.statements.covered / report.summary.statements.total) * 100);
  report.summary.functions.percentage = report.summary.functions.total === 0 ? 100 : 
    Math.round((report.summary.functions.covered / report.summary.functions.total) * 100);
  report.summary.branches.percentage = report.summary.branches.total === 0 ? 100 : 
    Math.round((report.summary.branches.covered / report.summary.branches.total) * 100);
  report.summary.lines.percentage = report.summary.lines.total === 0 ? 100 : 
    Math.round((report.summary.lines.covered / report.summary.lines.total) * 100);
  
  return report;
}

function main() {
  console.log('📊 Génération du rapport de couverture...');
  
  ensureDirectoryExists(REPORT_DIR);
  
  const coverageData = readCoverageData();
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(coverageData);
  const htmlPath = path.join(REPORT_DIR, 'coverage-report.html');
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`✅ Rapport HTML généré: ${htmlPath}`);
  
  // Generate JSON report
  const jsonReport = generateJSONReport(coverageData);
  const jsonPath = path.join(REPORT_DIR, 'coverage-report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2));
  console.log(`✅ Rapport JSON généré: ${jsonPath}`);
  
  // Display summary
  console.log('\n📈 Résumé de la couverture:');
  console.log(`   Statements: ${jsonReport.summary.statements.covered}/${jsonReport.summary.statements.total} (${jsonReport.summary.statements.percentage}%)`);
  console.log(`   Functions:  ${jsonReport.summary.functions.covered}/${jsonReport.summary.functions.total} (${jsonReport.summary.functions.percentage}%)`);
  console.log(`   Branches:   ${jsonReport.summary.branches.covered}/${jsonReport.summary.branches.total} (${jsonReport.summary.branches.percentage}%)`);
  console.log(`   Lines:      ${jsonReport.summary.lines.covered}/${jsonReport.summary.lines.total} (${jsonReport.summary.lines.percentage}%)`);
  
  // Check thresholds
  const thresholds = { statements: 80, functions: 80, branches: 80, lines: 80 };
  let allPassed = true;
  
  Object.keys(thresholds).forEach(metric => {
    const percentage = jsonReport.summary[metric].percentage;
    const threshold = thresholds[metric];
    if (percentage < threshold) {
      console.log(`❌ ${metric}: ${percentage}% < ${threshold}% (seuil non atteint)`);
      allPassed = false;
    } else {
      console.log(`✅ ${metric}: ${percentage}% >= ${threshold}% (seuil atteint)`);
    }
  });
  
  if (allPassed) {
    console.log('\n🎉 Tous les seuils de couverture sont atteints !');
  } else {
    console.log('\n⚠️  Certains seuils de couverture ne sont pas atteints.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateHTMLReport, generateJSONReport, calculateFileCoverage };

