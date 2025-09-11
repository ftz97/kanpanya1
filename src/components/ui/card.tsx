import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "promo" | "sponsor" | "category";
  className?: string;
}

export function Card({ children, variant = "promo", className = "" }: CardProps) {
  const base = "rounded-2xl shadow-card p-4 bg-white";
  const variants: Record<string, string> = {
    promo: "border-l-4 border-red-400",
    sponsor: "border border-primary-light",
    category: "hover:shadow-md cursor-pointer text-center",
  };

  return <div className={`${base} ${variants[variant]} ${className}`}>{children}</div>;
}
