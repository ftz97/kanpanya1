import type { Preview } from '@storybook/nextjs'
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F2F2F2" },
        { name: "dark", value: "#111827" },
      ],
    },
  },
};

export default preview;