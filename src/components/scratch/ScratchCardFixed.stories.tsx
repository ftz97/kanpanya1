import type { Meta, StoryObj } from '@storybook/nextjs';
import ScratchCardStableV3 from './ScratchCardStableV3';

const meta: Meta<typeof ScratchCardStableV3> = {
  title: 'Fixed/ScratchCard',
  component: ScratchCardStableV3,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Version CORRIGÉE du ScratchCardStableV3 - Le threshold fonctionne maintenant correctement !',
      },
    },
  },
  argTypes: {
    threshold: {
      control: { type: 'range', min: 0.1, max: 1.0, step: 0.1 },
      description: 'Pourcentage de grattage requis (0.1 = 10%, 1.0 = 100%)',
      defaultValue: 0.4,
    },
    goldenTicketChance: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Chance d\'obtenir un Golden Ticket',
      defaultValue: 0.1,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Test10Percent: Story = {
  args: {
    threshold: 0.1, // 10% de grattage requis
    goldenTicketChance: 0.1,
    userId: 'test-10',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec 10% de grattage requis - Le popup devrait s\'afficher rapidement.',
      },
    },
  },
};

export const Test50Percent: Story = {
  args: {
    threshold: 0.5, // 50% de grattage requis
    goldenTicketChance: 0.1,
    userId: 'test-50',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec 50% de grattage requis - Il faut gratter la moitié de la carte.',
      },
    },
  },
};

export const Test90Percent: Story = {
  args: {
    threshold: 0.9, // 90% de grattage requis
    goldenTicketChance: 0.1,
    userId: 'test-90',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec 90% de grattage requis - Il faut gratter presque toute la carte.',
      },
    },
  },
};

export const Test100Percent: Story = {
  args: {
    threshold: 1.0, // 100% de grattage requis
    goldenTicketChance: 0.1,
    userId: 'test-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test avec 100% de grattage requis - Il faut gratter TOUTE la carte.',
      },
    },
  },
};
