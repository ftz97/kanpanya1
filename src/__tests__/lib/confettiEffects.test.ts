import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock confetti before importing
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Import after mocking
import { heartsRain, sadRain } from '@/lib/confettiEffects';

describe('confettiEffects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls heartsRain function', () => {
    expect(() => heartsRain()).not.toThrow();
  });

  it('calls sadRain function', () => {
    expect(() => sadRain()).not.toThrow();
  });

  it('handles different confetti types', () => {
    // Test hearts rain
    expect(() => heartsRain()).not.toThrow();
    
    // Test sad rain
    expect(() => sadRain()).not.toThrow();
  });

  it('handles multiple calls', () => {
    // Test multiple calls
    expect(() => {
      heartsRain();
      sadRain();
      heartsRain();
    }).not.toThrow();
  });

  it('handles rapid successive calls', () => {
    // Test rapid successive calls
    expect(() => {
      for (let i = 0; i < 5; i++) {
        heartsRain();
        sadRain();
      }
    }).not.toThrow();
  });
});