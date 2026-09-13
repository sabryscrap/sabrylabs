/**
 * Renders a stitched composite spritesheet canvas from an array of aligned frame canvases
 */
export function renderCompositeSheet(
  frames: HTMLCanvasElement[],
  cols: number,
  cellSize: number
): HTMLCanvasElement {
  const safeCols = Math.max(1, Math.floor(cols));
  const count = frames.length;
  const rows = Math.max(1, Math.ceil(count / safeCols));

  const canvas = document.createElement('canvas');
  canvas.width = safeCols * cellSize;
  canvas.height = rows * cellSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.imageSmoothingEnabled = false;

  frames.forEach((frameCanvas, idx) => {
    const cCol = idx % safeCols;
    const cRow = Math.floor(idx / safeCols);
    ctx.drawImage(frameCanvas, cCol * cellSize, cRow * cellSize, cellSize, cellSize);
  });

  return canvas;
}

/**
 * Renders composite spritesheet and triggers client-side PNG download
 */
export function downloadCompositeSheet(
  frames: HTMLCanvasElement[],
  cols: number,
  cellSize: number
): void {
  if (frames.length === 0) {
    throw new Error('No active frames to download.');
  }

  const safeCols = Math.max(1, Math.floor(cols));
  const rows = Math.max(1, Math.ceil(frames.length / safeCols));

  const sheetCanvas = renderCompositeSheet(frames, cols, cellSize);
  const dataUrl = sheetCanvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `aligned_sheet_${cols}x${rows}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
