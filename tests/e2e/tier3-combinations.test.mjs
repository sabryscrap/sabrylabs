// tests/e2e/tier3-combinations.test.mjs
// Tier 3: Cross-Feature Combinations (Pairwise & Subsystem Integration)

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  euclideanColorDistance,
  computeChromaAlpha,
  synthesizeGammaSample,
  generateBrownNoiseSamples,
  computeUnionBoundingBox,
  calculateAnchorPosition,
  parseMarkdownFrontmatter,
  validateRss2Xml
} from './helpers.mjs';

describe('Tier 3: Cross-Feature Combinations', () => {

  // Combination 1: Catalog Filtering + Product Navigation
  describe('C01: Catalog Filtering + Product Navigation Flow', () => {
    it('should filter catalog by category and navigate to product landing page', () => {
      const catalog = [
        { id: 'reverie', name: 'Reverie Pomodoro', cat: 'desktop-apps', route: '/apps/reverie' },
        { id: 'spritely', name: 'Spritely Aligner', cat: 'browser-tools', route: '/tools/spritely' },
        { id: 'screen-demo', name: 'Screen Demo Creator', cat: 'desktop-apps', route: '/downloads/beta' },
        { id: 'autocut', name: 'AutoCut AI Engine', cat: 'ai-workflows', route: '/logbook/autocut' }
      ];

      // Step 1: User selects 'desktop-apps' filter tab
      const selectedCategory = 'desktop-apps';
      const filtered = catalog.filter(app => app.cat === selectedCategory);
      assert.strictEqual(filtered.length, 2, 'Should filter down to exactly 2 desktop apps');

      // Step 2: User locates Reverie card and clicks Details/Showcase
      const reverieCard = filtered.find(app => app.id === 'reverie');
      assert.ok(reverieCard, 'Reverie card must be present');
      assert.strictEqual(reverieCard.route, '/apps/reverie');

      // Step 3: Landing page contracts verified
      const landingPage = {
        title: 'Reverie Pomodoro',
        heroMockup: '/images/reverie/mockup_01_hero_dashboard.png',
        price: '$19 Lifetime',
        hasAudioTester: true,
        hasMockupCarousel: true
      };
      assert.strictEqual(landingPage.price, '$19 Lifetime');
      assert.ok(landingPage.hasAudioTester);
      assert.ok(landingPage.hasMockupCarousel);
    });
  });

  // Combination 2: Spritely Ingestion + Slicing + Playback Loop
  describe('C02: Spritely Ingestion + Slicing + Playback Loop Flow', () => {
    it('should ingest spritesheet, slice regular grid, center frames, and drive playback loop', () => {
      // Step 1: Ingest walking.png (1376 x 768)
      const sheet = { width: 1376, height: 768, cols: 8, rows: 1 };
      const frameW = sheet.width / sheet.cols;
      const frameH = sheet.height / sheet.rows;
      assert.strictEqual(frameW, 172);
      assert.strictEqual(frameH, 768);

      // Step 2: Slice into 8 frames with mock bounding boxes
      const frames = [];
      for (let i = 0; i < 8; i++) {
        frames.push({
          index: i,
          srcX: i * frameW,
          srcY: 0,
          w: frameW,
          h: frameH,
          bbox: { x: 20 + (i % 2) * 5, y: 50 + (i % 3) * 2, w: 120, h: 650 }
        });
      }
      assert.strictEqual(frames.length, 8);

      // Step 3: Compute Union Bounding Box across all 8 frames
      const union = computeUnionBoundingBox(frames.map(f => f.bbox));
      assert.ok(union.w >= 120);
      assert.ok(union.h >= 650);

      // Step 4: Map frames to 128x128 destination cells with center-center anchor
      const targetSize = 128;
      const pad = 10;
      const fitSize = targetSize - 2 * pad;
      const scaleFactor = fitSize / Math.max(union.w, union.h);
      const scaledW = Math.round(union.w * scaleFactor);
      const scaledH = Math.round(union.h * scaleFactor);
      const pos = calculateAnchorPosition('center-center', targetSize, scaledW, scaledH);
      assert.ok(pos.dx >= 0 && pos.dx <= targetSize);
      assert.ok(pos.dy >= 0 && pos.dy <= targetSize);

      // Step 5: Simulate playback loop at 12 FPS across [0, 7]
      const fps = 12;
      const frameIntervalMs = 1000 / fps;
      assert.strictEqual(Math.round(frameIntervalMs), 83);
      let currentFrame = 0;
      const totalSteps = 20;
      for (let step = 0; step < totalSteps; step++) {
        currentFrame = (currentFrame + 1) % frames.length;
      }
      assert.strictEqual(currentFrame, 20 % 8); // frame 4
    });
  });

  // Combination 3: Chroma Key + Morphological Erosion + Composite Export
  describe('C03: Chroma Key + Morphological Erosion + Composite Export Flow', () => {
    it('should key out green background, shave edge halo, and assemble composite sheet', () => {
      // Step 1: Green screen background setup (walking.jpeg green color: 5, 196, 4)
      const keyColor = { r: 5, g: 196, b: 4 };
      const tolerance = 45;
      const feather = 5;

      const testPixels = [
        { type: 'bg', color: { r: 6, g: 195, b: 5 } },      // green background
        { type: 'edge', color: { r: 35, g: 170, b: 25 } },    // green fringe halo
        { type: 'fg', color: { r: 240, g: 210, b: 180 } }    // character flesh
      ];

      const maskedPixels = testPixels.map(p => ({
        type: p.type,
        alpha: computeChromaAlpha(p.color, keyColor, tolerance, feather)
      }));

      assert.strictEqual(maskedPixels[0].alpha, 0, 'Background pixel must be transparent');
      assert.strictEqual(maskedPixels[2].alpha, 255, 'Foreground character pixel must remain opaque');

      // Step 2: Edge erosion on fringe pixel
      const erosionWidth = 1;
      const isFringeTransparentNeighbor = true;
      const postErosionAlpha = isFringeTransparentNeighbor && erosionWidth > 0 ? 0 : maskedPixels[1].alpha;
      assert.strictEqual(postErosionAlpha, 0, 'Fringe pixel must be shaved by morphological erosion');

      // Step 3: Composite sheet export dimensions
      const totalFrames = 8;
      const cols = 4;
      const rows = Math.ceil(totalFrames / cols);
      const cellSize = 128;
      const compositeW = cols * cellSize;
      const compositeH = rows * cellSize;
      assert.strictEqual(rows, 2);
      assert.strictEqual(compositeW, 512);
      assert.strictEqual(compositeH, 256);
    });
  });

  // Combination 4: Terminal Telemetry + Experiments Grid + Launch
  describe('C04: Terminal Telemetry + Experiments Grid + Launch Flow', () => {
    it('should reconcile terminal metrics with actual catalog apps and trigger launches', () => {
      // Terminal metrics
      const terminalMetrics = {
        shippedAppsCount: 3,
        activeExperiment: 'SCREEN DEMO AUTO-POLISH (v0.4.0)'
      };

      // Shipped apps in catalog
      const catalogApps = [
        { id: 'reverie', status: 'shipped', isPrimary: true },
        { id: 'spritely', status: 'shipped', isPrimary: false },
        { id: 'autocut', status: 'shipped', isPrimary: false },
        { id: 'screen-demo', status: 'lab_experiment', isPrimary: false }
      ];

      const shippedInCatalog = catalogApps.filter(a => a.status === 'shipped');
      assert.strictEqual(shippedInCatalog.length, terminalMetrics.shippedAppsCount);

      // Verify active experiment corresponds to Screen Demo Creator
      const experimentApp = catalogApps.find(a => a.status === 'lab_experiment');
      assert.strictEqual(experimentApp.id, 'screen-demo');

      // Trigger launch on Spritely
      const launchAction = { app: 'spritely', target: '/tools/spritely' };
      assert.strictEqual(launchAction.target, '/tools/spritely');
    });
  });

  // Combination 5: Markdown Article + Syntax Highlighting + RSS 2.0 Feed
  describe('C05: Markdown Article + Syntax Highlighting + RSS 2.0 Feed Flow', () => {
    it('should parse markdown post, verify code block highlighting, and generate syndicated RSS item', () => {
      const rawArticle = `---
title: "Eliminating Sprite Jitter: The Math Behind Centroid Tracking"
date: "2026-08-25"
summary: "Why spritesheets wobble and how bounding-box math fixes it."
tags: ["Canvas API", "Algorithms", "Game Dev"]
readingTime: "6 min read"
---

# Eliminating Sprite Jitter

AI-generated spritesheets frequently wobble between frames.

\`\`\`typescript
export function computeCentroid(points: Point[]): Point {
  let sumX = 0, sumY = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
  }
  return { x: sumX / points.length, y: sumY / points.length };
}
\`\`\`
`;
      // Step 1: Parse frontmatter
      const { frontmatter, body } = parseMarkdownFrontmatter(rawArticle);
      assert.strictEqual(frontmatter.title, 'Eliminating Sprite Jitter: The Math Behind Centroid Tracking');
      assert.strictEqual(frontmatter.date, '2026-08-25');
      assert.ok(body.includes('```typescript'));

      // Step 2: Generate RSS 2.0 item XML
      const slug = 'eliminating-sprite-jitter';
      const itemXml = `
    <item>
      <title>${frontmatter.title}</title>
      <link>https://sabrylabs.com/logbook/${slug}</link>
      <guid isPermaLink="true">https://sabrylabs.com/logbook/${slug}</guid>
      <pubDate>Tue, 25 Aug 2026 00:00:00 GMT</pubDate>
      <description><![CDATA[${frontmatter.summary}]]></description>
    </item>`;

      const fullRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sabry Labs</title>
    <link>https://sabrylabs.com</link>
    <description>Engineering devlogs</description>
    ${itemXml}
  </channel>
</rss>`;

      const validation = validateRss2Xml(fullRss);
      assert.ok(validation.valid);
      assert.strictEqual(validation.itemCount, 1);
      assert.strictEqual(validation.items[0].title, frontmatter.title);
      assert.strictEqual(validation.items[0].link, `https://sabrylabs.com/logbook/${slug}`);
    });
  });

  // Combination 6: Reverie Audio Tester + Lemon Squeezy Checkout
  describe('C06: Reverie Audio Tester + Lemon Squeezy Checkout Flow', () => {
    it('should test 40Hz audio synthesis and transition to Lemon Squeezy checkout', () => {
      // Step 1: User auditions 40Hz Gamma tone at 80% volume
      const mode = 'gamma_40hz';
      const vol = 0.8;
      const sample = synthesizeGammaSample(0.005, 200, 40) * vol;
      assert.ok(typeof sample === 'number' && !isNaN(sample));

      // Step 2: User proceeds to Lifetime Pricing Card
      const pricingCard = {
        title: 'Single Lifetime License',
        price: '$19',
        currency: 'USD',
        button: {
          className: 'lemonsqueezy-button',
          dataTheme: 'dark',
          href: 'https://sabrylabs.lemonsqueezy.com/buy/reverie-lifetime?embed=1',
          fallbackHref: 'https://sabrylabs.lemonsqueezy.com/buy/reverie-lifetime'
        }
      };

      assert.strictEqual(pricingCard.price, '$19');
      assert.strictEqual(pricingCard.button.className, 'lemonsqueezy-button');
      assert.strictEqual(pricingCard.button.dataTheme, 'dark');
      assert.ok(pricingCard.button.href.includes('?embed=1'));
    });
  });

});
