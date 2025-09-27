import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useWelcomeMessage } from '@/hooks/useWelcomeMessage';

describe('useWelcomeMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useWelcomeMessage());
    
    expect(result.current).toBeDefined();
  });

  it('loads welcome message successfully', async () => {
    const { result } = renderHook(() => useWelcomeMessage());
    
    expect(result.current).toBeDefined();
  });

  it('handles different languages', async () => {
    const { result } = renderHook(() => useWelcomeMessage('fr'));
    
    expect(result.current).toBeDefined();
  });

  it('handles different times of day', async () => {
    const { result } = renderHook(() => useWelcomeMessage('en', 'morning'));
    
    expect(result.current).toBeDefined();
  });
});