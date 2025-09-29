import React from "react";

function Button({ 
  children, 
  className = "", 
  variant = "default", 
  size = "default",
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17BFA0] disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-[#17BFA0] text-white hover:bg-[#14a58d]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

// Export nommé et par défaut
export { Button };
export default Button;