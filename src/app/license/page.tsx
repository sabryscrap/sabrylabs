"use client";

import React, { useState } from "react";
import {
  Key,
  ArrowUpRight,
  Mail,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    id: "where-key",
    q: "Where do I find my license key?",
    a: "Your 16-character license key (formatted as SLAB-XXXX-XXXX-XXXX) is emailed immediately following your purchase from our official merchant of record, Lemon Squeezy. You can also view and copy your license key anytime by visiting the Lemon Squeezy Customer Orders Portal at https://app.lemonsqueezy.com/my-orders/ using the email address you entered at checkout.",
  },
  {
    id: "subscription-vs-lifetime",
    q: "Is this a recurring subscription or a lifetime license?",
    a: "Reverie Pomodoro from Sabry Labs is strictly a lifetime license. You pay once ($19 USD) and own the software forever. There are zero recurring monthly fees, zero annual renewals, and all minor and major v1.x feature releases and security updates are included for life.",
  },
  {
    id: "new-pc-format",
    q: "What happens if I format my hard drive, reinstall my OS, or buy a new PC?",
    a: "You will never lose your license. Before formatting, you can click 'Deactivate Machine' in Reverie Settings ⚙ → Desktop License. If you already formatted your system or lost access to the hardware, simply log into the Lemon Squeezy Customer Portal at https://app.lemonsqueezy.com/my-orders/ to manage your active activations and deactivate older machines in 1 click.",
  },
  {
    id: "lost-key",
    q: "What if I lose my license key or delete the email receipt?",
    a: "No problem. Go to the Lemon Squeezy Customer Portal (https://app.lemonsqueezy.com/my-orders/) and enter the email address you purchased with. Lemon Squeezy will instantly send you a secure magic link that reveals all your past purchases, download links, VAT tax invoices, and license keys.",
  },
  {
    id: "refund-policy",
    q: "What is your refund policy?",
    a: "We offer a 14-day no-questions-asked 100% money-back guarantee. If Reverie does not dramatically improve your focus and daily workflow, simply email us or ping on X (@sabrybelal) within 14 days of purchase and we will promptly process a full refund.",
  },
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

export default function LicensePage() {
  const [openFaq, setOpenFaq] = useState<string | null>("where-key");

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative min-h-screen bg-[#f7f7f4] text-black pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        {/* Header Banner */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge-brutal text-[#ff4400]">
              [05] // LICENSE_ACTIVATION_&amp;_FAIR_USE
            </span>
            <span className="badge-brutal text-[#00a854]">
              ● 100% OFFLINE TOLERANT
            </span>
          </div>

          <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-black">
            Desktop Software License Desk
          </h1>

          <p className="font-sans text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            Instructions for activating your desktop software, managing machine seats, and looking up order keys.
            Built with a privacy-first, local-first philosophy: activate once, and run forever with zero cloud phone-home checks.
          </p>
        </div>

        {/* 3-Step Activation Walkthrough */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <h2 className="font-space text-2xl font-black text-black tracking-tight">
              3-Step Activation Walkthrough
            </h2>
            <span className="text-xs font-mono font-bold text-zinc-600 tabular-nums">SETUP // &lt;60 SECONDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative card-brutal p-6 space-y-4 flex flex-col justify-between">
              <CornerCrosshairs />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-brutal bg-[#ff4400] text-white">
                    [STEP 01]
                  </span>
                  <Mail className="w-5 h-5 text-black" strokeWidth={2.2} />
                </div>
                <h3 className="font-space text-lg font-black text-black tracking-tight">
                  Retrieve Your License Key
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed font-normal">
                  Upon completing your purchase on sabrylabs.com, a 16-character license key
                  (<code className="text-[#ff4400] font-mono text-xs bg-[#f4f4ee] px-1 py-0.5 border border-black rounded-[2px]">SLAB-XXXX-XXXX-XXXX</code>)
                  is emailed instantly and displayed on your order receipt.
                </p>
              </div>
              <div className="pt-3 border-t-2 border-black text-xs font-mono font-bold text-zinc-600">
                Powered by Lemon Squeezy
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative card-brutal p-6 space-y-4 flex flex-col justify-between">
              <CornerCrosshairs />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-brutal bg-[#0088cc] text-white">
                    [STEP 02]
                  </span>
                  <Key className="w-5 h-5 text-black" strokeWidth={2.2} />
                </div>
                <h3 className="font-space text-lg font-black text-black tracking-tight">
                  Enter Key in Application
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed font-normal">
                  Launch Reverie on your PC. Open <strong className="text-black">Settings ⚙ → Desktop License &amp; Updates</strong>, paste your key into the activation box, and click <strong className="text-black">Activate</strong>.
                </p>
              </div>
              <div className="pt-3 border-t-2 border-black text-xs font-mono font-bold text-zinc-600 tabular-nums">
                Windows 10 &amp; 11 x64
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative card-brutal p-6 space-y-4 flex flex-col justify-between">
              <CornerCrosshairs />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-brutal bg-[#00a854] text-white">
                    [STEP 03]
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-black" strokeWidth={2.2} />
                </div>
                <h3 className="font-space text-lg font-black text-black tracking-tight">
                  Instant Local Validation
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed font-normal">
                  Your software activates immediately and signs a local cryptographic activation token. Reverie remains 100% unlocked offline without recurring phone-home checks.
                </p>
              </div>
              <div className="pt-3 border-t-2 border-black text-xs font-mono font-bold text-zinc-600">
                100% Offline Tolerance
              </div>
            </div>
          </div>
        </section>

        {/* Lemon Squeezy Customer Portal Action Card */}
        <div className="relative card-brutal p-8 sm:p-10 bg-[#f4f4ee]">
          <CornerCrosshairs />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="badge-brutal text-[#ff4400]">
                  [PORTAL // SELF-SERVE_LOOKUP]
                </span>
                <span className="text-xs font-mono font-bold text-zinc-600">LEMON SQUEEZY</span>
              </div>
              <h3 className="font-space text-2xl sm:text-3xl font-black text-black tracking-tight">
                Customer Order Lookup Portal
              </h3>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                Need to retrieve a misplaced key, view your receipt, download official VAT invoices,
                or manage your active hardware activations? Access your centralized customer account directly.
              </p>
            </div>

            <a
              href="https://app.lemonsqueezy.com/my-orders/"
              target="_blank"
              rel="noreferrer"
              className="btn-brutal-primary inline-flex items-center gap-2 px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap"
            >
              <span>Access My Orders</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-6">
          <div className="border-b-2 border-black pb-4">
            <h2 className="font-sans text-2xl font-black text-black">
              Frequently Asked License Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="card-brutal bg-white overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-sans font-black text-base text-black hover:bg-[#f4f4ee] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-black transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#ff4400]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-zinc-700 leading-relaxed border-t-2 border-black font-normal bg-[#f4f4ee]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
