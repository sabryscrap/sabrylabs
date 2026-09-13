"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import Link from "next/link";
import { springPhysics } from "@/lib/motion";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "mint";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

export type ButtonProps = BaseButtonProps &
  Omit<HTMLMotionProps<"button">, keyof BaseButtonProps>;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  external = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#ff5722] hover:bg-[#f4511e] text-white shadow-glow-btn border border-[#ff5722]/50 focus-visible:ring-2 focus-visible:ring-[#ff5722]/50",
    secondary:
      "bg-[#121217] hover:bg-[#1a1a22] text-[#fafafa] border border-[#27272a] hover:border-[#3f3f46] focus-visible:ring-2 focus-visible:ring-[#3f3f46]",
    outline:
      "bg-transparent hover:bg-[#121217] text-[#fafafa] border border-[#27272a] hover:border-[#ff5722]/60 focus-visible:ring-2 focus-visible:ring-[#ff5722]/40",
    ghost:
      "bg-transparent hover:bg-[#18181c] text-[#a1a1aa] hover:text-[#fafafa] border border-transparent",
    mint:
      "bg-[#10b981] hover:bg-[#059669] text-white shadow-glow-mint border border-[#10b981]/50 focus-visible:ring-2 focus-visible:ring-[#10b981]/50",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
    md: "h-10 px-4 text-sm gap-2 rounded-lg",
    lg: "h-12 px-6 text-base gap-2.5 rounded-lg",
  };

  const baseClasses = `inline-flex items-center justify-center font-sans font-medium transition-colors cursor-pointer select-none outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={disabled ? undefined : springPhysics.buttonTap}
          className={baseClasses}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        <motion.span
          whileTap={disabled ? undefined : springPhysics.buttonTap}
          className="inline-flex items-center justify-center gap-[inherit] w-full h-full"
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={disabled ? undefined : springPhysics.buttonTap}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
}
