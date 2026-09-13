"use client";

import React, { useEffect, useRef } from "react";
import { X, Check } from "lucide-react";
import { ProcessedFrame } from "@/lib/spritely/types";

interface SpritelySheetViewProps {
  frames: ProcessedFrame[];
  cols: number;
  targetSize: number;
  loopStart: number;
  loopEnd: number;
  onToggleFrame: (index: number) => void;
}

export default function SpritelySheetView({
  frames,
  cols,
  targetSize,
  loopStart,
  loopEnd,
  onToggleFrame,
}: SpritelySheetViewProps) {
  return (
    <div className="flex h-full min-h-[460px] flex-col overflow-hidden rounded-xl border border-[#27272a] bg-[#09090b]">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-[#27272a] bg-[#121217]/90 px-4 py-2 text-xs font-mono text-[#a1a1aa]">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">ALIGNED SPRITESHEET COMPOSITE</span>
          <span className="text-[#71717a]">{"//"} Click any frame to toggle active/deselected</span>
        </div>
        <div className="text-[11px] text-[#00f0ff]">
          {cols} Cols &times; {Math.max(1, Math.ceil(frames.length / cols))} Rows
        </div>
      </div>

      {/* Grid of Frames */}
      <div className="flex-1 overflow-auto p-6">
        <div
          className="grid gap-3 mx-auto justify-center"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, max-content))`,
          }}
        >
          {frames.map((frame) => {
            const inLoop = frame.index >= loopStart && frame.index <= loopEnd;
            return (
              <FrameTile
                key={frame.index}
                frame={frame}
                targetSize={targetSize}
                inLoop={inLoop}
                onToggle={() => onToggleFrame(frame.index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FrameTile({
  frame,
  targetSize,
  inLoop,
  onToggle,
}: {
  frame: ProcessedFrame;
  targetSize: number;
  inLoop: boolean;
  onToggle: () => void;
}) {
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

    // Checkerboard
    const chSize = Math.max(4, Math.floor(targetSize / 8));
    for (let y = 0; y < targetSize; y += chSize) {
      for (let x = 0; x < targetSize; x += chSize) {
        ctx.fillStyle = ((x / chSize) + (y / chSize)) % 2 === 0 ? "#121217" : "#1a1a22";
        ctx.fillRect(x, y, chSize, chSize);
      }
    }

    if (frame.alignedCanvas) {
      ctx.drawImage(frame.alignedCanvas, 0, 0);
    }
  }, [frame, targetSize]);

  return (
    <div
      onClick={onToggle}
      className={`group relative flex flex-col items-center justify-center rounded-lg border p-1 cursor-pointer transition-all ${
        frame.selected
          ? inLoop
            ? "border-[#10b981] bg-[#121217] shadow-sm hover:border-[#00f0ff]"
            : "border-[#27272a] bg-[#121217] opacity-80 hover:border-[#3f3f46]"
          : "border-red-900/60 bg-red-950/20 opacity-50 hover:opacity-75"
      }`}
      title={`Frame #${frame.index} (${frame.selected ? "Active" : "Excluded"}) - Click to toggle`}
    >
      <div className="relative overflow-hidden rounded">
        <canvas
          ref={canvasRef}
          style={{ width: Math.min(128, targetSize), height: Math.min(128, targetSize) }}
          className="block"
        />

        {/* Deselected Red X Overlay */}
        {!frame.selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
            <X className="h-8 w-8 text-red-500 stroke-[3]" />
          </div>
        )}
      </div>

      <div className="mt-1 flex w-full items-center justify-between px-1 text-[10px] font-mono text-[#a1a1aa]">
        <span>#{String(frame.index).padStart(2, "0")}</span>
        {frame.selected ? (
          <Check className="h-3 w-3 text-[#10b981]" />
        ) : (
          <span className="text-red-400 font-bold">X</span>
        )}
      </div>
    </div>
  );
}
