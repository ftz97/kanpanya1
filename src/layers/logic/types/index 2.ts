// Types pour la couche Logique
export interface ScratchState {
  available: boolean;
  used: boolean;
  reward?: {
    type: 'points' | 'coupon';
    amount: number;
    label: string;
  };
  ticketId?: string;
}

export interface GameState {
  score: number;
  level: number;
  lives: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface MapState {
  center: [number, number];
  zoom: number;
  selectedArea?: {
    id: string;
    coordinates: [number, number][];
  };
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  isAuthenticated: boolean;
}

export interface AppState {
  scratch: ScratchState;
  game: GameState;
  map: MapState;
  user: UserState;
}
