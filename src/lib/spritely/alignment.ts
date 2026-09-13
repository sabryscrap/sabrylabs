import { AnchorPoint, BoundingBox, AlignOptions } from './types';

/**
 * Computes bounding box and center-of-mass (centroid) of opaque pixels
 */
export function computeBoundingBoxAndCentroid(
  canvas: HTMLCanvasElement,
  alphaThreshold: number = 10
): { bbox: BoundingBox; centroid: { x: number; y: number }; hasPixels: boolean } {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      bbox: { x: 0, y: 0, w: 0, h: 0 },
      centroid: { x: canvas.width / 2, y: canvas.height / 2 },
      hasPixels: false
    };
  }

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  let minX = canvas.width;
  let maxX = -1;
  let minY = canvas.height;
  let maxY = -1;
  let sumX = 0;
  let sumY = 0;
  let count = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const alpha = data[(y * canvas.width + x) * 4 + 3];
      if (alpha >= alphaThreshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        sumX += x;
        sumY += y;
        count++;
      }
    }
  }

  const hasPixels = count > 0 && maxX >= minX && maxY >= minY;
  const bbox: BoundingBox = hasPixels
    ? {
        x: minX,
        y: minY,
        w: maxX - minX + 1,
        h: maxY - minY + 1,
        pixelCount: count
      }
    : { x: 0, y: 0, w: 0, h: 0, pixelCount: 0 };

  const centroid = {
    x: count > 0 ? sumX / count : canvas.width / 2,
    y: count > 0 ? sumY / count : canvas.height / 2
  };

  return { bbox, centroid, hasPixels };
}

/**
 * Pure Mathematical Oracle: Union Bounding Box
 */
export function computeUnionBoundingBox(boxes: BoundingBox[]): BoundingBox {
  const validBoxes = boxes.filter((b) => b && b.w > 0 && b.h > 0);
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
export function computeCentroid(points: { x: number; y: number }[]): { x: number; y: number; count: number } {
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
export function calculateAnchorPosition(
  anchor: AnchorPoint,
  targetSize: number,
  spriteW: number,
  spriteH: number,
  padding: number = 0,
  nudge: { x: number; y: number } = { x: 0, y: 0 }
): { dx: number; dy: number } {
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
 * Aligns and scales a frame onto a targetSize x targetSize destination cell
 */
export function alignFrame(
  sourceCanvas: HTMLCanvasElement,
  bbox: BoundingBox,
  centroid: { x: number; y: number },
  unionBox: BoundingBox,
  options: AlignOptions
): HTMLCanvasElement {
  const {
    targetSize,
    padding,
    alignment,
    centeringMode,
    alignEnabled,
    sharpPixelArt,
    nudgeEnabled,
    manualScale = 1.0,
    manualOffset = { x: 0, y: 0 }
  } = options;

  const cell = document.createElement('canvas');
  cell.width = targetSize;
  cell.height = targetSize;
  const ctx = cell.getContext('2d');
  if (!ctx) return cell;

  ctx.imageSmoothingEnabled = !sharpPixelArt;

  const frameScale = nudgeEnabled ? manualScale : 1.0;
  const clampedPad = Math.max(0, Math.min(Math.floor(targetSize / 3), padding));
  const fitSize = Math.max(1, targetSize - clampedPad * 2);

  let cropX = 0;
  let cropY = 0;
  let cropW = sourceCanvas.width;
  let cropH = sourceCanvas.height;
  let scaleFactor = frameScale;

  if (!alignEnabled) {
    cropX = 0;
    cropY = 0;
    cropW = sourceCanvas.width;
    cropH = sourceCanvas.height;
    scaleFactor = Math.min(fitSize / cropW, fitSize / cropH, 1.5) * frameScale;
  } else if (centeringMode === 'individual') {
    cropX = bbox.x;
    cropY = bbox.y;
    cropW = bbox.w;
    cropH = bbox.h;
    if (cropW > 0 && cropH > 0) {
      scaleFactor = Math.min(fitSize / cropW, fitSize / cropH, 1.5) * frameScale;
    }
  } else if (centeringMode === 'centroid') {
    cropX = bbox.x;
    cropY = bbox.y;
    cropW = bbox.w;
    cropH = bbox.h;
    const baseW = unionBox.w > 0 ? unionBox.w : cropW;
    const baseH = unionBox.h > 0 ? unionBox.h : cropH;
    if (baseW > 0 && baseH > 0) {
      scaleFactor = Math.min(fitSize / baseW, fitSize / baseH, 1.5) * frameScale;
    }
  } else {
    // Union Bounding Box mode:
    // Crop the exact union coordinates from this frame
    cropX = unionBox.x;
    cropY = unionBox.y;
    cropW = unionBox.w;
    cropH = unionBox.h;
    if (cropW > 0 && cropH > 0) {
      scaleFactor = Math.min(fitSize / cropW, fitSize / cropH, 1.5) * frameScale;
    }
  }

  if (cropW <= 0 || cropH <= 0) {
    return cell;
  }

  const wScaled = cropW * scaleFactor;
  const hScaled = cropH * scaleFactor;

  let dx = 0;
  let dy = 0;

  if (!alignEnabled) {
    dx = (targetSize - wScaled) / 2;
    dy = (targetSize - hScaled) / 2;
  } else if (centeringMode === 'centroid') {
    const centroidRelX = centroid.x - cropX;
    const centroidRelY = centroid.y - cropY;

    if (alignment.includes('left')) {
      dx = clampedPad;
    } else if (alignment.includes('right')) {
      dx = targetSize - wScaled - clampedPad;
    } else {
      dx = targetSize / 2 - centroidRelX * scaleFactor;
    }

    if (alignment.startsWith('top')) {
      dy = clampedPad;
    } else if (alignment.startsWith('bottom')) {
      dy = targetSize - hScaled - clampedPad;
    } else {
      dy = targetSize / 2 - centroidRelY * scaleFactor;
    }
  } else {
    const pos = calculateAnchorPosition(alignment, targetSize, wScaled, hScaled, clampedPad);
    dx = pos.dx;
    dy = pos.dy;
  }

  if (nudgeEnabled) {
    dx += manualOffset.x || 0;
    dy += manualOffset.y || 0;
  }

  const srcW = sourceCanvas.width;
  const srcH = sourceCanvas.height;

  const sx = Math.max(0, Math.min(srcW - 1, cropX));
  const sy = Math.max(0, Math.min(srcH - 1, cropY));
  const sw = Math.max(1, Math.min(srcW - sx, cropW));
  const sh = Math.max(1, Math.min(srcH - sy, cropH));

  let dw = sw * scaleFactor;
  let dh = sh * scaleFactor;

  if (sharpPixelArt) {
    dx = Math.round(dx);
    dy = Math.round(dy);
    dw = Math.round(dw);
    dh = Math.round(dh);
  }

  ctx.drawImage(sourceCanvas, sx, sy, sw, sh, dx, dy, dw, dh);
  return cell;
}
