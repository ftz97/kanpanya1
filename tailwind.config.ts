import type { Config } from "tailwindcss";
import kanpanyaPreset from "./preset-kanpanya";
import kanpanyaButtons from "./plugin-kanpanya-buttons";

const config: Config = {
  presets: [kanpanyaPreset],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  plugins: [kanpanyaButtons],
};
export default config;


