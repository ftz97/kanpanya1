import type { Meta, StoryObj } from "@storybook/react";
import DesignSystemDemo from "./DesignSystemDemo";

const meta: Meta<typeof DesignSystemDemo> = {
  title: "Design System/Overview",
  component: DesignSystemDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Overview: StoryObj<typeof DesignSystemDemo> = {
  render: () => <DesignSystemDemo />,
};
