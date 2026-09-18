import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-black bg-white text-black">
      {/* Top Banner */}
      <div className="border-b-2 border-black bg-[#f4f4ee] px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs font-mono font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-[#ff4400]"></span>
            <span>SABRY LABS // INDEPENDENT DIGITAL ATELIER &amp; SOFTWARE LAB</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <span>NO SUBSCRIPTIONS</span>
            <span>•</span>
            <span>ZERO CLOUD TELEMETRY</span>
            <span>•</span>
            <span>EUROPEAN SOVEREIGNTY</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Ethos */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[3px] shadow-brutal-sm">
                <Image
                  src="/images/logo.png"
                  alt="Sabry Labs Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-mono text-base font-black tracking-tight">
                SABRY LABS
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
              An independent software atelier founded by Sabry Belal. We craft durable, opinionated desktop, phone, and web apps designed to eliminate cognitive friction. Harsh corners, CNC fillets, zero ads, zero recurring rent.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 border border-black bg-[#f4f4ee] px-3 py-1.5 text-xs font-mono text-zinc-700">
              <span>FOUNDER:</span>
              <strong className="text-black font-bold">Sabry Belal</strong>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black">
              [01] Creations
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-mono font-bold text-zinc-700">
              <li>
                <Link href="/reverie" className="text-[#ff4400] hover:underline transition-colors">
                  Reverie Focus ($19 Lifetime)
                </Link>
              </li>
              <li>
                <Link href="/reverie#features" className="hover:text-[#ff4400] transition-colors">
                  Reverie Features &amp; Noise Synthesizer
                </Link>
              </li>
              <li>
                <Link href="/apps" className="hover:text-[#ff4400] transition-colors">
                  Software Catalog &amp; Atelier
                </Link>
              </li>
              <li>
                <Link href="/reverie/features" className="hover:text-[#ff4400] transition-colors inline-flex items-center gap-1.5 font-bold text-black">
                  <span>Feature Radar &amp; Upvoting</span>
                  <span className="text-[9px] bg-[#ff4400] text-white px-1 py-0.2 rounded-[1px] font-mono font-black">VOTE</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://sabrylabs.lemonsqueezy.com/checkout/buy/d1c62f6d-d059-47bf-b589-1255134c2a11?embed=1"
                  className="lemonsqueezy-button hover:text-[#ff4400] transition-colors inline-flex items-center gap-1"
                  data-theme="light"
                >
                  Get Reverie 14-Day Free Trial
                </a>
              </li>
            </ul>
          </div>

          {/* Licenses & Support */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black">
              [02] Ethos &amp; Desk
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-mono font-bold text-zinc-700">
              <li>
                <Link href="/about" className="hover:text-[#ff4400] transition-colors">
                  Anti-Ensh**tification Manifesto
                </Link>
              </li>
              <li>
                <Link href="/#pricing-truth" className="hover:text-[#ff4400] transition-colors">
                  The Honest Pricing Truth
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-[#ff4400] transition-colors">
                  License Activation Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://app.lemonsqueezy.com/my-orders"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#ff4400] transition-colors inline-flex items-center gap-1"
                >
                  Lemon Squeezy Order Desk
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/sabrybelal"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#ff4400] transition-colors inline-flex items-center gap-1"
                >
                  Twitter / X (@sabrybelal)
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between border-t-2 border-black pt-6 text-xs font-mono text-zinc-600">
          <p>© {currentYear} Sabry Labs • Engineered with craft by Sabry Belal</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0 font-bold text-black">
            <span>DOMAIN: sabrylabs.com</span>
            <span>•</span>
            <span className="text-[#00a854]">100% INDIE &amp; SOVEREIGN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
