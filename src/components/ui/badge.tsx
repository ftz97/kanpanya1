import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium";
    
    const variantClasses = {
      default: "border-transparent bg-[#17BFA0] text-white",
      secondary: "border-transparent bg-gray-100 text-gray-900",
      destructive: "border-transparent bg-red-500 text-white",
      outline: "border border-gray-300 text-gray-700 bg-white",
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
      <span
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };

// Export par défaut pour compatibilité
export default Badge;















