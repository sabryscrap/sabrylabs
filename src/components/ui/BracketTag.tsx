import React from "react";

export type BracketTagVariant = "orange" | "mint" | "cyan" | "amber" | "default";

interface BracketTagProps {
  label?: string;
  children?: React.ReactNode;
  variant?: BracketTagVariant;
  className?: string;
  size?: "sm" | "md";
}

export default function BracketTag({
  label,
  children,
  variant = "orange",
  className = "",
  size = "md",
}: BracketTagProps) {
  const content = label ?? children;
  const textStr = typeof content === "string" ? content.trim() : "";
  const formattedContent =
    textStr && !textStr.startsWith("[") && !textStr.endsWith("]")
      ? `[${textStr}]`
      : content;

  const variantStyles: Record<BracketTagVariant, string> = {
    orange: "text-[#ff5722] bg-[#ff5722]/10 border-[#ff5722]/30 hover:border-[#ff5722]/50",
    mint: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30 hover:border-[#10b981]/50",
    cyan: "text-[#00b4d8] bg-[#00b4d8]/10 border-[#00b4d8]/30 hover:border-[#00b4d8]/50",
    amber: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30 hover:border-[#f59e0b]/50",
    default: "text-[#a1a1aa] bg-[#18181c] border-[#27272a] hover:border-[#3f3f46]",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 tracking-wider",
    md: "text-xs px-2.5 py-1 tracking-wider",
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-sm border transition-colors select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {formattedContent}
    </span>
  );
}
