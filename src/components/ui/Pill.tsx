import React from "react";

export type PillVariant = "mint" | "orange" | "cyan" | "amber" | "muted";

interface PillProps {
  label?: string;
  children?: React.ReactNode;
  variant?: PillVariant;
  ping?: boolean;
  className?: string;
}

export default function Pill({
  label,
  children,
  variant = "mint",
  ping = true,
  className = "",
}: PillProps) {
  const content = label ?? children;

  const colorMap: Record<PillVariant, { pill: string; dot: string }> = {
    mint: {
      pill: "bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]",
      dot: "bg-[#10b981]",
    },
    orange: {
      pill: "bg-[#ff5722]/10 border-[#ff5722]/30 text-[#ff5722]",
      dot: "bg-[#ff5722]",
    },
    cyan: {
      pill: "bg-[#00b4d8]/10 border-[#00b4d8]/30 text-[#00b4d8]",
      dot: "bg-[#00b4d8]",
    },
    amber: {
      pill: "bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]",
      dot: "bg-[#f59e0b]",
    },
    muted: {
      pill: "bg-[#27272a]/40 border-[#27272a] text-[#a1a1aa]",
      dot: "bg-[#a1a1aa]",
    },
  };

  const selected = colorMap[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border font-mono text-[10px] font-semibold tracking-wider select-none ${selected.pill} ${className}`}
    >
      {ping && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selected.dot}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${selected.dot}`}
          />
        </span>
      )}
      <span>{content}</span>
    </div>
  );
}
