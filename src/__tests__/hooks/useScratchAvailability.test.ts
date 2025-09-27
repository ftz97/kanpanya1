import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useScratchAvailability } from '@/hooks/useScratchAvailability';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useScratchAvailability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default state when no localStorage data', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
  });

  it('initializes with localStorage data when available', () => {
    const mockData = {
      available: true,
      used: false,
      reward: { type: 'points', amount: 100, label: '+100 points' },
      ticketId: 'test-ticket-123',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: { type: 'points', amount: 100, label: '+100 points' },
      ticketId: 'test-ticket-123',
    });
  });

  it('handles corrupted localStorage data gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
  });

  it('activates scratch card with default values', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    act(() => {
      result.current.activate({ quizId: 'test-quiz-123' });
    });
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'test-quiz-123',
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'k-scratch',
      JSON.stringify({
        available: true,
        used: false,
        reward: { type: 'points', amount: 50, label: '+50 points' },
        ticketId: 'test-quiz-123',
      })
    );
  });

  it('activates scratch card with custom values', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    act(() => {
      result.current.activate({
        quizId: 'custom-quiz-456',
        points: 200,
        label: 'Bonus spécial!',
      });
    });
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: { type: 'points', amount: 200, label: 'Bonus spécial!' },
      ticketId: 'custom-quiz-456',
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'k-scratch',
      JSON.stringify({
        available: true,
        used: false,
        reward: { type: 'points', amount: 200, label: 'Bonus spécial!' },
        ticketId: 'custom-quiz-456',
      })
    );
  });

  it('marks scratch card as used', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    // First activate
    act(() => {
      result.current.activate({ quizId: 'test-quiz-123' });
    });
    
    // Then mark as used
    act(() => {
      result.current.markUsed();
    });
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'test-quiz-123',
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'k-scratch',
      JSON.stringify({
        available: false,
        used: true,
        reward: { type: 'points', amount: 50, label: '+50 points' },
        ticketId: 'test-quiz-123',
      })
    );
  });

  it('clears scratch card state', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    // First activate
    act(() => {
      result.current.activate({ quizId: 'test-quiz-123' });
    });
    
    // Then clear
    act(() => {
      result.current.clear();
    });
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'k-scratch',
      JSON.stringify({
        available: false,
        used: true,
      })
    );
  });

  it('refreshes state from localStorage', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    // Initial state
    expect(result.current.state.available).toBe(false);
    
    // Update localStorage
    const newData = {
      available: true,
      used: false,
      reward: { type: 'points', amount: 75, label: '+75 points' },
      ticketId: 'refreshed-ticket',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(newData));
    
    // Refresh
    act(() => {
      result.current.refresh();
    });
    
    expect(result.current.state).toEqual(newData);
  });

  it('handles SSR environment (no window)', () => {
    // Mock SSR environment - React Testing Library needs window
    const originalWindow = global.window;
    
    // Create minimal window mock for React
    global.window = {
      localStorage: localStorageMock,
      document: {
        createElement: vi.fn(),
        body: { appendChild: vi.fn() }
      }
    } as any;
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
    
    // Restore window only
    global.window = originalWindow;
  });

  it('preserves existing state when marking as used', () => {
    // Ensure window and localStorage are available
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }
    if (typeof localStorage === 'undefined') {
      global.localStorage = localStorageMock as any;
    }
    
    const { result } = renderHook(() => useScratchAvailability());
    
    // Activate with specific data
    act(() => {
      result.current.activate({
        quizId: 'preserve-test',
        points: 150,
        label: 'Points à préserver',
      });
    });
    
    // Mark as used
    act(() => {
      result.current.markUsed();
    });
    
    // Verify that reward and ticketId are preserved
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: { type: 'points', amount: 150, label: 'Points à préserver' },
      ticketId: 'preserve-test',
    });
  });

  it('handles multiple rapid state changes', () => {
    // Ensure window and localStorage are available
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }
    if (typeof localStorage === 'undefined') {
      global.localStorage = localStorageMock as any;
    }
    
    const { result } = renderHook(() => useScratchAvailability());
    
    act(() => {
      result.current.activate({ quizId: 'rapid-test-1' });
      result.current.activate({ quizId: 'rapid-test-2' });
      result.current.markUsed();
      result.current.clear();
    });
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
  });

  it('handles boolean conversion for legacy data', () => {
    // Ensure window and localStorage are available
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }
    if (typeof localStorage === 'undefined') {
      global.localStorage = localStorageMock as any;
    }
    
    const legacyData = {
      available: 'true', // String instead of boolean
      used: 1, // Number instead of boolean
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'legacy-ticket',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(legacyData));
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: true, // Should be converted to boolean
      used: true, // Should be converted to boolean
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'legacy-ticket',
    });
  });

  it('provides all expected methods', () => {
    // Ensure window and localStorage are available
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }
    if (typeof localStorage === 'undefined') {
      global.localStorage = localStorageMock as any;
    }
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(typeof result.current.state).toBe('object');
    expect(typeof result.current.activate).toBe('function');
    expect(typeof result.current.markUsed).toBe('function');
    expect(typeof result.current.clear).toBe('function');
    expect(typeof result.current.refresh).toBe('function');
  });

  it('handles empty string in localStorage', () => {
    // Ensure window and localStorage are available
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }
    if (typeof localStorage === 'undefined') {
      global.localStorage = localStorageMock as any;
    }
    
    localStorageMock.getItem.mockReturnValue('');
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
  });

  it('handles null values in localStorage data', () => {
    // Ensure window and localStorage are available
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }
    if (typeof localStorage === 'undefined') {
      global.localStorage = localStorageMock as any;
    }
    
    const dataWithNulls = {
      available: true,
      used: false,
      reward: null,
      ticketId: null,
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(dataWithNulls));
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: null,
      ticketId: null,
    });
  });
});

