import JSZip from 'jszip';

/**
 * Converts HTMLCanvasElement to a PNG Blob
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas toBlob failed'));
      }
    }, 'image/png');
  });
}

/**
 * Generates a JSZip archive of individual frame PNGs
 */
export async function createFramesZipBlob(
  frames: HTMLCanvasElement[],
  targetSize: number
): Promise<Blob> {
  const zip = new JSZip();
  const folderName = `sprites_${targetSize}x${targetSize}`;
  const folder = zip.folder(folderName) || zip;

  for (let i = 0; i < frames.length; i++) {
    const canvas = frames[i];
    const blob = await canvasToBlob(canvas);
    const filename = `frame_${String(i + 1).padStart(3, '0')}.png`;
    folder.file(filename, blob);
  }

  return zip.generateAsync({ type: 'blob' });
}

/**
 * Exports and triggers client-side download of frames ZIP
 */
export async function downloadFramesZip(
  frames: HTMLCanvasElement[],
  targetSize: number
): Promise<void> {
  if (frames.length === 0) {
    throw new Error('No active frames to export.');
  }

  const zipBlob = await createFramesZipBlob(frames, targetSize);
  const downloadUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `sprites_${targetSize}x${targetSize}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
