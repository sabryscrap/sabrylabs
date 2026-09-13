// tests/e2e/helpers.mjs
// Opaque-Box E2E Testing Helpers & Oracles for Sabry Labs

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';

export const WORKSPACE_ROOT = path.resolve(import.meta.dirname, '../..');
export const PUBLIC_DIR = path.join(WORKSPACE_ROOT, 'public');
export const SRC_DIR = path.join(WORKSPACE_ROOT, 'src');
export const TESTS_DIR = path.join(WORKSPACE_ROOT, 'tests/e2e');

/**
 * Checks if a file exists synchronously
 */
export function fileExists(relPath) {
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(WORKSPACE_ROOT, relPath);
  return fs.existsSync(fullPath);
}

/**
 * Reads file contents as UTF-8 text
 */
export function readFileText(relPath) {
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(WORKSPACE_ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Reads binary buffer
 */
export function readFileBuffer(relPath) {
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(WORKSPACE_ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath);
}

/**
 * Inspects PNG binary header and extracts dimensions (width, height)
 */
export function inspectPngHeader(buffer) {
  if (!buffer || buffer.length < 24) return null;
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
  if (!isPng) return null;
  // IHDR chunk begins at offset 12; width at offset 16 (4 bytes BE), height at offset 20 (4 bytes BE)
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { isPng: true, width, height };
}

/**
 * Inspects JPEG binary header (SOI marker 0xFF 0xD8)
 */
export function inspectJpegHeader(buffer) {
  if (!buffer || buffer.length < 4) return null;
  const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
  return { isJpeg };
}

/**
 * Probes an HTTP/HTTPS URL with timeout, returns { status, headers, body }
 */
export async function probeUrl(url, timeoutMs = 2500) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;
      const req = client.get(url, { timeout: timeoutMs }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 400,
            status: res.statusCode,
            headers: res.headers,
            body
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, status: 0, error: 'TIMEOUT' });
      });

      req.on('error', (err) => {
        resolve({ ok: false, status: 0, error: err.message });
      });
    } catch (e) {
      resolve({ ok: false, status: 0, error: e.message });
    }
  });
}

/**
 * Parses simple YAML-like frontmatter from markdown
 */
export function parseMarkdownFrontmatter(content) {
  if (!content) return { frontmatter: {}, body: '' };
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const rawYaml = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of rawYaml.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      }
      frontmatter[key] = val;
    }
  }

  return { frontmatter, body };
}

/**
 * Validates RSS 2.0 XML structure
 */
export function validateRss2Xml(xmlText) {
  const result = {
    valid: false,
    hasRssTag: false,
    version: null,
    hasChannel: false,
    channelTitle: null,
    channelLink: null,
    channelDescription: null,
    itemCount: 0,
    items: [],
    errors: []
  };

  if (!xmlText || typeof xmlText !== 'string') {
    result.errors.push('Empty or non-string XML input');
    return result;
  }

  const rssMatch = xmlText.match(/<rss[^>]*version=["']([^"']+)["'][^>]*>/i);
  if (rssMatch) {
    result.hasRssTag = true;
    result.version = rssMatch[1];
  } else {
    result.errors.push('Missing <rss version="..."> root tag');
  }

  if (/<channel[\s>]/i.test(xmlText)) {
    result.hasChannel = true;
  } else {
    result.errors.push('Missing <channel> element');
  }

  const titleMatch = xmlText.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) result.channelTitle = titleMatch[1];

  const linkMatch = xmlText.match(/<link>(.*?)<\/link>/i);
  if (linkMatch) result.channelLink = linkMatch[1];

  const descMatch = xmlText.match(/<description>(.*?)<\/description>/i);
  if (descMatch) result.channelDescription = descMatch[1];

  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    result.itemCount++;
    const itemContent = match[1];
    const itemTitle = itemContent.match(/<title>(.*?)<\/title>/i)?.[1] || '';
    const itemLink = itemContent.match(/<link>(.*?)<\/link>/i)?.[1] || '';
    const itemGuid = itemContent.match(/<guid[^>]*>(.*?)<\/guid>/i)?.[1] || '';
    const itemPubDate = itemContent.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || '';
    result.items.push({ title: itemTitle, link: itemLink, guid: itemGuid, pubDate: itemPubDate });
  }

  result.valid = result.hasRssTag && result.version === '2.0' && result.hasChannel;
  return result;
}

/**
 * Pure Mathematical Oracle: Euclidean Color Distance
 * d = sqrt((r1 - r2)^2 + (g1 - g2)^2 + (b1 - b2)^2)
 */
