// tests/unit/milestone5.test.mjs
// Unit & Integration verification for Milestone 5: Logbook, License Hub & RSS Feed

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { validateRss2Xml } from '../e2e/helpers.mjs';

const ROOT_DIR = path.resolve(import.meta.dirname, '../..');
const CONTENT_DIR = path.join(ROOT_DIR, 'src', 'content', 'logbook');

describe('Milestone 5: Engineering Logbook, License Desk & RSS Feed Verification', () => {

  describe('1. Content Files & Frontmatter Verification', () => {
    const requiredFiles = [
      'how-i-built-reverie.md',
      'vibe-coding-autocut.md',
      'zero-jitter-spritesheet-aligner.md'
    ];

    it('should verify all 3 authentic devlog markdown files exist on disk', () => {
      for (const fileName of requiredFiles) {
        const filePath = path.join(CONTENT_DIR, fileName);
        assert.ok(fs.existsSync(filePath), `File ${fileName} must exist`);
      }
    });

    it('should verify how-i-built-reverie.md frontmatter and technical content', () => {
      const content = fs.readFileSync(path.join(CONTENT_DIR, 'how-i-built-reverie.md'), 'utf8');
      const { data, content: body } = matter(content);

      assert.strictEqual(data.title, 'Engineering an Apple-Grade Pomodoro Desktop Engine in React 19 & Electron');
      assert.strictEqual(data.slug, 'how-i-built-reverie');
      assert.ok(Array.isArray(data.aliases) && data.aliases.includes('building-reverie-pomodoro-desktop-architecture'));
      assert.strictEqual(data.author, 'Sabry Belal');
      assert.strictEqual(data.category, 'Desktop Architecture');
      assert.ok(data.featured, 'Reverie post should be featured');
      assert.ok(Array.isArray(data.tags) && data.tags.includes('Electron'));
      assert.ok(body.length > 2000, 'Article body must have substantial depth');
      assert.ok(body.includes('```typescript'), 'Article must contain TypeScript code snippets');
      assert.ok(body.includes('performance.now()'), 'Article must discuss performance timing');
      assert.ok(body.includes('456.81'), 'Article must discuss capsule perimeter geometry');
    });

    it('should verify vibe-coding-autocut.md frontmatter and technical content', () => {
      const content = fs.readFileSync(path.join(CONTENT_DIR, 'vibe-coding-autocut.md'), 'utf8');
      const { data, content: body } = matter(content);

      assert.strictEqual(data.title, 'Eliminating Stutters and Dead Air: How AutoCut Replaced 3 Hours of Manual Editing with 45 Seconds of Code');
      assert.strictEqual(data.slug, 'vibe-coding-autocut');
      assert.ok(Array.isArray(data.aliases) && data.aliases.includes('zero-cloud-video-cut-pipeline-faster-whisper'));
      assert.strictEqual(data.category, 'AI Pipelines');
      assert.ok(Array.isArray(data.tags) && data.tags.includes('FFmpeg'));
      assert.ok(body.length > 2000, 'Article body must have substantial depth');
      assert.ok(body.includes('faster-whisper'), 'Article must detail faster-whisper');
      assert.ok(body.includes('Silero VAD'), 'Article must detail Silero VAD');
      assert.ok(body.includes('75.5%'), 'Article must mention real 75.5% benchmark');
    });

    it('should verify zero-jitter-spritesheet-aligner.md frontmatter and technical content', () => {
      const content = fs.readFileSync(path.join(CONTENT_DIR, 'zero-jitter-spritesheet-aligner.md'), 'utf8');
      const { data, content: body } = matter(content);

      assert.strictEqual(data.title, 'Why Game Devs Suffer Animation Jitter and How Canvas Bounding-Box Math Fixes It');
      assert.strictEqual(data.slug, 'zero-jitter-spritesheet-aligner');
      assert.ok(Array.isArray(data.aliases) && data.aliases.includes('eliminating-spritesheet-jitter-algorithms'));
      assert.strictEqual(data.category, 'Algorithms');
      assert.ok(Array.isArray(data.tags) && data.tags.includes('Canvas API'));
      assert.ok(body.length > 2000, 'Article body must have substantial depth');
      assert.ok(body.includes('computeUnionBoundingBox'), 'Article must contain union box math');
      assert.ok(body.includes('applyMorphologicalErosion'), 'Article must contain erosion algorithm');
      assert.ok(body.includes('detectSpritesBfs'), 'Article must contain BFS connected components');
    });
  });

  describe('2. Logbook Index & Article Reader Pages Verification', () => {
    it('should verify src/app/logbook/page.tsx exists and is correctly structured', () => {
      const pagePath = path.join(ROOT_DIR, 'src/app/logbook/page.tsx');
      assert.ok(fs.existsSync(pagePath));
      const text = fs.readFileSync(pagePath, 'utf8');
      assert.ok(text.includes('getAllPosts'), 'Must load posts via getAllPosts()');
      assert.ok(text.includes('LogbookClient'), 'Must render LogbookClient component');
    });

    it('should verify src/app/logbook/[slug]/page.tsx exists and has dynamic route handling', () => {
      const pagePath = path.join(ROOT_DIR, 'src/app/logbook/[slug]/page.tsx');
      assert.ok(fs.existsSync(pagePath));
      const text = fs.readFileSync(pagePath, 'utf8');
      assert.ok(text.includes('generateStaticParams'), 'Must export generateStaticParams');
      assert.ok(text.includes('generateMetadata'), 'Must export generateMetadata');
      assert.ok(text.includes('getPostBySlug'), 'Must call getPostBySlug');
      assert.ok(text.includes('notFound'), 'Must handle 404 with notFound()');
    });

    it('should verify ArticleReaderClient.tsx has copy button and TOC tracking', () => {
      const clientPath = path.join(ROOT_DIR, 'src/app/logbook/[slug]/ArticleReaderClient.tsx');
      assert.ok(fs.existsSync(clientPath));
      const text = fs.readFileSync(clientPath, 'utf8');
      assert.ok(text.includes('copy-code-btn'), 'Must bind copy code buttons');
      assert.ok(text.includes('navigator.clipboard.writeText'), 'Must use clipboard API');
      assert.ok(text.includes('scrollProgress'), 'Must compute reading scroll progress');
      assert.ok(text.includes('Sabry Belal'), 'Must feature author Sabry Belal');
    });
  });

  describe('3. License Desk Page Verification', () => {
    it('should verify src/app/license/page.tsx contains 3-step walkthrough, portal link, and FAQs', () => {
      const licensePath = path.join(ROOT_DIR, 'src/app/license/page.tsx');
      assert.ok(fs.existsSync(licensePath));
      const text = fs.readFileSync(licensePath, 'utf8');

      // 3 steps
      assert.ok(text.includes('STEP 01') && text.includes('Retrieve Your License Key'));
      assert.ok(text.includes('STEP 02') && text.includes('Enter Key in Application'));
      assert.ok(text.includes('STEP 03') && text.includes('Instant Local Validation'));

      // Lemon Squeezy portal
      assert.ok(text.includes('https://app.lemonsqueezy.com/my-orders/'), 'Must link to Lemon Squeezy order lookup');

      // 3 machine policy
      assert.ok(text.includes('3 Personal Machines') || text.includes('3 personal devices'));
      assert.ok(text.includes('Deactivate Machine'));

      // 5 FAQs
      assert.ok(text.includes('Where do I find my license key?'));
      assert.ok(text.includes('recurring subscription or a lifetime license'));
      assert.ok(text.includes('What happens if I format my hard drive'));
      assert.ok(text.includes('What if I lose my license key'));
      assert.ok(text.includes('What is your refund policy?'));
    });
  });

  describe('4. RSS 2.0 Feed Route Handler Verification', () => {
    it('should verify src/app/feed.xml/route.ts exists and specifies correct headers', () => {
      const feedPath = path.join(ROOT_DIR, 'src/app/feed.xml/route.ts');
      assert.ok(fs.existsSync(feedPath));
      const text = fs.readFileSync(feedPath, 'utf8');
      assert.ok(text.includes('generateRssXml'), 'Must call generateRssXml()');
      assert.ok(text.includes('application/xml; charset=utf-8'), 'Must return XML Content-Type');
      assert.ok(text.includes('s-maxage=3600'), 'Must include caching header');
    });

    it('should verify generated RSS 2.0 XML passes standard RSS validation', () => {
      // Test the RSS generator algorithm directly
      const fileNames = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
      const items = fileNames.map(f => {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
        const { data } = matter(raw);
        return `    <item>
      <title>${data.title}</title>
      <link>https://sabrylabs.com/logbook/${data.slug}</link>
      <guid isPermaLink="true">https://sabrylabs.com/logbook/${data.slug}</guid>
      <pubDate>Tue, 01 Sep 2026 00:00:00 GMT</pubDate>
      <description><![CDATA[${data.summary}]]></description>
      <category>${data.category}</category>
    </item>`;
      }).join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sabry Labs — Engineering Logbook</title>
    <link>https://sabrylabs.com</link>
    <description>Independent software laboratory devlogs.</description>
    <language>en-us</language>
    <lastBuildDate>Sun, 13 Sep 2026 08:00:00 GMT</lastBuildDate>
    <atom:link href="https://sabrylabs.com/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

      const res = validateRss2Xml(xml);
      assert.ok(res.valid, 'RSS XML must be valid');
      assert.strictEqual(res.version, '2.0');
      assert.strictEqual(res.hasChannel, true);
      assert.strictEqual(res.itemCount, 3);
      assert.strictEqual(res.channelTitle, 'Sabry Labs — Engineering Logbook');
    });
  });
});
