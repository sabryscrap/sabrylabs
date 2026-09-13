"use client";

import React, { useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, Maximize2, Pipette } from "lucide-react";
import { BoundingBox, RGB, SliceMode } from "@/lib/spritely/types";
import { sampleCanvasPixel } from "@/lib/spritely/chroma";

interface SliceViewCanvasProps {
  image: HTMLImageElement | null;
  sliceMode: SliceMode;
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  detectedBoxes: BoundingBox[];
  zoom: number;
  onZoomChange: (zoom: number) => void;
  pipetteActive: boolean;
  onPipettePick: (color: RGB) => void;
}

export default function SliceViewCanvas({
  image,
  sliceMode,
  cols,
  rows,
  cellW,
  cellH,
  detectedBoxes,
  zoom,
  onZoomChange,
  pipetteActive,
  onPipettePick,
}: SliceViewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Checkerboard background
    const chSize = 16;
    for (let y = 0; y < height; y += chSize) {
      for (let x = 0; x < width; x += chSize) {
        ctx.fillStyle = ((x / chSize) + (y / chSize)) % 2 === 0 ? "#121217" : "#1a1a22";
        ctx.fillRect(x, y, chSize, chSize);
      }
    }

    // 2. Draw source spritesheet
    ctx.drawImage(image, 0, 0);

    // 3. Draw Cut Grid Outlines
    ctx.lineWidth = 1.5;

    if (sliceMode === "grid") {
      const cW = width / Math.max(1, cols);
      const cH = height / Math.max(1, rows);

      ctx.strokeStyle = "#00f0ff";
      ctx.setLineDash([4, 4]);

      // Vertical lines
      for (let c = 1; c < cols; c++) {
        const x = Math.round(c * cW);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let r = 1; r < rows; r++) {
        const y = Math.round(r * cH);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Cell labels
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
      ctx.font = "10px JetBrains Mono, monospace";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          ctx.fillText(`${idx}`, c * cW + 4, r * cH + 12);
        }
      }
    } else if (sliceMode === "size") {
      const safeCellW = Math.max(8, cellW);
      const safeCellH = Math.max(8, cellH);
      const numCols = Math.floor(width / safeCellW);
      const numRows = Math.floor(height / safeCellH);

      ctx.strokeStyle = "#ff5722";
      ctx.setLineDash([4, 4]);

      for (let c = 1; c <= numCols; c++) {
        const x = c * safeCellW;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let r = 1; r <= numRows; r++) {
        const y = r * safeCellH;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    } else if (sliceMode === "auto") {
      ctx.setLineDash([]);
      detectedBoxes.forEach((box, i) => {
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(box.x, box.y, box.w, box.h);

        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.fillRect(box.x, box.y, box.w, box.h);

        ctx.fillStyle = "#10b981";
        ctx.font = "bold 10px JetBrains Mono, monospace";
        ctx.fillText(`${i}`, box.x + 2, Math.max(10, box.y - 2));
      });
    }
  }, [image, sliceMode, cols, rows, cellW, cellH, detectedBoxes]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pipetteActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const rgb = sampleCanvasPixel(canvas, x, y);
    onPipettePick(rgb);
  };

  if (!image) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#0d0d12] p-8 text-center">
        <p className="font-mono text-sm text-[#a1a1aa]">No spritesheet loaded.</p>
        <p className="mt-1 text-xs text-[#71717a]">
          Drag & drop an image or click &quot;Try Sample Spritesheet&quot; in the sidebar.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-xl border border-[#27272a] bg-[#09090b]">
      {/* Zoom and Pipette notice bar */}
      <div className="flex items-center justify-between border-b border-[#27272a] bg-[#121217]/90 px-4 py-2 text-xs font-mono text-[#a1a1aa]">
        <div className="flex items-center gap-2">
          <span>
            {image.naturalWidth || image.width} &times; {image.naturalHeight || image.height}px
          </span>
          {pipetteActive && (
            <span className="flex items-center gap-1 text-[#00f0ff] font-medium animate-pulse">
              <Pipette className="h-3 w-3" /> Click anywhere on image to sample background color
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onZoomChange(Math.max(0.25, zoom - 0.25))}
            className="flex h-6 w-6 items-center justify-center rounded border border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
            title="Zoom Out"
          >
            <ZoomOut className="h-3 w-3" />
          </button>
          <span className="w-12 text-center text-[11px] text-white">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(4.0, zoom + 0.25))}
            className="flex h-6 w-6 items-center justify-center rounded border border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
            title="Zoom In"
          >
            <ZoomIn className="h-3 w-3" />
          </button>
          <button
            onClick={() => onZoomChange(1.0)}
            className="flex h-6 w-6 items-center justify-center rounded border border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
            title="Reset Zoom"
          >
            <Maximize2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Canvas viewport */}
      <div className="flex flex-1 items-center justify-center overflow-auto p-6">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            transition: "transform 0.15s ease-out",
          }}
          className="shadow-2xl"
        >
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`block rounded border border-[#27272a] ${
              pipetteActive ? "cursor-crosshair ring-2 ring-[#00f0ff]" : "cursor-default"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
