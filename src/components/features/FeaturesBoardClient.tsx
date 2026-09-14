"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  LayoutGrid,
  List,
  Check,
  Flame,
  Clock,
  Layers,
} from "lucide-react";
import {
  FeatureIdea,
  FeatureCategory,
  FeatureStatus,
  INITIAL_FEATURE_IDEAS,
  CATEGORY_CONFIG,
  STATUS_CONFIG,
} from "@/lib/features-data";
import FeatureCard from "./FeatureCard";
import ProposeFeatureModal from "./ProposeFeatureModal";

const STORAGE_KEY_UPVOTES = "sl_reverie_upvotes_v1";
const STORAGE_KEY_CUSTOM_IDEAS = "sl_reverie_custom_ideas_v1";
const STORAGE_KEY_VOTER_ID = "sl_reverie_voter_uuid";

export default function FeaturesBoardClient() {
  const [ideas, setIdeas] = useState<FeatureIdea[]>(INITIAL_FEATURE_IDEAS);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | "all">("all");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [sortBy, setSortBy] = useState<"votes" | "newest">("votes");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hydrate state from LocalStorage on mount
  useEffect(() => {
    try {
      // 1. Voter Anonymous UUID
      let voterId = localStorage.getItem(STORAGE_KEY_VOTER_ID);
      if (!voterId) {
        voterId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `voter_${Date.now()}`;
        localStorage.setItem(STORAGE_KEY_VOTER_ID, voterId);
      }

      // 2. User's Upvoted Feature IDs
      const rawVotes = localStorage.getItem(STORAGE_KEY_UPVOTES);
      if (rawVotes) {
        const parsed = JSON.parse(rawVotes);
        if (Array.isArray(parsed)) {
          setVotedIds(new Set(parsed));
        }
      }

      // 3. User's Locally Proposed Ideas
      const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_IDEAS);
      if (rawCustom) {
        const parsedCustom = JSON.parse(rawCustom);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          // Merge custom ideas on top of initial ideas
          setIdeas((prev) => {
            const existingIds = new Set(prev.map((i) => i.id));
            const fresh = parsedCustom.filter((item: FeatureIdea) => !existingIds.has(item.id));
            return [...fresh, ...prev];
          });
        }
      }
    } catch {
      // Graceful fallback for restricted environments
    }
  }, []);

  // Upvote / Toggle Handler
  const handleToggleVote = (featureId: string) => {
    setVotedIds((prevVoted) => {
      const nextVoted = new Set(prevVoted);
      const isAlreadyVoted = nextVoted.has(featureId);

      if (isAlreadyVoted) {
        nextVoted.delete(featureId);
      } else {
        nextVoted.add(featureId);
      }

      // Persist to LocalStorage
      try {
        localStorage.setItem(STORAGE_KEY_UPVOTES, JSON.stringify(Array.from(nextVoted)));
      } catch {}

      // Update vote counter in ideas list
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) => {
          if (idea.id === featureId) {
            return {
              ...idea,
              votes: isAlreadyVoted ? Math.max(0, idea.votes - 1) : idea.votes + 1,
            };
          }
          return idea;
        })
      );

      return nextVoted;
    });
  };

  // Submit New Feature Handler
  const handleProposeSubmit = (newProposal: {
    title: string;
    description: string;
    category: FeatureCategory;
    author: string;
  }) => {
    const freshId = `community-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newFeature: FeatureIdea = {
      id: freshId,
      title: newProposal.title,
      description: newProposal.description,
      category: newProposal.category,
      status: "under-review",
      votes: 1, // Automatically give 1 vote from author
      author: newProposal.author,
      createdAt: new Date().toISOString().split("T")[0],
      isOfficial: false,
    };

    // Pre-vote for own submission
    setVotedIds((prev) => {
      const updated = new Set(prev);
      updated.add(freshId);
      try {
        localStorage.setItem(STORAGE_KEY_UPVOTES, JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });

    // Save locally
    setIdeas((prev) => {
      const updated = [newFeature, ...prev];
      try {
        const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_IDEAS);
        const existingCustom = rawCustom ? JSON.parse(rawCustom) : [];
        localStorage.setItem(STORAGE_KEY_CUSTOM_IDEAS, JSON.stringify([newFeature, ...existingCustom]));
      } catch {}
      return updated;
    });
  };

  // Filtering & Search
  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Category filter
      if (selectedCategory !== "all" && idea.category !== selectedCategory) {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = idea.title.toLowerCase().includes(q);
        const matchesDesc = idea.description.toLowerCase().includes(q);
        const matchesAuthor = idea.author.toLowerCase().includes(q);
        const matchesCat = idea.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesAuthor && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [ideas, selectedCategory, searchQuery]);

  // Sorting
  const sortedIdeas = useMemo(() => {
    const list = [...filteredIdeas];
    if (sortBy === "votes") {
      return list.sort((a, b) => b.votes - a.votes);
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return list;
  }, [filteredIdeas, sortBy]);

  // KPI Calculations
  const stats = useMemo(() => {
    const totalIdeas = ideas.length;
    const totalVotes = ideas.reduce((acc, curr) => acc + curr.votes, 0);
    const inProgressCount = ideas.filter((i) => i.status === "in-progress").length;
    const shippedCount = ideas.filter((i) => i.status === "shipped").length;
    return { totalIdeas, totalVotes, inProgressCount, shippedCount };
  }, [ideas]);

  const kanbanStatuses: FeatureStatus[] = ["under-review", "planned", "in-progress", "shipped"];

  return (
    <div className="w-full space-y-8">
      {/* ─── Top Stats Bar ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <div className="p-4 bg-white border-2 border-black rounded-[3px] shadow-brutal-sm">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            [01] // ACTIVE PROPOSALS
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-black tabular-nums font-space">
              {stats.totalIdeas}
            </span>
            <span className="text-xs text-zinc-600 font-bold">SPECS</span>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-black rounded-[3px] shadow-brutal-sm">
          <div className="text-[10px] font-bold text-[#ff4400] uppercase tracking-wider flex items-center gap-1">
            <Flame className="h-3 w-3" />
            <span>[02] // COMMUNITY VOTES</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#ff4400] tabular-nums font-space">
              {stats.totalVotes.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-600 font-bold">TOTAL</span>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-black rounded-[3px] shadow-brutal-sm">
          <div className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>[03] // IN ENGINEERING</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-black tabular-nums font-space">
              {stats.inProgressCount}
            </span>
            <span className="text-xs text-zinc-600 font-bold">ACTIVE</span>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-black rounded-[3px] shadow-brutal-sm">
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <Check className="h-3 w-3" strokeWidth={3} />
            <span>[04] // SHIPPED TO USERS</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-800 tabular-nums font-space">
              {stats.shippedCount}
            </span>
            <span className="text-xs text-zinc-600 font-bold">DELIVERED</span>
          </div>
        </div>
      </div>

      {/* ─── Controls & Filter Bar ─── */}
      <div className="p-4 sm:p-5 bg-[#f4f4ee] border-2 border-black rounded-[3px] shadow-brutal space-y-4">
        {/* Row 1: Search, View Mode, Propose CTA */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search features by keyword or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-[2px] font-mono text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ff4400]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-zinc-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold shrink-0">
            {/* Sort Toggle */}
            <div className="flex items-center border-2 border-black rounded-[2px] bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setSortBy("votes")}
                className={`px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1 ${
                  sortBy === "votes" ? "bg-black text-white" : "text-black hover:bg-zinc-100"
                }`}
                title="Sort by highest upvotes"
              >
                <Flame className="h-3.5 w-3.5 text-[#ff4400]" />
                <span>Top Votes</span>
              </button>
              <button
                type="button"
                onClick={() => setSortBy("newest")}
                className={`px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1 border-l-2 border-black ${
                  sortBy === "newest" ? "bg-black text-white" : "text-black hover:bg-zinc-100"
                }`}
                title="Sort by latest submissions"
              >
                <span>Newest</span>
              </button>
            </div>

            {/* View Switcher: Kanban vs List */}
            <div className="flex items-center border-2 border-black rounded-[2px] bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("kanban")}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === "kanban" ? "bg-black text-white" : "text-black hover:bg-zinc-100"
                }`}
                aria-label="Kanban Roadmap View"
                title="Kanban Roadmap Columns"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 transition-colors cursor-pointer border-l-2 border-black ${
                  viewMode === "list" ? "bg-black text-white" : "text-black hover:bg-zinc-100"
                }`}
                aria-label="Ranked List View"
                title="Ranked Priority List"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Propose Feature CTA */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-brutal-primary px-4 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-brutal-xs hover:shadow-brutal"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              <span>Propose Feature</span>
            </button>
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="pt-3 border-t border-zinc-300 flex items-center gap-1.5 flex-wrap font-mono text-[11px] font-bold">
          <span className="text-zinc-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" />
            <span>FILTER:</span>
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-black text-white border-black font-black"
                : "bg-white text-black border-zinc-400 hover:border-black"
            }`}
          >
            ALL CATEGORIES ({ideas.length})
          </button>

          {(Object.keys(CATEGORY_CONFIG) as FeatureCategory[]).map((cat) => {
            const count = ideas.filter((i) => i.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#ff4400] text-white border-black font-black"
                    : "bg-white text-black border-zinc-400 hover:border-black"
                }`}
              >
                [{CATEGORY_CONFIG[cat].code}] {CATEGORY_CONFIG[cat].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Main Content Presentation ─── */}
      {filteredIdeas.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center border-2 border-dashed border-zinc-400 rounded-[3px] bg-white space-y-3 font-mono">
          <Layers className="h-8 w-8 mx-auto text-zinc-400" />
          <h3 className="text-base font-black text-black">NO MATCHING FEATURE PROPOSALS</h3>
          <p className="text-xs text-zinc-600 font-sans max-w-sm mx-auto">
            No features found matching &ldquo;{searchQuery}&rdquo;. Try clearing filters or submit a new idea.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="btn-brutal-secondary px-4 py-1.5 text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : viewMode === "kanban" ? (
        /* ─── KANBAN ROADMAP VIEW ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {kanbanStatuses.map((statusKey) => {
            const statusCfg = STATUS_CONFIG[statusKey];
            const columnIdeas = sortedIdeas.filter((idea) => idea.status === statusKey);

            return (
              <div
                key={statusKey}
                className="flex flex-col border-2 border-black rounded-[3px] bg-[#fdfdfb] shadow-brutal-sm overflow-hidden"
              >
                {/* Column Header */}
                <div className="px-4 py-3 bg-[#f4f4ee] border-b-2 border-black flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-black">
                      {statusCfg.tag}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-black text-white text-[11px] font-black rounded-[1px] tabular-nums">
                    {columnIdeas.length}
                  </span>
                </div>

                {/* Subtitle description */}
                <div className="px-4 py-2 border-b border-zinc-200 bg-white font-mono text-[10px] text-zinc-500 font-bold uppercase">
                  {statusCfg.label}
                </div>

                {/* Card Stack */}
                <div className="p-3 space-y-3 min-h-[350px] flex-1">
                  {columnIdeas.length === 0 ? (
                    <div className="py-12 text-center font-mono text-xs text-zinc-400 select-none">
                      EMPTY COLUMN
                    </div>
                  ) : (
                    columnIdeas.map((idea) => (
                      <FeatureCard
                        key={idea.id}
                        idea={idea}
                        hasVoted={votedIds.has(idea.id)}
                        onToggleVote={handleToggleVote}
                        compact={true}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── RANKED LIST VIEW ─── */
        <div className="space-y-3 max-w-4xl mx-auto">
          {sortedIdeas.map((idea) => (
            <FeatureCard
              key={idea.id}
              idea={idea}
              hasVoted={votedIds.has(idea.id)}
              onToggleVote={handleToggleVote}
              compact={false}
            />
          ))}
        </div>
      )}

      {/* ─── Modal ─── */}
      <ProposeFeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProposeSubmit}
      />
    </div>
  );
}
