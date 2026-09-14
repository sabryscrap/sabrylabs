"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[3px] shadow-brutal-sm transition-transform duration-100 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-brutal">
              <Image
                src="/images/logo.png"
                alt="Sabry Labs Logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="font-mono text-base font-black tracking-tight text-black">
              SABRY LABS
            </span>
          </Link>
        </div>

        {/* Center Nav Links: Apps • Blog • About */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-wider uppercase text-black">
          <Link href="/apps" className="hover:text-[#ff4400] transition-colors">
            [01] Apps
          </Link>
          <Link href="/logbook" className="hover:text-[#ff4400] transition-colors">
            [02] Blog
          </Link>
          <Link href="/about" className="hover:text-[#ff4400] transition-colors">
            [03] About
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://sabrylabs.lemonsqueezy.com/buy/reverie?embed=1"
            className="lemonsqueezy-button btn-brutal-primary hidden sm:inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[11.5px] uppercase tracking-wider tabular-nums"
            data-theme="light"
          >
            <span>Buy Reverie ($19)</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center border-2 border-black bg-white rounded-[3px] shadow-brutal-sm text-black"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={2.2} /> : <Menu className="h-5 w-5" strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b-2 border-black bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 font-mono text-xs font-bold tracking-wider uppercase text-black">
            <Link
              href="/apps"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#ff4400]"
            >
              [01] Apps
            </Link>
            <Link
              href="/logbook"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#ff4400]"
            >
              [02] Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#ff4400]"
            >
              [03] About
            </Link>
            <Link
              href="/reverie/features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#ff4400] flex items-center justify-between"
            >
              <span>[04] Feature Radar</span>
              <span className="text-[9px] bg-[#ff4400] text-white px-1.5 py-0.2 rounded-[1px] font-black">VOTE</span>
            </Link>
            <div className="pt-2">
              <a
                href="https://sabrylabs.lemonsqueezy.com/buy/reverie?embed=1"
                className="lemonsqueezy-button btn-brutal-primary flex w-full items-center justify-center gap-2 py-2.5 text-center font-mono text-xs uppercase tracking-wider"
                data-theme="light"
              >
                <span>Buy Reverie ($19)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
