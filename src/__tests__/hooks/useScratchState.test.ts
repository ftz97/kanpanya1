import { renderHook, act } from '@testing-library/react';
import { useScratchState } from '@/layers/logic/hooks/useScratchState';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('useScratchState Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('initialise avec un état par défaut', () => {
    const { result } = renderHook(() => useScratchState());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
  });

  it('lit l\'état depuis localStorage', () => {
    const savedState = {
      available: true,
      used: false,
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'test-123'
    };
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedState));
    
    const { result } = renderHook(() => useScratchState());
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'test-123'
    });
  });

  it('active un nouveau ticket', () => {
    const { result } = renderHook(() => useScratchState());
    
    act(() => {
      result.current.activate({
        quizId: 'test-123',
        points: 100,
        label: '+100 points'
      });
    });
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: { type: 'points', amount: 100, label: '+100 points' },
      ticketId: 'test-123'
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'k-scratch',
      JSON.stringify({
        available: true,
        used: false,
        reward: { type: 'points', amount: 100, label: '+100 points' },
        ticketId: 'test-123'
      })
    );
  });

  it('marque le ticket comme utilisé', () => {
    const { result } = renderHook(() => useScratchState());
    
    // D'abord activer un ticket
    act(() => {
      result.current.activate({
        quizId: 'test-123',
        points: 50,
        label: '+50 points'
      });
    });
    
    // Puis le marquer comme utilisé
    act(() => {
      result.current.markUsed();
    });
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: { type: 'points', amount: 50, label: '+50 points' },
      ticketId: 'test-123'
    });
  });

  it('efface tout l\'état', () => {
    const { result } = renderHook(() => useScratchState());
    
    // D'abord activer un ticket
    act(() => {
      result.current.activate({
        quizId: 'test-123',
        points: 50,
        label: '+50 points'
      });
    });
    
    // Puis effacer
    act(() => {
      result.current.clear();
    });
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined
    });
  });

  it('gère les erreurs de localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json');
    
    const { result } = renderHook(() => useScratchState());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined
    });
  });
});
