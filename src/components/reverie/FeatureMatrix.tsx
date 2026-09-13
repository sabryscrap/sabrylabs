"use client";

import React from "react";
import {
  Clock,
  Zap,
  BookmarkPlus,
  Radio,
  BarChart3,
  Minimize2,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";

interface SwissFeature {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  specs: string[];
}

const SWISS_FEATURES: SwissFeature[] = [
  {
    index: "[01]",
    title: "Continuous Vector Dial (up to 180 min)",
    subtitle: "MULTI-LAP SVG GEOMETRY",
    description:
      "Large antialiased SVG countdown arc with 5-minute magnetic scrubbing and multi-revolution laps. Overcomes the rigid 25-minute Pomodoro limit to support 90-minute ultradian flow blocks and deep coding marathons.",
    icon: Clock,
    accent: "#ff5722",
    specs: ["180-min extended range", "5m magnetic snap", "Draggable knob scrubber"],
  },
  {
    index: "[02]",
    title: "Flow Extension (+MM:SS soft overtime)",
    subtitle: "COGNITIVE MOMENTUM SHIELD",
    description:
      "When the active interval reaches 00:00, Reverie never interrupts peak flow with shrill alarms. Instead, it plays a gentle chime and smoothly transitions into a glowing amber overtime count-up (+01:42 In Flow).",
    icon: Zap,
    accent: "#f59e0b",
    specs: ["Soft chime transition", "Live overtime crediting", "1-click break transition"],
  },
  {
    index: "[03]",
    title: "Distraction Dump Pad (Ctrl+D quick capture)",
    subtitle: "FRICTIONLESS THOUGHT BUFFER",
    description:
      "Global hotkey (Ctrl+D) intrusive thought capture modal. Type sudden impulses and press Enter to park them instantly without stopping the clock, with 1-click '+ Task' promotion into active priorities.",
    icon: BookmarkPlus,
    accent: "#10b981",
    specs: ["Global hotkey trigger", "1-click task conversion", "Zero context switching"],
  },
  {
    index: "[04]",
    title: "40Hz Neuro-Acoustic Engine (Isochronic Gamma)",
    subtitle: "PURE CLIENT-SIDE SYNTHESIS",
    description:
      "Built-in mathematical sound synthesizer delivering 40Hz Gamma entrainment tones, deep Brownian noise, and calming rain textures directly via Web Audio API. Zero streaming overhead or reliance on external music apps.",
    icon: Radio,
    accent: "#00b4d8",
    specs: ["200Hz carrier AM pulse", "Continuous 1/f² brown noise", "100ms click-free ramps"],
  },
  {
    index: "[05]",
    title: "Mastery XP & Chronometrics",
    subtitle: "QUANTIFIED-SELF RETENTION",
    description:
      "Intrinsic gamified progress engine with 6-tier RPG mastery progression XP, 24-hour focus energy distribution chart, Peak Focus Window detection ('⚡ 9:00 AM – 11:30 AM'), and 52-week consistency heatmap.",
    icon: BarChart3,
    accent: "#ff5722",
    specs: ["24-hour focus distribution", "Peak window detection", "RFC-4180 CSV export"],
  },
  {
    index: "[06]",
    title: "Taskbar Focus Capsule Overlay",
    subtitle: "FRAMELESS TASKBAR ANCHOR",
    description:
      "Always-on-top frameless transparent vector capsule docked directly into the Windows taskbar strip. Features continuous clockwise perimeter depletion, quick-thought capture (+), and soft amber overtime count-up.",
    icon: Minimize2,
    accent: "#10b981",
    specs: ["Docked in taskbar strip", "Continuous perimeter ring", "Double-click full restore"],
  },
];

interface ComparisonRow {
  dimension: string;
  reverie: string;
  reverieHighlight: boolean;
  cloudTimer: string;
  cloudTimerNegative: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Timer Engine & Geometry",
    reverie: "Scrubbable Continuous Vector Dial (up to 180 min)",
    reverieHighlight: true,
    cloudTimer: "Static text countdown (fixed 25 min)",
    cloudTimerNegative: true,
  },
  {
    dimension: "Overtime & Flow State",
    reverie: "Flow Extension (+MM:SS soft overtime count-up)",
    reverieHighlight: true,
    cloudTimer: "Abrupt shrill chime & forced break interruption",
    cloudTimerNegative: true,
  },
  {
    dimension: "Context Fragmentation Defense",
    reverie: "Distraction Dump Pad (Ctrl+D) with 1-click + Task",
    reverieHighlight: true,
    cloudTimer: "None (requires alt-tabbing to external note app)",
    cloudTimerNegative: true,
  },
  {
    dimension: "Focus Sound Engine",
    reverie: "Procedural 40Hz Gamma & Deep Brown Noise (Web Audio)",
    reverieHighlight: true,
    cloudTimer: "None / requires separate Spotify subscription tab",
    cloudTimerNegative: true,
  },
  {
    dimension: "Desktop Integration",
    reverie: "Always-on-top docked Taskbar Focus Capsule",
    reverieHighlight: true,
    cloudTimer: "Hidden inside a background browser tab",
    cloudTimerNegative: true,
  },
  {
    dimension: "Data Sovereignty & Telemetry",
    reverie: "100% Local-First atomic JSON (Zero cloud tracking)",
    reverieHighlight: true,
    cloudTimer: "Mandatory cloud account & tracking cookies",
    cloudTimerNegative: true,
  },
  {
    dimension: "Commercial Model & Pricing",
    reverie: "$19 Lifetime single purchase (Pay once, own forever)",
    reverieHighlight: true,
    cloudTimer: "$8/month perpetual subscription ($96/yr)",
    cloudTimerNegative: true,
  },
];

