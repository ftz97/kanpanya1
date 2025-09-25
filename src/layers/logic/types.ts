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
