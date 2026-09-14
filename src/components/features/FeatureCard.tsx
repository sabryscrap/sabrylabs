"use client";

import React from "react";
import { ChevronUp } from "lucide-react";
import { FeatureIdea, CATEGORY_CONFIG, STATUS_CONFIG } from "@/lib/features-data";

interface FeatureCardProps {
  idea: FeatureIdea;
  hasVoted: boolean;
  onToggleVote: (id: string) => void;
}

export default function FeatureCard({
  idea,
  hasVoted,
  onToggleVote,
}: FeatureCardProps) {
  const category = CATEGORY_CONFIG[idea.category];
  const status = STATUS_CONFIG[idea.status];

  return (
    <article className="border-2 border-black rounded-[3px] bg-white p-4 sm:p-5 shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex gap-3.5 sm:gap-4 items-start">
      {/* Upvote */}
      <button
        type="button"
        onClick={() => onToggleVote(idea.id)}
        aria-label={hasVoted ? `Remove upvote for ${idea.title}` : `Upvote ${idea.title}`}
        className={`shrink-0 flex flex-col items-center justify-center min-w-[52px] py-2 px-1 border-2 border-black rounded-[2px] cursor-pointer transition-all duration-150 select-none font-mono ${
          hasVoted
            ? "bg-[#ff4400] text-white shadow-brutal-xs font-black"
            : "bg-[#f4f4ee] hover:bg-[#ff4400] text-black hover:text-white"
        }`}
      >
        <ChevronUp className={`h-5 w-5 ${hasVoted ? "scale-110" : ""}`} strokeWidth={3} />
        <span className="text-sm font-black tabular-nums mt-0.5">{idea.votes}</span>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-[10px] font-bold">
          <span className="px-2 py-0.5 bg-[#f4f4ee] text-black border border-black rounded-[1px]">
            {category.label}
          </span>
          <span className={`px-2 py-0.5 border rounded-[1px] ${status.badgeClass}`}>
            {status.label}
          </span>
        </div>

        <h3 className="font-space text-base sm:text-lg font-black text-black leading-snug tracking-tight">
          {idea.title}
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
          {idea.description}
        </p>

        <div className="mt-2 pt-2 border-t border-zinc-200 font-mono text-[10px] text-zinc-500">
          {idea.author} · {idea.createdAt}
        </div>
      </div>
    </article>
  );
}
