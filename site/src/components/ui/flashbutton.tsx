"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedFlashButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const AnimatedFlashButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedFlashButtonProps
>(({
  text = "Flash Button",
  className,
  variant = "default",
  size = "md",
  ...props
}, ref) => {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg"
  };

  const variantClasses = {
    default: "bg-background text-foreground border-2 hover:border-blue-00 cursor-pointer",
    outline: "border-muted-foreground border-2 bg-transparent text-foreground cursor-pointer hover:border-blue-500 transition-colors",
    ghost: "bg-transparent text-foreground hover:bg-background border-2 border-transparent hover:border-blue-500 cursor-pointer"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        "group",
        className
      )}
      {...props}
    >
      {/* Flash animation overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-[flash_0.7s_ease-in-out_infinite] transform -skew-x-12"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 animate-[flame_0.8s_ease-in-out_infinite]"></div>
      </div>

      {/* Button content */}
      <span className="relative z-10 group-hover:text-blue-300 transition-colors duration-300">
        {text}
      </span>

      {/* Blue glow effect */}
      <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>

      <style jsx>{`
        @keyframes flash {
          0% { transform: translateX(-100%) skewX(-12deg); }
          50% { transform: translateX(0%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        
        @keyframes flame {
          0%, 100% { 
            background: radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 70%);
            transform: scale(1);
          }
          50% { 
            background: radial-gradient(ellipse at center, rgba(59,130,246,0.2) 0%, transparent 70%);
            transform: scale(1.05);
          }
        }
      `}</style>
    </button>
  );
});

AnimatedFlashButton.displayName = "AnimatedFlashButton";

// Export the component for use in other files
export { AnimatedFlashButton };