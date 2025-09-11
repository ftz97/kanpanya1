import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = ({ 
  variant = "default", 
  size = "default",
  className = ""
}: {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
} = {}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17BFA0] disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-[#17BFA0] text-white hover:bg-[#14a58d]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    link: "text-[#17BFA0] underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "h-10 w-10",
  };

  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
};

const Button = React.forwardRef<HTMLButtonElement, {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
} & React.ButtonHTMLAttributes<HTMLButtonElement>>(({ 
  children, 
  className = "", 
  variant = "default", 
  size = "default",
  ...props 
}, ref) => {
  return (
    <button 
      ref={ref}
      className={buttonVariants({ variant, size, className })} 
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
