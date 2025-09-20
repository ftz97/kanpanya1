"use client";
import { ThemeProvider } from "./ThemeProvider";
import AppToaster from "@/components/feedback/Toaster";
import type { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <AppToaster />
    </ThemeProvider>
  );
}



