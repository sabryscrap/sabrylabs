import React from "react";
import type { Metadata } from "next";
import AppsCatalog from "@/components/apps/AppsCatalog";

export const metadata: Metadata = {
  title: "Software Catalog & Atelier Suite — Sabry Labs",
  description:
    "Explore standalone desktop engines, mobile software, in-browser WebAssembly tools, and local AI pipelines engineered for tactile craftsmanship and radical data sovereignty.",
};

export default function AppsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f4] text-black">
      <main className="flex-1">
        <AppsCatalog />
      </main>
    </div>
  );
}
