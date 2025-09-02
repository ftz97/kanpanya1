// plugin-kanpanya-buttons.ts
import plugin from "tailwindcss/plugin";

const PRIMARY = "#14B8A6";
const ERROR = "#E11D48";
const INK = "#0F172A";

const kanpanyaButtons = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".btn": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontWeight: "600",
      borderRadius: theme("borderRadius.2xl"),
      padding: "0.625rem 1rem",
      lineHeight: "1.2",
      boxShadow: theme("boxShadow.soft", "0 10px 20px rgba(0,0,0,0.05)"),
      transitionProperty: "transform, box-shadow, background-color, color, border-color",
      transitionDuration: "150ms",
      cursor: "pointer",
      userSelect: "none",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
    },
    ".btn:focus-visible": {
      outline: "none",
      boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${PRIMARY}`,
    },
    ".btn:active": { transform: "translateY(1px) scale(.99)" },
    ".btn-disabled, .btn:disabled": { opacity: "0.5", pointerEvents: "none" },

    /* Variantes */
    ".btn-primary": {
      backgroundColor: PRIMARY,
      color: "#fff",
      borderColor: PRIMARY,
    },
    ".btn-primary:hover": { filter: "brightness(0.96)" },

    ".btn-outline": {
      backgroundColor: "transparent",
      color: PRIMARY,
      borderColor: PRIMARY,
    },
    ".btn-outline:hover": { backgroundColor: "rgba(20, 184, 166, 0.08)" },

    ".btn-ghost": {
      backgroundColor: "transparent",
      color: INK,
      borderColor: "transparent",
    },
    ".btn-ghost:hover": { backgroundColor: "rgba(15, 23, 42, 0.05)" },

    ".btn-error": {
      backgroundColor: ERROR,
      color: "#fff",
      borderColor: ERROR,
    },
    ".btn-error:hover": { filter: "brightness(0.96)" },

    /* Tailles */
    ".btn-sm": {
      padding: "0.5rem 0.75rem",
      borderRadius: theme("borderRadius.xl"),
      fontSize: theme("fontSize.sm")[0],
    },
    ".btn-lg": {
      padding: "0.875rem 1.25rem",
      fontSize: theme("fontSize.base")[0],
    },

    /* Icône seule */
    ".btn-icon": {
      padding: "0.5rem",
      width: "2.5rem",
      height: "2.5rem",
    },
  });
});

export default kanpanyaButtons;
