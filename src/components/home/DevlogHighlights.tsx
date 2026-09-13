"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Calendar, Clock, BookOpen } from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";
import Button from "@/components/ui/Button";
import { springPhysics } from "@/lib/motion";

interface DevlogPreview {
  slug: string;
  tag: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  summary: string;
}

const HIGHLIGHTED_DEVLOGS: DevlogPreview[] = [
  {
    slug: "building-reverie-pomodoro-desktop-architecture",
    tag: "[DEVLOG #01 // DESKTOP_ARCHITECTURE]",
    title: "Architecting Reverie: High-Performance Desktop Pomodoro in React 19 & Electron",
    category: "Desktop Architecture",
    date: "2026-09-01",
    readingTime: "9 min read",
    summary:
      "How we engineered Reverie: zero-drift interval FSMs, multi-lap 180-minute SVG countdown geometry, a frameless taskbar mini-widget with perimeter depletion, and dual-channel psychoacoustic soundscapes without Electron memory bloat.",
  },
  {
    slug: "zero-cloud-video-cut-pipeline-faster-whisper",
    tag: "[DEVLOG #02 // AI_PIPELINES]",
    title: "Cutting Video at Speed of Thought: The AutoCut Zero-Cloud Whisper Engine",
    category: "AI Pipelines",
    date: "2026-08-28",
    readingTime: "6 min read",
    summary:
      "Eliminating silences, low-confidence mumble stutters, and cascade retakes with faster-whisper and Silero VAD. How we compressed 3m 06s of raw video into 45.7s with zero stream re-encoding.",
  },
  {
    slug: "eliminating-spritesheet-jitter-algorithms",
    tag: "[DEVLOG #03 // ALGORITHMS]",
    title: "Eliminating Sprite Jitter: The Math Behind Centroid Tracking & Union Bounding Boxes",
    category: "Algorithms",
    date: "2026-08-25",
    readingTime: "6 min read",
    summary:
      "Why AI-generated spritesheets wobble and how HTML5 canvas centroid math, BFS connected components, and 9-point anchor alignment eradicate animation jitter without server compute.",
  },
];

export default function DevlogHighlights() {
  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BracketTag variant="orange">[03] // ENGINEERING_LOGBOOK</BracketTag>
            <span className="text-xs font-mono text-[#a1a1aa] bg-[#1a1a22] px-2 py-0.5 rounded border border-[#27272a]">
              RADICAL TRANSPARENCY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Devlog Highlights &amp; Retrospectives
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#a1a1aa] max-w-xl">
            In-depth architecture retrospectives, mathematical derivations, and honest post-mortems from the vibe-coding atelier.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          href="/logbook"
          className="font-mono text-xs uppercase tracking-wider self-start sm:self-auto text-[#a1a1aa] hover:text-white"
        >
          <BookOpen className="h-3.5 w-3.5 mr-1.5 text-[#ff5722]" />
          <span>View All Devlogs</span>
          <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>

      {/* 3-Column Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HIGHLIGHTED_DEVLOGS.map((article, index) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springPhysics.springSmooth, delay: index * 0.1 }}
            whileHover={springPhysics.cardHover}
            className="flex flex-col justify-between rounded-xl bg-[#121217] border border-[#27272a] hover:border-[#ff5722]/50 p-6 shadow-card transition-colors group"
          >
            <div className="space-y-4">
              {/* Category & Tag */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#ff5722]/10 text-[#ff5722] border border-[#ff5722]/30">
                  {article.category.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-[#71717a] flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readingTime}</span>
                </span>
              </div>

              {/* Title */}
              <Link href={`/logbook/${article.slug}`}>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#ff5722] transition-colors leading-snug line-clamp-3">
                  {article.title}
                </h3>
              </Link>

              {/* Summary */}
              <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] leading-relaxed line-clamp-4">
                {article.summary}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 mt-6 border-t border-[#1f1f23] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#71717a]">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.date}</span>
              </div>

              <Link
                href={`/logbook/${article.slug}`}
                className="text-[#ff5722] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Read Article</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
