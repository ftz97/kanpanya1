// preset-kanpanya.ts
import type { Config } from "tailwindcss";
import { colors, radius, shadows, spacing, gradients } from "./lib/kanpa-theme";

const kanpanyaPreset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      // Couleurs principales (format rgb avec <alpha-value> pour supporter /10, /30, etc.)
      colors: {
        // Couleurs existantes
        primary: "rgb(20 184 166 / <alpha-value>)",   // #14B8A6 (lagon)
        error:   "rgb(225 29 72 / <alpha-value>)",    // #E11D48
        success: "rgb(34 197 94 / <alpha-value>)",    // #22C55E
        warning: "rgb(245 158 11 / <alpha-value>)",   // #F59E0B
        info:    "rgb(59 130 246 / <alpha-value>)",   // #3B82F6
        ink:     "rgb(15 23 42 / <alpha-value>)",     // texte (slate-900)
        sand:    "rgb(243 244 246 / <alpha-value>)",  // fond (gray-100)
        
        // Nouvelles couleurs du design system
        primaryDark: "rgb(20 165 143 / <alpha-value>)", // #14a58d
        secondary: "rgb(10 20 46 / <alpha-value>)",     // #0A142E
        background: "rgb(242 242 242 / <alpha-value>)", // #F2F2F2
        accent: "rgb(255 209 102 / <alpha-value>)",     // #FFD166
        danger: "rgb(239 68 68 / <alpha-value>)",       // #EF4444
      },

      // Petits réglages de design system
      ringColor: {
        DEFAULT: "rgb(20 184 166 / <alpha-value>)",   // ring-primary par défaut
      },
      borderColor: {
        DEFAULT: "rgb(226 232 240 / <alpha-value>)",  // gray-200
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
        "2xl": "1.25rem",
      },
      boxShadow: {
        sm: shadows.sm,
        md: shadows.md,
        lg: shadows.lg,
        xl: shadows.xl,
        soft: "0 10px 20px rgba(0,0,0,0.05)",
      },
      spacing: {
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
      },

      // Gradients personnalisés
      backgroundImage: {
        'gradient-mint': gradients.mint,
        'gradient-flash': gradients.flash,
        'gradient-community': gradients.community,
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
