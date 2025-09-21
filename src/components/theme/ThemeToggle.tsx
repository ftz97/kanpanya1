"use client";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
// import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  
const stableSetMounted = useCallback(() => {
  setMounted();
}, [setMounted]);

useEffect(() => {
  stableSetMounted();
}, [stableSetMounted]);;

  // Ne pas rendre le composant côté serveur
  if (!mounted) {
    return null;
  }

  const next = theme === "light" ? "dark" : "light";
  return (
    <button className="btn btn-outline" onClick={() => setTheme(next)} title="Toggle theme">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
