"use client";

import React, { useState } from "react";
import { X, Lightbulb, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FeatureCategory, CATEGORY_CONFIG } from "@/lib/features-data";

interface ProposeFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    category: FeatureCategory;
    author: string;
  }) => void;
}

export default function ProposeFeatureModal({
  isOpen,
  onClose,
  onSubmit,
}: ProposeFeatureModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FeatureCategory>("dial-ux");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedTitle, setLastSubmittedTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const trimmedAuthor = author.trim() ? (author.startsWith("@") ? author.trim() : `@${author.trim()}`) : "@community";

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      author: trimmedAuthor,
    });

    setLastSubmittedTitle(title.trim());
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setSubmitted(false);
    onClose();
  };

  const githubNewIssueUrl = `https://github.com/sabryscrap/sabrylabs/issues/new?title=${encodeURIComponent(
    `[Feature Request]: ${lastSubmittedTitle || title}`
  )}&body=${encodeURIComponent(
    `### Feature Summary\n${lastSubmittedTitle || title}\n\n### Category\n${CATEGORY_CONFIG[category].label}\n\n### Problem It Solves\n${description}\n\n### Proposed By\n${author || "Anonymous Community Member"}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleResetAndClose}
    >
      <div
        className="relative max-h-[92vh] max-w-xl w-full border-2 border-black bg-white p-5 sm:p-7 shadow-brutal-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drafting Crosshairs */}
        <span className="absolute top-2 left-2 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute top-2 right-2 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute bottom-2 left-2 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute bottom-2 right-2 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#ff4400] text-white border-2 border-black rounded-[2px] shadow-brutal-xs">
              <Lightbulb className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                RADAR // ZERO-ACCOUNT SUBMISSION
              </div>
              <h2 className="font-space text-lg sm:text-xl font-black text-black">
                Propose Feature for Reverie
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="p-1.5 bg-white hover:bg-black hover:text-white text-black border-2 border-black rounded-[2px] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Success Confirmation State */}
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-700 border-2 border-black rounded-[3px] flex items-center justify-center shadow-brutal-xs">
              <CheckCircle2 className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-space text-xl font-black text-black">
                Feature Idea Added to Live Radar!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-700 font-sans max-w-md mx-auto leading-relaxed">
                Your proposal has been published to your active radar board and upvoted by you. It is saved in your local session without requiring any account login.
              </p>
            </div>

            {/* Optional GitHub Archival CTA */}
            <div className="pt-4 border-t border-zinc-200 text-left bg-[#f7f7f4] p-4 border-2 border-black rounded-[2px]">
              <div className="font-mono text-[10px] font-bold text-[#ff4400] uppercase tracking-wider mb-1">
                PERMANENT REPO RADAR
              </div>
              <p className="text-xs text-zinc-800 font-medium leading-relaxed">
                Want to ensure the founder permanently tracks this in the open-source engineering backlog? Click below to post a prefilled ticket to the GitHub repository:
              </p>
              <a
                href={githubNewIssueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 btn-brutal-primary px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Post to Official GitHub Backlog</span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-brutal-secondary px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider"
              >
                Done / Return to Board
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 font-sans text-left">
            {/* Title */}
            <div>
              <label htmlFor="feature-title" className="block font-mono text-xs font-bold text-black uppercase mb-1">
                Feature Headline <span className="text-[#ff4400]">*</span>
              </label>
              <input
                id="feature-title"
                type="text"
                required
                maxLength={90}
                placeholder="e.g., Obsidian Markdown Vault Focus Session Logger"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-[#fdfdfb] text-black font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4400] font-medium"
              />
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block text-right">
                {title.length}/90 chars
              </span>
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="feature-category" className="block font-mono text-xs font-bold text-black uppercase mb-1">
                Subsystem Category <span className="text-[#ff4400]">*</span>
              </label>
              <select
                id="feature-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as FeatureCategory)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-[#fdfdfb] text-black font-mono text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#ff4400] cursor-pointer"
              >
                {(Object.keys(CATEGORY_CONFIG) as FeatureCategory[]).map((cat) => (
                  <option key={cat} value={cat}>
                    [{CATEGORY_CONFIG[cat].code}] — {CATEGORY_CONFIG[cat].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Problem Solved & Narrative */}
            <div>
              <label htmlFor="feature-desc" className="block font-mono text-xs font-bold text-black uppercase mb-1">
                The Problem It Solves <span className="text-[#ff4400]">*</span>
              </label>
              <textarea
                id="feature-desc"
                required
                rows={4}
                maxLength={450}
                placeholder="What friction do you experience in your focus workflow? How should Reverie solve it?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-[#fdfdfb] text-black font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4400] leading-relaxed font-medium resize-none"
              />
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block text-right">
                {description.length}/450 chars
              </span>
            </div>

            {/* Optional Author Handle */}
            <div>
              <label htmlFor="feature-author" className="block font-mono text-xs font-bold text-black uppercase mb-1">
                Author Tag / Nickname <span className="text-zinc-500 font-normal">(Optional)</span>
              </label>
              <input
                id="feature-author"
                type="text"
                maxLength={30}
                placeholder="@yourhandle or nickname (defaults to @community)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-[#fdfdfb] text-black font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#ff4400]"
              />
            </div>

            {/* Zero-Login Privacy Notice */}
            <div className="p-3 bg-[#f4f4ee] border-2 border-black rounded-[2px] font-mono text-[11px] text-zinc-700 leading-normal">
              <span className="font-bold text-black">NO LOGIN BARRIER:</span> We do not require an account, password, or cookies. Your suggestion is assigned a cryptographic anonymous client token and published immediately.
            </div>

            {/* Actions */}
            <div className="pt-3 border-t-2 border-black flex items-center justify-end gap-3 font-mono">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-brutal-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-brutal-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                Submit Proposal (Zero Login)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
