#!/usr/bin/env node

/**
 * Script de monitoring des tests flaky
 * Détecte et relance automatiquement les tests qui échouent de manière intermittente
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MAX_RETRIES = 3;
const FLAKY_THRESHOLD = 0.3; // 30% de taux d'échec considéré comme flaky
const TEST_RESULTS_FILE = 'test-results.json';

class TestMonitor {
  constructor() {
    this.testHistory = this.loadTestHistory();
    this.flakyTests = new Set();
  }

  loadTestHistory() {
    try {
      if (fs.existsSync(TEST_RESULTS_FILE)) {
        return JSON.parse(fs.readFileSync(TEST_RESULTS_FILE, 'utf8'));
      }
    } catch (error) {
      console.warn('Could not load test history:', error.message);
    }
    return {};
  }

  saveTestHistory() {
    try {
      fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify(this.testHistory, null, 2));
    } catch (error) {
      console.error('Could not save test history:', error.message);
    }
  }

  recordTestResult(testName, passed, duration) {
    if (!this.testHistory[testName]) {
      this.testHistory[testName] = {
        runs: [],
        totalRuns: 0,
        passedRuns: 0,
        failedRuns: 0,
        averageDuration: 0
      };
    }

    const test = this.testHistory[testName];
    test.runs.push({
      passed,
      duration,
      timestamp: new Date().toISOString()
    });

    // Garder seulement les 50 derniers runs
    if (test.runs.length > 50) {
      test.runs = test.runs.slice(-50);
    }

    test.totalRuns++;
    if (passed) {
      test.passedRuns++;
    } else {
      test.failedRuns++;
    }

    test.averageDuration = test.runs.reduce((sum, run) => sum + run.duration, 0) / test.runs.length;
    test.failureRate = test.failedRuns / test.totalRuns;

    // Détecter les tests flaky
    if (test.totalRuns >= 5 && test.failureRate > FLAKY_THRESHOLD && test.failureRate < 1.0) {
      this.flakyTests.add(testName);
      console.log(`🚨 Flaky test detected: ${testName} (failure rate: ${(test.failureRate * 100).toFixed(1)}%)`);
    } else if (test.failureRate === 0 && this.flakyTests.has(testName)) {
      this.flakyTests.delete(testName);
      console.log(`✅ Test stabilized: ${testName}`);
    }

    this.saveTestHistory();
  }

  async runTestWithRetry(testName, testCommand) {
    let lastError;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Running test: ${testName} (attempt ${attempt}/${MAX_RETRIES})`);
        
        const startTime = Date.now();
        execSync(testCommand, { stdio: 'inherit' });
        const duration = Date.now() - startTime;
        
        this.recordTestResult(testName, true, duration);
        console.log(`✅ Test passed: ${testName} (${duration}ms)`);
        return true;
        
      } catch (error) {
        lastError = error;
        const duration = Date.now() - startTime;
        this.recordTestResult(testName, false, duration);
        console.log(`❌ Test failed: ${testName} (attempt ${attempt}/${MAX_RETRIES})`);
        
        if (attempt < MAX_RETRIES) {
          console.log(`⏳ Retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    console.log(`💥 Test failed after ${MAX_RETRIES} attempts: ${testName}`);
    throw lastError;
  }

  async runFlakyTests() {
    if (this.flakyTests.size === 0) {
      console.log('No flaky tests detected.');
      return;
    }

    console.log(`\n🔄 Running ${this.flakyTests.size} flaky tests:`);
    
    for (const testName of this.flakyTests) {
      try {
        await this.runTestWithRetry(testName, `npx playwright test --grep="${testName}"`);
      } catch (error) {
        console.error(`Failed to stabilize flaky test: ${testName}`);
      }
    }
  }

  generateReport() {
    console.log('\n📊 Test Monitoring Report');
    console.log('========================');
    
    const tests = Object.entries(this.testHistory);
    if (tests.length === 0) {
      console.log('No test data available.');
      return;
    }

    // Trier par taux d'échec
    tests.sort(([, a], [, b]) => b.failureRate - a.failureRate);

    console.log('\nTop 10 most problematic tests:');
    tests.slice(0, 10).forEach(([testName, data]) => {
      const status = data.failureRate === 0 ? '✅' : 
                    data.failureRate > FLAKY_THRESHOLD ? '🚨' : '⚠️';
      console.log(`${status} ${testName}: ${(data.failureRate * 100).toFixed(1)}% failure rate (${data.totalRuns} runs)`);
    });

    console.log('\nFlaky tests:');
    if (this.flakyTests.size === 0) {
      console.log('None detected.');
    } else {
      this.flakyTests.forEach(testName => {
        const data = this.testHistory[testName];
        console.log(`🚨 ${testName}: ${(data.failureRate * 100).toFixed(1)}% failure rate`);
      });
    }

    // Statistiques globales
    const totalRuns = tests.reduce((sum, [, data]) => sum + data.totalRuns, 0);
    const totalPassed = tests.reduce((sum, [, data]) => sum + data.passedRuns, 0);
    const globalSuccessRate = totalRuns > 0 ? (totalPassed / totalRuns) * 100 : 0;

    console.log(`\nGlobal success rate: ${globalSuccessRate.toFixed(1)}% (${totalPassed}/${totalRuns})`);
  }
}

// CLI
async function main() {
  const monitor = new TestMonitor();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'report':
      monitor.generateReport();
      break;
      
    case 'flaky':
      await monitor.runFlakyTests();
      break;
      
    case 'test':
      const testName = process.argv[3];
      const testCommand = process.argv[4] || 'npx playwright test';
      
      if (!testName) {
        console.error('Usage: node test-monitoring.js test <test-name> [test-command]');
        process.exit(1);
      }
      
      try {
        await monitor.runTestWithRetry(testName, testCommand);
      } catch (error) {
        process.exit(1);
      }
      break;
      
    default:
      console.log('Usage:');
      console.log('  node test-monitoring.js report          - Generate test report');
      console.log('  node test-monitoring.js flaky           - Run flaky tests');
      console.log('  node test-monitoring.js test <name>     - Run specific test with retry');
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TestMonitor;

