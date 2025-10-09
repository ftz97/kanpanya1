import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Card",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="card-kanpa">
      <h3 className="h3-kanpa">Titre carte</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Texte dans la carte avec un peu de contenu pour voir le rendu.
      </p>
      <button className="btn-primary mt-4">Action</button>
    </div>
  ),
};

export const WithGradient: StoryObj = {
  render: () => (
    <div className="card-kanpa bg-gradient-mint">
      <h3 className="h3-kanpa">Carte avec gradient</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Cette carte utilise le gradient mint du design system.
      </p>
      <button className="btn-outline mt-4">Action</button>
    </div>
  ),
};

export const WithBorder: StoryObj = {
  render: () => (
    <div className="card-kanpa border-2 border-primary">
      <h3 className="h3-kanpa">Carte avec bordure</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Cette carte a une bordure colorée pour la mettre en évidence.
      </p>
      <button className="btn-primary mt-4">Action</button>
    </div>
  ),
};

export const Compact: StoryObj = {
  render: () => (
    <div className="card-kanpa p-4">
      <h3 className="h3-kanpa text-lg">Carte compacte</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Version plus petite de la carte.
      </p>
    </div>
  ),
};

export const WithOutlineButton: StoryObj = {
  render: () => (
    <div className="card-kanpa">
      <h3 className="h3-kanpa">Offre spéciale</h3>
      <p className="mt-2">Profitez de -30% sur vos légumes frais 🌱</p>
      <button className="btn-outline mt-4">Voir l'offre</button>
    </div>
  ),
};

export const WithImage: StoryObj = {
  render: () => (
    <div className="card-kanpa overflow-hidden">
      <div className="w-full h-32 bg-gradient-flash mb-4"></div>
      <h3 className="h3-kanpa">Carte avec image</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Cette carte inclut une zone d'image en haut.
      </p>
      <button className="btn-primary mt-4">Voir plus</button>
    </div>
  ),
};

export const Grid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="card-kanpa">
        <h3 className="h3-kanpa">Carte 1</h3>
        <p className="text-gray-600 dark:text-gray-300">Contenu de la première carte.</p>
      </div>
      <div className="card-kanpa bg-gradient-community">
        <h3 className="h3-kanpa">Carte 2</h3>
        <p className="text-gray-600 dark:text-gray-300">Contenu de la deuxième carte.</p>
      </div>
      <div className="card-kanpa border-2 border-accent">
        <h3 className="h3-kanpa">Carte 3</h3>
        <p className="text-gray-600 dark:text-gray-300">Contenu de la troisième carte.</p>
      </div>
    </div>
  ),
};
