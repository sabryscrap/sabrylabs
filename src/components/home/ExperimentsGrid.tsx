"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Terminal,
  Monitor,
  Globe,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import BracketTag, { type BracketTagVariant } from "@/components/ui/BracketTag";
import Button from "@/components/ui/Button";
import { springPhysics } from "@/lib/motion";

export type CategoryFilter = "all" | "desktop-apps" | "browser-tools" | "ai-workflows";

interface ExperimentCardData {
  id: string;
  tag: string;
  tagVariant: BracketTagVariant;
  name: string;
  category: "desktop-apps" | "browser-tools" | "ai-workflows";
  categoryLabel: string;
  tagline: string;
  description: string;
  price: string;
  priceBadge?: string;
  pills: string[];
  platforms: Array<"windows" | "macos" | "web" | "linux">;
  primaryAction: {
    label: string;
    href: string;
    isLemonSqueezy?: boolean;
    isExternal?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
}

const EXPERIMENTS: ExperimentCardData[] = [
  {
    id: "reverie",
    tag: "[01] // FLAGSHIP",
    tagVariant: "orange",
    name: "Reverie Pomodoro",
    category: "desktop-apps",
    categoryLabel: "Desktop App",
    tagline: "The Chronometric Focus Companion & Flow Extension Engine",
    description:
      "A precision desktop timer with scrubbable circular SVG vector dial, 40Hz Gamma & Deep Brown Noise psychoacoustic engine, soft overtime flow extension, and an always-on-top taskbar focus capsule.",
    price: "$19 Lifetime",
    priceBadge: "51% OFF",
    pills: ["[DESKTOP_EXE • v1.0.0]", "[WINDOWS_10/11]", "[OFFLINE_JSON]"],
    platforms: ["windows", "macos"],
    primaryAction: {
      label: "Buy Lifetime ($19)",
      href: "https://sabrylabs.lemonsqueezy.com/checkout/buy/282cd981-bc53-405a-b8ed-b56634a73faa?embed=1",
      isLemonSqueezy: true,
    },
    secondaryAction: {
      label: "Explore Showcase",
      href: "/apps/reverie",
    },
  },
  {
    id: "spritely",
    tag: "[02] // WEB_TOOL",
    tagVariant: "mint",
    name: "Spritely Aligner",
    category: "browser-tools",
    categoryLabel: "Browser WASM Tool",
    tagline: "In-Browser Spritesheet Slicer & Frame Centering Studio",
    description:
      "A pure client-side studio utility for game developers to slice AI-generated spritesheets, center frames automatically to eliminate animation jitter, preview loops at 60 FPS, and export clean ZIP/PNG assets with zero server compute.",
    price: "Free In-Browser WASM",
    priceBadge: "100% CLIENT",
    pills: ["[BROWSER_WASM • LIVE]", "[CLIENT_SIDE]", "[ZERO_SERVER]"],
    platforms: ["web", "windows", "macos", "linux"],
    primaryAction: {
      label: "Launch Web Tool",
      href: "/tools/spritely",
    },
    secondaryAction: {
      label: "View Source",
      href: "https://github.com/sabrybelal/spritely-aligner",
      isExternal: true,
    },
  },
  {
    id: "autocut",
    tag: "[03] // AI_PIPELINE",
    tagVariant: "amber",
    name: "AutoCut Video Engine",
    category: "ai-workflows",
    categoryLabel: "Local AI Pipeline",
    tagline: "Local Zero-Cloud Video Speech Editing & Retake Cascade",
    description:
      "An automated local Python pipeline using faster-whisper, Silero VAD, and n-gram retake cascade detection to eliminate silences, stutters, and false starts from video recordings with stream-copy splicing and 75%+ cut efficiency.",
    price: "Open CLI",
    priceBadge: "LOCAL AI",
    pills: ["[LOCAL_WHISPER • CLI]", "[SILERO_VAD]", "[75%_CUT_EFFICIENCY]"],
    platforms: ["windows", "linux"],
    primaryAction: {
      label: "Read Devlog & Pipeline",
      href: "/logbook/zero-cloud-video-cut-pipeline-faster-whisper",
    },
    secondaryAction: {
      label: "GitHub CLI",
      href: "https://github.com/sabrybelal",
      isExternal: true,
    },
  },
  {
    id: "winapp-mcp",
    tag: "[04] // MCP_AUTOMATION",
    tagVariant: "cyan",
    name: "Winapp-MCP Automation",
    category: "desktop-apps",
    categoryLabel: "Local Automation Protocol",
    tagline: "Windows UI Automation (FlaUI.UIA3) via Model Context Protocol",
    description:
      "A self-contained x64 Windows binary built with .NET 10 exposing native UI inspection, element clicking, text typing, and window tree navigation tools over stdio MCP with sub-15ms response latency.",
    price: "Open Protocol",
    priceBadge: ".NET 10 x64",
    pills: ["[WINDOWS_UIA • .NET 10]", "[STDIO_MCP • <15MS]", "[LOCAL_AGENT]"],
    platforms: ["windows"],
    primaryAction: {
      label: "Read Architecture",
      href: "/apps",
    },
    secondaryAction: {
      label: "GitHub Source",
      href: "https://github.com/sabrybelal",
      isExternal: true,
    },
  },
];

const TABS: Array<{ id: CategoryFilter; label: string; count: (items: ExperimentCardData[]) => number }> = [
  { id: "all", label: "All", count: (items) => items.length },
  { id: "desktop-apps", label: "Desktop Apps", count: (items) => items.filter((i) => i.category === "desktop-apps").length },
  { id: "browser-tools", label: "Browser Tools", count: (items) => items.filter((i) => i.category === "browser-tools").length },
  { id: "ai-workflows", label: "AI Workflows", count: (items) => items.filter((i) => i.category === "ai-workflows").length },
];

export default function ExperimentsGrid() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("all");

