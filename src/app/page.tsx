"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Check,
  Zap,
  Shield,
  Terminal,
  Coins,
  Layers,
  BookOpen,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HOME_PREVIEW_SCENES = [
  { figure: "FIG 01 // SWISS INDUSTRIAL CHASSIS", src: "/images/clean_listing/01_hero_swiss_light_clean.png", alt: "Swiss Industrial Light Edition" },
  { figure: "FIG 02 // 30-MIN CONTINUOUS VECTOR DIAL", src: "/images/clean_listing/02_timer_dial_30m_clean.png", alt: "Vector Countdown Dial" },
  { figure: "FIG 03 // ACTIVE WORK SESSION & FLOW", src: "/images/clean_listing/03_timer_active_running_clean.jpg", alt: "Active Running Timer Session" },
  { figure: "FIG 04 // PRESET SEQUENCE EDITOR", src: "/images/clean_listing/04_preset_editor_0m36s_clean.jpg", alt: "Preset Sequence Calibration" },
  { figure: "FIG 05 // COMPREHENSIVE WORKFLOW SUITE", src: "/images/clean_listing/05_preset_editor_full_clean.jpg", alt: "Full Preset Manager" },
  { figure: "FIG 06 // PSYCHOACOUSTIC SOUND ENGINE", src: "/images/clean_listing/06_ambient_sounds_1m05s_clean.jpg", alt: "Ambient Sound Card" },
  { figure: "FIG 07 // TACTICAL OLED PURE BLACK", src: "/images/clean_listing/07_oled_pure_black_clean.jpg", alt: "Tactical OLED Dark Theme" },
  { figure: "FIG 08 // DEEP WORK CONSISTENCY MATRIX", src: "/images/clean_listing/08_stats_dashboard_clean.jpg", alt: "Deep Work Consistency Matrix" },
  { figure: "FIG 09 // WORKDAY SHUTDOWN RITUAL", src: "/images/clean_listing/09_shutdown_ritual_2m12s_clean.jpg", alt: "Shutdown Ritual Modal" },
];

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

