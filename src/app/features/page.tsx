import type { Metadata } from "next";
import ReverieFeaturesPage, { metadata as reverieMetadata } from "../reverie/features/page";

export const metadata: Metadata = {
  ...reverieMetadata,
  title: "Feature Radar & Community Upvoting — Sabry Labs",
};

export default ReverieFeaturesPage;
