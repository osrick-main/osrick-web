import React, { useState, MouseEvent } from "react";
import { motion } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text" | "gold";
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function RippleButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Clean up old ripples
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 850);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    handleMouseDown(e);
    if (onClick) {
      onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-neutral-900 text-white hover:bg-neutral-800 shadow-md shadow-neutral-950/10 border border-neutral-800";
      case "gold":
        return "bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white hover:from-gold-500 hover:to-gold-400 shadow-lg shadow-gold-600/15 border border-gold-400/20";
      case "secondary":
        return "bg-gold-100 text-gold-900 hover:bg-gold-200 border border-gold-200/50";
      case "outline":
        return "bg-transparent text-neutral-800 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400";
      case "text":
        return "bg-transparent text-neutral-800 hover:text-gold-600 px-2 py-1";
      default:
        return "";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer rounded-full px-6 py-3 font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 select-none ${getVariantStyles()} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <span className="absolute inset-0 block pointer-events-none z-0">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              animation: "ripple 850ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
            }}
          />
        ))}
      </span>
      
      {/* Custom CSS for ripple expansion inside the component */}
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </motion.button>
  );
}
