import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Gradients",
  tags: ["autodocs"],
};

export default meta;

export const AllGradients: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card-kanpa">
        <div className="w-full h-20 bg-gradient-mint rounded-lg mb-4"></div>
        <h3 className="h3-kanpa">Mint</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Dégradé menthe pour les sections naturelles
        </p>
      </div>
      <div className="card-kanpa">
        <div className="w-full h-20 bg-gradient-flash rounded-lg mb-4"></div>
        <h3 className="h3-kanpa">Flash</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Dégradé flash pour les promotions
        </p>
      </div>
      <div className="card-kanpa">
        <div className="w-full h-20 bg-gradient-community rounded-lg mb-4"></div>
        <h3 className="h3-kanpa">Community</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Dégradé communauté pour les sections sociales
        </p>
      </div>
    </div>
  ),
};

export const MintVariations: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div className="w-full h-16 bg-gradient-mint rounded-lg flex items-center justify-center">
        <span className="text-white font-semibold">Gradient Mint</span>
      </div>
      <div className="w-full h-16 bg-gradient-mint rounded-lg opacity-50 flex items-center justify-center">
        <span className="text-white font-semibold">Mint 50% opacity</span>
      </div>
      <div className="w-full h-16 bg-gradient-mint rounded-lg opacity-25 flex items-center justify-center">
        <span className="text-gray-600 font-semibold">Mint 25% opacity</span>
      </div>
    </div>
  ),
};

export const FlashVariations: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div className="w-full h-16 bg-gradient-flash rounded-lg flex items-center justify-center">
        <span className="text-white font-semibold">Gradient Flash</span>
      </div>
      <div className="w-full h-16 bg-gradient-flash rounded-lg opacity-50 flex items-center justify-center">
        <span className="text-white font-semibold">Flash 50% opacity</span>
      </div>
      <div className="w-full h-16 bg-gradient-flash rounded-lg opacity-25 flex items-center justify-center">
        <span className="text-gray-600 font-semibold">Flash 25% opacity</span>
      </div>
    </div>
  ),
};

export const CommunityVariations: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div className="w-full h-16 bg-gradient-community rounded-lg flex items-center justify-center">
        <span className="text-gray-700 font-semibold">Gradient Community</span>
      </div>
      <div className="w-full h-16 bg-gradient-community rounded-lg opacity-50 flex items-center justify-center">
        <span className="text-gray-700 font-semibold">Community 50% opacity</span>
      </div>
      <div className="w-full h-16 bg-gradient-community rounded-lg opacity-25 flex items-center justify-center">
        <span className="text-gray-600 font-semibold">Community 25% opacity</span>
      </div>
    </div>
  ),
};

export const InCards: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gradient-mint rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Section Nature</h3>
        <p>Utilisez ce gradient pour les sections liées à l&apos;environnement.</p>
      </div>
      <div className="bg-gradient-flash rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Promotion Flash</h3>
        <p>Parfait pour les offres limitées dans le temps.</p>
      </div>
      <div className="bg-gradient-community rounded-lg p-6 text-gray-700">
        <h3 className="text-xl font-bold mb-2">Communauté</h3>
        <p>Idéal pour les sections sociales et communautaires.</p>
      </div>
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Custom Gradient</h3>
        <p>Gradient personnalisé avec les couleurs du design system.</p>
      </div>
    </div>
  ),
};
