import { generateRssXml } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  try {
    const rssXml = generateRssXml();

    return new Response(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    // Graceful fallback for empty or error state
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sabry Labs — Engineering Logbook</title>
    <link>https://sabrylabs.com</link>
    <description>Independent software laboratory devlogs.</description>
    <language>en-us</language>
  </channel>
</rss>`;

    return new Response(fallbackXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
}
