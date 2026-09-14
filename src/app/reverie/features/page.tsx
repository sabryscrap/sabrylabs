import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import FeaturesBoardClient from "@/components/features/FeaturesBoardClient";

export const metadata: Metadata = {
  title: "Feature Radar & Community Upvoting — Reverie Pomodoro",
  description:
    "Vote on upcoming features, shape the Reverie Pomodoro roadmap, and propose new focus engineering ideas with zero accounts or logins required.",
  openGraph: {
    title: "Reverie Feature Radar & Public Roadmap | Sabry Labs",
    description:
      "Help prioritize upcoming acoustics, dial controls, and desktop features for Reverie. Transparent, community-driven, zero logins required.",
  },
};

export default function ReverieFeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f4] text-black">
      {/* ─── Hero Header ─── */}
      <section className="relative w-full border-b-2 border-black bg-white px-4 pt-10 pb-12 sm:px-6 lg:px-8 bg-swiss-subtle">
        <div className="mx-auto max-w-6xl">
          {/* Back to Reverie Storefront Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/reverie"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black hover:text-[#ff4400] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span>[00] BACK TO REVERIE STOREFRONT</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="badge-brutal text-black bg-[#f4f4ee]">
                  RADAR // PUBLIC ROADMAP
                </span>
                <span className="badge-brutal bg-[#ff4400] text-white">
                  ZERO-ACCOUNT VOTING
                </span>
              </div>

              {/* Title */}
              <h1 className="font-space text-3xl sm:text-5xl font-black tracking-[-0.04em] text-black leading-tight">
                Reverie Feature Radar &amp; Upvoting
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-700 font-sans leading-relaxed font-medium">
                We believe software roadmaps should be radically open and prioritized directly by the craftsmen who use them. Vote on upcoming focus instruments, track what is currently in active engineering, and submit new ideas with zero logins or accounts.
              </p>
            </div>

            {/* Zero Login Guarantees */}
            <div className="shrink-0 p-3.5 bg-[#f4f4ee] border-2 border-black rounded-[3px] font-mono text-[11px] space-y-1.5 shadow-brutal-sm">
              <div className="font-black text-black uppercase tracking-wider flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-[#ff4400]" />
                <span>Zero-Login Guarantees</span>
              </div>
              <div className="text-zinc-700 space-y-1">
                <div>• No account registration or password</div>
                <div>• Cryptographic anonymous device token</div>
                <div>• Instant live vote updates (&lt;16ms)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Board ─── */}
      <main className="w-full flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FeaturesBoardClient />
        </div>
      </main>
    </div>
  );
}
