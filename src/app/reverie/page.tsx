"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Check,
  Zap,
  Clock,
  Volume2,
  Layout,
  Flame,
  FileText,
} from "lucide-react";
import MockupCarousel from "@/components/reverie/MockupCarousel";
import AudioTester from "@/components/reverie/AudioTester";

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

export default function ReverieStorefront() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f4] text-black">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative w-full border-b-2 border-black bg-white px-4 pt-12 pb-16 sm:px-6 lg:px-8 bg-swiss-subtle">
        <div className="mx-auto max-w-5xl text-center">
          {/* Hardware Model Stamp (Teenage Engineering Style) */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="badge-brutal text-zinc-900 bg-[#f4f4ee]">
              TE-01 // FIELD INSTRUMENT
            </span>
            <span className="hidden sm:inline-flex badge-brutal text-zinc-900 bg-white">
              WINDOWS 10/11 x64
            </span>
            <span className="badge-brutal bg-[#ff4400] text-white">
              $19 LIFETIME
            </span>
          </div>

          {/* Main Display Headline (Space Grotesk stamped into sheet metal) */}
          <h1 className="font-space text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-black leading-[1.0] max-w-4xl mx-auto">
            The Focus Instrument Engineered for{" "}
            <span className="bg-[#ff4400] text-white px-3 sm:px-4 py-1 inline-block -rotate-1 border-2 border-black rounded-[2px] shadow-brutal-sm">
              Obsessive
            </span>{" "}
            Makers.
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-black leading-relaxed font-medium">
            No recurring monthly subscriptions. No cloud accounts. No surveillance telemetry.
            A tactile Windows focus timer featuring Apple-grade spring physics, Swiss Dieter Rams brutalist themes,
            and real psychoacoustic Gamma sound.
          </p>

          {/* Dual Action CTAs (Gumroad Style) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono">
            <a
              href="https://sabrylabs.lemonsqueezy.com/buy/reverie?embed=1"
              className="lemonsqueezy-button btn-brutal-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider tabular-nums"
              data-theme="light"
            >
              <span>Buy Lifetime License ($19)</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </a>

            <a
              href="/downloads/Reverie-Setup.exe"
              className="btn-brutal-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-bold uppercase tracking-wider"
            >
              <Download className="h-4 w-4" strokeWidth={2.2} />
              <span>Download 14-Day Trial (.exe)</span>
            </a>
          </div>

          {/* Trust Guarantee Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono font-bold text-black tabular-nums">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              Windows 10 &amp; 11 x64
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              Up to 3 Workstations
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              100% Offline Local-First
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              14-Day Refund Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. REAL 9-VIEW PRODUCT CAROUSEL (CLEAN LISTING SCREENSHOTS) ─── */}
      <section className="w-full border-b-2 border-black bg-[#f7f7f4] px-4 py-8 sm:px-6 lg:px-8" id="gallery">
        <div className="mx-auto max-w-6xl">
          <MockupCarousel />
        </div>
      </section>

      {/* ─── 3. FOUNDER MANIFESTO (THE CASE AGAINST SUBSCRIPTIONS) ─── */}
      <section className="w-full border-b-2 border-black bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative card-brutal p-6 sm:p-10 bg-[#f4f4ee]">
            <CornerCrosshairs />
            <div className="flex items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
              <span className="badge-brutal bg-[#ff4400] text-white font-bold">
                [FOUNDER NOTE] // MANIFESTO
              </span>
              <span className="font-mono text-xs font-bold text-black tabular-nums">
                BY SABRY BELAL • FOUNDER &amp; BUILDER
              </span>
            </div>

            <h3 className="font-space text-2xl sm:text-3xl font-black text-black leading-tight tracking-[-0.02em]">
              Why I Built Reverie (And Why You Own It Forever)
            </h3>

            <div className="mt-4 space-y-4 text-sm sm:text-base text-black leading-relaxed font-medium">
              <p>
                Every Pomodoro timer I tried had the same two problems: it was either an overpriced <strong>$12/month recurring SaaS subscription</strong> designed to hold your habit data hostage, or a bloated web wrapper with blurry borders and zero tactile joy.
              </p>
              <p>
                As a software engineer who spends 10+ hours a day in front of screens, I wanted an instrument. Something built with the physical precision of a <strong>Braun audio console</strong>, Apple-grade spring physics, sub-millisecond responsiveness, and psychoacoustic audio that actually quiets cognitive chatter.
              </p>
              <p className="font-black text-black">
                Reverie has zero tracking servers. Zero phone-home checks. Zero recurring monthly fees. You buy it once for $19, install it on your PCs, and keep it forever.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t-2 border-black flex items-center justify-between flex-wrap gap-4 text-xs font-mono font-bold">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-[3px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center font-black shadow-brutal-sm">
                  SB
                </div>
                <div>
                  <div className="text-black font-black">Sabry Belal</div>
                  <div className="text-black/80 font-mono text-xs">Founder &amp; Independent Maker</div>
                </div>
              </div>
              <div className="text-black tabular-nums font-bold">
                DOGFOODED DAILY // SHIPPED 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. CORE FEATURES (SWISS BRUTALIST GRID) ─── */}
      <section className="w-full border-b-2 border-black bg-[#f7f7f4] px-4 py-16 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:text-left">
            <span className="badge-brutal text-[#ff4400] mb-2">
              [01] // CHRONOMETRIC ARCHITECTURE
            </span>
            <h2 className="font-space text-3xl sm:text-4xl font-black text-black tracking-[-0.03em]">
              Engineered with Micro-Precision.
            </h2>
            <p className="mt-2 text-black max-w-xl font-medium text-sm sm:text-base">
              Every detail was calibrated to eliminate context switching, protect flow momentum, and respect your desktop space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#ff4400] text-white rounded-[3px] shadow-brutal-sm">
                    <Clock className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs font-black text-black tabular-nums">[01] // DIAL</span>
                </div>
                <h3 className="text-lg font-black font-space text-black tracking-tight">
                  Antialiased Vector SVG Dial
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  Continuous multi-revolution arc supporting deep work sessions up to 180 minutes. Sub-pixel pointer tracking with 5-minute magnetic snapping.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black flex items-center justify-between font-mono text-[11px] font-bold text-black tabular-nums">
                <span>CAD: Ø 252mm DIAL</span>
                <span>5m SNAP</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#00a854] text-white rounded-[3px] shadow-brutal-sm">
                    <Zap className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs font-black text-black tabular-nums">[02] // FLOW</span>
                </div>
                <h3 className="text-lg font-black font-space text-black tracking-tight">
                  Soft Overtime Flow Mode
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  Never get abruptly jarred out of a breakthrough. When the session reaches 00:00, Reverie seamlessly transitions to count upward in soft overtime.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black flex items-center justify-between font-mono text-[11px] font-bold text-black tabular-nums">
                <span>OVERTIME: +MM:SS</span>
                <span>ZERO-JAR</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#0088cc] text-white rounded-[3px] shadow-brutal-sm">
                    <Volume2 className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs font-black text-black tabular-nums">[03] // SOUND</span>
                </div>
                <h3 className="text-lg font-black font-space text-black tracking-tight">
                  Psychoacoustic Sound Engine
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  Built-in 40Hz Gamma frequency pulses and deep Brownian noise generated in memory on your sound card. Masks distractions with zero loops or clicks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black flex items-center justify-between font-mono text-[11px] font-bold text-black tabular-nums">
                <span>40Hz GAMMA SYNTH</span>
                <span>1/f² NOISE</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#ff4400] text-white rounded-[3px] shadow-brutal-sm">
                    <Layout className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs font-black text-black tabular-nums">[04] // WIDGET</span>
                </div>
                <h3 className="text-lg font-black font-space text-black tracking-tight">
                  Taskbar-Docked Mini-Widget
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  A compact, frameless vector capsule that docks cleanly into your Windows taskbar strip. Features continuous clockwise perimeter countdown depletion.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black flex items-center justify-between font-mono text-[11px] font-bold text-black tabular-nums">
                <span>CHASSIS: 208×44mm</span>
                <span>DOCKED</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#e69500] text-white rounded-[3px] shadow-brutal-sm">
                    <FileText className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs font-black text-black tabular-nums">[05] // CAPTURE</span>
                </div>
                <h3 className="text-lg font-black font-space text-black tracking-tight">
                  Distraction Dump Pad (Ctrl+D)
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  Global hotkey opens an instant thought-capture scratchpad. Hit Enter to save intrusive thoughts, and promote them to your Todo list with 1 click.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black flex items-center justify-between font-mono text-[11px] font-bold text-black tabular-nums">
                <span>LATENCY &lt; 15ms</span>
                <span>GLOBAL HOOK</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#00a854] text-white rounded-[3px] shadow-brutal-sm">
                    <Flame className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs font-black text-black tabular-nums">[06] // AUDIT</span>
                </div>
                <h3 className="text-lg font-black font-space text-black tracking-tight">
                  365-Day Consistency Heatmap
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  GitHub-style chronometric matrix that visualizes every focus minute. 6-tier RPG mastery ranks and 1-click CSV export saved completely locally.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black flex items-center justify-between font-mono text-[11px] font-bold text-black tabular-nums">
                <span>16-WK 112× MATRIX</span>
                <span>OFFLINE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. INTERACTIVE AUDIO SYNTHESIZER STATION ─── */}
      <section className="w-full border-b-2 border-black bg-white px-4 py-12 sm:px-6 lg:px-8" id="audio">
        <div className="mx-auto max-w-6xl">
          <AudioTester />
        </div>
      </section>

      {/* ─── 6. BRUTALIST COMPARISON MATRIX ─── */}
      <section className="w-full border-b-2 border-black bg-[#f7f7f4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center sm:text-left">
            <span className="badge-brutal text-[#ff4400] mb-2">
              [HONEST AUDIT] // THE DIFFERENCE
            </span>
            <h2 className="font-space text-3xl font-black text-black tracking-[-0.03em]">
              Reverie vs. Generic Subscription Timers
            </h2>
          </div>

          <div className="relative card-brutal overflow-hidden">
            <CornerCrosshairs />
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs sm:text-sm tabular-nums">
                <thead>
                  <tr className="border-b-2 border-black bg-black text-white font-black">
                    <th className="p-3 sm:p-4">CRITERIA</th>
                    <th className="p-3 sm:p-4 bg-[#ff4400] text-white">REVERIE ($19 ONCE)</th>
                    <th className="p-3 sm:p-4 text-zinc-300">SUBSCRIPTION TIMERS ($120/YR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  <tr className="bg-white">
                    <td className="p-3 sm:p-4 font-bold text-black">Pricing Model</td>
                    <td className="p-3 sm:p-4 font-black text-[#ff4400]">$19 Lifetime (Own forever)</td>
                    <td className="p-3 sm:p-4 text-black/85 font-medium">$10/month perpetual rent</td>
                  </tr>
                  <tr className="bg-[#f4f4ee]">
                    <td className="p-3 sm:p-4 font-bold text-black">Data Privacy</td>
                    <td className="p-3 sm:p-4 font-black text-[#00a854]">100% Local JSON (Zero cloud)</td>
                    <td className="p-3 sm:p-4 text-black/85 font-medium">Cloud database &amp; tracking cookies</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 sm:p-4 font-bold text-black">Aesthetics &amp; Themes</td>
                    <td className="p-3 sm:p-4 font-black text-black">Swiss Dieter Rams &amp; Tactical OLED</td>
                    <td className="p-3 sm:p-4 text-black/85 font-medium">Generic corporate SaaS blue</td>
                  </tr>
                  <tr className="bg-[#f4f4ee]">
                    <td className="p-3 sm:p-4 font-bold text-black">Overtime Behavior</td>
                    <td className="p-3 sm:p-4 font-black text-[#00a854]">Gentle Soft Overtime (+MM:SS)</td>
                    <td className="p-3 sm:p-4 text-black/85 font-medium">Harsh blaring alarm that disrupts flow</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 sm:p-4 font-bold text-black">Desktop Integration</td>
                    <td className="p-3 sm:p-4 font-black text-black">Native Windows Taskbar Mini-Widget</td>
                    <td className="p-3 sm:p-4 text-black/85 font-medium">Lost behind 40 browser tabs</td>
                  </tr>
                  <tr className="bg-[#f4f4ee]">
                    <td className="p-3 sm:p-4 font-bold text-black">Offline Resilience</td>
                    <td className="p-3 sm:p-4 font-black text-[#00a854]">Runs 100% without internet</td>
                    <td className="p-3 sm:p-4 text-black/85 font-medium">Fails when Wi-Fi drops</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. GUMROAD-STYLE PRICING CARD ─── */}
      <section className="w-full border-b-2 border-black bg-white px-4 py-20 sm:px-6 lg:px-8" id="pricing">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge-brutal text-[#ff4400] mb-2">
              [TRANSPARENT VALUE] // ONE-TIME PURCHASE
            </span>
            <h2 className="font-space text-3xl sm:text-5xl font-black text-black tracking-[-0.03em]">
              Buy Once. Own Forever.
            </h2>
            <p className="mt-3 text-black font-medium text-base">
              No renewal fees. No activation server locks. Full access to all features.
            </p>
          </div>

          {/* Big Gumroad Card with Teenage Engineering Touches */}
          <div className="relative card-brutal p-6 sm:p-10 bg-[#f4f4ee] shadow-brutal-lg">
            <CornerCrosshairs />

            {/* QA Batch & Barcode Top Band */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-black font-mono text-[10px] font-bold">
              <div className="tracking-[0.25em] text-black select-none uppercase font-bold">
                ||| | |||| || | | |||
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-brutal bg-[#f4f4ee] text-black border border-black font-bold">
                  LOT 2026 // QC PASS
                </span>
                <span className="badge-brutal bg-[#ff4400] text-white font-bold">
                  LIFETIME LICENSE
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b-2 border-black pb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-black font-space tracking-tight">
                  Reverie Focus Instrument
                </h3>
                <p className="text-xs font-mono font-bold text-black mt-1">
                  WINDOWS 10/11 COMPATIBLE • INSTANT KEY DELIVERY
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-2">
                  <span className="font-space text-5xl font-black text-black tabular-nums tracking-tight">$19</span>
                  <span className="font-mono text-sm line-through text-black/70 font-bold tabular-nums">$39</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#00a854] tracking-wider">
                  ONE-TIME PAYMENT
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-[2px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  Native Windows (.exe) Installer + Portable ZIP
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-[2px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-mono font-bold text-black tabular-nums">
                  Valid for up to 3 personal machines
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-[2px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  All v1.x and future major updates included
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-[2px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  Built-in 40Hz Gamma &amp; Brownian focus audio
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-[2px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  Taskbar sticky mini-widget &amp; Ctrl+D dump pad
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-[2px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-mono font-bold text-black tabular-nums">
                  14-day no-questions-asked refund guarantee
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-black font-mono">
              <a
                href="https://sabrylabs.lemonsqueezy.com/buy/reverie?embed=1"
                className="lemonsqueezy-button btn-brutal-primary flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 tabular-nums"
                data-theme="light"
              >
                <span>Buy Reverie ($19)</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </a>

              <a
                href="/downloads/Reverie-Setup.exe"
                className="btn-brutal-secondary py-4 px-6 text-center text-xs font-mono uppercase tracking-wider inline-flex items-center justify-center gap-2 font-bold"
              >
                <Download className="h-4 w-4" strokeWidth={2.2} />
                <span>14-Day Free Trial (.exe)</span>
              </a>
            </div>

            <div className="mt-4 text-center">
              <span className="font-mono text-[11px] text-black font-bold">
                CAD SPEC: 0-CLOUD • HARDWARE TOLERANCE: ±0.00mm • SECURED VIA LEMON SQUEEZY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature Requests Link ─── */}
      <section className="w-full border-b-2 border-black bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative card-brutal p-6 sm:p-8 bg-[#f4f4ee] overflow-hidden">
            <CornerCrosshairs />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="font-space text-xl sm:text-2xl font-black text-black">
                  Have a feature idea?
                </h3>
                <p className="text-sm text-zinc-600 font-sans max-w-md">
                  Vote on what we build next or propose your own. All requests go to our public GitHub backlog.
                </p>
              </div>
              <Link
                href="/reverie/features"
                className="btn-brutal-primary px-6 py-3 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shrink-0"
              >
                <span>Feature Requests</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FREQUENTLY ASKED QUESTIONS ─── */}
      <section className="w-full bg-[#f7f7f4] px-4 py-16 sm:px-6 lg:px-8" id="faq">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <span className="badge-brutal text-[#ff4400] mb-2">
              [04] // COMMON INQUIRIES
            </span>
            <h2 className="font-space text-3xl font-black text-black tracking-[-0.03em]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="relative card-brutal p-5 bg-white">
              <CornerCrosshairs />
              <h4 className="font-space text-base font-black text-black tracking-tight">
                How does the 14-day free trial work?
              </h4>
              <p className="mt-2 text-sm text-black font-medium leading-relaxed">
                Download the standalone .exe installer. You get 14 full days of completely unrestricted access with all themes, soundscapes, and widget features. No credit card or email required to test.
              </p>
            </div>

            <div className="relative card-brutal p-5 bg-white">
              <CornerCrosshairs />
              <h4 className="font-space text-base font-black text-black tracking-tight">
                How many machines can I activate?
              </h4>
              <p className="mt-2 text-sm text-black font-medium leading-relaxed">
                A single $19 lifetime license key allows you to activate Reverie on up to 3 personal Windows machines simultaneously (e.g. desktop workstation and laptop).
              </p>
            </div>

            <div className="relative card-brutal p-5 bg-white">
              <CornerCrosshairs />
              <h4 className="font-space text-base font-black text-black tracking-tight">
                Does Reverie require an internet connection?
              </h4>
              <p className="mt-2 text-sm text-black font-medium leading-relaxed">
                No. After a 1-second initial key verification, Reverie runs 100% offline. All settings, tasks, thought dumps, and consistency stats are saved locally as plain JSON on your machine.
              </p>
            </div>

            <div className="relative card-brutal p-5 bg-white">
              <CornerCrosshairs />
              <h4 className="font-space text-base font-black text-black tracking-tight">
                What is your refund policy?
              </h4>
              <p className="mt-2 text-sm text-black font-medium leading-relaxed">
                We offer a 14-day, 100% money-back guarantee. If Reverie doesn&apos;t improve your daily focus and workflow, email us or message on X (@sabrybelal) for an instant refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