export function euclideanColorDistance(rgb1, rgb2) {
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Pure Mathematical Oracle: Chroma Key Alpha Mask
 */
export function computeChromaAlpha(pixelRgb, keyRgb, tolerance, feather) {
  const dist = euclideanColorDistance(pixelRgb, keyRgb);
  if (dist < tolerance) return 0; // completely keyed out
  if (feather > 0 && dist < tolerance + feather) {
    const ratio = (dist - tolerance) / feather;
    return Math.round(255 * ratio); // linear feather fade
  }
  return 255; // opaque foreground
}

/**
 * Pure Mathematical Oracle: Leaky Integrator Brownian Noise Buffer Generator
 * y[n] = (y[n-1] + 0.02 * w[n]) / 1.02
 */
export function generateBrownNoiseSamples(sampleCount = 1000, seed = 42) {
  const samples = new Float32Array(sampleCount);
  let lastOut = 0.0;
  // Deterministic pseudo-random sequence for predictable test verification
  let s = seed;
  function prng() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646 * 2 - 1; // uniform in [-1, 1]
  }

  for (let i = 0; i < sampleCount; i++) {
    const white = prng();
    lastOut = (lastOut + 0.02 * white) / 1.02;
    samples[i] = lastOut * 3.5;
  }
  return samples;
}

/**
 * Pure Mathematical Oracle: 40Hz Isochronic AM Pulse Modulation
 * s(t) = sin(2 * pi * carrierFreq * t) * (0.5 * (1 + sin(2 * pi * 40 * t)))
 */
export function synthesizeGammaSample(t, carrierFreq = 200, lfoFreq = 40.0) {
  const carrier = Math.sin(2 * Math.PI * carrierFreq * t);
  const lfo = 0.5 * (1 + Math.sin(2 * Math.PI * lfoFreq * t));
  return carrier * lfo;
}

/**
 * Pure Mathematical Oracle: Union Bounding Box
 */
export function computeUnionBoundingBox(boxes) {
  const validBoxes = boxes.filter(b => b && b.w > 0 && b.h > 0);
  if (validBoxes.length === 0) return { x: 0, y: 0, w: 0, h: 0 };

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const b of validBoxes) {
    if (b.x < minX) minX = b.x;
    if (b.y < minY) minY = b.y;
    if (b.x + b.w > maxX) maxX = b.x + b.w;
    if (b.y + b.h > maxY) maxY = b.y + b.h;
  }

  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY
  };
}

/**
 * Pure Mathematical Oracle: Center of Mass (Centroid)
 */
export function computeCentroid(points) {
  if (!points || points.length === 0) return { x: 0, y: 0, count: 0 };
  let sumX = 0;
  let sumY = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
  }
  return {
    x: sumX / points.length,
    y: sumY / points.length,
    count: points.length
  };
}

/**
 * Pure Mathematical Oracle: 9-Point Anchor Positioning
 */
export function calculateAnchorPosition(anchor, targetSize, spriteW, spriteH, padding = 0, nudge = { x: 0, y: 0 }) {
  let dx = 0;
  let dy = 0;

  switch (anchor) {
    case 'top-left':
      dx = padding;
      dy = padding;
      break;
    case 'top-center':
      dx = (targetSize - spriteW) / 2;
      dy = padding;
      break;
    case 'top-right':
      dx = targetSize - spriteW - padding;
      dy = padding;
      break;
    case 'center-left':
      dx = padding;
      dy = (targetSize - spriteH) / 2;
      break;
    case 'center-center':
      dx = (targetSize - spriteW) / 2;
      dy = (targetSize - spriteH) / 2;
      break;
    case 'center-right':
      dx = targetSize - spriteW - padding;
      dy = (targetSize - spriteH) / 2;
      break;
    case 'bottom-left':
      dx = padding;
      dy = targetSize - spriteH - padding;
      break;
    case 'bottom-center':
      dx = (targetSize - spriteW) / 2;
      dy = targetSize - spriteH - padding;
      break;
    case 'bottom-right':
      dx = targetSize - spriteW - padding;
      dy = targetSize - spriteH - padding;
      break;
    default:
      dx = (targetSize - spriteW) / 2;
      dy = (targetSize - spriteH) / 2;
  }

  return {
    dx: dx + (nudge.x || 0),
    dy: dy + (nudge.y || 0)
  };
}

/**
 * Pure Mathematical Oracle: Connected Components BFS on 2D Alpha Grid
 */
export function runConnectedComponentsBfs(gridWidth, gridHeight, alphaData, minSize = 2, mergeDistance = 0) {
  const visited = new Uint8Array(gridWidth * gridHeight);
  const boxes = [];

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const idx = y * gridWidth + x;
      if (visited[idx] || alphaData[idx] === 0) continue;

      // Start BFS
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      let pixelCount = 0;

      const queueX = [x];
      const queueY = [y];
      visited[idx] = 1;

      while (queueX.length > 0) {
        const qx = queueX.shift();
        const qy = queueY.shift();
        pixelCount++;

        if (qx < minX) minX = qx;
        if (qx > maxX) maxX = qx;
        if (qy < minY) minY = qy;
        if (qy > maxY) maxY = qy;

        // 8 neighbors
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = qx + dx;
            const ny = qy + dy;
            if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
              const nIdx = ny * gridWidth + nx;
              if (!visited[nIdx] && alphaData[nIdx] > 0) {
                visited[nIdx] = 1;
                queueX.push(nx);
                queueY.push(ny);
              }
            }
          }
        }
      }

      const w = maxX - minX + 1;
      const h = maxY - minY + 1;
      if (w >= minSize && h >= minSize && pixelCount >= minSize) {
        boxes.push({ x: minX, y: minY, w, h, pixelCount });
      }
    }
  }

  return boxes;
}
