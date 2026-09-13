"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  Rss,
  Check,
  Copy,
  SlidersHorizontal,
  X,
  BookOpen,
} from "lucide-react";
import type { PostMetadata } from "@/lib/posts";

interface LogbookClientProps {
  posts: PostMetadata[];
}

const CATEGORIES = [
  "All",
  "Focus & Productivity",
  "Philosophy & Ownership",
];

function CornerCrosshairs() {
  return (
    <>
      <span className="absolute top-1.5 left-1.5 font-mono text-[11px] font-bold text-black select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute top-1.5 right-1.5 font-mono text-[11px] font-bold text-black select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute bottom-1.5 left-1.5 font-mono text-[11px] font-bold text-black select-none pointer-events-none leading-none z-10">+</span>
      <span className="absolute bottom-1.5 right-1.5 font-mono text-[11px] font-bold text-black select-none pointer-events-none leading-none z-10">+</span>
    </>
  );
}

export default function LogbookClient({ posts }: LogbookClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedRss, setCopiedRss] = useState(false);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesTitle = post.title.toLowerCase().includes(query);
      const matchesSummary = post.summary.toLowerCase().includes(query);
      const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && (matchesTitle || matchesSummary || matchesTags);
    });
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const handleCopyRss = async () => {
    try {
      await navigator.clipboard.writeText("https://sabrylabs.com/feed.xml");
      setCopiedRss(true);
      setTimeout(() => setCopiedRss(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f7f4] text-black pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        {/* Header Banner */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="badge-brutal bg-[#ff4400] text-white">
              [03] // STUDIO BLOG &amp; FIELD NOTES
            </span>
            <span className="badge-brutal bg-black text-white font-bold">
              ● {posts.length} ARTICLES PUBLISHED
            </span>
            <span className="badge-brutal bg-white text-black font-bold">
              FOCUS • CRAFT • VALUE
            </span>
          </div>

          <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-black leading-tight">
            Field Notes &amp;{" "}
            <span className="bg-[#ff4400] text-white px-3 py-0.5 inline-block -rotate-1 border-2 border-black rounded-[2px] shadow-brutal-sm">
              Devlogs
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-black leading-relaxed font-normal">
            Honest reflections on deep work, cognitive flow, and why we build sovereign software.
            No corporate buzzwords or dry math—just real workflow problems, how we solved them, and why we refuse subscriptions.
          </p>
        </div>

        {/* Featured Spotlight Card */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <div className="relative card-brutal p-6 sm:p-10 bg-white shadow-brutal-lg border-2 border-black rounded-[3px]">
            <CornerCrosshairs />
            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-brutal bg-[#ff4400] text-white font-bold">
                    [FEATURED // FLAGSHIP ESSAY]
                  </span>
                  <span className="badge-brutal bg-black text-white flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3 text-[#ff4400]" />
                    <span>{featuredPost.readingTime}</span>
                  </span>
                  <span className="badge-brutal bg-[#f4f4ee] text-black flex items-center gap-1 font-bold">
                    <Calendar className="w-3 h-3 text-black" />
                    <span>{featuredPost.date}</span>
                  </span>
                </div>

                <span className="font-mono text-xs font-black text-black uppercase tracking-wider">
                  {featuredPost.category}
                </span>
              </div>

              <div className="space-y-3 max-w-4xl">
                <Link
                  href={`/logbook/${featuredPost.slug}`}
                  className="block group"
                >
                  <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black group-hover:text-[#ff4400] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="font-sans text-base sm:text-lg text-black leading-relaxed font-medium">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-black">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-[2px] bg-[#f4f4ee] text-black font-bold border-2 border-black"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/logbook/${featuredPost.slug}`}
                  className="btn-brutal-primary px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2"
                >
                  <span>Read Full Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black font-bold" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full h-11 pl-10 pr-9 bg-white border-2 border-black rounded-[3px] text-sm text-black placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#ff4400] shadow-brutal-sm font-mono font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#ff4400]"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* RSS Feed Badge Action */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <a
                href="/feed.xml"
                target="_blank"
                rel="noreferrer"
                className="btn-brutal-secondary px-3.5 py-2 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-black"
              >
                <Rss className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>RSS Feed</span>
              </a>
              <button
                type="button"
                onClick={handleCopyRss}
                className="btn-brutal-secondary px-3.5 py-2 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-black"
                title="Copy RSS URL"
              >
                {copiedRss ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00a854]" />
                    <span className="text-[#00a854]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-black" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
            <SlidersHorizontal className="w-4 h-4 text-black shrink-0 mr-1" />
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-[3px] border-2 border-black font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#ff4400] text-white shadow-brutal-sm"
                      : "bg-white text-black hover:bg-[#f4f4ee]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="relative card-brutal-interactive p-6 bg-white flex flex-col justify-between shadow-brutal border-2 border-black rounded-[3px]"
              >
                <CornerCrosshairs />
                <div className="space-y-4">
                  {/* Card Header Meta */}
                  <div className="flex items-center justify-between font-mono text-xs gap-2">
                    <span className="badge-brutal bg-[#ff4400] text-white text-[10.5px] font-bold">
                      {post.category.toUpperCase()}
                    </span>
                    <span className="text-black flex items-center gap-1 font-bold text-[11px]">
                      <Clock className="w-3 h-3 text-[#ff4400]" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-space text-xl font-black text-black group-hover:text-[#ff4400] transition-colors leading-snug">
                    <Link href={`/logbook/${post.slug}`} className="hover:text-[#ff4400] transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Summary */}
                  <p className="font-sans text-sm text-black leading-relaxed font-medium">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t-2 border-black space-y-4 font-mono">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-[#f4f4ee] text-black font-bold border border-black"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-1 text-xs font-bold">
                    <span className="text-black">{post.date}</span>
                    <Link
                      href={`/logbook/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[#ff4400] hover:underline font-bold"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="card-brutal bg-white p-12 text-center space-y-4 shadow-brutal border-2 border-black">
            <BookOpen className="w-10 h-10 text-black mx-auto" />
            <h3 className="font-space text-xl font-black text-black">
              No articles found
            </h3>
            <p className="font-sans text-sm text-zinc-900 max-w-md mx-auto font-medium">
              No published articles matched your search query &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn-brutal-secondary px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Syndication Box */}
        <div className="relative card-brutal bg-[#f4f4ee] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-brutal border-2 border-black">
          <CornerCrosshairs />
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4400]">
              <Rss className="w-4 h-4" />
              <span>XML RSS 2.0 SYNDICATION</span>
            </div>
            <h4 className="font-space text-xl font-black text-black">
              Subscribe with your favorite RSS reader
            </h4>
            <p className="font-sans text-sm text-zinc-900 leading-relaxed font-normal">
              Sabry Labs provides an open, unmetered RSS 2.0 feed with complete articles and devlogs. Never miss an update.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/feed.xml"
              target="_blank"
              rel="noreferrer"
              className="btn-brutal-primary px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2"
            >
              <Rss className="w-4 h-4" />
              <span>Open /feed.xml</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
