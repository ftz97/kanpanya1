"use client";
import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  
const stableGetItem = useCallback(() => {
  getItem();
}, [getItem]);

const stableSetTheme = useCallback(() => {
  setTheme();
}, [setTheme]);

const stableSetMounted = useCallback(() => {
  setMounted();
}, [setMounted]);

useEffect(() => {
  stableGetItem();
  stableSetTheme();
  stableSetMounted();
}, [stableGetItem, stableSetTheme, stableSetMounted]);;

  useEffect(() => {
    if (mounted) {
      // Appliquer le thème au body au lieu de l'html
      document.body.className = theme;
      document.body.style.colorScheme = theme;
      localStorage.setItem("padavwa-theme", theme);
    }
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  // Éviter le rendu jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

