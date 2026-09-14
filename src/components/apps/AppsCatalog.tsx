"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Search,
  Monitor,
  Apple,
  Globe,
  Terminal,
  ShoppingBag,
  Download,
  ExternalLink,
  Check,
  Smartphone,
} from "lucide-react";
import BracketTag, { type BracketTagVariant } from "@/components/ui/BracketTag";
import { springPhysics } from "@/lib/motion";

function CornerCrosshairs() {
  return (
    <>
      <span className="absolute top-1.5 left-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute top-1.5 right-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute bottom-1.5 right-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
    </>
  );
}

export type CatalogCategory = "all" | "desktop-apps" | "phone-apps" | "browser-tools" | "ai-workflows";
export type PlatformType = "windows" | "macos" | "web" | "linux" | "ios" | "android";

export interface CatalogApp {
  id: string;
  tag: string;
  tagVariant: BracketTagVariant;
  name: string;
  category: Exclude<CatalogCategory, "all">;
  categoryLabel: string;
  version: string;
  status: string;
  tagline: string;
  description: string;
  highlights: string[];
  pricing: {
    display: string;
    strikethrough?: string;
    badge?: string;
  };
  pills: string[];
  platforms: PlatformType[];
  actions: {
    primary: {
      label: string;
      href: string;
      isLemonSqueezy?: boolean;
      isExternal?: boolean;
    };
    secondary?: {
      label: string;
      href: string;
      isExternal?: boolean;
    };
    tertiary?: {
      label: string;
      href: string;
      isDownload?: boolean;
    };
  };
}

export const CATALOG_APPS: CatalogApp[] = [
  {
    id: "reverie",
    tag: "[01] // FLAGSHIP DEBUT",
    tagVariant: "orange",
    name: "Reverie Pomodoro",
    category: "desktop-apps",
    categoryLabel: "Desktop Instrument",
    version: "v1.0.0",
    status: "SHIPPED // PRODUCTION",
    tagline: "The Chronometric Focus Instrument & Flow Extension Engine",
    description:
      "A precision desktop focus instrument designed for deep work. Features an antialiased circular SVG vector dial, 40Hz Gamma & Deep Brown Noise psychoacoustic sound engine, soft overtime flow extension, and an always-on-top taskbar focus mini-widget. 100% offline local JSON storage. Zero accounts, zero surveillance.",
    highlights: [
      "Multi-lap circular countdown arc scrubbing up to 180 min",
      "Cognitive flow extension with soft overtime count-up (+MM:SS In Flow)",
      "Built-in 40Hz Gamma tone & deep Brownian noise generator",
      "Distraction Dump Pad (Ctrl+D) with 1-click task conversion",
      "Always-on-top frameless taskbar mini-widget overlay",
      "100% offline atomic local JSON persistence (zero cloud telemetry)",
    ],
    pricing: {
      display: "$19 Lifetime",
      strikethrough: "$39",
      badge: "LIFETIME LICENSE",
    },
    pills: [
      "[DESKTOP_EXE • v1.0.0]",
      "[WINDOWS_10/11 x64]",
      "[100%_OFFLINE]",
      "[ZERO_SUBSCRIPTION]",
    ],
    platforms: ["windows"],
    actions: {
      primary: {
        label: "Buy Lifetime ($19)",
        href: "https://sabrylabs.lemonsqueezy.com/checkout/buy/282cd981-bc53-405a-b8ed-b56634a73faa?embed=1",
        isLemonSqueezy: true,
      },
      secondary: {
        label: "Explore 1-Page Showcase",
        href: "/reverie",
      },
      tertiary: {
        label: "Download Trial (.exe)",
        href: "/downloads/Reverie-Setup.exe",
        isDownload: true,
      },
    },
  },
];

const CATEGORY_TABS: Array<{ id: CatalogCategory; tabTag: string; label: string }> = [
  { id: "all", tabTag: "[00]", label: "ALL INSTRUMENTS" },
  { id: "desktop-apps", tabTag: "[01]", label: "DESKTOP APPS" },
];

