import type { Meta, StoryObj } from '@storybook/react';
import ScratchCardStableV3 from './ScratchCardStableV3';

const meta: Meta<typeof ScratchCardStableV3> = {
  title: 'Kanpanya/ScratchCard/StableV3',
  component: ScratchCardStableV3,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ScratchCardStableV3 - Version Stable Validée

🛡️ **Version figée** - Ne pas modifier directement ce composant.

## Fonctionnalités
- ✅ Canvas optimisé avec requestAnimationFrame
- ✅ Support mobile natif (tactile)
- ✅ Accessibilité complète (ARIA + clavier)
- ✅ Animations fluides (emojis + confettis)
- ✅ Golden Ticket (10% de chance)
- ✅ Système de récompenses avancé
- ✅ Threshold configurable

## Tests E2E
Tous les tests E2E passent sur Playwright.

## Chromatic
Screenshots automatiques pour détecter les changements visuels.
        `,
      },
    },
    chromatic: {
      // Capture les screenshots en mode normal et dark
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
      // Capture les différentes variantes
      viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1200, height: 800 },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'range', min: 0.1, max: 0.9, step: 0.1 },
      description: 'Pourcentage de grattage requis pour déclencher le popup',
      defaultValue: 0.4,
    },
    goldenTicketChance: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Probabilité d\'obtenir un Golden Ticket (0-1)',
      defaultValue: 0.1,
    },
    userId: {
      control: { type: 'text' },
      description: 'ID utilisateur pour le tracking',
      defaultValue: 'storybook-user',
    },
    onReveal: {
      action: 'reward-revealed',
      description: 'Callback appelé quand une récompense est révélée',
    },
  },
  args: {
    onReveal: () => console.log('Reward revealed'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    threshold: 0.4,
    goldenTicketChance: 0.1,
    userId: 'storybook-default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration par défaut avec threshold à 40% et 10% de chance de Golden Ticket.',
      },
    },
  },
};

// Story avec threshold élevé (difficile à gratter)
export const HighThreshold: Story = {
  args: {
    threshold: 0.8,
    goldenTicketChance: 0.05,
    userId: 'storybook-difficult',
  },
  parameters: {
    docs: {
      description: {
        story: 'Version difficile - il faut gratter 80% de la carte pour révéler la récompense.',
      },
    },
  },
};

// Story avec threshold bas (facile à gratter)
export const LowThreshold: Story = {
  args: {
    threshold: 0.2,
    goldenTicketChance: 0.2,
    userId: 'storybook-easy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Version facile - seulement 20% de grattage requis, 20% de chance de Golden Ticket.',
      },
    },
  },
};

// Story avec Golden Ticket garanti (pour les screenshots)
export const GuaranteedGoldenTicket: Story = {
  args: {
    threshold: 0.1,
    goldenTicketChance: 1.0, // 100% de chance
    userId: 'storybook-golden',
  },
  parameters: {
    docs: {
      description: {
        story: 'Golden Ticket garanti - pour tester l\'affichage des récompenses dorées.',
      },
    },
    chromatic: {
      // Capture spéciale pour le Golden Ticket
      viewports: [
        { name: 'golden-mobile', width: 375, height: 667 },
        { name: 'golden-desktop', width: 1200, height: 800 },
      ],
    },
  },
};

// Story avec aucune chance de gagner (pour popup perdant)
export const GuaranteedLoss: Story = {
  args: {
    threshold: 0.1,
    goldenTicketChance: 0.0,
    userId: 'storybook-loss',
  },
  parameters: {
    docs: {
      description: {
        story: 'Perte garantie - pour tester l\'affichage du popup de consolation.',
      },
    },
    chromatic: {
      // Capture spéciale pour les pertes
      viewports: [
        { name: 'loss-mobile', width: 375, height: 667 },
        { name: 'loss-desktop', width: 1200, height: 800 },
      ],
    },
  },
};

// Story mobile optimisée
export const MobileOptimized: Story = {
  args: {
    threshold: 0.3,
    goldenTicketChance: 0.15,
    userId: 'storybook-mobile',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Version optimisée pour mobile avec threshold réduit et plus de chances de gagner.',
      },
    },
  },
};

// Story pour les tests de performance
export const PerformanceTest: Story = {
  args: {
    threshold: 0.5,
    goldenTicketChance: 0.1,
    userId: 'storybook-performance',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration standard pour les tests de performance et de charge.',
      },
    },
    chromatic: {
      // Désactiver les captures pour cette story
      disable: true,
    },
  },
};

// Story avec différents types de récompenses
export const AllRewardTypes: Story = {
  args: {
    threshold: 0.1,
    goldenTicketChance: 0.33, // 1/3 de chance pour chaque type
    userId: 'storybook-rewards',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test de tous les types de récompenses : points, réductions, offres, Golden Ticket.',
      },
    },
  },
};

// Story d'accessibilité
export const Accessibility: Story = {
  args: {
    threshold: 0.4,
    goldenTicketChance: 0.1,
    userId: 'storybook-a11y',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test des fonctionnalités d\'accessibilité : navigation clavier, ARIA labels, contrastes.',
      },
    },
    a11y: {
      // Configuration des tests d'accessibilité
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
};
