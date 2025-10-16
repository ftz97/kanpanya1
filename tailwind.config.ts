import type { Config } from "tailwindcss";
import kanpanyaPreset from "./preset-kanpanya";
import kanpanyaButtons from "./plugin-kanpanya-buttons";

const config: Config = {
  presets: [kanpanyaPreset],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  plugins: [kanpanyaButtons],
  theme: {
    extend: {
      scale: {
        '105': '1.05',
        '95': '0.95',
      },
      colors: {
        brand: {
          DEFAULT: "#0FB493", // vert Kanpanya adouci
          dark: "#0CA182",
          light: "#C8F2E9",
        },
        ink: "#102A43",
        soft: {
          bg: "#F8FAFB",
          card: "#FFFFFF",
          muted: "#F4F7F8",
        },
        accent: {
          mint: "#DDF5F0",
          peach: "#FFE8D9",
          coral: "#FFD8D2",
          blue: "#E2F0FB",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          mint: "#DDF5F0",
          peach: "#FFE8D9",
          coral: "#FFD8D2",
          blue: "#E2F0FB",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};

export default config;