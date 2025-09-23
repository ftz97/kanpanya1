import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Button",
  tags: ["autodocs"],
};

export default meta;

export const Primary: StoryObj = {
  render: () => <button className="btn-primary">Bouton primaire</button>,
};

export const Outline: StoryObj = {
  render: () => <button className="btn-outline">Bouton outline</button>,
};

export const Accent: StoryObj = {
  render: () => (
    <button className="btn-kanpa bg-accent text-secondary hover:bg-yellow-400">
      Bouton accent
    </button>
  ),
};

export const Danger: StoryObj = {
  render: () => (
    <button className="btn-kanpa bg-danger text-white hover:bg-red-600">
      Bouton danger
    </button>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <button className="btn-kanpa bg-primary text-white px-2 py-1 text-sm">
        Petit
      </button>
      <button className="btn-primary">Normal</button>
      <button className="btn-kanpa bg-primary text-white px-6 py-3 text-lg">
        Grand
      </button>
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <button className="btn-primary opacity-50 cursor-not-allowed">
      Désactivé
    </button>
  ),
};

export const States: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <button className="btn-primary">Normal</button>
      <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
        Désactivé
      </button>
      <button className="btn-primary animate-pulse">Chargement</button>
    </div>
  ),
};
