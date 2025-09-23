"use client";

import { Button } from '@/components/ui/button';
import { Card } from './Layout';

interface ScratchActionsProps {
  onGenerateNew: () => void;
  onMarkUsed: () => void;
  onClear: () => void;
}

// UI pure = boutons d'actions
export function ScratchActions({ onGenerateNew, onMarkUsed, onClear }: ScratchActionsProps) {
  return (
    <Card className="mb-8">
      <h2 className="text-xl font-semibold mb-4">🎮 Actions de Test</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={onGenerateNew}>
          Générer un nouveau ticket
        </Button>
        <Button variant="secondary" onClick={onMarkUsed}>
          Marquer comme utilisé
        </Button>
        <Button variant="danger" onClick={onClear}>
          Effacer tout
        </Button>
      </div>
    </Card>
  );
}
