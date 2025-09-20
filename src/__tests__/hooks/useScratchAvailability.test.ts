import { renderHook, act } from '@testing-library/react';
import { useScratchAvailability } from '@/hooks/useScratchAvailability';

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

describe('useScratchAvailability Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('initialise avec un état par défaut', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined,
    });
  });

  it('active un ticket scratch', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    act(() => {
      result.current.activate({
        quizId: 'test-quiz',
        points: 100,
        label: '+100 points'
      });
    });
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: {
        type: 'points',
        amount: 100,
        label: '+100 points'
      },
      ticketId: 'test-quiz'
    });
  });

  it('marque un ticket comme utilisé', () => {
    const { result } = renderHook(() => useScratchAvailability());
    
    // D'abord activer un ticket
    act(() => {
      result.current.activate({
        quizId: 'test-quiz',
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
      reward: {
        type: 'points',
        amount: 50,
        label: '+50 points'
      },
      ticketId: 'test-quiz'
    });
  });

  it('lit l\'état depuis localStorage', () => {
    const savedState = {
      available: true,
      used: false,
      reward: { type: 'points', amount: 75, label: '+75 points' },
      ticketId: 'saved-quiz'
    };
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedState));
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: true,
      used: false,
      reward: { type: 'points', amount: 75, label: '+75 points' },
      ticketId: 'saved-quiz'
    });
  });

  it('gère les erreurs de localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json');
    
    const { result } = renderHook(() => useScratchAvailability());
    
    expect(result.current.state).toEqual({
      available: false,
      used: true,
      reward: undefined,
      ticketId: undefined
    });
  });
});
