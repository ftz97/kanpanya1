import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Configuration globale des tests E2E');
  console.log(`Base URL: ${config.use?.baseURL || 'http://localhost:3000'}`);
}

export default globalSetup;
