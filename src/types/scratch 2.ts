export interface ScratchReward {
  type: "points" | "gift";
  amount: number;
  label: string;
}

export interface ScratchCard {
  id: string;
  isScratched: boolean;
  reward?: ScratchReward;
  createdAt: Date;
  expiresAt?: Date;
}

export interface ScratchResult {
  success: boolean;
  reward?: ScratchReward;
  message: string;
}
