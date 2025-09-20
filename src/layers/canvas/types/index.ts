// Types pour la couche Canvas
export interface CanvasProps {
  width: number;
  height: number;
  onInteraction?: (event: CanvasInteraction) => void;
  className?: string;
}

export interface CanvasInteraction {
  type: 'click' | 'drag' | 'zoom' | 'pan';
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
  scale?: number;
}

export interface ScratchCanvasProps {
  onReveal?: () => void;
  onProgress?: (progress: number) => void;
  reward?: {
    type: string;
    amount: number;
    label: string;
  };
}

export interface MapCanvasProps {
  center: [number, number];
  zoom: number;
  onLocationChange?: (location: [number, number]) => void;
  onZoomChange?: (zoom: number) => void;
}

export interface DrawingCanvasProps {
  onDraw?: (path: DrawingPath) => void;
  onComplete?: (paths: DrawingPath[]) => void;
  tool: 'pen' | 'eraser' | 'brush';
  color: string;
  size: number;
}

export interface DrawingPath {
  points: [number, number][];
  color: string;
  size: number;
  tool: string;
}
