import { Metadata } from "next";
import SpritelyClient from "./SpritelyClient";

export const metadata: Metadata = {
  title: "Spritely Aligner — In-Browser Anti-Jitter Sprite Studio | Sabry Labs",
  description:
    "Professional client-side spritesheet alignment, slicing, and green-screen despill studio. Eliminate animation jitter with zero server uploads.",
  openGraph: {
    title: "Spritely Aligner — Anti-Jitter Sprite Studio",
    description:
      "Interactive client-side canvas tool for slicing, centering, and packaging 2D spritesheets without animation shake.",
    url: "https://sabrylabs.com/tools/spritely",
  },
};

export default function SpritelyPage() {
  return <SpritelyClient />;
}
