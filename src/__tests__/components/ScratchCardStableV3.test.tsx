import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScratchCardStableV3 from '@/components/scratch/ScratchCardStableV3';

// Mock window
const mockWindow = {
  innerWidth: 800,
  innerHeight: 600,
  FORCE_REWARD: null,
};

// Mock canvas
const mockCanvas = {
  getContext: vi.fn(() => ({
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Array(4) })),
    putImageData: vi.fn(),
    createImageData: vi.fn(() => ({ data: new Array(4) })),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn(() => ({ width: 100 })),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
  })),
  toDataURL: vi.fn(() => 'data:image/png;base64,mock'),
  getBoundingClientRect: vi.fn(() => ({
    left: 0,
    top: 0,
    width: 300,
    height: 200,
  })),
  width: 300,
  height: 200,
};

// Mock ResizeObserver
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('ScratchCardStableV3', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window
    global.window = mockWindow as any;
    
    // Mock canvas
    global.HTMLCanvasElement = mockCanvas as any;
    
    // Mock ResizeObserver
    global.ResizeObserver = mockResizeObserver;
    
    // Mock process.env
    process.env.NODE_ENV = 'test';
    
    // Mock Math.random for predictable tests
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((callback) => {
      callback();
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the scratch card', () => {
    render(<ScratchCardStableV3 />);
    
    const canvas = screen.getByTestId('scratch-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('handles scratch interactions', async () => {
    render(<ScratchCardStableV3 />);
    
    const canvas = screen.getByTestId('scratch-canvas');
    
    // Simulate scratch interaction
    fireEvent.pointerDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(canvas, { clientX: 110, clientY: 110 });
    fireEvent.pointerUp(canvas);
    
    expect(canvas).toBeInTheDocument();
  });

  it('handles different reward types', async () => {
    // Test with forced golden ticket
    global.window.FORCE_REWARD = 'golden';
    
    render(<ScratchCardStableV3 />);
    
    const canvas = screen.getByTestId('scratch-canvas');
    
    // Simulate scratch to reveal
    fireEvent.pointerDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(canvas, { clientX: 200, clientY: 200 });
    fireEvent.pointerUp(canvas);
    
    expect(canvas).toBeInTheDocument();
  });

  it('handles accessibility features', () => {
    render(<ScratchCardStableV3 />);
    
    const canvas = screen.getByTestId('scratch-canvas');
    
    // Test keyboard interaction
    fireEvent.keyDown(canvas, { key: 'Enter' });
    fireEvent.keyDown(canvas, { key: ' ' });
    
    expect(canvas).toBeInTheDocument();
  });

  it('handles different screen sizes', () => {
    // Test with different window sizes
    global.window.innerWidth = 400;
    global.window.innerHeight = 300;
    
    render(<ScratchCardStableV3 />);
    
    const canvas = screen.getByTestId('scratch-canvas');
    expect(canvas).toBeInTheDocument();
  });
});