  const filteredItems = EXPERIMENTS.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BracketTag variant="orange">[02] // LABORATORY_EXPERIMENTS</BracketTag>
            <span className="text-xs font-mono text-[#a1a1aa] bg-[#1a1a22] px-2 py-0.5 rounded border border-[#27272a]">
              SHIPPED &amp; ACTIVE PROTOCOLS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Software Engineered Without Compromise
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#a1a1aa] max-w-xl">
            From native desktop engines to in-browser WebAssembly studios and local AI pipelines. Each tool is self-contained, offline-first, and designed to eliminate creative friction.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#121217] border border-[#27272a] overflow-x-auto self-start md:self-auto">
          {TABS.map((tab) => {
            const isActive = selectedFilter === tab.id;
            const count = tab.count(EXPERIMENTS);
            return (
              <motion.button
                key={tab.id}
                whileTap={springPhysics.buttonTap}
                onClick={() => setSelectedFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#ff5722] text-white font-semibold shadow-glow-btn"
                    : "text-[#a1a1aa] hover:text-white hover:bg-[#1a1a22]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#27272a] text-[#a1a1aa]"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Experiments Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={springPhysics.springSmooth}
              whileHover={springPhysics.cardHover}
              className="flex flex-col justify-between rounded-xl bg-[#121217] border border-[#27272a] hover:border-[#ff5722]/50 p-6 sm:p-7 shadow-card transition-colors group"
            >
              {/* Card Top Section */}
              <div className="space-y-4">
                {/* Header: Tag + Price */}
                <div className="flex items-center justify-between gap-2">
                  <BracketTag variant={item.tagVariant} size="sm">
                    {item.tag}
                  </BracketTag>
                  <div className="flex items-center gap-2">
                    {item.priceBadge && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/30">
                        {item.priceBadge}
                      </span>
                    )}
                    <span className="text-xs font-mono font-semibold text-[#fafafa]">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#ff5722] transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] mt-1 font-medium">
                    {item.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                  {item.description}
                </p>

                {/* Technical Metadata Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.pills.map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[10px] font-mono text-[#a1a1aa] bg-[#18181c] px-2 py-0.5 rounded border border-[#27272a]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom Section */}
              <div className="pt-6 mt-6 border-t border-[#1f1f23] flex flex-wrap items-center justify-between gap-4">
                {/* Platform Compatibility Icons */}
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <span className="font-mono text-[10px] uppercase text-[#71717a]">PLATFORM:</span>
                  <div className="flex items-center gap-1.5 text-[#a1a1aa]">
                    {item.platforms.includes("windows") && (
                      <span title="Windows 10/11 x64" className="hover:text-white transition-colors">
                        <Monitor className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {item.platforms.includes("macos") && (
                      <span title="macOS Native" className="hover:text-white transition-colors">
                        <Monitor className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {item.platforms.includes("web") && (
                      <span title="Modern Web / WASM" className="hover:text-white transition-colors">
                        <Globe className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {item.platforms.includes("linux") && (
                      <span title="Linux CLI / X11" className="hover:text-white transition-colors">
                        <Terminal className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {item.secondaryAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      href={item.secondaryAction.href}
                      external={item.secondaryAction.isExternal}
                      className="font-mono text-xs text-[#a1a1aa] hover:text-white"
                    >
                      <span>{item.secondaryAction.label}</span>
                      {item.secondaryAction.isExternal ? (
                        <ExternalLink className="h-3 w-3" />
                      ) : (
                        <ArrowUpRight className="h-3 w-3" />
                      )}
                    </Button>
                  )}

                  {item.primaryAction.isLemonSqueezy ? (
                    <a
                      href={item.primaryAction.href}
                      className="lemonsqueezy-button inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md font-mono text-xs font-semibold uppercase tracking-wider bg-[#ff5722] hover:bg-[#f4511e] text-white shadow-glow-btn transition-colors"
                      data-theme="dark"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>{item.primaryAction.label}</span>
                    </a>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      href={item.primaryAction.href}
                      external={item.primaryAction.isExternal}
                      className="font-mono text-xs uppercase tracking-wider font-semibold"
                    >
                      <span>{item.primaryAction.label}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}