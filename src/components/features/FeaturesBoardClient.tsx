"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Plus, ChevronUp } from "lucide-react";
import {
  FeatureIdea,
  FeatureCategory,
  INITIAL_FEATURE_IDEAS,
  CATEGORY_CONFIG,
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
  const [sortBy, setSortBy] = useState<"votes" | "newest">("votes");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      let voterId = localStorage.getItem(STORAGE_KEY_VOTER_ID);
      if (!voterId) {
        voterId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `voter_${Date.now()}`;
        localStorage.setItem(STORAGE_KEY_VOTER_ID, voterId);
      }

      const rawVotes = localStorage.getItem(STORAGE_KEY_UPVOTES);
      if (rawVotes) {
        const parsed = JSON.parse(rawVotes);
        if (Array.isArray(parsed)) setVotedIds(new Set(parsed));
      }

      const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_IDEAS);
      if (rawCustom) {
        const parsedCustom = JSON.parse(rawCustom);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          setIdeas((prev) => {
            const existingIds = new Set(prev.map((i) => i.id));
            const fresh = parsedCustom.filter((item: FeatureIdea) => !existingIds.has(item.id));
            return [...fresh, ...prev];
          });
        }
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  const handleToggleVote = (featureId: string) => {
    setVotedIds((prevVoted) => {
      const nextVoted = new Set(prevVoted);
      const isAlreadyVoted = nextVoted.has(featureId);

      if (isAlreadyVoted) {
        nextVoted.delete(featureId);
      } else {
        nextVoted.add(featureId);
      }

      try {
        localStorage.setItem(STORAGE_KEY_UPVOTES, JSON.stringify(Array.from(nextVoted)));
      } catch {}

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
      votes: 1,
      author: newProposal.author,
      createdAt: new Date().toISOString().split("T")[0],
      isOfficial: false,
    };

    setVotedIds((prev) => {
      const updated = new Set(prev);
      updated.add(freshId);
      try {
        localStorage.setItem(STORAGE_KEY_UPVOTES, JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });

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

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      if (selectedCategory !== "all" && idea.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !idea.title.toLowerCase().includes(q) &&
          !idea.description.toLowerCase().includes(q) &&
          !idea.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [ideas, selectedCategory, searchQuery]);

  const sortedIdeas = useMemo(() => {
    const list = [...filteredIdeas];
    if (sortBy === "votes") return list.sort((a, b) => b.votes - a.votes);
    if (sortBy === "newest") return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [filteredIdeas, sortBy]);

  const categories = useMemo(() => {
    const used = new Set(ideas.map((i) => i.category));
    return (Object.keys(CATEGORY_CONFIG) as FeatureCategory[]).filter((c) => used.has(c));
  }, [ideas]);

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-[2px] font-mono text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ff4400]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-zinc-400 hover:text-black cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 font-mono text-xs font-bold shrink-0">
          {/* Sort */}
          <div className="flex items-center border-2 border-black rounded-[2px] bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setSortBy("votes")}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                sortBy === "votes" ? "bg-black text-white" : "text-black hover:bg-zinc-100"
              }`}
            >
              Top
            </button>
            <button
              type="button"
              onClick={() => setSortBy("newest")}
              className={`px-3 py-1.5 transition-colors cursor-pointer border-l-2 border-black ${
                sortBy === "newest" ? "bg-black text-white" : "text-black hover:bg-zinc-100"
              }`}
            >
              New
            </button>
          </div>

          {/* Propose */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-brutal-primary px-4 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            <span>Propose</span>
          </button>
        </div>
      </div>

      {/* Category filters — only show if there are ideas with categories */}
      {categories.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-zinc-400 hover:border-black"
            }`}
          >
            All ({ideas.length})
          </button>
          {categories.map((cat) => {
            const count = ideas.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#ff4400] text-white border-black"
                    : "bg-white text-black border-zinc-400 hover:border-black"
                }`}
              >
                {CATEGORY_CONFIG[cat].label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      {sortedIdeas.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-zinc-300 rounded-[3px] bg-white space-y-3 font-mono">
          <ChevronUp className="h-8 w-8 mx-auto text-zinc-300" />
          <h3 className="text-sm font-black text-black">
            {ideas.length === 0 ? "No features proposed yet" : "No results"}
          </h3>
          <p className="text-xs text-zinc-500 font-sans max-w-sm mx-auto">
            {ideas.length === 0
              ? "Be the first to propose a feature idea for Reverie."
              : "Try a different search or clear filters."}
          </p>
          {ideas.length === 0 ? (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-brutal-primary px-4 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer mt-2"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              <span>Propose a Feature</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="btn-brutal-secondary px-4 py-1.5 text-xs font-bold cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedIdeas.map((idea) => (
            <FeatureCard
              key={idea.id}
              idea={idea}
              hasVoted={votedIds.has(idea.id)}
              onToggleVote={handleToggleVote}
            />
          ))}
        </div>
      )}

      <ProposeFeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProposeSubmit}
      />
    </div>
  );
}
