"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Shield, Key, Cpu, Zap, RotateCcw } from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
  icon: React.ElementType;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does licensing work? Can I use it on multiple computers?",
    answer:
      "A single $19 lifetime license entitles you to activate and run Reverie concurrently on up to 3 personal machines (both Windows and macOS are supported). We do not impose restrictive DRM or periodic cloud validation heartbeats; your license is validated once and cached cryptographically in local storage.",
    tag: "HARDWARE POLICY",
    icon: Key,
  },
  {
    question: "Is Reverie really 100% offline with zero telemetry?",
    answer:
      "Yes, completely. Reverie operates with total air-gapped data sovereignty. All session records, task checklists, distraction notes, daily goal metrics, and custom presets persist strictly to local atomic JSON files in your operating system's standard application data folder (%APPDATA% on Windows, ~/Library/Application Support on macOS). Zero telemetry packets or analytical pings ever leave your machine.",
    tag: "DATA SOVEREIGNTY",
    icon: Shield,
  },
  {
    question: "How does Flow Extension (Soft Overtime Mode) protect deep work?",
    answer:
      "Traditional Pomodoro timers sound harsh, jarring alarms when the countdown hits 00:00, abruptly fracturing your fragile cognitive flow state. With Flow Extension enabled, Reverie plays a soft, calming chime at 00:00 and automatically transitions into a glowing count-up timer (+01:23 In Flow). Every overtime minute is tracked and credited to your daily focus goal and streak statistics. When you reach a natural stopping point, one click on [Finish & Take Break Now] transitions you to your break.",
    tag: "FLOW EXTENSION",
    icon: Zap,
  },
  {
    question: "What is the psychoacoustic science behind 40Hz Gamma & Brownian Noise?",
    answer:
      "Gamma-frequency oscillations (30–80 Hz, centered at 40 Hz) are correlated with working memory encoding, visual binding, and attentional focus across frontal cortex networks. Reverie mathematically amplitude-modulates a 200Hz sine carrier wave with a 40Hz isochronic pulse to recruit auditory steady-state entrainment without headphone phase issues. Concurrently, our continuous Brownian noise buffer rolls off at 6 dB per octave (1/f²), providing deep low-frequency acoustic masking that neutralizes sudden background distractions without the cognitive fatigue caused by harsh white or pink noise.",
    tag: "PSYCHOACOUSTICS",
    icon: Cpu,
  },
  {
    question: "How does the Taskbar Mini-Widget capsule work?",
    answer:
      "Reverie features an always-on-top, frameless vector capsule docked directly into the Windows taskbar strip. It features a continuous clockwise perimeter depletion border that acts as an ambient visual countdown dial, alongside quick thought-capture actions (+) and overtime status indicators. When you want to return to the full studio dashboard, double-clicking the widget smoothly restores the main window.",
    tag: "DESKTOP OVERLAY",
    icon: Zap,
  },
  {
    question: "What is your refund policy?",
    answer:
      "We provide a complete, no-hassle 14-day money-back guarantee. If Reverie does not meaningfully elevate your focus and deep work momentum, simply contact us via your Lemon Squeezy order confirmation email within 14 days for a prompt 100% refund.",
    tag: "REFUND GUARANTEE",
    icon: RotateCcw,
  },
];

export default function ReverieFaq() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="relative w-full py-16" aria-label="Technical Frequently Asked Questions">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 mb-10">
          <div className="flex items-center gap-3">
            <BracketTag variant="orange">DOCUMENTATION // TECHNICAL FAQ</BracketTag>
            <span className="font-mono text-xs text-[#a1a1aa]">FREQUENTLY ASKED</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Technical Architecture & License Policies
          </h2>
          <p className="text-sm text-[#a1a1aa]">
            Everything you need to know about desktop hardware activation, local persistence, audio science, and our no-risk guarantee.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#121217] border-[#27272a] shadow-lg"
                    : "bg-[#09090b] border-[#27272a]/70 hover:border-[#3f3f46]"
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#ff5722]/15 text-[#ff5722]"
                          : "bg-[#18181c] text-[#a1a1aa]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <span className="font-mono text-[10px] font-semibold text-[#ff5722] tracking-wider uppercase block mb-0.5">
                        {item.tag}
                      </span>
                      <h3 className="text-base font-bold text-white font-sans tracking-tight">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 p-1 rounded-md text-[#a1a1aa]"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#a1a1aa] leading-relaxed border-t border-[#1f1f23]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
