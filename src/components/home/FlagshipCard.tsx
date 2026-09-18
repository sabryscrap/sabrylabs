"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Download,
  ShoppingBag,
  Sparkles,
  Layers,
  Volume2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import { springPhysics } from "@/lib/motion";

const FEATURES = [
  {
    icon: Clock,
    title: "Multi-Lap Vector Dial",
    desc: "Scrubbable 60m & extended 180m multi-lap circular SVG countdown arc.",
  },
  {
    icon: Sparkles,
    title: "Flow Extension Overtime",
    desc: "Smooth count-up (+MM:SS In Flow) at 00:00 instead of jarring alarms.",
  },
  {
    icon: Volume2,
    title: "40Hz Gamma & Brown Noise",
    desc: "Pure mathematical Web Audio synthesis for cognitive masking.",
  },
  {
    icon: Layers,
    title: "Taskbar Mini-Widget",
    desc: "Always-on-top capsule docked on the taskbar with clockwise depletion.",
  },
  {
    icon: ShieldCheck,
    title: "100% Offline & Local",
    desc: "Atomic JSON storage in %APPDATA%. Zero telemetry. Zero accounts.",
  },
];

export default function FlagshipCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={springPhysics.springSmooth}
      className="w-full max-w-6xl mx-auto my-16 px-4"
    >
      <div className="relative rounded-2xl bg-[#121217] border border-[#27272a] shadow-card overflow-hidden">
        {/* Subtle orange accent ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff5722]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
          {/* Left Column: Product Information (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Metadata Tags Header */}
            <div className="flex flex-wrap items-center gap-2.5">
              <BracketTag variant="orange">[01] // FLAGSHIP_APP</BracketTag>
              <Pill variant="mint" ping={false}>
                DESKTOP_EXE • v1.0.0
              </Pill>
              <span className="text-xs font-mono text-[#a1a1aa] bg-[#1a1a22] px-2 py-0.5 rounded border border-[#27272a]">
                WINDOWS 10/11 &amp; MACOS
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#ffffff]">
                Reverie Pomodoro
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#ff5722] font-medium">
                The Chronometric Focus Companion &amp; Flow Extension Engine
              </p>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
              A distraction-free desktop focus instrument crafted for engineers, designers, and deep workers. Engineered in React 19 and Electron with sub-pixel SVG rendering, multi-channel acoustic loops, and zero cloud lock-in.
            </p>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-1 rounded bg-[#ff5722]/10 border border-[#ff5722]/25 text-[#ff5722] shrink-0 mt-0.5">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-[#fafafa]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#a1a1aa] leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing & Commercial Section */}
            <div className="pt-4 border-t border-[#27272a] flex flex-wrap items-baseline gap-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-[#fafafa]">
                  $19
                </span>
                <span className="font-mono text-xs text-[#a1a1aa] uppercase tracking-wider">
                  USD Lifetime
                </span>
                <span className="font-mono text-xs text-[#71717a] line-through ml-1">
                  $39
                </span>
              </div>
              <span className="text-xs font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/25">
                51% LAUNCH DISCOUNT • PAY ONCE, OWN FOREVER
              </span>
            </div>

            {/* Direct Action Triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Lemon Squeezy Buy Button */}
              <a
                href="https://sabrylabs.lemonsqueezy.com/checkout/buy/282cd981-bc53-405a-b8ed-b56634a73faa?embed=1"
                className="lemonsqueezy-button inline-flex items-center justify-center gap-2 h-11 px-6 font-mono font-semibold text-xs tracking-wider uppercase rounded-lg bg-[#ff5722] hover:bg-[#f4511e] text-white shadow-glow-btn transition-colors"
                data-theme="dark"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Buy Lifetime ($19)</span>
              </a>

              {/* Showcase & Audio Tester Link */}
              <Button
                variant="secondary"
                size="md"
                href="/apps/reverie"
                className="font-mono text-xs uppercase tracking-wider"
              >
                <span>Explore Showcase</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

              {/* Free Trial Button */}
              <Button
                variant="outline"
                size="md"
                href="https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11?embed=1"
                className="lemonsqueezy-button font-mono text-xs uppercase tracking-wider text-[#a1a1aa] hover:text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>14-Day Free Trial</span>
              </Button>
            </div>
          </div>

          {/* Right Column: 4K Mockup Presentation (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <Link
              href="/apps/reverie"
              className="group block relative rounded-xl border border-[#27272a] bg-[#09090b] overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#ff5722]/60 hover:shadow-glow-orange"
            >
              {/* Studio Clean Room Frame Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#18181c] border-b border-[#27272a] text-[10px] font-mono text-[#a1a1aa]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ff5722]/80" />
                  <span className="font-semibold text-white">REVERIE_DESKTOP_STAGE</span>
                </div>
                <span className="text-zinc-500">FIG 01 // 4K RENDER</span>
              </div>

              {/* 4K Image Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#09090b]">
                <Image
                  src="/images/reverie/mockup_01_hero_dashboard.png"
                  alt="Reverie Pomodoro Desktop Split-Dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Bottom Caption Pill */}
              <div className="px-4 py-2.5 bg-[#121217] border-t border-[#27272a] flex items-center justify-between text-xs font-mono">
                <span className="text-[#a1a1aa]">
                  Reversed Split-Dashboard with 60m Vector Arc
                </span>
                <span className="text-[#ff5722] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View 10-Scene Gallery</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}