export default function FeatureMatrix() {
  return (
    <section className="relative w-full py-16" aria-label="Swiss Brutalist Feature Matrix">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-3 mb-10">
        <div className="flex items-center gap-3">
          <BracketTag variant="orange">SPECIFICATION // SWISS INDUSTRIAL ARCHITECTURE</BracketTag>
          <span className="font-mono text-xs text-[#a1a1aa]">[01] - [06] AUDITED</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
          Engineered for Deep Work. Zero Tolerances.
        </h2>
        <p className="max-w-2xl text-base text-[#a1a1aa] leading-relaxed">
          Inspired by Dieter Rams and Swiss brutalism: stark 2px structural borders, 0px border radius, surgical typography, and zero frivolous eye candy.
        </p>
      </div>

      {/* 6-Card Swiss Brutalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SWISS_FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.index}
              className="relative p-6 bg-[#121217] border-2 border-[#27272a] hover:border-[#ff5722] transition-colors duration-200 flex flex-col justify-between"
              style={{ borderRadius: "0px" }}
            >
              {/* Card Header Telemetry */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#27272a]">
                  <span className="font-mono text-base font-bold text-[#ff5722]">
                    {feat.index}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-[#a1a1aa] tracking-wider uppercase">
                    {feat.subtitle}
                  </span>
                  <div
                    className="p-1.5 rounded-sm"
                    style={{ backgroundColor: `${feat.accent}15`, color: feat.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-sans tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                  {feat.description}
                </p>
              </div>

              {/* Technical Specs Checklist */}
              <div className="pt-3 border-t border-[#1f1f23] space-y-1.5 font-mono text-[11px] text-[#71717a]">
                {feat.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ff5722]" />
                    <span className="text-[#a1a1aa]">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chronometric Comparison Table */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-4">
          <BracketTag variant="mint">AUDIT MATRIX // REVERIE VS CLOUD TIMERS</BracketTag>
          <span className="font-mono text-xs text-[#10b981] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% LOCAL-FIRST VERIFIED</span>
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mb-2">
          Side-by-Side Chronometric Architectural Audit
        </h3>
        <p className="text-sm text-[#a1a1aa] mb-6">
          Why knowledge workers switch from generic web countdowns and monthly SaaS rentals to the Reverie native engine.
        </p>

        <div className="w-full overflow-x-auto rounded-none border-2 border-[#27272a] bg-[#121217]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#27272a] bg-[#09090b]">
                <th className="p-4 font-mono font-bold text-[#fafafa] uppercase tracking-wider w-1/3">
                  Architectural Dimension
                </th>
                <th className="p-4 font-mono font-bold text-[#ff5722] uppercase tracking-wider w-1/3 bg-[#ff5722]/5 border-x-2 border-[#27272a]">
                  Reverie Desktop Engine
                </th>
                <th className="p-4 font-mono font-bold text-[#71717a] uppercase tracking-wider w-1/3">
                  Generic Cloud Pomodoro Apps
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f23] font-sans">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#18181c] transition-colors duration-150"
                >
                  <td className="p-4 font-semibold text-white">
                    {row.dimension}
                  </td>
                  <td className="p-4 bg-[#ff5722]/5 border-x-2 border-[#27272a] text-white font-medium">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10b981] shrink-0" />
                      <span>{row.reverie}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#a1a1aa]">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-[#ef4444] shrink-0" />
                      <span>{row.cloudTimer}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
