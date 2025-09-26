import { cn } from "@/lib/utils";

interface KanpanyaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function KanpanyaButton({ variant = "primary", className, ...props }: KanpanyaButtonProps) {
  const base = "px-4 py-2 rounded-xl font-medium transition-all";
  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    ghost: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-danger text-white hover:bg-red-700",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}


