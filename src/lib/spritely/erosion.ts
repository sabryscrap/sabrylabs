/**
 * 2D Morphological Erosion Shaver
 * Shaves green screen fringing / halo artifacts around sprite boundaries.
 */
export function applyMorphologicalErosionToData(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  erosionWidth: number,
  alphaThreshold: number = 10
): void {
  const clampedRadius = Math.max(0, Math.min(5, Math.floor(erosionWidth)));
  if (clampedRadius === 0) return;

  const totalPixels = width * height;
  const origAlpha = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    origAlpha[i] = data[i * 4 + 3];
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (origAlpha[idx] < alphaThreshold) continue;

      let shouldErode = false;
      for (let dy = -clampedRadius; dy <= clampedRadius; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) {
          shouldErode = true;
          break;
        }

        for (let dx = -clampedRadius; dx <= clampedRadius; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) {
            shouldErode = true;
            break;
          }

          if (origAlpha[ny * width + nx] < alphaThreshold) {
            shouldErode = true;
            break;
          }
        }
        if (shouldErode) break;
      }

      if (shouldErode) {
        data[idx * 4 + 3] = 0;
      }
    }
  }
}

/**
 * Creates a new canvas with 2D morphological erosion applied
 */
export function applyMorphologicalErosion(
  canvas: HTMLCanvasElement,
  erosionWidth: number,
  alphaThreshold: number = 10
): HTMLCanvasElement {
  if (erosionWidth <= 0) return canvas;
  const clone = document.createElement('canvas');
  clone.width = canvas.width;
  clone.height = canvas.height;
  const ctx = clone.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(canvas, 0, 0);
  const imgData = ctx.getImageData(0, 0, clone.width, clone.height);
  applyMorphologicalErosionToData(imgData.data, clone.width, clone.height, erosionWidth, alphaThreshold);
  ctx.putImageData(imgData, 0, 0);
  return clone;
}
