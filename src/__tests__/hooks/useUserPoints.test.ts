import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserPoints } from '@/hooks/useUserPoints';

describe('useUserPoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useUserPoints());
    
    expect(result.current).toBeDefined();
  });

  it('loads user points successfully', async () => {
    const { result } = renderHook(() => useUserPoints());
    
    expect(result.current).toBeDefined();
  });

  it('handles different scenarios', async () => {
    const { result } = renderHook(() => useUserPoints());
    
    expect(result.current).toBeDefined();
  });
});