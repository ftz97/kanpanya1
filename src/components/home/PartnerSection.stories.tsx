import type { Meta, StoryObj } from "@storybook/react";
import PartnerSection from "./PartnerSection";

const meta: Meta<typeof PartnerSection> = {
  title: "Sections/PartnerSection",
  component: PartnerSection,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof PartnerSection> = {
  render: () => <PartnerSection />,
};

export const WithSpecialOffer: StoryObj<typeof PartnerSection> = {
  render: () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg text-[#212E40]">Mutuelle Locale</h3>
        <p className="text-sm text-gray-500">Partenaire officiel</p>
        <p className="mt-2 font-bold text-[#17BFA0] text-lg">Points doublés cette semaine !</p>
      </div>
    </div>
  ),
};
