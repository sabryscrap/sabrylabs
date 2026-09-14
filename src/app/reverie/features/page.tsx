import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FeaturesBoardClient from "@/components/features/FeaturesBoardClient";

export const metadata: Metadata = {
  title: "Feature Requests — Reverie Pomodoro",
  description:
    "Vote on upcoming features and propose new ideas for Reverie Pomodoro.",
};

export default function ReverieFeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f4] text-black">
      <section className="w-full border-b-2 border-black bg-white px-4 pt-8 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4">
            <Link
              href="/reverie"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black hover:text-[#ff4400] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span>Back to Reverie</span>
            </Link>
          </div>

          <h1 className="font-space text-2xl sm:text-4xl font-black tracking-tight text-black">
            Feature Requests
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-600 font-sans">
            Vote on what to build next or propose your own idea. All submissions go to our GitHub backlog for tracking.
          </p>
        </div>
      </section>

      <main className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FeaturesBoardClient />
        </div>
      </main>
    </div>
  );
}
