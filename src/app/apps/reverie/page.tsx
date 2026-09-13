import ReverieStorefront from "@/app/reverie/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reverie by Sabry Labs — Tactile Focus Instrument for Windows",
  description:
    "The distraction-free Windows focus timer with Apple spring physics, Swiss Dieter Rams brutalist themes, and psychoacoustic Gamma audio. $19 lifetime license, zero subscriptions.",
};

export default function AppsReveriePage() {
  return <ReverieStorefront />;
}
