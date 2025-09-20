"use client";

import { Card } from './Layout';

interface ScratchStateDisplayProps {
  state: {
    available: boolean;
    used: boolean;
    reward?: {
      type: string;
      amount: number;
      label: string;
    };
  };
}

// UI pure = affichage de l'état
export function ScratchStateDisplay({ state }: ScratchStateDisplayProps) {
  return (
    <Card className="mb-8">
      <h2 className="text-xl font-semibold mb-4">📊 État du Ticket</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">
            {state.available ? '✅' : '❌'}
          </div>
          <p className="font-medium">Disponible</p>
          <p className="text-sm text-gray-600">
            {state.available ? 'Oui' : 'Non'}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">
            {state.used ? '✅' : '❌'}
          </div>
          <p className="font-medium">Utilisé</p>
          <p className="text-sm text-gray-600">
            {state.used ? 'Oui' : 'Non'}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">🎁</div>
          <p className="font-medium">Récompense</p>
          <p className="text-sm text-gray-600">
            {state.reward?.label || 'Aucune'}
          </p>
        </div>
      </div>
    </Card>
  );
}
