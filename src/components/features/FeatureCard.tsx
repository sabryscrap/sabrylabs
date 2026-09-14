"use client";

import React from "react";
import { ChevronUp, Check, Sparkles } from "lucide-react";
import { FeatureIdea, CATEGORY_CONFIG, STATUS_CONFIG } from "@/lib/features-data";

interface FeatureCardProps {
  idea: FeatureIdea;
  hasVoted: boolean;
  onToggleVote: (id: string) => void;
  compact?: boolean;
}

export default function FeatureCard({
  idea,
  hasVoted,
  onToggleVote,
  compact = false,
}: FeatureCardProps) {
  const category = CATEGORY_CONFIG[idea.category];
  const status = STATUS_CONFIG[idea.status];

  return (
    <article className="group relative border-2 border-black rounded-[3px] bg-white p-4 sm:p-5 shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex gap-3.5 sm:gap-4 items-start">
      {/* Drafting Crosshairs */}
      <span className="absolute top-1.5 left-1.5 font-mono text-[9px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute top-1.5 right-1.5 font-mono text-[9px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute bottom-1.5 right-1.5 font-mono text-[9px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>

      {/* Upvote Button Column */}
      <button
        type="button"
        onClick={() => onToggleVote(idea.id)}
        aria-label={hasVoted ? `Remove upvote for ${idea.title}` : `Upvote ${idea.title}`}
        title={hasVoted ? "Click to remove your vote" : "Click to upvote this feature"}
        className={`shrink-0 flex flex-col items-center justify-center min-w-[52px] sm:min-w-[58px] py-2 px-1 border-2 border-black rounded-[2px] cursor-pointer transition-all duration-150 select-none font-mono ${
          hasVoted
            ? "bg-[#ff4400] text-white shadow-brutal-xs font-black"
            : "bg-[#f4f4ee] hover:bg-[#ff4400] text-black hover:text-white"
        }`}
      >
        <ChevronUp className={`h-5 w-5 transition-transform ${hasVoted ? "scale-110" : "group-hover:-translate-y-0.5"}`} strokeWidth={3} />
        <span className="text-xs sm:text-sm font-black tabular-nums tracking-tight mt-0.5">
          {idea.votes}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 opacity-90">
          {hasVoted ? "VOTED" : "VOTE"}
        </span>
      </button>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        {/* Meta Header */}
        <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[10px] font-bold">
          {/* Category Tag */}
          <span className="px-2 py-0.5 bg-[#f4f4ee] text-black border border-black rounded-[1px] tracking-wider">
            [{category.code}]
          </span>

          {/* Status Badge */}
          <span className={`px-2 py-0.5 border rounded-[1px] ${status.badgeClass}`}>
            {status.tag}
          </span>

          {/* Milestone Badge if present */}
          {idea.milestone && (
            <span className="px-2 py-0.5 bg-black text-white rounded-[1px]">
              TARGET: {idea.milestone}
            </span>
          )}

          {/* Shipped checkmark */}
          {idea.status === "shipped" && (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-black">
              <Check className="h-3 w-3" strokeWidth={3} />
              <span>LIVE IN PRODUCTION</span>
            </span>
          )}
        </div>

        {/* Feature Title */}
        <h3 className="font-space text-base sm:text-lg font-black text-black leading-snug tracking-tight">
          {idea.title}
        </h3>

        {/* Feature Narrative Description */}
        {!compact && (
          <p className="mt-2 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans font-medium">
            {idea.description}
          </p>
        )}

        {/* Card Footer */}
        <div className="mt-3 pt-2.5 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>PROPOSED BY:</span>
            <span className="font-bold text-black bg-[#f4f4ee] px-1.5 py-0.5 border border-zinc-300 rounded-[1px]">
              {idea.author}
            </span>
            {idea.isOfficial && (
              <span className="inline-flex items-center gap-1 text-[#ff4400] font-bold">
                <Sparkles className="h-3 w-3" />
                <span>OFFICIAL SPEC</span>
              </span>
            )}
          </div>
          <span className="tabular-nums">ID // {idea.id}</span>
        </div>
      </div>
    </article>
  );
}
