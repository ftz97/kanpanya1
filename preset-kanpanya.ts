// preset-kanpanya.ts
import type { Config } from "tailwindcss";

const kanpanyaPreset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      // Couleurs principales (format rgb avec <alpha-value> pour supporter /10, /30, etc.)
      colors: {
        primary: "rgb(20 184 166 / <alpha-value>)",   // #14B8A6 (lagon)
        error:   "rgb(225 29 72 / <alpha-value>)",    // #E11D48
        success: "rgb(34 197 94 / <alpha-value>)",    // #22C55E
        warning: "rgb(245 158 11 / <alpha-value>)",   // #F59E0B
        info:    "rgb(59 130 246 / <alpha-value>)",   // #3B82F6
        ink:     "rgb(15 23 42 / <alpha-value>)",     // texte (slate-900)
        sand:    "rgb(243 244 246 / <alpha-value>)",  // fond (gray-100)
      },

      // Petits réglages de design system
      ringColor: {
        DEFAULT: "rgb(20 184 166 / <alpha-value>)",   // ring-primary par défaut
      },
      borderColor: {
        DEFAULT: "rgb(226 232 240 / <alpha-value>)",  // gray-200
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 20px rgba(0,0,0,0.05)",
      },

      // Micro-anim "pop"
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        pop: "pop .15s ease-out",
      },
    },
  },
};

export default kanpanyaPreset;
