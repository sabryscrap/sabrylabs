"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Check,
  ShieldCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";
import { springPhysics } from "@/lib/motion";

interface DeliverableItem {
  text: string;
  highlight?: boolean;
}

const DELIVERABLES: DeliverableItem[] = [
  { text: "Windows 10/11 standalone desktop app (.exe)", highlight: true },
  { text: "macOS native build included", highlight: true },
  { text: "All 10 views and themes (Swiss Industrial Light & Tactical OLED Dark)" },
  { text: "Built-in 40Hz Gamma & Brown noise generator (zero network needed)" },
  { text: "Always-on-top taskbar focus mini-widget capsule" },
  { text: "Unlimited custom presets, interval sequences, and task checklists" },
  { text: "100% offline atomic local JSON persistence (zero cloud telemetry)" },
  { text: "Lifetime updates & zero recurring subscriptions", highlight: true },
  { text: "14-day money-back guarantee with zero questions asked", highlight: true },
];

export default function PricingCard() {
  const checkoutUrl = "https://sabrylabs.lemonsqueezy.com/checkout/buy/282cd981-bc53-405a-b8ed-b56634a73faa?embed=1";
  const fallbackUrl = "https://sabrylabs.lemonsqueezy.com/checkout/buy/282cd981-bc53-405a-b8ed-b56634a73faa";

  return (
    <section className="relative w-full py-16" aria-label="Lifetime Pricing & License">
      {/* Container */}
      <div className="relative max-w-4xl mx-auto rounded-2xl bg-[#121217] border border-[#27272a] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff5722]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#1f1f23]">
          <div className="flex items-center gap-2.5">
            <BracketTag variant="orange">LIFETIME ACCESS // SINGLE PURCHASE</BracketTag>
            <span className="font-mono text-xs text-[#10b981] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FOUNDER TIER</span>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#a1a1aa]">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>14-DAY REFUND GUARANTEE</span>
          </div>
        </div>

        {/* Price & Value Proposition Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Price Header & Buy CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
                  $19
                </span>
                <span className="font-mono text-sm text-[#71717a] line-through">
                  $39
                </span>
                <span className="font-mono text-xs text-[#ff5722] bg-[#ff5722]/10 px-2 py-0.5 rounded border border-[#ff5722]/30">
                  SAVE 51%
                </span>
              </div>
              <div className="font-mono text-xs text-[#a1a1aa] mb-4">
                USD • ONE-TIME PAYMENT • NO SUBSCRIPTIONS
              </div>

              <h3 className="text-lg font-bold text-white font-sans mb-2">
                Own the Desktop Engine Forever.
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed mb-6">
                Direct access to the complete standalone desktop application for Windows and macOS. Every feature, theme, and psychoacoustic audio track unlocked with zero monthly fees.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#1f1f23]">
              <motion.a
                whileTap={springPhysics.buttonTap}
                href={checkoutUrl}
                className="lemonsqueezy-button w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-mono text-sm font-bold shadow-glow-btn transition-all duration-200 cursor-pointer select-none text-center"
                data-theme="dark"
              >
                <CreditCard className="w-4 h-4" />
                <span>BUY LIFETIME LICENSE — $19</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] px-1">
                <span>Direct Lemon Squeezy Modal</span>
                <a
                  href={fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a1a1aa] hover:text-[#ff5722] underline underline-offset-2 transition-colors"
                >
                  Hosted Checkout Link
                </a>
              </div>
            </div>
          </div>

          {/* Right: Deliverables Checklist */}
          <div className="lg:col-span-7 bg-[#09090b] rounded-xl border border-[#27272a] p-5 sm:p-6">
            <div className="font-mono text-xs font-bold text-[#fafafa] uppercase tracking-wider mb-4 pb-2 border-b border-[#1f1f23] flex items-center justify-between">
              <span>What&apos;s Included with Your License</span>
              <span className="text-[#10b981]">INSTANT KEY DELIVERY</span>
            </div>

            <ul className="space-y-3">
              {DELIVERABLES.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs">
                  <div className="p-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`leading-relaxed ${
                      item.highlight
                        ? "text-white font-medium"
                        : "text-[#a1a1aa]"
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Device fair use note */}
            <div className="mt-5 pt-4 border-t border-[#1f1f23] flex items-center gap-2 text-[11px] font-mono text-[#71717a]">
              <Zap className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
              <span>1 license valid across up to 3 personal devices (Windows & macOS).</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
