import { defineConfig } from '@playwright/test';
import { existsSync } from 'fs';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    ...(existsSync('storageState.json') && { storageState: 'storageState.json' }),
    trace: 'on-first-retry',
  },
  timeout: 30_000,
});
