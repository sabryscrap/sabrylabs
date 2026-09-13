import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import LogbookClient from "./LogbookClient";

export const metadata: Metadata = {
  title: "Engineering Logbook & Retrospectives — Sabry Labs",
  description:
    "Technical devlogs, blueprints, and architecture retrospectives by founder Sabry Belal. Deep-dives into desktop performance, WebAssembly, audio synthesis, and offline AI.",
  alternates: {
    types: {
      "application/rss+xml": "https://sabrylabs.com/feed.xml",
    },
  },
};

export default function LogbookPage() {
  const posts = getAllPosts();

  return <LogbookClient posts={posts} />;
}
