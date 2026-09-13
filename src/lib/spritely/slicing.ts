import { BoundingBox } from './types';

/**
 * Slices image/canvas into a regular grid of cols x rows cells
 */
export function sliceGrid(
  source: HTMLImageElement | HTMLCanvasElement,
  cols: number,
  rows: number
): HTMLCanvasElement[] {
  const safeCols = Math.max(1, Math.floor(cols));
  const safeRows = Math.max(1, Math.floor(rows));

  const totalW = 'naturalWidth' in source ? (source as HTMLImageElement).naturalWidth || source.width : source.width;
  const totalH = 'naturalHeight' in source ? (source as HTMLImageElement).naturalHeight || source.height : source.height;

  const cellW = Math.max(1, Math.floor(totalW / safeCols));
  const cellH = Math.max(1, Math.floor(totalH / safeRows));

  const frames: HTMLCanvasElement[] = [];

  for (let r = 0; r < safeRows; r++) {
    for (let c = 0; c < safeCols; c++) {
      const canvas = document.createElement('canvas');
      canvas.width = cellW;
      canvas.height = cellH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          source,
          c * cellW,
          r * cellH,
          cellW,
          cellH,
          0,
          0,
          cellW,
          cellH
        );
      }
      frames.push(canvas);
    }
  }

  return frames;
}

/**
 * Slices image/canvas by explicit pixel cell dimensions
 */
export function sliceBySize(
  source: HTMLImageElement | HTMLCanvasElement,
  cellW: number,
  cellH: number
): { frames: HTMLCanvasElement[]; cols: number; rows: number } {
  const totalW = 'naturalWidth' in source ? (source as HTMLImageElement).naturalWidth || source.width : source.width;
  const totalH = 'naturalHeight' in source ? (source as HTMLImageElement).naturalHeight || source.height : source.height;

  const safeCellW = Math.max(8, Math.floor(cellW));
  const safeCellH = Math.max(8, Math.floor(cellH));

  const cols = Math.max(1, Math.floor(totalW / safeCellW));
  const rows = Math.max(1, Math.floor(totalH / safeCellH));

  return {
    frames: sliceGrid(source, cols, rows),
    cols,
    rows
  };
}

/**
 * 8-Neighbor Connected Components BFS Auto-Detection
 * Supports both direct alpha mask (length = W * H) and full RGBA buffer (length = W * H * 4).
 */
export function runConnectedComponentsBfs(
  gridWidth: number,
  gridHeight: number,
  alphaData: Uint8Array | Uint8ClampedArray,
  minSize: number = 2,
  mergeDistance: number = 0,
  alphaThreshold: number = 10
): BoundingBox[] {
  const isRgba = alphaData.length >= gridWidth * gridHeight * 4;
  const getAlpha = (idx: number) => (isRgba ? alphaData[idx * 4 + 3] : alphaData[idx]);

  const visited = new Uint8Array(gridWidth * gridHeight);
  const boxes: BoundingBox[] = [];

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const idx = y * gridWidth + x;
      if (visited[idx] || getAlpha(idx) < alphaThreshold) continue;

      // Start 8-neighbor BFS
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      let pixelCount = 0;

      const queueX: number[] = [x];
      const queueY: number[] = [y];
      visited[idx] = 1;

      while (queueX.length > 0) {
        const qx = queueX.shift()!;
        const qy = queueY.shift()!;
        pixelCount++;

        if (qx < minX) minX = qx;
        if (qx > maxX) maxX = qx;
        if (qy < minY) minY = qy;
        if (qy > maxY) maxY = qy;

        // 8-neighbor inspection
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = qx + dx;
            const ny = qy + dy;

            if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
              const nIdx = ny * gridWidth + nx;
              if (!visited[nIdx] && getAlpha(nIdx) >= alphaThreshold) {
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

  // Merge nearby boxes if mergeDistance is set
  let result = mergeDistance > 0 ? mergeOverlappingBoxes(boxes, mergeDistance) : boxes;

  // Sort boxes in row-major reading order
  result = sortBoxesRowMajor(result);

  return result;
}

/**
 * Checks if two bounding boxes overlap or are within distance d
 */
export function boxesOverlapOrClose(b1: BoundingBox, b2: BoundingBox, d: number): boolean {
  return !(
    b1.x + b1.w + d < b2.x ||
    b2.x + b2.w + d < b1.x ||
    b1.y + b1.h + d < b2.y ||
    b2.y + b2.h + d < b1.y
  );
}

/**
 * Merges bounding boxes within distance threshold
 */
export function mergeOverlappingBoxes(boxes: BoundingBox[], distance: number): BoundingBox[] {
  let changed = true;
  let currentBoxes = [...boxes];

  while (changed) {
    changed = false;
    const nextBoxes: BoundingBox[] = [];
    const merged = new Set<number>();

    for (let i = 0; i < currentBoxes.length; i++) {
      if (merged.has(i)) continue;
      let b1 = currentBoxes[i];

      for (let j = i + 1; j < currentBoxes.length; j++) {
        if (merged.has(j)) continue;
        const b2 = currentBoxes[j];

        if (boxesOverlapOrClose(b1, b2, distance)) {
          const minX = Math.min(b1.x, b2.x);
          const minY = Math.min(b1.y, b2.y);
          const maxX = Math.max(b1.x + b1.w, b2.x + b2.w);
          const maxY = Math.max(b1.y + b1.h, b2.y + b2.h);
          b1 = {
            x: minX,
            y: minY,
            w: maxX - minX,
            h: maxY - minY,
            pixelCount: (b1.pixelCount || 0) + (b2.pixelCount || 0)
          };
          merged.add(j);
          changed = true;
        }
      }
      nextBoxes.push(b1);
    }
    currentBoxes = nextBoxes;
  }

  return currentBoxes;
}

/**
 * Sorts bounding boxes in row-major reading order
 */
export function sortBoxesRowMajor(boxes: BoundingBox[]): BoundingBox[] {
  if (boxes.length === 0) return [];

  const avgHeight = boxes.reduce((sum, b) => sum + b.h, 0) / boxes.length;
  const rowThreshold = avgHeight * 0.6;

  const sorted = [...boxes];
  sorted.sort((a, b) => {
    if (Math.abs(a.y - b.y) < rowThreshold) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });

  return sorted;
}

/**
 * Slices image/canvas into individual canvases according to bounding boxes
 */
export function sliceByBoxes(
  source: HTMLImageElement | HTMLCanvasElement,
  boxes: BoundingBox[]
): HTMLCanvasElement[] {
  return boxes.map((box) => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, box.w);
    canvas.height = Math.max(1, box.h);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(source, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h);
    }
    return canvas;
  });
}
