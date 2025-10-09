export interface ScratchState {
  available: boolean;
  used: boolean;
  reward?: {
    quizId: string;
    points: number;
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
