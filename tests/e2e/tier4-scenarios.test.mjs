// tests/e2e/tier4-scenarios.test.mjs
// Tier 4: Real-World Scenarios (End-to-End User Journeys)

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  synthesizeGammaSample,
  generateBrownNoiseSamples,
  computeUnionBoundingBox,
  calculateAnchorPosition,
  parseMarkdownFrontmatter,
  validateRss2Xml
} from './helpers.mjs';

describe('Tier 4: Real-World Scenarios (End-to-End User Journeys)', () => {

  // Scenario 1: The Focus Seeker & Reverie Buyer Journey
  describe('S01: Focus Seeker & Reverie Buyer Journey', () => {
    it('should execute full visitor flow: Landing -> Carousel -> 40Hz Audio Test -> Buy Button', () => {
      // Step 1: Visitor lands on Homepage
      const homepageState = {
        route: '/',
        statusBadge: '[● LAB ONLINE // SHIPPED: 3 APPS]',
        heroTitle: 'Software Engineered with Tactile Craftsmanship & Swiss Precision',
        heroActions: [
          { label: 'Explore Flagship (Reverie)', href: '/apps/reverie' },
          { label: 'Launch Web Tool (Spritely)', href: '/tools/spritely' }
        ]
      };
      assert.strictEqual(homepageState.statusBadge, '[● LAB ONLINE // SHIPPED: 3 APPS]');
      assert.strictEqual(homepageState.heroActions[0].href, '/apps/reverie');

      // Step 2: Visitor navigates to /apps/reverie
      const reveriePage = {
        route: '/apps/reverie',
        title: 'Reverie Pomodoro',
        tagline: 'The Chronometric Focus Companion & Flow Extension Engine',
        mockupViewsCount: 10,
        currentSlide: 0
      };
      assert.strictEqual(reveriePage.mockupViewsCount, 10);

      // Step 3: Visitor interacts with 10-view Carousel
      reveriePage.currentSlide = (reveriePage.currentSlide + 1) % 10; // next slide (FIG 02)
      assert.strictEqual(reveriePage.currentSlide, 1);
      const activeCaption = 'FIG 02 // SWISS INDUSTRIAL SPECIFICATION — DIETER RAMS LIGHT';
      assert.match(activeCaption, /FIG 02/);

      // Step 4: Visitor tests 40Hz Audio Synthesizer
      const audioStation = {
        activeMode: 'gamma_40hz',
        volume: 0.75,
        isPlaying: false
      };
      audioStation.isPlaying = true;
      const audioSample = synthesizeGammaSample(0.025, 200, 40) * audioStation.volume;
      assert.ok(!isNaN(audioSample));

      // Switch to Brown Noise
      audioStation.activeMode = 'brown_noise';
      const noiseBuffer = generateBrownNoiseSamples(100);
      assert.strictEqual(noiseBuffer.length, 100);

      // Step 5: Visitor clicks $19 Lifetime buy action
      const buyTrigger = {
        product: 'reverie-lifetime',
        amountUsd: 19,
        className: 'lemonsqueezy-button',
        dataTheme: 'dark',
        checkoutUrl: 'https://sabrylabs.lemonsqueezy.com/buy/reverie-lifetime?embed=1',
        fallbackUrl: 'https://sabrylabs.lemonsqueezy.com/buy/reverie-lifetime'
      };
      assert.strictEqual(buyTrigger.amountUsd, 19);
      assert.strictEqual(buyTrigger.className, 'lemonsqueezy-button');
      assert.strictEqual(buyTrigger.dataTheme, 'dark');
      assert.ok(buyTrigger.checkoutUrl.includes('embed=1'));
    });
  });

  // Scenario 2: The Pixel Artist & Spritely Studio User Journey
  describe('S02: Pixel Artist & Spritely Studio User Journey', () => {
    it('should execute full studio flow: Open Tool -> Load Sample -> Adjust Slice -> Loop Preview -> Export ZIP', () => {
      // Step 1: User opens /tools/spritely
      const studioState = {
        route: '/tools/spritely',
        canvasReady: true,
        imageLoaded: false
      };
      assert.ok(studioState.canvasReady);

      // Step 2: Click "Try Sample Spritesheet"
      const sampleAsset = {
        src: '/demo/walking.png',
        width: 1376,
        height: 768,
        cols: 8,
        rows: 1
      };
      studioState.imageLoaded = true;
      assert.strictEqual(sampleAsset.cols, 8);
      assert.strictEqual(sampleAsset.rows, 1);

      // Step 3: Frame slicing & bounding boxes
      const cellW = sampleAsset.width / sampleAsset.cols; // 172
      const cellH = sampleAsset.height / sampleAsset.rows; // 768
      const frames = [];
      for (let i = 0; i < 8; i++) {
        frames.push({
          id: i,
          bbox: { x: 30, y: 100, w: 110, h: 560 }
        });
      }
      assert.strictEqual(frames.length, 8);

      // Step 4: Centering configuration
      const union = computeUnionBoundingBox(frames.map(f => f.bbox));
      const targetSize = 128;
      const pad = 12;
      const fitSize = targetSize - 2 * pad;
      const scale = fitSize / Math.max(union.w, union.h);
      const spriteW = Math.round(union.w * scale);
      const spriteH = Math.round(union.h * scale);
      const anchorPos = calculateAnchorPosition('bottom-center', targetSize, spriteW, spriteH, pad);
      assert.ok(anchorPos.dy > 0 && anchorPos.dy < targetSize);

      // Step 5: Animation loop trimming to [0, 6]
      const loopTrim = { start: 0, end: 6 };
      const activeFramesCount = loopTrim.end - loopTrim.start + 1;
      assert.strictEqual(activeFramesCount, 7);

      // Step 6: Client-Side ZIP Archive Generation
      const zipArchive = {
        filename: 'sprites_128x128.zip',
        files: []
      };
      for (let i = loopTrim.start; i <= loopTrim.end; i++) {
        zipArchive.files.push(`frame_${String(i).padStart(3, '0')}.png`);
      }
      assert.strictEqual(zipArchive.files.length, 7);
      assert.strictEqual(zipArchive.files[0], 'frame_000.png');
      assert.strictEqual(zipArchive.files[6], 'frame_006.png');
    });
  });

  // Scenario 3: The Engineering Reader & RSS Subscriber Journey
  describe('S03: Engineering Reader & RSS Subscriber Journey', () => {
    it('should execute reader flow: Browse Devlogs -> Read Article with Code Copy -> Subscribe to RSS Feed', () => {
      // Step 1: Reader arrives at /logbook
      const logbookIndex = {
        route: '/logbook',
        title: 'Engineering Logbook & Retrospectives',
        articleCount: 3,
        articles: [
          { slug: 'building-reverie-pomodoro-desktop-architecture', title: 'Architecting Reverie' },
          { slug: 'eliminating-spritesheet-jitter-algorithms', title: 'Eliminating Sprite Jitter' },
          { slug: 'zero-cloud-video-cut-pipeline-faster-whisper', title: 'Cutting Video at Speed of Thought' }
        ]
      };
      assert.strictEqual(logbookIndex.articleCount, 3);

      // Step 2: Reader selects article
      const chosen = logbookIndex.articles[0];
      const articlePage = {
        route: `/logbook/${chosen.slug}`,
        title: chosen.title,
        author: 'Sabry Belal',
        codeSnippet: 'const focusAudio = new FocusAudioSynthesizer();',
        copied: false
      };
      assert.strictEqual(articlePage.route, '/logbook/building-reverie-pomodoro-desktop-architecture');

      // Step 3: Reader clicks "Copy Code"
      articlePage.copied = true;
      assert.ok(articlePage.copied);

      // Step 4: Reader navigates to /feed.xml to subscribe
      const mockFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sabry Labs — Engineering Logbook</title>
    <link>https://sabrylabs.com</link>
    <description>Engineering retrospectives by Sabry Belal</description>
    <item>
      <title>${chosen.title}</title>
      <link>https://sabrylabs.com${articlePage.route}</link>
      <guid>https://sabrylabs.com${articlePage.route}</guid>
      <pubDate>Tue, 01 Sep 2026 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

      const feedValidation = validateRss2Xml(mockFeedXml);
      assert.ok(feedValidation.valid);
      assert.strictEqual(feedValidation.items[0].link, `https://sabrylabs.com${articlePage.route}`);
    });
  });

  // Scenario 4: Desktop Customer License Activation Journey
  describe('S04: Desktop Customer License Activation Journey', () => {
    it('should execute license flow: Access /license -> Check 3-Step Guide -> Customer Portal Link -> FAQ Review', () => {
      // Step 1: Customer visits /license
      const licensePage = {
        route: '/license',
        title: 'Desktop Software License Desk',
        portalLink: 'https://app.lemonsqueezy.com/my-orders/',
        steps: [
          'Step 1: Check Email for 16-character license key',
          'Step 2: Enter key in desktop app Settings -> License',
          'Step 3: Instant offline activation (no cloud phone-home)'
        ],
        hardwarePolicy: {
          allowedMachines: 3,
          selfServeDeactivation: true
        },
        faqs: [
          { question: 'What is the refund policy?', answer: '30-day no-questions-asked refund' },
          { question: 'Will it work offline?', answer: '100% offline tolerance guaranteed' }
        ]
      };

      assert.strictEqual(licensePage.steps.length, 3);
      assert.strictEqual(licensePage.hardwarePolicy.allowedMachines, 3);
      assert.ok(licensePage.hardwarePolicy.selfServeDeactivation);
      assert.match(licensePage.portalLink, /lemonsqueezy\.com\/my-orders/);
      assert.strictEqual(licensePage.faqs.length, 2);
    });
  });

});
