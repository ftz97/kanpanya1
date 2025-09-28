/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';

declare global {
  const expect: typeof import('vitest').expect;
  const describe: typeof import('vitest').describe;
  const it: typeof import('vitest').it;
  const beforeEach: typeof import('vitest').beforeEach;
  const afterEach: typeof import('vitest').afterEach;
  const vi: typeof import('vitest').vi;
}