export default function SabryLabsStudioHomepage() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const activeScene = HOME_PREVIEW_SCENES[previewIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewIndex((prev) => (prev > 0 ? prev - 1 : HOME_PREVIEW_SCENES.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewIndex((prev) => (prev < HOME_PREVIEW_SCENES.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f4] text-black">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative w-full border-b-2 border-black bg-white px-4 pt-14 pb-20 sm:px-6 lg:px-8 bg-swiss-subtle">
        <div className="mx-auto max-w-5xl text-center">
          {/* Atelier Stamp */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="badge-brutal text-zinc-900 bg-[#f4f4ee]">
              SL-00 // DIGITAL ATELIER: DESKTOP • PHONE • WEB
            </span>
            <span className="badge-brutal bg-[#ff4400] text-white">
              SOVEREIGN SOFTWARE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-space text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-black leading-[1.0] max-w-4xl mx-auto">
            We Build Authentic Desktop, Phone &amp; Web Apps.{" "}
            <span className="bg-[#ff4400] text-white px-3 sm:px-4 py-1 inline-block -rotate-1 border-2 border-black rounded-[2px] shadow-brutal-sm mt-2 sm:mt-0">
              No Subscriptions.
            </span>{" "}
            No Ads. No Decay.
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-black leading-relaxed font-medium">
            Software should be treated like fine physical art: precision-engineered, uncompromisingly tactile, and purchased once to be owned for its purpose. From desktop instruments and mobile utilities to in-browser creative tools, we craft sovereign software that runs on your own hardware with harsh corners, CNC micro-fillets, and zero corporate bloat.
          </p>

          {/* Dual Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono">
            <Link
              href="/apps"
              className="btn-brutal-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider tabular-nums"
            >
              <span>[01] Explore All Apps</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>

            <Link
              href="/about"
              className="btn-brutal-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-bold uppercase tracking-wider"
            >
              <span>[02] About The Studio</span>
            </Link>
          </div>

          {/* Philosophy Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono font-bold text-black tabular-nums">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              Desktop, Phone &amp; Web Apps
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              1-Time Purchase or 100% Free
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              Zero Telemetry / Zero Cloud Lock-in
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#ff4400]" strokeWidth={2.5} />
              Transparent At-Cost AI Unit Economics
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. THINGS WE MADE (REVERIE POMODORO) ─── */}
      <section className="w-full border-b-2 border-black bg-[#f7f7f4] px-4 py-16 sm:px-6 lg:px-8" id="apps">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-brutal text-[#ff4400] bg-white">
                  [01] // DEBUT INSTRUMENT
                </span>
                <span className="font-mono text-xs font-bold text-black tabular-nums">
                  DESKTOP FOCUS INSTRUMENT • WINDOWS 10/11 x64
                </span>
              </div>
              <h2 className="font-space text-3xl sm:text-5xl font-black text-black tracking-[-0.03em]">
                Things We Made.
              </h2>
              <p className="mt-2 text-zinc-900 max-w-xl font-medium text-sm sm:text-base leading-relaxed">
                Reverie Pomodoro is our debut software instrument, built out of personal frustration with abrasive alarms, fragmented focus, and recurring subscription rent. Tested and dogfooded every single day.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/reverie"
                className="btn-brutal-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Inspect Reverie (1-Page)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Creation Spotlight: Reverie Pomodoro (Desktop Instrument) */}
          <div className="relative card-brutal p-6 sm:p-10 bg-white shadow-brutal-lg">
            <CornerCrosshairs />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Product Info */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="badge-brutal bg-[#ff4400] text-white">
                    [01] DESKTOP INSTRUMENT
                  </span>
                  <span className="badge-brutal bg-[#f4f4ee] text-black">
                    WINDOWS 10/11 x64
                  </span>
                  <span className="badge-brutal bg-[#00a854] text-white">
                    $19 LIFETIME
                  </span>
                </div>

                <div>
                  <h3 className="font-space text-3xl sm:text-4xl font-black text-black tracking-tight">
                    Reverie Pomodoro
                  </h3>
                  <p className="font-mono text-xs font-bold text-[#ff4400] mt-1 uppercase tracking-wider">
                    The Tactile Focus Instrument with Apple Spring Physics &amp; Dieter Rams Themes
                  </p>
                </div>

                <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-normal">
                  A distraction-free Windows desktop focus timer engineered for relentless deep work. Features an antialiased circular SVG vector dial up to 180 min, 40Hz Gamma &amp; Brownian noise psychoacoustic sound engine, soft overtime flow extension, and an always-on-top taskbar focus mini-widget. 100% offline local JSON storage. Zero accounts, zero surveillance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-mono font-bold text-black">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-[1px] bg-[#ff4400]"></span>
                    <span>Scrubbable SVG Arc (up to 180 min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-[1px] bg-[#ff4400]"></span>
                    <span>40Hz Gamma Binaural Synthesizer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-[1px] bg-[#ff4400]"></span>
                    <span>Taskbar-Docked Mini-Widget Capsule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-[1px] bg-[#ff4400]"></span>
                    <span>Distraction Dump Pad (Ctrl+D)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t-2 border-black flex flex-wrap items-center gap-3 font-mono">
                  <Link
                    href="/reverie"
                    className="btn-brutal-primary px-6 py-3 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <span>Explore Reverie Instrument (1-Page)</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                  </Link>

                  <a
                    href="https://sabrylabs.lemonsqueezy.com/checkout/buy/282cd981-bc53-405a-b8ed-b56634a73faa?embed=1"
                    className="lemonsqueezy-button btn-brutal-secondary px-5 py-3 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 tabular-nums"
                    data-theme="light"
                  >
                    <span>Buy Lifetime ($19)</span>
                  </a>

                  <a
                    href="https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11?embed=1"
                    className="lemonsqueezy-button text-xs font-mono font-bold text-black hover:text-[#ff4400] inline-flex items-center gap-1.5 px-3 py-2 border-2 border-transparent hover:border-black rounded-[2px]"
                    data-theme="light"
                  >
                    <Download className="h-3.5 w-3.5 text-[#ff4400]" />
                    <span>14-Day Free Trial</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Screenshot Preview with Next/Back Navigation */}
              <div className="lg:col-span-5">
                <div className="relative border-2 border-black rounded-[3px] overflow-hidden bg-[#e9e9e4] shadow-brutal">
                  {/* Top Bar with Figure and Controls */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#f4f4ee] border-b-2 border-black font-mono text-[10px] font-bold">
                    <span className="text-black truncate pr-2">{activeScene.figure}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-zinc-600 mr-1 tabular-nums font-mono">
                        {previewIndex + 1}/{HOME_PREVIEW_SCENES.length}
                      </span>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous screenshot"
                        className="p-1 bg-white hover:bg-[#ff4400] hover:text-white border-2 border-black rounded-[2px] transition-colors shadow-brutal-xs cursor-pointer"
                        title="Previous (Back)"
                      >
                        <ChevronLeft className="h-3 w-3" strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next screenshot"
                        className="p-1 bg-white hover:bg-[#ff4400] hover:text-white border-2 border-black rounded-[2px] transition-colors shadow-brutal-xs cursor-pointer"
                        title="Next"
                      >
                        <ChevronRight className="h-3 w-3" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Image Display with Floating Navigation Arrows */}
                  <div className="relative aspect-[16/10] w-full bg-white group">
                    <Link href="/reverie" className="block w-full h-full relative cursor-pointer" title="Click to view full instrument details">
                      <Image
                        src={activeScene.src}
                        alt={activeScene.alt}
                        fill
                        className="object-contain p-2 select-none transition-transform duration-200 group-hover:scale-[1.01]"
                        priority={previewIndex === 0}
                      />
                    </Link>

                    {/* Floating Side Arrows on Image (Prev/Back & Next) */}
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous preview"
                      title="Previous Image (Back)"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-[#ff4400] hover:text-white text-black p-2 border-2 border-black rounded-[2px] shadow-brutal transition-all z-20 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next preview"
                      title="Next Image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-[#ff4400] hover:text-white text-black p-2 border-2 border-black rounded-[2px] shadow-brutal transition-all z-20 cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Bottom Footer Bar */}
                  <div className="px-3 py-1.5 bg-[#f4f4ee] border-t-2 border-black flex items-center justify-between font-mono text-[10px]">
                    <span className="text-zinc-600 font-bold truncate max-w-[240px]">{activeScene.alt}</span>
                    <Link href="/reverie" className="text-[#ff4400] font-bold hover:underline inline-flex items-center gap-1 shrink-0">
                      <span>OPEN 1-PAGE</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. ENGINEERING BLOG & LOGBOOK ─── */}
      <section className="w-full border-b-2 border-black bg-[#f7f7f4] px-4 py-20 sm:px-6 lg:px-8" id="blog">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-brutal text-[#ff4400]">
                  [02] // ENGINEERING BLOG
                </span>
                <span className="font-mono text-xs font-bold text-black tabular-nums">
                  RADICAL TRANSPARENCY &amp; DEVLOGS
                </span>
              </div>
              <h2 className="font-space text-3xl sm:text-5xl font-black text-black tracking-[-0.03em]">
                Field Notes &amp; Devlogs.
              </h2>
              <p className="mt-2 text-black max-w-xl font-medium text-sm sm:text-base">
                Honest retrospectives on real focus bottlenecks, cognitive flow, and how thoughtful software design solves everyday workflow struggles.
              </p>
            </div>

            <Link
              href="/logbook"
              className="btn-brutal-secondary px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#ff4400]" />
              <span>Browse All Articles &amp; RSS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Article 1 */}
            <article className="relative card-brutal-interactive p-6 bg-white flex flex-col justify-between shadow-brutal border-2 border-black rounded-[3px]">
              <CornerCrosshairs />
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="badge-brutal bg-[#ff4400] text-white">
                    FOCUS &amp; FLOW
                  </span>
                  <span className="flex items-center gap-1 text-black font-bold">
                    <Clock className="h-3 w-3 text-[#ff4400]" />
                    <span>7 min</span>
                  </span>
                </div>

                <Link href="/logbook/how-i-built-reverie" className="block group">
                  <h3 className="font-space text-lg font-black text-black group-hover:text-[#ff4400] transition-colors leading-snug">
                    Why I Built Reverie: The 5 Focus Problems Standard Timers Couldn&apos;t Solve
                  </h3>
                </Link>

                <p className="text-sm text-black leading-relaxed font-medium">
                  How replacing abrasive alarms with gentle Overtime Flow (+MM:SS), docking a mini-widget on the taskbar, and adding a 1-click Distraction Dump Pad transformed my daily productivity.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-black flex items-center gap-1 font-bold">
                  <Calendar className="h-3 w-3 text-black" />
                  <span>2026-09-01</span>
                </span>
                <Link
                  href="/logbook/how-i-built-reverie"
                  className="text-[#ff4400] hover:underline inline-flex items-center gap-1 font-bold"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* Article 2 */}
            <article className="relative card-brutal-interactive p-6 bg-white flex flex-col justify-between shadow-brutal border-2 border-black rounded-[3px]">
              <CornerCrosshairs />
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="badge-brutal bg-black text-white">
                    DEEP WORK
                  </span>
                  <span className="flex items-center gap-1 text-black font-bold">
                    <Clock className="h-3 w-3 text-[#ff4400]" />
                    <span>5 min</span>
                  </span>
                </div>

                <Link href="/logbook/why-pomodoro-fails-knowledge-workers" className="block group">
                  <h3 className="font-space text-lg font-black text-black group-hover:text-[#ff4400] transition-colors leading-snug">
                    Why Traditional Pomodoro Fails Knowledge Workers (And How Overtime Flow Fixed It)
                  </h3>
                </Link>

                <p className="text-sm text-black leading-relaxed font-medium">
                  Standard Pomodoro assumes human cognition is mechanical. Why rigid 25-minute stops break programming flow state, and how counting up softly removes timer anxiety.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-black flex items-center gap-1 font-bold">
                  <Calendar className="h-3 w-3 text-black" />
                  <span>2026-09-05</span>
                </span>
                <Link
                  href="/logbook/why-pomodoro-fails-knowledge-workers"
                  className="text-[#ff4400] hover:underline inline-flex items-center gap-1 font-bold"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* Article 3 */}
            <article className="relative card-brutal-interactive p-6 bg-white flex flex-col justify-between shadow-brutal border-2 border-black rounded-[3px]">
              <CornerCrosshairs />
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="badge-brutal bg-[#00a854] text-white">
                    SOVEREIGNTY
                  </span>
                  <span className="flex items-center gap-1 text-black font-bold">
                    <Clock className="h-3 w-3 text-[#ff4400]" />
                    <span>6 min</span>
                  </span>
                </div>

                <Link href="/logbook/the-death-of-software-ownership" className="block group">
                  <h3 className="font-space text-lg font-black text-black group-hover:text-[#ff4400] transition-colors leading-snug">
                    The Death of Software Ownership: Why We Refuse Subscriptions &amp; Cloud Lock-in
                  </h3>
                </Link>

                <p className="text-sm text-black leading-relaxed font-medium">
                  Why should a desktop timer demand $12/month and phone home to tracking servers? The case for 100% offline local storage, zero accounts, and buying a tool once to own it forever.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-black flex items-center gap-1 font-bold">
                  <Calendar className="h-3 w-3 text-black" />
                  <span>2026-09-08</span>
                </span>
                <Link
                  href="/logbook/the-death-of-software-ownership"
                  className="text-[#ff4400] hover:underline inline-flex items-center gap-1 font-bold"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── 5. THE HONEST PRICING TRUTH (UNIT ECONOMICS LAW) ─── */}
      <section className="w-full border-b-2 border-black bg-white px-4 py-20 sm:px-6 lg:px-8" id="pricing-truth">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center sm:text-left">
            <span className="badge-brutal text-[#ff4400] mb-2">
              [THE UNIT ECONOMICS LAW] // RADICAL HONESTY
            </span>
            <h2 className="font-space text-3xl sm:text-5xl font-black text-black tracking-[-0.03em]">
              The Honest Pricing Truth.
            </h2>
            <p className="mt-3 text-black max-w-2xl font-medium text-base sm:text-lg">
              We don&apos;t play games with monetization. We follow a strict, non-negotiable law grounded in real server compute:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rule 1: Zero Marginal Server Cost */}
            <div className="relative card-brutal p-6 sm:p-8 bg-[#f4f4ee] shadow-brutal flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#00a854] text-white rounded-[3px] shadow-brutal-sm">
                    <Shield className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <span className="badge-brutal bg-[#00a854] text-white font-bold">
                    RULE 01 // 1-TIME OR FREE
                  </span>
                </div>

                <h3 className="text-2xl font-black font-space text-black tracking-tight">
                  Zero Marginal Cost = Zero Subscriptions.
                </h3>

                <div className="mt-4 space-y-3 text-sm text-black leading-relaxed font-medium">
                  <p>
                    If an application runs on your local computer or phone, using your CPU, your GPU, your sound card, and your disk—<strong>it costs us exactly $0.00 per month to keep running</strong>.
                  </p>
                  <p>
                    Charging a monthly fee for software that incurs zero ongoing marginal compute cost is not a business model—it is extractive rent.
                  </p>
                  <p className="font-black text-black">
                    For local software like Reverie, you pay once ($19). Zero subscriptions. Zero ads. Forever.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold flex items-center justify-between text-[#00a854]">
                <span>APPLIES TO: DESKTOP, PHONE, WEB APPS</span>
                <span>$0 MONTHLY RENT</span>
              </div>
            </div>

            {/* Rule 2: Variable Cloud / API Cost */}
            <div className="relative card-brutal p-6 sm:p-8 bg-[#f4f4ee] shadow-brutal flex flex-col justify-between">
              <CornerCrosshairs />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border-2 border-black bg-[#ff4400] text-white rounded-[3px] shadow-brutal-sm">
                    <Coins className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <span className="badge-brutal bg-[#ff4400] text-white font-bold">
                    RULE 02 // AT-COST COMPUTE
                  </span>
                </div>

                <h3 className="text-2xl font-black font-space text-black tracking-tight">
                  Real Compute Costs Real Money.
                </h3>

                <div className="mt-4 space-y-3 text-sm text-black leading-relaxed font-medium">
                  <p>
                    We are engineers, not clowns. If an app we build genuinely consumes real variable server resources every month—such as cloud LLM API tokens, remote GPU inference clusters, or heavy third-party credits:
                  </p>
                  <p className="font-black text-black">
                    Of course we charge per month or at-cost per token to cover the actual compute bill.
                  </p>
                  <p>
                    We will never pretend cloud compute is free, we will never subsidize users with predatory venture capital debt, and we will never pull bait-and-switch billing traps.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold flex items-center justify-between text-[#ff4400]">
                <span>APPLIES TO: CLOUD AI PIPELINES</span>
                <span>TRANSPARENT AT-COST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. SOFTWARE AS AUTHENTIC INDUSTRIAL ART ─── */}
      <section className="w-full border-b-2 border-black bg-[#f7f7f4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center sm:text-left">
            <span className="badge-brutal text-[#ff4400] mb-2">
              [DESIGN ETHOS] // PHYSICALITY OF SOFTWARE
            </span>
            <h2 className="font-space text-3xl sm:text-5xl font-black text-black tracking-[-0.03em]">
              Crafted Like Physical Industrial Art.
            </h2>
            <p className="mt-3 text-black max-w-2xl font-medium text-base sm:text-lg">
              Digital instruments should have the same tactile heft, deliberate geometry, and functional purity as the iconic hardware of Dieter Rams and Teenage Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between bg-white">
              <CornerCrosshairs />
              <div>
                <div className="p-2.5 border-2 border-black bg-[#ff4400] text-white rounded-[3px] shadow-brutal-sm w-fit mb-4">
                  <Layers className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-black font-space text-black tracking-tight">
                  Harsh Corners &amp; CNC Precision
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  No generic rounded squircles. We cut interfaces with 2px solid structural borders, sharp 90° corners, 3px CNC micro-fillets, and technical drafting crosshairs.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-black font-mono text-[11px] font-bold text-black">
                CHASSIS: ±0.00mm TOLERANCE
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between bg-white">
              <CornerCrosshairs />
              <div>
                <div className="p-2.5 border-2 border-black bg-[#00a854] text-white rounded-[3px] shadow-brutal-sm w-fit mb-4">
                  <Zap className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-black font-space text-black tracking-tight">
                  Sub-16ms Spring Physics
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  Mechanical feedback you can feel. Buttons snap down 2px with hard shadows, dials feature magnetic haptic detents, and modals emerge with calibrated spring velocity.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-black font-mono text-[11px] font-bold text-black">
                LATENCY: &lt; 16ms INTERACTION
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="relative card-brutal-interactive p-6 flex flex-col justify-between bg-white">
              <CornerCrosshairs />
              <div>
                <div className="p-2.5 border-2 border-black bg-[#0088cc] text-white rounded-[3px] shadow-brutal-sm w-fit mb-4">
                  <Terminal className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-black font-space text-black tracking-tight">
                  Local Data Sovereignty
                </h3>
                <p className="mt-2 text-sm text-black leading-relaxed font-normal">
                  All state is written to atomic, plain JSON files in your local storage. You can inspect it, back it up with Git, or export it to CSV with 1 click.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-black font-mono text-[11px] font-bold text-black">
                STORAGE: 100% LOCAL FILES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FOUNDER STATEMENT & SIGNATURE ─── */}
      <section className="w-full border-b-2 border-black bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative card-brutal p-6 sm:p-10 bg-[#f4f4ee] shadow-brutal">
            <CornerCrosshairs />
            <div className="flex items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
              <span className="badge-brutal bg-[#ff4400] text-white font-bold">
                [FOUNDER NOTE] // SIGN-OFF
              </span>
              <span className="font-mono text-xs font-bold text-black tabular-nums">
                BY SABRY BELAL • 2026
              </span>
            </div>

            <h3 className="font-space text-2xl sm:text-3xl font-black text-black leading-tight tracking-[-0.02em]">
              &ldquo;Tools Built for Myself, Crafted for All.&rdquo;
            </h3>

            <div className="mt-4 space-y-4 text-sm sm:text-base text-black leading-relaxed font-medium">
              <p>
                I build software to solve my own severe cognitive and workflow bottlenecks—starting with Reverie Pomodoro to eliminate timer-induced anxiety, context switching, and subscription rent.
              </p>
              <p>
                When you support Sabry Labs, you aren&apos;t funding a syndicate of VC shareholders looking for a 10x exit by selling your data. You are directly supporting an independent maker who cares deeply about software craftsmanship, responsiveness, and your digital freedom.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t-2 border-black flex items-center justify-between flex-wrap gap-4 text-xs font-mono font-bold">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-[3px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center font-black text-sm shadow-brutal-sm">
                  SB
                </div>
                <div>
                  <div className="text-black font-black text-sm">Sabry Belal</div>
                  <div className="text-black/80 font-mono text-xs">Founder &amp; Independent Engineer</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://twitter.com/sabrybelal"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:text-[#ff4400] inline-flex items-center gap-1 font-bold"
                >
                  <span>@sabrybelal</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span>•</span>
                <a
                  href="https://github.com/sabryscrap"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:text-[#ff4400] inline-flex items-center gap-1 font-bold"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FINAL ACTION STRIP ─── */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <span className="badge-brutal text-[#ff4400]">
            READY TO TRY AN AUTHENTIC INSTRUMENT?
          </span>
          <h2 className="font-space text-3xl sm:text-5xl font-black text-black tracking-[-0.03em]">
            Reclaim Your Attentional Sovereignty.
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-black font-medium leading-relaxed">
            Install Reverie on your desktop today. Lifetime ownership. 14-day free trial. Zero recurring fees, zero tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono pt-4">
            <Link
              href="/reverie"
              className="btn-brutal-primary w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
            >
              <span>Explore Reverie Focus ($19)</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>

            <Link
              href="/about"
              className="btn-brutal-secondary w-full sm:w-auto px-7 py-4 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
            >
              <span>Read Studio Manifesto</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