export default function AppsCatalog() {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = CATALOG_APPS.filter((app) => {
    const matchesCategory =
      activeCategory === "all" || app.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.pills.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Catalog Header */}
      <div className="space-y-4 mb-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <span className="badge-brutal text-[#ff4400] bg-white">
            [CATALOG_INDEX // FLAGSHIP DEBUT]
          </span>
          <span className="badge-brutal bg-[#f4f4ee] text-black">
            DESKTOP INSTRUMENT • WINDOWS 10/11 x64
          </span>
        </div>

        <h1 className="font-space text-4xl sm:text-5xl font-black text-black tracking-tight">
          Software Catalog &amp; Digital Atelier
        </h1>

        <p className="text-sm sm:text-base text-zinc-900 max-w-2xl font-normal leading-relaxed">
          Reverie Pomodoro is our debut software instrument. We build sovereign tools that respect your attention and run on your own hardware with harsh corners, CNC micro-fillets, and zero subscriptions.
        </p>

        {/* Atelier Status Banner */}
        <div className="p-4 border-2 border-black bg-[#f4f4ee] rounded-[3px] font-mono text-xs text-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-brutal-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00a854]"></span>
            <span className="font-bold text-black">[ATELIER STATUS] Reverie Pomodoro is currently our sole released instrument.</span>
          </div>
          <span className="text-zinc-700 font-medium">We ship only finished software. Zero subscriptions.</span>
        </div>
      </div>

      {/* Control Bar: Category Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-black">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 border-2 border-black rounded-[3px] bg-white shadow-brutal-sm overflow-x-auto">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count =
              tab.id === "all"
                ? CATALOG_APPS.length
                : CATALOG_APPS.filter((a) => a.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#ff4400] text-white shadow-brutal-sm"
                    : "text-zinc-700 hover:text-black hover:bg-[#f4f4ee]"
                }`}
              >
                <span>{tab.tabTag}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? "bg-white/25 text-white font-bold"
                      : "bg-[#f0f0eb] text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search software suite..."
            className="w-full h-10 pl-9 pr-4 border-2 border-black rounded-[3px] bg-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-[#ff4400] text-xs font-mono text-black placeholder-zinc-500 font-bold"
          />
        </div>
      </div>

      {/* Catalog Cards List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center card-brutal bg-white space-y-3 font-mono">
              <div className="text-zinc-600 text-sm font-bold">NO TOOLS MATCH QUERY &quot;{searchQuery}&quot;</div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs text-[#ff4400] font-bold hover:underline"
              >
                Reset catalog filters
              </button>
            </div>
          ) : (
            filteredApps.map((app) => (
              <motion.div
                layout
                key={app.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={springPhysics.springSmooth}
                className="relative card-brutal p-6 sm:p-8 bg-white shadow-brutal space-y-6"
              >
                <CornerCrosshairs />

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <BracketTag variant={app.tagVariant} size="sm">
                        {app.tag}
                      </BracketTag>
                      <span className="badge-brutal text-zinc-900 bg-[#f4f4ee]">
                        {app.status}
                      </span>
                    </div>

                    <h2 className="font-space text-2xl sm:text-3xl font-black text-black">
                      {app.name}
                    </h2>

                    <p className="font-mono text-xs sm:text-sm text-[#ff4400] font-bold uppercase tracking-wider">
                      {app.tagline}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="sm:text-right shrink-0">
                    <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-space text-2xl sm:text-3xl font-black text-black tabular-nums">
                          {app.pricing.display}
                        </span>
                        {app.pricing.strikethrough && (
                          <span className="font-mono text-xs text-zinc-500 line-through">
                            {app.pricing.strikethrough}
                          </span>
                        )}
                      </div>
                      {app.pricing.badge && (
                        <span className="text-[10px] font-mono text-[#00a854] font-bold tracking-wider">
                          {app.pricing.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-black leading-relaxed font-medium max-w-4xl">
                  {app.description}
                </p>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
                  {app.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs font-mono font-bold text-black">
                      <Check className="h-3.5 w-3.5 text-[#ff4400] shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Metadata Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-200">
                  {app.pills.map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      className="badge-brutal text-black font-bold bg-[#f4f4ee]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Card Action Bar & Platforms */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t-2 border-black">
                  {/* Platform Compatibility Badges */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono uppercase font-bold text-black">PLATFORMS:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {app.platforms.includes("windows") && (
                        <div
                          title="Windows 10/11 x64 Native"
                          className="badge-brutal bg-white text-black"
                        >
                          <Monitor className="h-3.5 w-3.5 text-[#0088cc]" strokeWidth={2.2} />
                          <span>Windows</span>
                        </div>
                      )}
                      {app.platforms.includes("macos") && (
                        <div
                          title="macOS Native Apple Silicon & Intel"
                          className="badge-brutal bg-white text-black"
                        >
                          <Apple className="h-3.5 w-3.5 text-black" strokeWidth={2.2} />
                          <span>macOS</span>
                        </div>
                      )}
                      {app.platforms.includes("ios") && (
                        <div
                          title="iOS iPhone & iPad"
                          className="badge-brutal bg-white text-black"
                        >
                          <Smartphone className="h-3.5 w-3.5 text-[#0088cc]" strokeWidth={2.2} />
                          <span>iOS</span>
                        </div>
                      )}
                      {app.platforms.includes("android") && (
                        <div
                          title="Android Phone & Tablet"
                          className="badge-brutal bg-white text-black"
                        >
                          <Smartphone className="h-3.5 w-3.5 text-[#00a854]" strokeWidth={2.2} />
                          <span>Android</span>
                        </div>
                      )}
                      {app.platforms.includes("web") && (
                        <div
                          title="Modern Web / WebAssembly"
                          className="badge-brutal bg-white text-black"
                        >
                          <Globe className="h-3.5 w-3.5 text-[#00a854]" strokeWidth={2.2} />
                          <span>Web WASM</span>
                        </div>
                      )}
                      {app.platforms.includes("linux") && (
                        <div
                          title="Linux CLI / X11"
                          className="badge-brutal bg-white text-black"
                        >
                          <Terminal className="h-3.5 w-3.5 text-[#e69500]" strokeWidth={2.2} />
                          <span>Linux</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Buttons Group */}
                  <div className="flex flex-wrap items-center gap-2.5 font-mono">
                    {app.actions.tertiary && (
                      <a
                        href={app.actions.tertiary.href}
                        className="btn-brutal-secondary px-3 py-2 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5 text-[#ff4400]" />
                        <span>{app.actions.tertiary.label}</span>
                      </a>
                    )}

                    {app.actions.secondary && (
                      <a
                        href={app.actions.secondary.href}
                        className="btn-brutal-secondary px-4 py-2 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                        target={app.actions.secondary.isExternal ? "_blank" : undefined}
                        rel={app.actions.secondary.isExternal ? "noreferrer" : undefined}
                      >
                        <span>{app.actions.secondary.label}</span>
                        {app.actions.secondary.isExternal ? (
                          <ExternalLink className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        )}
                      </a>
                    )}

                    {app.actions.primary.isLemonSqueezy ? (
                      <a
                        href={app.actions.primary.href}
                        className="lemonsqueezy-button btn-brutal-primary px-4 py-2 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 tabular-nums"
                        data-theme="light"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>{app.actions.primary.label}</span>
                      </a>
                    ) : (
                      <a
                        href={app.actions.primary.href}
                        className="btn-brutal-primary px-4 py-2 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                        target={app.actions.primary.isExternal ? "_blank" : undefined}
                        rel={app.actions.primary.isExternal ? "noreferrer" : undefined}
                      >
                        <span>{app.actions.primary.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}