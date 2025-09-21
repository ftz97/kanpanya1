import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Popup from '../Popup';

// Composant wrapper pour forcer l'affichage des popups
function PopupDemo({ 
  variant, 
  title, 
  message, 
  isWinner 
}: { 
  variant: string; 
  title: string; 
  message: string; 
  isWinner: boolean; 
}) {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Carte scratch en arrière-plan (simulée) */}
        <div className="w-80 h-44 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold">
          🎟️ Carte à gratter simulée
        </div>
        
        {/* Popup par-dessus */}
        {showPopup && (
          <div
            role="dialog"
            aria-live="polite"
            aria-labelledby="popup-title"
            aria-describedby="popup-message"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <Popup
              variant={variant as any}
              title={title}
              message={message}
              onClose={() => setShowPopup(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof PopupDemo> = {
  title: 'Kanpanya/ScratchCard/Popups',
  component: PopupDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Popups ScratchCard - Screenshots Chromatic

🎯 **Objectif** : Capturer automatiquement les screenshots des popups gagnants et perdants pour détecter les changements visuels.

## Types de popups capturés
- ✅ Popup gagnant (points)
- ✅ Popup gagnant (réduction)
- ✅ Popup gagnant (Golden Ticket)
- ✅ Popup perdant (consolation)
- ✅ Différents viewports (mobile, tablet, desktop)

## Chromatic
Ces stories sont optimisées pour Chromatic et capturent automatiquement les screenshots.
        `,
      },
    },
    chromatic: {
      // Capture en mode plein écran pour les popups
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
      viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1200, height: 800 },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['banniere'],
      description: 'Variante du popup',
    },
    title: {
      control: { type: 'text' },
      description: 'Titre du popup',
    },
    message: {
      control: { type: 'text' },
      description: 'Message du popup',
    },
    isWinner: {
      control: { type: 'boolean' },
      description: 'Type de popup (gagnant/perdant)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Popup gagnant - Points
export const WinnerPoints: Story = {
  args: {
    variant: 'banniere',
    title: '🎉 Félicitations !',
    message: 'Tu as gagné 150 points Kanpanya ! 🎉',
    isWinner: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup de victoire avec récompense en points.',
      },
    },
  },
};

// Popup gagnant - Réduction
export const WinnerReduction: Story = {
  args: {
    variant: 'banniere',
    title: '🎯 Réduction gagnée',
    message: 'Tu as gagné 15% de réduction ! 😎',
    isWinner: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup de victoire avec réduction en pourcentage.',
      },
    },
  },
};

// Popup gagnant - Golden Ticket
export const WinnerGoldenTicket: Story = {
  args: {
    variant: 'banniere',
    title: '🎟️ GOLDEN TICKET !',
    message: 'GOLDEN TICKET ! Tu as gagné 500 points spéciaux ! 🎟️💎',
    isWinner: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup de victoire avec Golden Ticket (récompense rare).',
      },
    },
  },
};

// Popup gagnant - Offre
export const WinnerOffer: Story = {
  args: {
    variant: 'banniere',
    title: '🎁 Offre débloquée',
    message: '-20% de réduction chez Boulangerie du Coin ! 🎁',
    isWinner: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup de victoire avec offre chez un commerçant.',
      },
    },
  },
};

// Popup perdant
export const Loser: Story = {
  args: {
    variant: 'banniere',
    title: '😔 Dommage',
    message: 'Aucun gain cette fois-ci. Reviens bientôt pour retenter ta chance 😔',
    isWinner: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup de consolation pour les pertes.',
      },
    },
  },
};

// Popup perdant avec emoji différent
export const LoserAlternative: Story = {
  args: {
    variant: 'banniere',
    title: '💔 Pas de chance',
    message: 'Ce n\'est pas gagné aujourd\'hui... Retente bientôt ! 💔',
    isWinner: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante du popup de consolation avec un style différent.',
      },
    },
  },
};

// Popup avec gros gains
export const WinnerBigPrize: Story = {
  args: {
    variant: 'banniere',
    title: '💰 Jackpot !',
    message: 'Tu as gagné 300 points Kanpanya ! 💰',
    isWinner: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup pour les gros gains (200+ points).',
      },
    },
  },
};

// Popup avec petite réduction
export const WinnerSmallReduction: Story = {
  args: {
    variant: 'banniere',
    title: '😊 Petite réduction',
    message: 'Tu as gagné 5% de réduction ! 😊',
    isWinner: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup pour les petites réductions (5%).',
      },
    },
  },
};
