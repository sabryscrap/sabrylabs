import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers,
  Smartphone,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Sabry Labs — Founder Ethos, Manifesto & Multi-Platform Atelier",
  description:
    "Sabry Labs builds authentic desktop, phone, and web apps with harsh corners, CNC micro-fillets, zero subscriptions, and zero ads. The case against software ensh**tification and the European right to own.",
};

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

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f4] text-black">
      {/* Header Banner */}
      <section className="border-b-2 border-black bg-white px-4 py-16 sm:px-6 lg:px-8 bg-swiss-subtle">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="badge-brutal text-zinc-900 bg-[#f4f4ee]">
              SL-00 // ABOUT THE ATELIER
            </span>
            <span className="badge-brutal bg-[#ff4400] text-white">
              SOVEREIGN PHILOSOPHY
            </span>
            <span className="badge-brutal text-zinc-900 bg-white">
              DESKTOP • PHONE • WEB
            </span>
          </div>

          <h1 className="font-space text-4xl sm:text-6xl font-black tracking-[-0.04em] text-black leading-tight max-w-3xl mx-auto">
            We Build Authentic Desktop, Phone &amp; Web Apps.{" "}
            <span className="bg-[#ff4400] text-white px-3 py-0.5 inline-block -rotate-1 border-2 border-black rounded-[2px] shadow-brutal-sm mt-1">
              No Subscriptions.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-black leading-relaxed font-medium">
            Software should be treated like fine physical art: precision-engineered, uncompromisingly tactile, and purchased once to be owned for its purpose.
          </p>
        </div>
      </section>

      {/* Main Manifesto Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Multi-Platform Scope Box */}
          <div className="relative card-brutal p-6 sm:p-10 bg-white shadow-brutal-lg">
            <CornerCrosshairs />
            <div className="flex items-center gap-2 font-mono text-xs font-black text-[#ff4400] uppercase tracking-wider mb-2">
              <span>[STUDIO CAPABILITY] // WE ARE NOT JUST A DESKTOP LAB</span>
            </div>
            <h2 className="font-space text-2xl sm:text-3xl font-black text-black">
              We Don&apos;t Just Make Desktop Apps — We Build Authentic Phone &amp; Web Apps Also.
            </h2>
            <p className="mt-3 text-base text-black leading-relaxed font-normal">
              Our engineering standards apply universally across platforms. Whether building high-throughput native desktop engines, tactile mobile applications with hardware haptic timing, or browser tools executing client-side WebAssembly, our principles never waver:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6 font-mono text-xs">
              <div className="p-4 border-2 border-black bg-[#f4f4ee] rounded-[2px]">
                <div className="font-bold text-black flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4 text-[#ff4400]" />
                  <span>[01] DESKTOP APPS</span>
                </div>
                <p className="text-black font-medium leading-relaxed">
                  Precision focus instruments for Windows &amp; macOS. Local JSON storage in %APPDATA%, zero cloud telemetry, sub-millisecond responsiveness, and zero memory bloat.
                </p>
              </div>

              <div className="p-4 border-2 border-black bg-[#f4f4ee] rounded-[2px]">
                <div className="font-bold text-black flex items-center gap-2 mb-2">
                  <Smartphone className="h-4 w-4 text-[#ff4400]" />
                  <span>[02] PHONE APPS</span>
                </div>
                <p className="text-black font-medium leading-relaxed">
                  Single-purpose field tools for iOS &amp; Android. Calibrated physical haptic vibration cues, OLED pitch-black power conservation, and 100% offline data portability.
                </p>
              </div>

              <div className="p-4 border-2 border-black bg-[#f4f4ee] rounded-[2px]">
                <div className="font-bold text-black flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-[#ff4400]" />
                  <span>[03] IN-BROWSER WEB APPS</span>
                </div>
                <p className="text-black font-medium leading-relaxed">
                  Zero-install creative studios powered by WebAssembly &amp; HTML5 Canvas. Audio/video processing happens locally on your GPU/CPU with zero server uploads.
                </p>
              </div>
            </div>
          </div>

          {/* Anti-Ensh**tification Manifesto */}
          <div className="relative card-brutal p-6 sm:p-10 bg-[#f4f4ee] shadow-brutal-lg">
            <CornerCrosshairs />
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4 mb-6">
              <span className="badge-brutal bg-[#ff4400] text-white">
                [MANIFESTO] // RESISTANCE AGAINST DECAY
              </span>
              <span className="font-mono text-xs font-bold text-zinc-600">
                EUROPEAN SOVEREIGNTY • RIGHT TO OWN
              </span>
            </div>

            <h2 className="font-space text-2xl sm:text-4xl font-black text-black leading-tight tracking-tight">
              The Case Against Ensh**tification &amp; The Right to Own
            </h2>

            <div className="mt-6 space-y-6 text-base sm:text-lg text-zinc-800 leading-relaxed font-normal">
              <p>
                Cory Doctorow famously diagnosed the lifecycle of modern extractive software platforms:
              </p>

              <blockquote className="border-l-4 border-[#ff4400] pl-5 py-2 font-mono text-sm sm:text-base text-black bg-white/80 border-y border-r border-zinc-200 rounded-[2px] leading-relaxed">
                &ldquo;First, platforms are good to their users; then they abuse their users to make things better for their business customers; finally, they abuse those business customers to claw back all the value for themselves. Then, they die.&rdquo;
              </blockquote>

              <p>
                This slow decay is famously termed{" "}
                <span className="inline-flex items-center px-2 py-0.5 border border-black bg-zinc-900 text-white font-mono text-xs font-bold rounded-[2px] select-none tracking-wide" title="Censored with ** for SEO compliance and SafeSearch algorithms">
                  Ensh**tification
                </span>{" "}
                <span className="inline-flex items-center px-1.5 py-0.5 bg-zinc-200 text-zinc-700 font-mono text-xs border border-zinc-400 rounded-[2px]" title="Redacted with asterisks for search engine safety and family-friendly indexing">
                  [censored with ** for SEO compliance]
                </span>. It has transformed durable tools into perpetual rental traps.
              </p>

              <h3 className="font-space text-xl sm:text-2xl font-black text-black pt-3">
                Authentic Apps Like Art: You Buy It One Time for Its Purpose
              </h3>

              <p>
                We make authentic apps like fine physical art: <strong>you buy it one time for its purpose, install it, and own it forever</strong>. No subscriptions. No ads. If an app costs us $0 to run once downloaded, it is either a 1-time purchase or 100% free forever.
              </p>

              <div className="p-4 border-2 border-black bg-white rounded-[2px] font-mono text-xs text-zinc-800 space-y-2">
                <div className="font-bold text-[#ff4400] uppercase tracking-wider">
                  [THE HONEST CLOUD COMPUTE LAW]
                </div>
                <p>
                  If an app costs us real money to run per month—such as recurring external AI inference credits, LLM API tokens, or server compute—of course we will charge a transparent monthly subscription at cost.
                </p>
                <p className="font-semibold text-black">
                  However: If software runs locally on your computer or phone, we will NEVER charge you recurring rent.
                </p>
              </div>

              <h3 className="font-space text-xl sm:text-2xl font-black text-black pt-3">
                European Digital Sovereignty &amp; The Right to Own
              </h3>

              <p>
                In Europe, a profound counter-movement is taking root: <strong>digital sovereignty, the right-to-repair, and the right to own</strong>. You own your desk, your fountain pen, and your physical tools. You should own the software running on your computer and phone.
              </p>
            </div>
          </div>

          {/* Founder Bio Card */}
          <div className="relative card-brutal p-6 sm:p-8 bg-white shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <CornerCrosshairs />
            <div>
              <span className="badge-brutal bg-black text-white text-[10px] mb-2 inline-block">
                FOUNDER &amp; CHIEF CRAFTSMAN
              </span>
              <h3 className="font-space text-2xl font-black text-black">
                Sabry Belal
              </h3>
              <p className="mt-1 font-mono text-xs text-zinc-600">
                Independent Software Atelier
              </p>
              <p className="mt-3 text-sm text-zinc-700 max-w-xl font-normal">
                Designing software instruments with Swiss typographic rigor, Dieter Rams functionalism, and radical pricing honesty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs w-full sm:w-auto">
              <Link
                href="/apps"
                className="btn-brutal-primary w-full sm:w-auto px-6 py-3 text-center uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Explore Apps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/logbook"
                className="btn-brutal-secondary w-full sm:w-auto px-5 py-3 text-center uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Read Devlogs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
