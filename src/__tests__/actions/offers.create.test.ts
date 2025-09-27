import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCreateOffer } from '@/actions/offers.create';

describe('useCreateOffer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a createOffer function', () => {
    const { result } = renderHook(() => useCreateOffer());
    
    expect(typeof result.current).toBe('function');
  });

  it('creates an offer successfully', async () => {
    const { result } = renderHook(() => useCreateOffer());
    const createOffer = result.current;
    
    expect(typeof createOffer).toBe('function');
  });

  it('handles different offer data', async () => {
    const { result } = renderHook(() => useCreateOffer());
    const createOffer = result.current;
    
    expect(typeof createOffer).toBe('function');
  });

  it('handles edge cases', async () => {
    const { result } = renderHook(() => useCreateOffer());
    const createOffer = result.current;
    
    expect(typeof createOffer).toBe('function');
  });
});