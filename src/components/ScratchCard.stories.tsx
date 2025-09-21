import type { Meta, StoryObj } from "@storybook/nextjs";
import ScratchCardComponent from "./ScratchCard";

const meta: Meta<typeof ScratchCardComponent> = {
  title: "Gamification/ScratchCard",
  component: ScratchCardComponent,
  tags: ["autodocs"],
  argTypes: {
    reward: {
      control: "text",
      description: "Récompense affichée sous le scratch",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScratchCardComponent>;

export const Points: Story = {
  args: { 
    reward: { type: "points", amount: 10, label: "+10 points 🎉" },
    onReveal: () => console.log("✅ 10 points gagnés"),
  },
};

export const Cadeau: Story = {
  args: { 
    reward: { type: "gift", amount: 1, label: "🎁 Cadeau mystère" },
    onReveal: () => console.log("🎁 Cadeau gagné"),
  },
};

export const Vide: Story = {
  args: { 
    reward: { type: "points", amount: 0, label: "Pas de gain 😢" },
    onReveal: () => console.log("😢 Rien gagné"),
  },
};

export const Jackpot: Story = {
  args: { 
    reward: { type: "points", amount: 100, label: "🎊 JACKPOT +100 🎊" },
    onReveal: () => console.log("🎊 JACKPOT !"),
  },
};

export const TestEmojiRain: Story = {
  args: { 
    reward: { type: "points", amount: 200, label: "🌧️ Test Pluie d'Emojis 🌧️" },
    onReveal: () => console.log("🌧️ Animation de pluie d'emojis testée !"),
  },
};
