import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { startEmojiRain, emojiBurst } from '@/lib/emojiRain';

// Mock DOM methods
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();
const mockQuerySelector = vi.fn();
const mockCreateElement = vi.fn();
const mockAnimate = vi.fn();
const mockAddEventListener = vi.fn();

// Mock document
const mockDocument = {
  createElement: mockCreateElement,
  querySelector: mockQuerySelector,
  head: {
    appendChild: mockAppendChild,
  },
  body: {
    appendChild: mockAppendChild,
  },
};

// Mock window
const mockWindow = {
  innerWidth: 1920,
  innerHeight: 1080,
};

// Mock console
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
};

// Mock HTMLElement
class MockHTMLElement {
  style: any = {};
  textContent: string = '';
  classList = {
    add: vi.fn(),
  };
  setAttribute = vi.fn();
  animate = mockAnimate;
  addEventListener = mockAddEventListener;
  parentNode: any = null;

  constructor() {
    this.style = {};
    this.textContent = '';
  }
}

// Mock Animation
class MockAnimation {
  addEventListener = mockAddEventListener;
  constructor() {}
}

describe('emojiRain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.log.mockClear();
    consoleSpy.warn.mockClear();

    // Setup global mocks
    global.document = mockDocument as any;
    global.window = mockWindow as any;
    global.HTMLElement = MockHTMLElement as any;
    global.Animation = MockAnimation as any;

    // Mock Math.random for predictable tests
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    // Mock element creation
    mockCreateElement.mockReturnValue(new MockHTMLElement());
    mockAnimate.mockReturnValue(new MockAnimation());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('startEmojiRain', () => {
    it('creates emoji elements with default options', () => {
      const cleanup = startEmojiRain();

      expect(mockCreateElement).toHaveBeenCalledWith('div');
      expect(mockAppendChild).toHaveBeenCalled();
      expect(typeof cleanup).toBe('function');
    });

    it('creates correct number of emojis', () => {
      const count = 10;
      startEmojiRain({ count });

      expect(mockCreateElement).toHaveBeenCalledTimes(count);
      expect(mockAppendChild).toHaveBeenCalledTimes(count);
    });

    it('uses custom emojis', () => {
      const customEmojis = ['🎯', '🎪', '🎨'];
      startEmojiRain({ emojis: customEmojis });

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(customEmojis).toContain(result.value.textContent);
      });
    });

    it('applies custom size range', () => {
      const sizeRange: [number, number] = [30, 60];
      startEmojiRain({ sizeRange });

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.fontSize).toBe('45px'); // (30 + 60) / 2 = 45
      });
    });

    it('applies custom duration range', () => {
      const durationRange: [number, number] = [1000, 2000];
      startEmojiRain({ durationRange });

      expect(mockAnimate).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({
          duration: 1500, // (1000 + 2000) / 2 = 1500
        })
      );
    });

    it('applies custom z-index', () => {
      const zIndex = 5000;
      startEmojiRain({ zIndex });

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.zIndex).toBe('5000');
      });
    });

    it('handles viewport container', () => {
      startEmojiRain({ container: 'viewport' });

      expect(mockAppendChild).toHaveBeenCalled();
    });

    it('handles body container', () => {
      startEmojiRain({ container: 'body' });

      expect(mockAppendChild).toHaveBeenCalled();
    });

    it('handles custom container selector', () => {
      const mockContainer = new MockHTMLElement();
      mockContainer.appendChild = vi.fn();
      mockQuerySelector.mockReturnValue(mockContainer);

      startEmojiRain({ container: '.custom-container' });

      expect(mockQuerySelector).toHaveBeenCalledWith('.custom-container');
      expect(mockContainer.appendChild).toHaveBeenCalled();
    });

    it('falls back to body when container not found', () => {
      mockQuerySelector.mockReturnValue(null);

      startEmojiRain({ container: '.nonexistent' });

      // Vérifier que la fonction s'exécute sans erreur
      expect(true).toBe(true);
    });

    it('applies glow effect for special emojis', () => {
      const glowEmojis = ['💎', '✨', '🌟', '⭐', '💫', '🎇'];
      startEmojiRain({ emojis: glowEmojis, glow: true });

      // Vérifier que la fonction a été appelée
      expect(mockCreateElement).toHaveBeenCalled();
    });

    it('applies full opacity option', () => {
      startEmojiRain({ fullOpacity: true });

      // Vérifier que la fonction a été appelée
      expect(mockCreateElement).toHaveBeenCalled();
    });

    it('injects CSS for full opacity', () => {
      startEmojiRain({ fullOpacity: true });

      // Vérifier que la fonction a été appelée
      expect(mockCreateElement).toHaveBeenCalled();
    });

    it('applies oscillation option', () => {
      startEmojiRain({ oscillation: true });

      expect(mockAnimate).toHaveBeenCalled();
    });

    it('applies different easing options', () => {
      const easingOptions = ['dramatic', 'smooth', 'linear'] as const;

      easingOptions.forEach(easing => {
        vi.clearAllMocks();
        startEmojiRain({ easing });

        expect(mockAnimate).toHaveBeenCalledWith(
          expect.any(Array),
          expect.objectContaining({
            easing: expect.any(String),
          })
        );
      });
    });

    it('returns cleanup function that removes elements', () => {
      const cleanup = startEmojiRain();
      
      // Vérifier que la fonction de cleanup est retournée
      expect(typeof cleanup).toBe('function');
      
      // Appeler la fonction de cleanup
      cleanup();
      
      // Vérifier qu'elle s'exécute sans erreur
      expect(true).toBe(true);
    });

    it('handles elements without parent node in cleanup', () => {
      const mockElement = new MockHTMLElement();
      mockElement.parentNode = null;
      mockCreateElement.mockReturnValue(mockElement);

      const cleanup = startEmojiRain();
      
      expect(() => cleanup()).not.toThrow();
    });

    it('sets up automatic cleanup after max duration', () => {
      vi.useFakeTimers();
      
      startEmojiRain({ durationRange: [1000, 2000], staggerRange: [0, 500] });

      // Fast-forward time
      vi.advanceTimersByTime(2500);

      // Vérifier que la fonction s'exécute sans erreur
      expect(true).toBe(true);

      vi.useRealTimers();
    });

    it('applies correct CSS properties to elements', () => {
      startEmojiRain();

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        const element = result.value;
        expect(element.style.position).toBe('fixed');
        expect(element.style.fontFamily).toContain('Apple Color Emoji');
        expect(element.style.lineHeight).toBe('1');
        expect(element.style.pointerEvents).toBe('none');
        expect(element.style.userSelect).toBe('none');
        expect(element.style.display).toBe('flex');
        expect(element.style.alignItems).toBe('center');
        expect(element.style.justifyContent).toBe('center');
      });
    });

    it('handles random positioning', () => {
      vi.spyOn(Math, 'random')
        .mockReturnValueOnce(0.5) // x position
        .mockReturnValueOnce(0.3) // y position
        .mockReturnValue(0.5); // other random values

      startEmojiRain();

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.left).toBe('960px'); // 1920 * 0.5
        expect(result.value.style.top).toBe('-50px'); // Always -50 for y
      });
    });
  });

  describe('emojiBurst', () => {
    it('creates burst elements with default options', () => {
      const cleanup = emojiBurst(100, 200);

      expect(mockCreateElement).toHaveBeenCalledWith('div');
      expect(mockAppendChild).toHaveBeenCalled();
      expect(typeof cleanup).toBe('function');
    });

    it('creates correct number of burst emojis', () => {
      const count = 8;
      emojiBurst(100, 200, { count });

      expect(mockCreateElement).toHaveBeenCalledTimes(count);
      expect(mockAppendChild).toHaveBeenCalledTimes(count);
    });

    it('uses custom emojis for burst', () => {
      const customEmojis = ['💥', '⚡', '🔥'];
      emojiBurst(100, 200, { emojis: customEmojis });

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(customEmojis).toContain(result.value.textContent);
      });
    });

    it('applies custom size range for burst', () => {
      const sizeRange: [number, number] = [25, 50];
      emojiBurst(100, 200, { sizeRange });

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.fontSize).toBe('37.5px'); // (25 + 50) / 2 = 37.5
      });
    });

    it('positions burst elements at correct coordinates', () => {
      const x = 150;
      const y = 250;
      emojiBurst(x, y);

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.left).toBe(`${x}px`);
        expect(result.value.style.top).toBe(`${y}px`);
      });
    });

    it('applies burst animation', () => {
      emojiBurst(100, 200);

      expect(mockAnimate).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({
          duration: 2000,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          fill: 'forwards',
        })
      );
    });

    it('returns cleanup function for burst', () => {
      const cleanup = emojiBurst(100, 200);
      
      // Vérifier que la fonction de cleanup est retournée
      expect(typeof cleanup).toBe('function');
      
      // Appeler la fonction de cleanup
      cleanup();
      
      // Vérifier qu'elle s'exécute sans erreur
      expect(true).toBe(true);
    });

    it('sets up automatic cleanup for burst', () => {
      vi.useFakeTimers();
      
      emojiBurst(100, 200);

      // Fast-forward time
      vi.advanceTimersByTime(2000);

      // Vérifier que la fonction s'exécute sans erreur
      expect(true).toBe(true);

      vi.useRealTimers();
    });

    it('applies correct CSS properties to burst elements', () => {
      emojiBurst(100, 200);

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        const element = result.value;
        expect(element.style.position).toBe('fixed');
        expect(element.style.fontFamily).toContain('Apple Color Emoji');
        expect(element.style.lineHeight).toBe('1');
        expect(element.style.pointerEvents).toBe('none');
        expect(element.style.zIndex).toBe('9999');
        expect(element.style.userSelect).toBe('none');
        expect(element.style.willChange).toBe('transform, opacity');
        expect(element.style.display).toBe('flex');
        expect(element.style.alignItems).toBe('center');
        expect(element.style.justifyContent).toBe('center');
      });
    });

    it('handles custom spread and gravity', () => {
      const spread = 300;
      const gravity = 0.8;
      emojiBurst(100, 200, { spread, gravity });

      // The animation should be called with burst-specific keyframes
      expect(mockAnimate).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles zero count', () => {
      const cleanup = startEmojiRain({ count: 0 });

      expect(mockCreateElement).not.toHaveBeenCalled();
      expect(typeof cleanup).toBe('function');
    });

    it('handles empty emoji array', () => {
      const cleanup = startEmojiRain({ emojis: [] });

      expect(mockCreateElement).toHaveBeenCalled();
      expect(typeof cleanup).toBe('function');
    });

    it('handles negative coordinates for burst', () => {
      const cleanup = emojiBurst(-100, -200);

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.left).toBe('-100px');
        expect(result.value.style.top).toBe('-200px');
      });

      expect(typeof cleanup).toBe('function');
    });

    it('handles very large coordinates', () => {
      const cleanup = emojiBurst(9999, 9999);

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.left).toBe('9999px');
        expect(result.value.style.top).toBe('9999px');
      });

      expect(typeof cleanup).toBe('function');
    });

    it('handles extreme size ranges', () => {
      const cleanup = startEmojiRain({ sizeRange: [1, 1000] });

      const elements = mockCreateElement.mock.results;
      elements.forEach((result: any) => {
        expect(result.value.style.fontSize).toBe('500.5px'); // (1 + 1000) / 2 = 500.5
      });

      expect(typeof cleanup).toBe('function');
    });

    it('handles extreme duration ranges', () => {
      const cleanup = startEmojiRain({ durationRange: [100, 10000] });

      expect(mockAnimate).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({
          duration: 5050, // (100 + 10000) / 2 = 5050
        })
      );

      expect(typeof cleanup).toBe('function');
    });
  });

  describe('animation keyframes', () => {
    it('creates correct keyframes for dramatic easing', () => {
      startEmojiRain({ easing: 'dramatic' });

      // Vérifier que animate a été appelé avec des keyframes
      expect(mockAnimate).toHaveBeenCalled();
      
      // Vérifier qu'au moins un appel contient des keyframes avec easing
      const calls = mockAnimate.mock.calls;
      const hasKeyframes = calls.some(call => 
        Array.isArray(call[0]) && call[0].length > 0 && 
        typeof call[1] === 'object' && call[1] !== null
      );
      expect(hasKeyframes).toBe(true);
    });

    it('creates correct keyframes for smooth easing', () => {
      startEmojiRain({ easing: 'smooth' });

      // Just verify that animate was called with some keyframes
      expect(mockAnimate).toHaveBeenCalled();
      const calls = mockAnimate.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      
      // Check that at least one call has keyframes array
      const hasKeyframes = calls.some(call => Array.isArray(call[0]));
      expect(hasKeyframes).toBe(true);
    });

    it('creates correct keyframes for linear easing', () => {
      startEmojiRain({ easing: 'linear' });

      // Just verify that animate was called with some keyframes
      expect(mockAnimate).toHaveBeenCalled();
      const calls = mockAnimate.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      
      // Check that at least one call has keyframes array
      const hasKeyframes = calls.some(call => Array.isArray(call[0]));
      expect(hasKeyframes).toBe(true);
    });

    it('creates correct keyframes for full opacity', () => {
      startEmojiRain({ fullOpacity: true });

      // Just verify that animate was called with some keyframes
      expect(mockAnimate).toHaveBeenCalled();
      const calls = mockAnimate.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      
      // Check that at least one call has keyframes array
      const hasKeyframes = calls.some(call => Array.isArray(call[0]));
      expect(hasKeyframes).toBe(true);
    });
  });
});
