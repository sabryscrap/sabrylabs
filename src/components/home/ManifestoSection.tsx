"use client";

import React from "react";
import { motion } from "motion/react";
import { Terminal, Shield, Sparkles, Code2, AtSign } from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";
import Button from "@/components/ui/Button";
import { springPhysics } from "@/lib/motion";

export default function ManifestoSection() {
  return (
    <section className="w-full max-w-5xl mx-auto my-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={springPhysics.springSmooth}
        className="relative rounded-2xl bg-[#121217] border border-[#27272a] p-8 sm:p-12 lg:p-14 shadow-card overflow-hidden"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ff5722]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Header Tag */}
          <div className="flex flex-wrap items-center gap-2.5">
            <BracketTag variant="orange">[04] // FOUNDER_MANIFESTO</BracketTag>
            <span className="text-xs font-mono text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded border border-[#10b981]/30">
              PHILOSOPHY &amp; ETHOS
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              &ldquo;Tools Built for Myself, Crafted for All.&rdquo;
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#ff5722] font-medium">
              Vibe-coding with rigorous craftsmanship: eliminating software friction through tactile engineering.
            </p>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 font-sans text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            <p>
              I started <strong className="text-white">Sabry Labs</strong> out of a deep dissatisfaction with modern software. Every tool had become a bloated SaaS recurring subscription, constantly phoning home to surveillance servers, trapping user data behind proprietary clouds, and ignoring basic latency principles.
            </p>
            <p>
              Software should feel like a finely tuned acoustic instrument. When you click, it should respond in under 16 milliseconds. When you buy a tool, you should own it permanently. And when you close your laptop, your private work and thoughts should remain entirely on your own disk.
            </p>
            <p className="text-white font-medium">
              Zero recurring subscriptions. Zero cloud tracking. Standalone software you truly own.
            </p>
          </div>

          {/* The 3 Guiding Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-[#18181c] border border-[#27272a] space-y-2">
              <div className="p-2 rounded bg-[#ff5722]/15 text-[#ff5722] w-fit">
                <Sparkles className="h-4 w-4" />
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Tactile Physics
              </h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Apple-grade spring physics, sub-16ms latency, and vector geometries that make work deliberate.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#18181c] border border-[#27272a] space-y-2">
              <div className="p-2 rounded bg-[#10b981]/15 text-[#10b981] w-fit">
                <Shield className="h-4 w-4" />
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Radical Sovereignty
              </h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Atomic local JSON files in %APPDATA%. Zero telemetry, zero analytics trackers, and zero required logins.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#18181c] border border-[#27272a] space-y-2">
              <div className="p-2 rounded bg-[#00b4d8]/15 text-[#00b4d8] w-fit">
                <Terminal className="h-4 w-4" />
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Transparent Craft
              </h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Open retrospectives, published benchmark derivations, and honest devlogs for fellow creators.
              </p>
            </div>
          </div>

          {/* Signature & Social Footer */}
          <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#ff5722]/20 border border-[#ff5722]/40 flex items-center justify-center font-display font-bold text-[#ff5722] text-base">
                SB
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white">
                  [SABRY_BELAL // FOUNDER_&amp;_ENGINEER • 2026]
                </div>
                <div className="text-[11px] font-mono text-[#a1a1aa]">
                  Independent Software Atelier
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                href="https://github.com/sabrybelal"
                external={true}
                className="font-mono text-xs text-[#a1a1aa] hover:text-white"
              >
                <Code2 className="h-3.5 w-3.5 mr-1" />
                <span>GitHub</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                href="https://x.com/sabrybelal"
                external={true}
                className="font-mono text-xs text-[#a1a1aa] hover:text-white"
              >
                <AtSign className="h-3.5 w-3.5 mr-1 text-[#00b4d8]" />
                <span>@sabrybelal</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}