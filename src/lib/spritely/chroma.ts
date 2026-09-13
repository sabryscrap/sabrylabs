import { RGB } from './types';

/**
 * Euclidean RGB color distance:
 * d = sqrt((r1 - r2)^2 + (g1 - g2)^2 + (b1 - b2)^2)
 */
export function euclideanColorDistance(rgb1: RGB, rgb2: RGB): number {
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Computes alpha based on chroma key distance, tolerance, and linear feathering
 */
export function computeChromaAlpha(
  pixelRgb: RGB,
  keyRgb: RGB,
  tolerance: number,
  feather: number
): number {
  const dist = euclideanColorDistance(pixelRgb, keyRgb);
  if (dist < tolerance) return 0;
  if (feather > 0 && dist < tolerance + feather) {
    const ratio = (dist - tolerance) / feather;
    return Math.round(255 * ratio);
  }
  return 255;
}

/**
 * Applies chroma key in-place to pixel buffer (RGBA array)
 */
export function applyChromaKeyToData(
  data: Uint8ClampedArray,
  key: RGB,
  tol: number,
  feather: number
): void {
  const len = data.length;
  for (let i = 0; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) continue;

    const dr = r - key.r;
    const dg = g - key.g;
    const db = b - key.b;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    if (dist < tol) {
      data[i + 3] = 0;
    } else if (dist < tol + feather && feather > 0) {
      const ratio = (dist - tol) / feather;
      data[i + 3] = Math.round(a * ratio);
    }
  }
}

/**
 * Creates a new canvas with chroma keying applied
 */
export function applyChromaKey(
  canvas: HTMLCanvasElement,
  keyColor: RGB,
  tolerance: number,
  feather: number
): HTMLCanvasElement {
  const clone = document.createElement('canvas');
  clone.width = canvas.width;
  clone.height = canvas.height;
  const ctx = clone.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(canvas, 0, 0);
  const imgData = ctx.getImageData(0, 0, clone.width, clone.height);
  applyChromaKeyToData(imgData.data, keyColor, tolerance, feather);
  ctx.putImageData(imgData, 0, 0);
  return clone;
}

/**
 * Samples pixel color at (x, y) from a canvas
 */
export function sampleCanvasPixel(canvas: HTMLCanvasElement, x: number, y: number): RGB {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { r: 0, g: 255, b: 0 };
  const clX = Math.max(0, Math.min(canvas.width - 1, Math.floor(x)));
  const clY = Math.max(0, Math.min(canvas.height - 1, Math.floor(y)));
  const pixel = ctx.getImageData(clX, clY, 1, 1).data;
  return { r: pixel[0], g: pixel[1], b: pixel[2] };
}

/**
 * Samples pixel color from an HTMLImageElement (e.g. top-left corner at 0,0)
 */
export function sampleImagePixel(img: HTMLImageElement, x: number = 0, y: number = 0): RGB {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, x + 1);
  canvas.height = Math.max(1, y + 1);
  const ctx = canvas.getContext('2d');
  if (!ctx) return { r: 0, g: 255, b: 0 };
  ctx.drawImage(img, 0, 0);
  return sampleCanvasPixel(canvas, x, y);
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace(/^#/, '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r: isNaN(r) ? 0 : r, g: isNaN(g) ? 255 : g, b: isNaN(b) ? 0 : b };
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return {
    r: isNaN(r) ? 0 : r,
    g: isNaN(g) ? 255 : g,
    b: isNaN(b) ? 0 : b
  };
}
