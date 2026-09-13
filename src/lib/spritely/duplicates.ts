/**
 * Compares two canvases pixel-by-pixel.
 * Returns true if less than 0.5% of pixels differ by more than 2 in any RGBA channel.
 */
export function areCanvasesSimilar(
  c1: HTMLCanvasElement,
  c2: HTMLCanvasElement,
  channelDiffThreshold: number = 2,
  maxDiffRatio: number = 0.005
): boolean {
  if (c1.width !== c2.width || c1.height !== c2.height) return false;

  const ctx1 = c1.getContext('2d');
  const ctx2 = c2.getContext('2d');
  if (!ctx1 || !ctx2) return false;

  const d1 = ctx1.getImageData(0, 0, c1.width, c1.height).data;
  const d2 = ctx2.getImageData(0, 0, c2.width, c2.height).data;

  let diffPixels = 0;
  const totalPixels = d1.length / 4;

  for (let i = 0; i < d1.length; i += 4) {
    const rDiff = Math.abs(d1[i] - d2[i]);
    const gDiff = Math.abs(d1[i + 1] - d2[i + 1]);
    const bDiff = Math.abs(d1[i + 2] - d2[i + 2]);
    const aDiff = Math.abs(d1[i + 3] - d2[i + 3]);

    if (
      rDiff > channelDiffThreshold ||
      gDiff > channelDiffThreshold ||
      bDiff > channelDiffThreshold ||
      aDiff > channelDiffThreshold
    ) {
      diffPixels++;
      if (diffPixels / totalPixels > maxDiffRatio) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Scans a list of frames and identifies indices of duplicate frames
 */
export function findDuplicateIndices(
  frames: { index: number; canvas: HTMLCanvasElement; selected?: boolean }[]
): number[] {
  const uniqueFrames: { index: number; canvas: HTMLCanvasElement }[] = [];
  const duplicateIndices: number[] = [];

  frames.forEach((frame) => {
    if (frame.selected === false) return;

    let isDuplicate = false;
    for (const unique of uniqueFrames) {
      if (areCanvasesSimilar(frame.canvas, unique.canvas)) {
        isDuplicate = true;
        break;
      }
    }

    if (isDuplicate) {
      duplicateIndices.push(frame.index);
    } else {
      uniqueFrames.push({ index: frame.index, canvas: frame.canvas });
    }
  });

  return duplicateIndices;
}
