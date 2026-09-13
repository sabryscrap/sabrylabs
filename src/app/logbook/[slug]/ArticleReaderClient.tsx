"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  Rss,
  ListFilter,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import type { Post } from "@/lib/posts";

interface ArticleReaderClientProps {
  post: Post;
  recentPosts?: { slug: string; title: string; category: string }[];
}

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

export default function ArticleReaderClient({
  post,
  recentPosts = [],
}: ArticleReaderClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Track active TOC heading based on viewport position
      if (post.toc && post.toc.length > 0) {
        for (let i = post.toc.length - 1; i >= 0; i--) {
          const el = document.getElementById(post.toc[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              setActiveHeading(post.toc[i].id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post.toc]);

  // Wire up 1-click code block copy buttons from server-rendered HTML
  useEffect(() => {
    const copyButtons = document.querySelectorAll(".copy-code-btn");
    const cleanupFns: (() => void)[] = [];

    copyButtons.forEach((btn) => {
      const wrapper = btn.closest(".code-block-wrapper");
      if (!wrapper) return;
      const rawEncoded = wrapper.getAttribute("data-code");
      if (!rawEncoded) return;

      const handleClick = async () => {
        try {
          const codeText = decodeURIComponent(rawEncoded);
          await navigator.clipboard.writeText(codeText);

          const span = btn.querySelector("span");
          if (span) {
            const originalText = span.textContent;
            span.textContent = "Copied!";
            btn.classList.add("text-[#00a854]");
            setTimeout(() => {
              span.textContent = originalText;
              btn.classList.remove("text-[#00a854]");
            }, 2000);
          }
        } catch {
          // Clipboard fallback
        }
      };

      btn.addEventListener("click", handleClick);
      cleanupFns.push(() => btn.removeEventListener("click", handleClick));
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [post.contentHtml]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const authorObj = typeof post.author === "string" ? { name: post.author, role: "Founder & Engineer" } : post.author;

  return (
    <div className="relative min-h-screen bg-[#f7f7f4] text-black pt-8 pb-24">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-[#ff4400] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between py-4 border-b-2 border-black mb-10 text-xs font-mono">
          <Link
            href="/logbook"
            className="inline-flex items-center gap-2 text-black hover:text-[#ff4400] font-bold uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO LOGBOOK</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-black hover:text-[#ff4400] font-bold transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00a854]" />
                  <span className="text-[#00a854]">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <a
              href="/feed.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#ff4400] hover:underline font-bold"
            >
              <Rss className="w-3.5 h-3.5" />
              <span>RSS Feed</span>
            </a>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl space-y-6 pb-10 border-b-2 border-black">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="badge-brutal bg-[#ff4400] text-white">
              [DEVLOG // {post.category.toUpperCase().replace(/\s+/g, "_")}]
            </span>
            <span className="badge-brutal bg-[#f4f4ee] text-black flex items-center gap-1 font-bold">
              <Clock className="w-3 h-3 text-[#ff4400]" />
              <span>{post.readingTime}</span>
            </span>
            <span className="badge-brutal bg-white text-black font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-black" />
              <span>{post.date}</span>
            </span>
          </div>

          <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-[1.1]">
            {post.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-black font-medium leading-relaxed max-w-3xl">
            {post.summary}
          </p>

          {/* Author Byline & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-black rounded-[3px] bg-[#ff4400] text-white flex items-center justify-center font-mono font-black shadow-brutal-sm">
                {authorObj.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-black font-space">{authorObj.name}</div>
                <div className="text-xs text-black font-mono font-bold">{authorObj.role || "Founder & Craftsman"}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-[2px] bg-[#f4f4ee] text-black border border-black"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* 2-Column Main Stage: Article Content + Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          {/* Main Body */}
          <main className="lg:col-span-8 max-w-none">
            <div
              className="prose prose-zinc max-w-none space-y-4 font-sans text-black leading-relaxed [&_p]:text-black [&_p]:font-normal [&_p]:leading-relaxed [&_h2]:font-space [&_h2]:font-black [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:text-black [&_h2]:border-b-2 [&_h2]:border-black [&_h2]:pb-2 [&_h3]:font-space [&_h3]:font-black [&_h3]:text-xl [&_h3]:text-black [&_strong]:text-black [&_strong]:font-black [&_li]:text-black [&_li]:font-normal [&_blockquote]:text-black [&_blockquote]:font-medium [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#f4f4ee] [&_blockquote]:py-2 [&_blockquote]:px-4 [&_blockquote]:rounded-[2px] [&_pre]:border-2 [&_pre]:border-black [&_pre]:rounded-[3px] [&_pre]:shadow-brutal-sm"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Author Profile Card Footer */}
            <div className="relative card-brutal p-8 bg-white shadow-brutal mt-16 space-y-6">
              <CornerCrosshairs />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[3px] border-2 border-black bg-[#ff4400] text-white flex items-center justify-center font-mono text-2xl font-black shadow-brutal-sm">
                  {authorObj.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-space text-xl font-black text-black">{authorObj.name}</h3>
                    <span className="badge-brutal bg-[#f4f4ee] text-black text-[10px] font-bold">[FOUNDER]</span>
                  </div>
                  <p className="font-sans text-xs text-black font-medium">
                    Crafting tactile desktop software, phone instruments, and WebAssembly tools at Sabry Labs.
                  </p>
                </div>
              </div>

              <p className="font-sans text-sm text-black font-medium leading-relaxed">
                Sabry Belal is an independent engineer and craftsman behind Reverie Pomodoro.
                Committed to sovereign computing, anti-subscription lifetime ownership, and high-performance local-first tools.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-black text-xs font-mono font-bold">
                <span className="text-black">SABRY LABS // DIGITAL ATELIER</span>
                <div className="flex items-center gap-4">
                  <Link href="/reverie" className="text-[#ff4400] hover:underline font-bold">
                    Reverie Pomodoro ($19)
                  </Link>
                  <Link href="/about" className="text-black hover:text-[#ff4400] transition-colors font-bold">
                    Manifesto
                  </Link>
                  <a href="/feed.xml" target="_blank" rel="noreferrer" className="text-black hover:text-[#ff4400] transition-colors font-bold">
                    RSS Feed
                  </a>
                </div>
              </div>
            </div>

            {/* Next Articles Navigation */}
            {recentPosts.length > 0 && (
              <div className="mt-12 space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-black font-black">
                  [MORE DEVLOGS] // ARCHITECTURE RETROSPECTIVES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recentPosts.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/logbook/${r.slug}`}
                      className="group relative card-brutal-interactive p-4 bg-white flex items-center justify-between shadow-brutal-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#ff4400] font-bold">
                          [{r.category.toUpperCase()}]
                        </span>
                        <div className="font-space text-sm font-bold text-black group-hover:text-[#ff4400] transition-colors line-clamp-1">
                          {r.title}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-black group-hover:text-[#ff4400] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sticky Table of Contents Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-8 pl-4">
              {post.toc && post.toc.length > 0 && (
                <div className="card-brutal p-6 bg-white space-y-4 shadow-brutal">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-black pb-3 border-b-2 border-black">
                    <ListFilter className="w-3.5 h-3.5 text-[#ff4400]" />
                    <span className="tracking-wider uppercase">Table of Contents</span>
                  </div>

                  <nav className="space-y-2">
                    {post.toc.map((item) => {
                      const isActive = activeHeading === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-xs font-sans transition-colors leading-relaxed ${
                            item.level === 3 ? "pl-4 text-black/80 font-medium" : "font-semibold"
                          } ${
                            isActive
                              ? "text-[#ff4400] font-black"
                              : "text-black hover:text-[#ff4400]"
                          }`}
                        >
                          {item.text}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Quick Actions Card */}
              <div className="card-brutal p-6 bg-[#f4f4ee] space-y-4 shadow-brutal">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4400]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>LOCAL-FIRST WORKSHOP</span>
                </div>
                <h4 className="font-space text-base font-black text-black">
                  Experience Reverie Desktop
                </h4>
                <p className="font-sans text-xs text-black font-medium leading-relaxed">
                  The flagship Pomodoro engine built in this article is available now for Windows 10/11 x64.
                </p>
                <Link
                  href="/reverie"
                  className="btn-brutal-primary w-full font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5 py-2.5"
                >
                  <span>Explore Reverie ($19)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
