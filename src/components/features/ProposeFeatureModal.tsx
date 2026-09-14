"use client";

import React, { useState } from "react";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
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

    const trimmedAuthor = author.trim() ? (author.startsWith("@") ? author.trim() : `@${author.trim()}`) : "@anonymous";

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
    `### Feature\n${lastSubmittedTitle || title}\n\n### Category\n${CATEGORY_CONFIG[category].label}\n\n### Description\n${description}\n\n### Proposed By\n${author || "Anonymous"}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      onClick={handleResetAndClose}
    >
      <div
        className="relative max-h-[92vh] max-w-xl w-full border-2 border-black bg-white p-5 sm:p-7 shadow-brutal-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <h2 className="font-space text-lg font-black text-black">
            Propose a Feature
          </h2>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="p-1.5 hover:bg-black hover:text-white text-black border-2 border-black rounded-[2px] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-600" strokeWidth={2.5} />
            <div>
              <h3 className="font-space text-lg font-black text-black">Submitted</h3>
              <p className="mt-1 text-sm text-zinc-600 font-sans">
                Your idea is saved locally. To make it permanent, post it to our GitHub backlog:
              </p>
            </div>

            <a
              href={githubNewIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal-primary px-4 py-2 text-xs font-mono font-bold uppercase inline-flex items-center gap-2"
            >
              <span>Post to GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </a>

            <div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-brutal-secondary px-6 py-2 text-xs font-mono font-bold uppercase"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
            <div>
              <label htmlFor="feature-title" className="block font-mono text-xs font-bold text-black mb-1">
                Title <span className="text-[#ff4400]">*</span>
              </label>
              <input
                id="feature-title"
                type="text"
                required
                maxLength={90}
                placeholder="Short, clear title for your feature idea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4400]"
              />
            </div>

            <div>
              <label htmlFor="feature-category" className="block font-mono text-xs font-bold text-black mb-1">
                Category <span className="text-[#ff4400]">*</span>
              </label>
              <select
                id="feature-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as FeatureCategory)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-white text-black font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#ff4400] cursor-pointer"
              >
                {(Object.keys(CATEGORY_CONFIG) as FeatureCategory[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_CONFIG[cat].label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="feature-desc" className="block font-mono text-xs font-bold text-black mb-1">
                Description <span className="text-[#ff4400]">*</span>
              </label>
              <textarea
                id="feature-desc"
                required
                rows={3}
                maxLength={450}
                placeholder="What problem does this solve? How should it work?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4400] resize-none"
              />
            </div>

            <div>
              <label htmlFor="feature-author" className="block font-mono text-xs font-bold text-black mb-1">
                Your name <span className="text-zinc-400 font-normal">(optional)</span>
              </label>
              <input
                id="feature-author"
                type="text"
                maxLength={30}
                placeholder="@handle or name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-[2px] bg-white text-black font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#ff4400]"
              />
            </div>

            <div className="pt-3 border-t-2 border-black flex items-center justify-end gap-3 font-mono">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-brutal-secondary px-4 py-2 text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-brutal-primary px-6 py-2 text-xs font-bold uppercase"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
