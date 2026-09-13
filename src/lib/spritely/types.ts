export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
  pixelCount?: number;
}

export type AnchorPoint =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center-center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type CenteringMode = 'union' | 'centroid' | 'individual';

export type SliceMode = 'grid' | 'size' | 'auto';

export interface ProcessedFrame {
  index: number;
  canvas: HTMLCanvasElement;
  selected: boolean;
  boundingBox: BoundingBox;
  centroid: { x: number; y: number };
  processedCanvas?: HTMLCanvasElement;
  alignedCanvas?: HTMLCanvasElement;
}

export interface AlignOptions {
  targetSize: number;
  padding: number;
  alignment: AnchorPoint;
  centeringMode: CenteringMode;
  alignEnabled: boolean;
  sharpPixelArt: boolean;
  nudgeEnabled: boolean;
  manualScale?: number;
  manualOffset?: { x: number; y: number };
}

export interface SpritelyState {
  spritesheetImage: HTMLImageElement | null;
  sheetWidth: number;
  sheetHeight: number;
  fileName: string;

  sliceMode: SliceMode;
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  autoMinSize: number;
  autoMergeDist: number;
  detectedBoxes: BoundingBox[];

  frames: ProcessedFrame[];

  chromaEnabled: boolean;
  chromaColor: RGB;
  chromaColorHex: string;
  tolerance: number;
  feather: number;

  haloEnabled: boolean;
  haloErosion: number;
  alphaThreshold: number;

  alignEnabled: boolean;
  centeringMode: CenteringMode;
  alignment: AnchorPoint;
  targetCellSize: number;
  reducePadding: number;
  sharpPixelArt: boolean;

  nudgeEnabled: boolean;
  manualOffsets: { x: number; y: number }[];
  manualScales: number[];

  loopStart: number;
  loopEnd: number;
  currentFrameIndex: number;
  isPlaying: boolean;
  previewFps: number;

  ghostActive: boolean;
  gridActive: boolean;
  activeTab: 'slice' | 'preview' | 'sheet';
  pipetteActive: boolean;
  previewZoom: number;
  sliceZoom: number;
}
