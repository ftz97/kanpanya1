import type { Meta, StoryObj } from "@storybook/react";
import StatsSection from "./StatsSection";

const meta: Meta<typeof StatsSection> = {
  title: "Sections/StatsSection",
  component: StatsSection,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof StatsSection> = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: "🏬", number: "89", label: "Commerçants" },
        { icon: "👥", number: "1,247", label: "Utilisateurs" },
        { icon: "🔥", number: "156", label: "Offres actives" },
        { icon: "⭐", number: "4.8", label: "Note moyenne" },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white shadow-md p-6 text-center flex flex-col items-center"
        >
          <span className="text-xl">{stat.icon}</span>
          <p className="text-lg font-bold text-[#212E40] mt-1">{stat.number}</p>
          <p className="text-xs text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  ),
};
