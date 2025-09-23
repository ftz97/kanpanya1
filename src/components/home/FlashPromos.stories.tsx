import type { Meta, StoryObj } from "@storybook/nextjs";
import FlashPromos from "./FlashPromos";

const meta: Meta<typeof FlashPromos> = {
  title: "Sections/FlashPromos",
  component: FlashPromos,
  tags: ["autodocs"],
};

export default meta;

export const OnePromo: StoryObj<typeof FlashPromos> = {
  render: () => (
    <div className="max-w-sm">
      <div className="rounded-2xl bg-white shadow-md p-4">
        <h3 className="font-semibold text-[#212E40] text-sm">Pizza -50% ce soir</h3>
        <p className="text-xs text-gray-500">Chez Mario</p>
      </div>
    </div>
  ),
};

export const GridPromos: StoryObj<typeof FlashPromos> = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {["Pizza -50%", "Happy Hour", "Légumes frais -30%", "Parapharmacie -15%"].map((offer, i) => (
        <div key={i} className="rounded-2xl bg-white shadow-md p-4">
          <h3 className="font-semibold text-[#212E40] text-sm">{offer}</h3>
          <p className="text-xs text-gray-500">Commerçant</p>
        </div>
      ))}
    </div>
  ),
};
