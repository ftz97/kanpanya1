export interface QuizResult {
  score: number;
  total: number;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct?: number;
  correctIndex: number; // Propriété principale
  explanation?: string;
}