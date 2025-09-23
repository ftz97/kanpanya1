// Types pour la couche Données
export interface ScratchResult {
  id: string;
  userId: string;
  reward: {
    type: 'points' | 'coupon';
    amount: number;
    label: string;
  };
  playedAt: string;
  isWinner: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  level: number;
  createdAt: string;
  updatedAt: string;
}

export interface GameStats {
  totalPlays: number;
  totalWins: number;
  totalPoints: number;
  averageScore: number;
  bestScore: number;
}

export interface MapData {
  id: string;
  name: string;
  coordinates: [number, number][];
  type: 'zone' | 'point' | 'area';
  properties: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
