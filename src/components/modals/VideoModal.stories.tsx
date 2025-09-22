import type { Meta, StoryObj } from "@storybook/react";
import VideoModal from "./VideoModal";
import { ModalProvider } from "@/components/modal/ModalManager";

// Wrapper pour fournir un contexte modal
const Wrapper = () => (
  <ModalProvider>
    <div className="p-6 bg-background min-h-screen">
      <VideoModal />
    </div>
  </ModalProvider>
);

const meta: Meta = {
  title: "Modals/VideoModal",
  component: Wrapper,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => <Wrapper />,
};
