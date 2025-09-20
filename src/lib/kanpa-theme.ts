/**
 * Thème centralisé Kanpanya
 * Centralise toutes les couleurs, gradients et styles réutilisables
 */

export const colors = {
  // Couleurs principales
  primary: "#17BFA0",
  primaryHover: "#14a58d",
  secondary: "#212E40",
  tertiary: "#0D8C75",
  
  // Couleurs de fond
  bgLight: "#F2F2F2",
  bgWhite: "#FFFFFF",
  bgGray: "#F9FFFD",
  
  // Couleurs de texte
  textPrimary: "#212E40",
  textSecondary: "#666666",
  textGray: "#666666",
  textGrayLight: "#999999",
  textWhite: "#FFFFFF",
  textTeal: "#17BFA0",
  textTealDark: "#14a58d",
  
  // Couleurs d'état
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  
  // Couleurs neutres
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
} as const;

export const gradients = {
  // Gradients principaux
  mint: "bg-gradient-to-r from-[#BCE8DF] via-[#C2F9DD] to-[#BCF7D2]",
  mintVertical: "bg-gradient-to-b from-[#17BFA0] to-[#BCE8DF]",
  community: "bg-gradient-to-r from-[#E9FFF6] to-[#F2FDFB]",
  
  // Gradients flash/promos
  flash: "bg-gradient-to-r from-[#F2A0A0] via-[#F2C2C2] to-[#F2D5D5]",
  flashRed: "bg-gradient-to-r from-[#F2A0A0] to-[#F2C2C2]",
  
  // Gradients de fond
  backgroundLight: "bg-gradient-to-b from-white to-gray-50",
  backgroundDark: "bg-gradient-to-b from-gray-800 to-gray-900",
} as const;

export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
} as const;

export const borderRadius = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

// Classes utilitaires combinées
export const styles = {
  // Boutons
  button: {
    primary: `bg-[${colors.primary}] text-white font-semibold shadow-md hover:bg-[${colors.primaryHover}] transition-colors`,
    secondary: `border border-[${colors.primary}] text-[${colors.primary}] font-semibold hover:bg-[${colors.bgGray}]`,
    outline: `border border-gray-200 text-[${colors.primary}] font-semibold hover:bg-white`,
  },
  
  // Cartes
  card: {
    base: `bg-white ${shadows.md} ${borderRadius["2xl"]} p-4 sm:p-6`,
    elevated: `bg-white ${shadows.lg} ${borderRadius["2xl"]} p-4 sm:p-6`,
  },
  
  // Sections
  section: {
    container: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6",
    title: `text-lg sm:text-xl font-semibold text-[${colors.textPrimary}]`,
  },
} as const;

// Types pour TypeScript
export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
export type ShadowKey = keyof typeof shadows;
export type BorderRadiusKey = keyof typeof borderRadius;
