"use client";

import React, { useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Grid,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { ProcessedFrame, RGB } from "@/lib/spritely/types";
import { sampleCanvasPixel } from "@/lib/spritely/chroma";

interface AnimationPlayerProps {
  currentFrame: ProcessedFrame | null;
  prevFrame: ProcessedFrame | null;
  nextFrame: ProcessedFrame | null;
  isPlaying: boolean;
  fps: number;
  onFpsChange: (fps: number) => void;
  onTogglePlay: () => void;
  onStep: (delta: number) => void;
  ghostActive: boolean;
  onToggleGhost: () => void;
  gridActive: boolean;
  onToggleGrid: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  targetSize: number;
  pipetteActive: boolean;
  onPipettePick: (color: RGB) => void;
}

export default function AnimationPlayer({
  currentFrame,
  prevFrame,
  nextFrame,
  isPlaying,
  fps,
  onFpsChange,
  onTogglePlay,
  onStep,
  ghostActive,
  onToggleGhost,
  gridActive,
  onToggleGrid,
  zoom,
  onZoomChange,
  targetSize,
  pipetteActive,
  onPipettePick,
}: AnimationPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = targetSize;
    canvas.height = targetSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, targetSize, targetSize);

    // 1. Checkerboard Background
    const chSize = Math.max(8, Math.floor(targetSize / 16));
    for (let y = 0; y < targetSize; y += chSize) {
      for (let x = 0; x < targetSize; x += chSize) {
        ctx.fillStyle = ((x / chSize) + (y / chSize)) % 2 === 0 ? "#121217" : "#1a1a22";
        ctx.fillRect(x, y, chSize, chSize);
      }
    }

    // 2. Ghost Frames (Onion Skinning at 20% alpha)
    if (ghostActive) {
      ctx.globalAlpha = 0.2;
      if (prevFrame?.alignedCanvas) {
        ctx.drawImage(prevFrame.alignedCanvas, 0, 0);
      }
      if (nextFrame?.alignedCanvas && nextFrame !== prevFrame) {
        ctx.drawImage(nextFrame.alignedCanvas, 0, 0);
      }
      ctx.globalAlpha = 1.0;
    }

    // 3. Current Frame
    if (currentFrame?.alignedCanvas) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(currentFrame.alignedCanvas, 0, 0);
    }

    // 4. 4x4 Guide Grid & Center Crosshair
    if (gridActive) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.setLineDash([2, 2]);

      const quarter = targetSize / 4;
      for (let i = 1; i < 4; i++) {
        if (i === 2) continue; // center is crosshair
        const p = Math.round(i * quarter);
        // Vertical
        ctx.beginPath();
        ctx.moveTo(p, 0);
        ctx.lineTo(p, targetSize);
        ctx.stroke();
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(0, p);
        ctx.lineTo(targetSize, p);
        ctx.stroke();
      }

      // Bright Center Crosshair
      const mid = Math.round(targetSize / 2);
      ctx.setLineDash([]);
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(mid, 0);
      ctx.lineTo(mid, targetSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(targetSize, mid);
      ctx.stroke();
    }
  }, [currentFrame, prevFrame, nextFrame, ghostActive, gridActive, targetSize]);

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

  return (
    <div className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-xl border border-[#27272a] bg-[#09090b]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#27272a] bg-[#121217]/90 px-4 py-2 text-xs font-mono text-[#a1a1aa]">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">
            {currentFrame ? `FRAME #${String(currentFrame.index).padStart(3, "0")}` : "NO FRAME"}
          </span>
          <span className="text-[#71717a]">{"//"}</span>
          <span>{targetSize}&times;{targetSize}px</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Onion skinning toggle */}
          <button
            onClick={onToggleGhost}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs border transition-colors ${
              ghostActive
                ? "bg-[#00f0ff]/10 border-[#00f0ff]/40 text-[#00f0ff]"
                : "border-[#27272a] bg-[#1a1a22] text-[#a1a1aa] hover:text-white"
            }`}
            title="Toggle Onion Skinning (Ghosting)"
          >
            <Layers className="h-3 w-3" />
            Ghost
          </button>

          {/* Guide grid toggle */}
          <button
            onClick={onToggleGrid}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs border transition-colors ${
              gridActive
                ? "bg-[#ff5722]/10 border-[#ff5722]/40 text-[#ff5722]"
                : "border-[#27272a] bg-[#1a1a22] text-[#a1a1aa] hover:text-white"
            }`}
            title="Toggle 4x4 Guide Grid & Center Crosshair"
          >
            <Grid className="h-3 w-3" />
            4&times;4 Grid
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 pl-2 border-l border-[#27272a]">
            <button
              onClick={() => onZoomChange(Math.max(0.5, zoom - 0.5))}
              className="flex h-6 w-6 items-center justify-center rounded border border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
            >
              <ZoomOut className="h-3 w-3" />
            </button>
            <span className="w-10 text-center text-[11px] text-white">
              {zoom}x
            </span>
            <button
              onClick={() => onZoomChange(Math.min(5.0, zoom + 0.5))}
              className="flex h-6 w-6 items-center justify-center rounded border border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
            >
              <ZoomIn className="h-3 w-3" />
            </button>
            <button
              onClick={() => onZoomChange(1.0)}
              className="flex h-6 w-6 items-center justify-center rounded border border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
            >
              <Maximize2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Center Stage Canvas */}
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

      {/* Bottom Animation Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#27272a] bg-[#121217] px-5 py-3">
        {/* Playback buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStep(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] bg-[#18181c] text-[#fafafa] hover:bg-[#22222a] hover:border-[#3f3f46] transition-colors"
            title="Previous Frame (Left Arrow)"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className={`flex h-9 px-4 items-center justify-center gap-2 rounded-lg font-mono text-xs font-semibold shadow-glow-btn transition-colors ${
              isPlaying
                ? "bg-[#ff5722] text-white hover:bg-[#f4511e]"
                : "bg-[#10b981] text-white hover:bg-[#059669]"
            }`}
            title="Play / Pause (Spacebar)"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={() => onStep(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] bg-[#18181c] text-[#fafafa] hover:bg-[#22222a] hover:border-[#3f3f46] transition-colors"
            title="Next Frame (Right Arrow)"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* FPS Slider */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#a1a1aa]">Speed:</span>
          <input
            type="range"
            min={1}
            max={60}
            value={fps}
            onChange={(e) => onFpsChange(Number(e.target.value))}
            className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#27272a] accent-[#ff5722]"
          />
          <span className="w-16 rounded bg-[#18181c] px-2 py-0.5 text-center font-mono text-xs font-medium text-white border border-[#27272a]">
            {fps} FPS
          </span>
        </div>
      </div>
    </div>
  );
}
