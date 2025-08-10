import React from "react";
import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", hover = false, children, ...props },
    ref
  ) => {
    const baseStyles = "bg-white rounded-2xl transition-all duration-300";

    const variants = {
      default: "border border-gray-100 shadow-sm",
      elevated: "border border-gray-100 shadow-lg",
      outlined: "border-2 border-gray-200 shadow-none",
    };

    const hoverStyles = hover ? "hover:shadow-2xl hover:scale-105" : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
