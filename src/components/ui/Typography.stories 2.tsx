import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Typography",
  tags: ["autodocs"],
};

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <h1 className="h1-kanpa">Titre principal (H1)</h1>
      <h2 className="h2-kanpa">Titre secondaire (H2)</h2>
      <h3 className="h3-kanpa">Titre tertiaire (H3)</h3>
    </div>
  ),
};

export const TextVariants: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-secondary">
        Texte large et semi-gras
      </p>
      <p className="text-base text-gray-600 dark:text-gray-300">
        Texte normal avec couleur secondaire
      </p>
      <p className="text-sm text-gray-500">
        Texte petit et discret
      </p>
      <p className="text-xs text-gray-400">
        Texte très petit pour les légendes
      </p>
    </div>
  ),
};

export const Colors: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <p className="text-primary font-semibold">Texte en couleur primaire</p>
      <p className="text-accent font-semibold">Texte en couleur accent</p>
      <p className="text-danger font-semibold">Texte en couleur danger</p>
      <p className="text-secondary font-semibold">Texte en couleur secondaire</p>
    </div>
  ),
};

export const Responsive: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <h1 className="h1-kanpa">
        Titre responsive qui s'adapte à la taille d'écran
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
        Ce paragraphe s'adapte également à la taille d'écran grâce aux classes responsive de Tailwind.
      </p>
    </div>
  ),
};
