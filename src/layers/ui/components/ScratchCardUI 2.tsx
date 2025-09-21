"use client";

import { ScratchCanvas } from '../../canvas/components/ScratchCanvas';
import { Modal } from './Modal';
import { Button } from './Button';
import { Card } from './Layout';

interface ScratchCardUIProps {
  reward?: {
    type: string;
    amount: number;
    label: string;
  };
  isRevealed: boolean;
  showModal: boolean;
  progress: number;
  onReveal: () => void;
  onProgress: (progress: number) => void;
  onCloseModal: () => void;
  onReplay: () => void;
}

// UI pure = affichage seulement
export function ScratchCardUI({
  reward,
  isRevealed,
  showModal,
  progress,
  onReveal,
  onProgress,
  onCloseModal,
  onReplay,
}: ScratchCardUIProps) {
  return (
    <div className="space-y-4">
      <Card className="text-center">
        <h2 className="text-xl font-semibold text-[#212E40] mb-4">
          🎫 Ticket à gratter
        </h2>
        
        <ScratchCanvas
          onReveal={onReveal}
          onProgress={onProgress}
          reward={reward}
        />
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Progression: {Math.round(progress * 100)}%
          </p>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={onCloseModal}
        title="🎉 Félicitations !"
        size="md"
      >
        <div className="text-center space-y-4">
          <div className="text-6xl">🎁</div>
          <h3 className="text-2xl font-bold text-[#17BFA0]">
            {reward?.label || '+50 points'}
          </h3>
          <p className="text-gray-600">
            Vous avez gagné {reward?.amount || 50} points !
          </p>
          
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={onCloseModal}>
              Fermer
            </Button>
            <Button onClick={onReplay}>
              Rejouer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}