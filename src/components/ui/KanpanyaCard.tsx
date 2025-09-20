import { cn } from "@/lib/utils";

interface KanpanyaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "promo" | "sponsor" | "category";
}

export function KanpanyaCard({ variant = "promo", className, children, ...props }: KanpanyaCardProps) {
  const base = "rounded-2xl shadow-card p-4 bg-white";
  const variants: Record<string, string> = {
    promo: "border-l-4 border-red-400",
    sponsor: "border border-primary-light",
    category: "hover:shadow-md cursor-pointer text-center",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}


