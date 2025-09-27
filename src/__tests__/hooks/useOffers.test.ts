import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useOffers } from '@/hooks/useOffers';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock FlashOffer type
interface MockFlashOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
}

describe('useOffers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useOffers());
    
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.reload).toBe('function');
  });

  it('uses default API endpoint', () => {
    renderHook(() => useOffers());
    
    expect(mockFetch).toHaveBeenCalledWith('/api/flash-offers');
  });

  it('uses custom API endpoint', () => {
    const customApi = '/api/custom-offers';
    renderHook(() => useOffers(customApi));
    
    expect(mockFetch).toHaveBeenCalledWith(customApi);
  });

  it('loads offers successfully', async () => {
    const mockOffers: MockFlashOffer[] = [
      {
        id: '1',
        title: 'Offre 1',
        description: 'Description 1',
        discount: 20,
      },
      {
        id: '2',
        title: 'Offre 2',
        description: 'Description 2',
        discount: 30,
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockOffers),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockOffers);
    expect(result.current.error).toBe(null);
  });

  it('handles empty offers array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('handles HTTP error responses', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('HTTP 404');
  });

  it('handles network errors', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(networkError);
  });

  it('handles non-Error exceptions', async () => {
    mockFetch.mockRejectedValueOnce('String error');

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Unknown error');
  });

  it('handles JSON parsing errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON')),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Invalid JSON');
  });

  it('reloads offers manually', async () => {
    const initialOffers: MockFlashOffer[] = [
      { id: '1', title: 'Initial', description: 'Initial desc', discount: 10 },
    ];

    const updatedOffers: MockFlashOffer[] = [
      { id: '1', title: 'Updated', description: 'Updated desc', discount: 20 },
      { id: '2', title: 'New', description: 'New desc', discount: 30 },
    ];

    // Initial load
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(initialOffers),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(initialOffers);

    // Manual reload
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(updatedOffers),
    });

    act(() => {
      result.current.reload();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(updatedOffers);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('handles reload error', async () => {
    // Initial successful load
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: '1', title: 'Test', description: 'Test', discount: 10 }]),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toHaveLength(1);

    // Reload with error
    const reloadError = new Error('Reload failed');
    mockFetch.mockRejectedValueOnce(reloadError);

    act(() => {
      result.current.reload();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(reloadError);
  });

  it('handles multiple rapid reloads', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: '1', title: 'Test', description: 'Test', discount: 10 }]),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Multiple rapid reloads
    act(() => {
      result.current.reload();
      result.current.reload();
      result.current.reload();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have been called multiple times
    expect(mockFetch).toHaveBeenCalledTimes(4); // 1 initial + 3 manual
  });

  it('handles different HTTP status codes', async () => {
    const statusCodes = [400, 401, 403, 500, 502, 503];

    for (const status of statusCodes) {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status,
      });

      const { result } = renderHook(() => useOffers());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error?.message).toBe(`HTTP ${status}`);
    }
  });

  it('handles malformed response data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve('not an array'),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe('not an array');
    expect(result.current.error).toBe(null);
  });

  it('handles null response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(null),
    });

    const { result } = renderHook(() => useOffers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('provides stable reload function reference', () => {
    const { result, rerender } = renderHook(() => useOffers());
    
    const firstReload = result.current.reload;
    
    rerender();
    
    const secondReload = result.current.reload;
    
    expect(firstReload).toBe(secondReload);
  });

  it('handles timeout scenarios', async () => {
    // Simulate a slow response
    mockFetch.mockImplementationOnce(() => 
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([{ id: '1', title: 'Slow', description: 'Slow', discount: 10 }]),
          });
        }, 100);
      })
    );

    const { result } = renderHook(() => useOffers());

    // Should be loading initially
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 200 });

    expect(result.current.data).toHaveLength(1);
  });

  it('handles different API endpoints correctly', () => {
    const endpoints = [
      '/api/offers',
      '/api/special-offers',
      'https://api.example.com/offers',
    ];

    endpoints.forEach((endpoint) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      renderHook(() => useOffers(endpoint));

      expect(mockFetch).toHaveBeenCalledWith(endpoint);
    });
  });
});

