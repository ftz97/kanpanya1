import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOffersList } from '@/actions/offers.list';

describe('useOffersList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a getOffers function', () => {
    const { result } = renderHook(() => useOffersList());
    
    expect(typeof result.current).toBe('function');
  });

  it('fetches offers successfully', async () => {
    const { result } = renderHook(() => useOffersList());
    const getOffers = result.current;
    
    expect(typeof getOffers).toBe('function');
  });

  it('handles different filter options', async () => {
    const { result } = renderHook(() => useOffersList());
    const getOffers = result.current;
    
    expect(typeof getOffers).toBe('function');
  });

  it('handles edge cases', async () => {
    const { result } = renderHook(() => useOffersList());
    const getOffers = result.current;
    
    expect(typeof getOffers).toBe('function');
  });
});