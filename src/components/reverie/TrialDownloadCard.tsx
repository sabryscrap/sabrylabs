"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  Shield,
  Copy,
  Check,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import BracketTag from "@/components/ui/BracketTag";
import { springPhysics } from "@/lib/motion";

interface DownloadOption {
  platform: string;
  osBadge: string;
  filename: string;
  filesize: string;
  href: string;
  type: "portable" | "installer" | "dmg";
  primary?: boolean;
}

const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    platform: "Windows 10 / 11",
    osBadge: "STANDALONE PORTABLE .EXE",
    filename: "Reverie-Portable.exe",
    filesize: "96.4 MB",
    href: "https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11?embed=1",
    type: "portable",
    primary: true,
  },
  {
    platform: "Windows 10 / 11",
    osBadge: "STANDARD SETUP INSTALLER",
    filename: "Reverie-Setup.exe",
    filesize: "98.1 MB",
    href: "https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11?embed=1",
    type: "installer",
  },
  {
    platform: "macOS 12+",
    osBadge: "UNIVERSAL BINARY (.DMG)",
    filename: "Reverie-Universal.dmg",
    filesize: "104.2 MB",
    href: "https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11?embed=1",
    type: "dmg",
  },
];

export default function TrialDownloadCard() {
  const [copiedSha, setCopiedSha] = useState(false);
  const sampleSha256 =
    "a8f93e41b2390a78dc3b5c1024e83f2187d90e447b198c3f2541a0b3c6129e01";

  const handleCopySha = () => {
    navigator.clipboard.writeText(sampleSha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <section className="relative w-full py-12" aria-label="Free Trial Download Hub">
      <div className="relative max-w-4xl mx-auto rounded-2xl bg-[#121217] border border-[#27272a] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f1f23]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BracketTag variant="mint">DOWNLOAD // UNRESTRICTED EVALUATION</BracketTag>
              <span className="font-mono text-xs text-[#10b981] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ZERO CREDIT CARD REQUIRED</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Download 14-Day Free Trial
            </h2>
            <p className="mt-1 text-sm text-[#a1a1aa]">
              Evaluate the complete Reverie desktop engine with zero limitations. Test the 40Hz audio, taskbar mini-widget, and flow extension on your local machine.
            </p>
          </div>

          <div className="shrink-0">
            <span className="font-mono text-xs text-[#ff5722] bg-[#ff5722]/10 px-3 py-1.5 rounded-lg border border-[#ff5722]/30 inline-flex items-center gap-1.5">
              <span>v1.0.0 STABLE</span>
            </span>
          </div>
        </div>

        {/* Download Buttons Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOWNLOAD_OPTIONS.map((opt, idx) => (
            <motion.div
              key={idx}
              whileHover={springPhysics.cardHover}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
                opt.primary
                  ? "bg-[#181820] border-[#10b981]/50 shadow-glow-mint"
                  : "bg-[#09090b] border-[#27272a] hover:border-[#3f3f46]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-[#10b981] tracking-wider uppercase">
                    {opt.osBadge}
                  </span>
                  <Laptop className="w-4 h-4 text-[#a1a1aa]" />
                </div>

                <h3 className="text-base font-bold text-white font-sans mb-1">
                  {opt.platform}
                </h3>
                <div className="font-mono text-xs text-[#71717a] mb-4">
                  {opt.filename} • {opt.filesize}
                </div>
              </div>

              <motion.a
                whileTap={springPhysics.buttonTap}
                href={opt.href}
                className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer select-none text-center ${
                  opt.primary
                    ? "bg-[#10b981] hover:bg-[#059669] text-white shadow-glow-mint"
                    : "bg-[#18181c] hover:bg-[#27272a] text-[#fafafa] border border-[#27272a]"
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Free Trial</span>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* SHA-256 Checksum Strip */}
        <div className="mt-6 p-4 rounded-xl bg-[#09090b] border border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <Shield className="w-4 h-4 text-[#00b4d8] shrink-0" />
            <span className="text-[#a1a1aa] shrink-0">SHA-256:</span>
            <span className="text-[#71717a] truncate select-all">{sampleSha256}</span>
          </div>

          <button
            onClick={handleCopySha}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#27272a] bg-[#121217] hover:bg-[#1a1a22] text-[#fafafa] transition-colors shrink-0"
          >
            {copiedSha ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="text-[#10b981]">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#a1a1aa]" />
                <span>COPY SHA</span>
              </>
            )}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-5 border-t border-[#1f1f23] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#a1a1aa]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>14-day unrestricted trial</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00b4d8]" />
            <span>Zero installation required (portable)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
            <span>100% offline & local persistence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
