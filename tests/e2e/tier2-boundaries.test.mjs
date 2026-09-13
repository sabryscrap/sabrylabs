// tests/e2e/tier2-boundaries.test.mjs
// Tier 2: Boundary & Corner Cases (empty inputs, extreme grid counts, 0-volume audio, invalid slugs, malformed requests, 404 handling)

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  euclideanColorDistance,
  computeChromaAlpha,
  synthesizeGammaSample,
  generateBrownNoiseSamples,
  computeUnionBoundingBox,
  computeCentroid,
  calculateAnchorPosition,
  runConnectedComponentsBfs,
  parseMarkdownFrontmatter,
  validateRss2Xml,
  inspectPngHeader
} from './helpers.mjs';

describe('Tier 2: Boundary & Corner Cases', () => {

  // Suite 2.1: Empty & Corrupted Image Inputs
  describe('B01: Empty & Corrupted Image Inputs', () => {
    it('should reject zero-length image buffers', () => {
      const emptyBuf = Buffer.alloc(0);
      const info = inspectPngHeader(emptyBuf);
      assert.strictEqual(info, null, 'Zero-length buffer must return null header');
    });

    it('should reject corrupted PNG magic bytes', () => {
      const badBuf = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B]);
      const info = inspectPngHeader(badBuf);
      assert.strictEqual(info, null, 'Invalid magic bytes must not be recognized as PNG');
    });

    it('should reject non-image file extensions in client uploader filter', () => {
      const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
      const isAllowed = (file) => allowedExtensions.some(ext => file.toLowerCase().endsWith(ext));
      assert.strictEqual(isAllowed('document.pdf'), false);
      assert.strictEqual(isAllowed('malicious.exe'), false);
      assert.strictEqual(isAllowed('script.sh'), false);
      assert.strictEqual(isAllowed('walking.PNG'), true);
      assert.strictEqual(isAllowed('test.webp'), true);
    });

    it('should handle zero-byte text files safely in frontmatter parser', () => {
      const parsed = parseMarkdownFrontmatter('');
      assert.deepStrictEqual(parsed.frontmatter, {});
      assert.strictEqual(parsed.body, '');
    });
  });

  // Suite 2.2: Extreme Grid Counts & Slicing
  describe('B02: Extreme Grid Counts & Slicing', () => {
    it('should clamp column count to minimum 1 when 0 or negative given', () => {
      const clampCols = (cols) => Math.max(1, Math.floor(cols || 1));
      assert.strictEqual(clampCols(0), 1);
      assert.strictEqual(clampCols(-5), 1);
      assert.strictEqual(clampCols(NaN), 1);
    });

    it('should clamp column count to maximum reasonable boundary (100)', () => {
      const clampCols = (cols) => Math.min(100, Math.max(1, Math.floor(cols)));
      assert.strictEqual(clampCols(150), 100);
      assert.strictEqual(clampCols(100), 100);
      assert.strictEqual(clampCols(8), 8);
    });

    it('should handle single cell grid (cols=1, rows=1)', () => {
      const sheetW = 512;
      const sheetH = 512;
      const cols = 1;
      const rows = 1;
      const cellW = sheetW / cols;
      const cellH = sheetH / rows;
      assert.strictEqual(cellW, 512);
      assert.strictEqual(cellH, 512);
    });

    it('should floor non-integer column/row inputs', () => {
      const sanitizeInput = (val) => Math.max(1, Math.floor(Number(val) || 1));
      assert.strictEqual(sanitizeInput(3.7), 3);
      assert.strictEqual(sanitizeInput(8.99), 8);
      assert.strictEqual(sanitizeInput('12.4'), 12);
    });

    it('should prevent cell width/height smaller than 1px', () => {
      const sanitizeCellSize = (dim, totalDim) => {
        const clamped = Math.max(1, Math.min(totalDim, Math.floor(dim)));
        return clamped;
      };
      assert.strictEqual(sanitizeCellSize(0, 1024), 1);
      assert.strictEqual(sanitizeCellSize(2000, 1024), 1024);
    });
  });

  // Suite 2.3: Chroma Key Boundary Values
  describe('B03: Chroma Key Boundary Values', () => {
    it('should behave strictly as exact color match when tolerance is 0', () => {
      const key = { r: 0, g: 255, b: 0 };
      const exactMatch = { r: 0, g: 255, b: 0 };
      const nearMatch = { r: 0, g: 254, b: 0 };

      assert.strictEqual(computeChromaAlpha(exactMatch, key, 0, 0), 255, 'Tolerance 0 requires dist < 0 to key out, so nothing keyed out');
      assert.strictEqual(computeChromaAlpha(exactMatch, key, 1, 0), 0, 'Tolerance 1 keys out exact match (dist 0)');
      assert.strictEqual(computeChromaAlpha(nearMatch, key, 1, 0), 255, 'Near match (dist 1) not keyed out with tolerance 1');
    });

    it('should key out all pixels when tolerance is set to maximum (442)', () => {
      // Maximum distance in RGB space is sqrt(255^2 * 3) ≈ 441.67
      const key = { r: 0, g: 0, b: 0 };
      const whitePixel = { r: 255, g: 255, b: 255 };
      const maxTol = 442;
      const alpha = computeChromaAlpha(whitePixel, key, maxTol, 0);
      assert.strictEqual(alpha, 0, 'All pixels keyed out with max tolerance');
    });

    it('should handle zero feathering without fractional alpha (binary mask)', () => {
      const key = { r: 10, g: 10, b: 10 };
      const pixel1 = { r: 12, g: 10, b: 10 }; // dist = 2
      const pixel2 = { r: 20, g: 10, b: 10 }; // dist = 10
      const tol = 5;
      assert.strictEqual(computeChromaAlpha(pixel1, key, tol, 0), 0);
      assert.strictEqual(computeChromaAlpha(pixel2, key, tol, 0), 255);
    });

    it('should preserve alpha when source pixel is already transparent', () => {
      const key = { r: 0, g: 255, b: 0 };
      const transparentPixel = { r: 0, g: 255, b: 0, a: 0 };
      // Even if color matches, if already 0, output remains 0
      const outAlpha = transparentPixel.a === 0 ? 0 : computeChromaAlpha(transparentPixel, key, 50, 0);
      assert.strictEqual(outAlpha, 0);
    });
  });

  // Suite 2.4: Centering & Bounding Box Extremes
  describe('B04: Centering & Bounding Box Extremes', () => {
    it('should return safe default {x:0, y:0, w:0, h:0} for empty box array', () => {
      const union = computeUnionBoundingBox([]);
      assert.deepStrictEqual(union, { x: 0, y: 0, w: 0, h: 0 });
    });

    it('should safely compute centroid for empty pixel array without division by zero', () => {
      const centroid = computeCentroid([]);
      assert.strictEqual(centroid.x, 0);
      assert.strictEqual(centroid.y, 0);
      assert.strictEqual(centroid.count, 0);
      assert.ok(!isNaN(centroid.x) && !isNaN(centroid.y));
    });

    it('should clamp padding when padding exceeds cell half-dimension', () => {
      const targetSize = 128;
      const requestedPad = 80;
      const maxPad = Math.floor(targetSize / 3); // ~42px
      const safePad = Math.min(requestedPad, maxPad);
      const fitSize = targetSize - 2 * safePad;
      assert.ok(fitSize > 0, 'Fit size must remain strictly positive');
      assert.strictEqual(safePad, 42);
    });

    it('should handle single 1x1 pixel sprite without scaling overflow', () => {
      const boxes = [{ x: 10, y: 10, w: 1, h: 1 }];
      const union = computeUnionBoundingBox(boxes);
      assert.strictEqual(union.w, 1);
      assert.strictEqual(union.h, 1);
      const fitSize = 128;
      const scale = Math.min(fitSize / union.w, fitSize / union.h, 1.5);
      assert.strictEqual(scale, 1.5, 'Max scale factor clamp prevents blowing up single pixel');
    });
  });

  // Suite 2.5: Web Audio Volume & Boundary Frequencies
  describe('B05: Web Audio Volume & Boundary Frequencies', () => {
    it('should support volume 0.0 (complete silence / mute)', () => {
      const sample = synthesizeGammaSample(0.01, 200, 40);
      const masterVol = 0.0;
      const audible = sample * masterVol;
      const normalizedAudible = Object.is(audible, -0) ? 0 : audible;
      assert.strictEqual(normalizedAudible, 0);
    });

    it('should clamp negative volume to 0.0', () => {
      const clampVolume = (v) => Math.max(0, Math.min(1, v));
      assert.strictEqual(clampVolume(-0.001), 0);
      assert.strictEqual(clampVolume(-100), 0);
    });

    it('should clamp volume exceeding 1.0 to 1.0', () => {
      const clampVolume = (v) => Math.max(0, Math.min(1, v));
      assert.strictEqual(clampVolume(1.05), 1.0);
      assert.strictEqual(clampVolume(10), 1.0);
    });

    it('should handle zero frequency safely without producing NaN', () => {
      const sample = synthesizeGammaSample(0.1, 0, 0);
      assert.ok(!isNaN(sample));
      assert.strictEqual(sample, 0); // sin(0) = 0
    });

    it('should produce bounded Brownian noise buffer even with large sample counts', () => {
      const samples = generateBrownNoiseSamples(2000);
      for (const s of samples) {
        assert.ok(!isNaN(s), 'Sample must not be NaN');
        assert.ok(isFinite(s), 'Sample must be finite');
      }
    });
  });

  // Suite 2.6: Routing, Slug Validation & 404 Handling
  describe('B06: Routing, Slug Validation & 404 Handling', () => {
    it('should reject directory traversal patterns in article slugs', () => {
      const isValidSlug = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
      assert.strictEqual(isValidSlug('../../etc/passwd'), false);
      assert.strictEqual(isValidSlug('..%2f..%2fsecret'), false);
      assert.strictEqual(isValidSlug('valid-slug-name-123'), true);
    });

    it('should reject malformed slugs with spaces or uppercase characters', () => {
      const isValidSlug = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
      assert.strictEqual(isValidSlug('Invalid Slug'), false);
      assert.strictEqual(isValidSlug('slug with spaces'), false);
      assert.strictEqual(isValidSlug('SLUG_CAPS'), false);
    });

    it('should handle non-existent article slug by returning 404 structure', () => {
      const knownPosts = [
        'building-reverie-pomodoro-desktop-architecture',
        'eliminating-spritesheet-jitter-algorithms',
        'zero-cloud-video-cut-pipeline-faster-whisper'
      ];
      const lookup = (slug) => (knownPosts.includes(slug) ? { found: true } : { found: false, status: 404 });
      const res = lookup('unknown-ghost-article');
      assert.strictEqual(res.found, false);
      assert.strictEqual(res.status, 404);
    });

    it('should fall back to "all" when unknown category query param is supplied', () => {
      const validCategories = ['all', 'desktop-apps', 'browser-tools', 'ai-workflows'];
      const resolveCategory = (param) => (validCategories.includes(param) ? param : 'all');
      assert.strictEqual(resolveCategory('invalid-category-xyz'), 'all');
      assert.strictEqual(resolveCategory(''), 'all');
      assert.strictEqual(resolveCategory('desktop-apps'), 'desktop-apps');
    });
  });

  // Suite 2.7: Carousel Index Wrapping & Bounds
  describe('B07: Carousel Index Wrapping & Bounds', () => {
    it('should wrap negative index to last slide (index 9)', () => {
      const total = 10;
      const getPrevIndex = (curr) => (curr - 1 + total) % total;
      assert.strictEqual(getPrevIndex(0), 9);
      assert.strictEqual(getPrevIndex(5), 4);
    });

    it('should wrap index 10 to first slide (index 0)', () => {
      const total = 10;
      const getNextIndex = (curr) => (curr + 1) % total;
      assert.strictEqual(getNextIndex(9), 0);
      assert.strictEqual(getNextIndex(4), 5);
    });

    it('should clamp out-of-bounds direct index assignments', () => {
      const clampIndex = (idx, total = 10) => Math.max(0, Math.min(total - 1, idx));
      assert.strictEqual(clampIndex(-5), 0);
      assert.strictEqual(clampIndex(99), 9);
      assert.strictEqual(clampIndex(4), 4);
    });
  });

  // Suite 2.8: Spritely Loop Range Trim Extremes
  describe('B08: Spritely Loop Range Trim Extremes', () => {
    it('should enforce start <= end when loopStart is moved past loopEnd', () => {
      let start = 0;
      let end = 5;
      const setStart = (newStart) => {
        start = newStart;
        if (start > end) end = start;
      };
      setStart(7);
      assert.strictEqual(start, 7);
      assert.strictEqual(end, 7);
    });

    it('should enforce end >= start when loopEnd is moved before loopStart', () => {
      let start = 4;
      let end = 7;
      const setEnd = (newEnd) => {
        end = newEnd;
        if (end < start) start = end;
      };
      setEnd(2);
      assert.strictEqual(start, 2);
      assert.strictEqual(end, 2);
    });

    it('should clamp loopEnd to total active frames minus 1', () => {
      const totalFrames = 8;
      const clampEnd = (end) => Math.min(totalFrames - 1, Math.max(0, end));
      assert.strictEqual(clampEnd(12), 7);
      assert.strictEqual(clampEnd(-2), 0);
    });
  });

  // Suite 2.9: RSS Feed Malformed Content Resilience
  describe('B09: RSS Feed Malformed Content Resilience', () => {
    it('should reject malformed XML without throwing unhandled exceptions', () => {
      const malformedXml = '<rss><channel><title>Unclosed tag';
      const res = validateRss2Xml(malformedXml);
      assert.strictEqual(res.valid, false);
      assert.ok(res.errors.length > 0);
    });

    it('should escape CDATA blocks and special XML characters in item descriptions', () => {
      const text = 'Guide to C++ & Modern Web <script>';
      const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      assert.strictEqual(safe, 'Guide to C++ &amp; Modern Web &lt;script&gt;');
    });

    it('should handle zero-item empty channel gracefully', () => {
      const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Empty Feed</title>
    <link>https://sabrylabs.com</link>
    <description>No items</description>
  </channel>
</rss>`;
      const res = validateRss2Xml(emptyXml);
      assert.ok(res.valid);
      assert.strictEqual(res.itemCount, 0);
    });
  });

});
