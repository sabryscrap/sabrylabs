"use client";

import React, { useEffect, useRef } from "react";
import { Copy, X } from "lucide-react";
import { ProcessedFrame } from "@/lib/spritely/types";

interface TimelineScrubberProps {
  frames: ProcessedFrame[];
  currentIndex: number;
  loopStart: number;
  loopEnd: number;
  onSelectFrame: (index: number) => void;
  onLoopStartChange: (start: number) => void;
  onLoopEndChange: (end: number) => void;
  onSelectAll: () => void;
  onSelectEven: () => void;
  onSelectOdd: () => void;
  onFindDuplicates: () => void;
}

export default function TimelineScrubber({
  frames,
  currentIndex,
  loopStart,
  loopEnd,
  onSelectFrame,
  onLoopStartChange,
  onLoopEndChange,
  onSelectAll,
  onSelectEven,
  onSelectOdd,
  onFindDuplicates,
}: TimelineScrubberProps) {
  const maxFrame = Math.max(0, frames.length - 1);

  const handleStartChange = (val: number) => {
    const clamped = Math.max(0, Math.min(maxFrame, val));
    onLoopStartChange(clamped);
    if (clamped > loopEnd) {
      onLoopEndChange(clamped);
    }
  };

  const handleEndChange = (val: number) => {
    const clamped = Math.max(0, Math.min(maxFrame, val));
    onLoopEndChange(clamped);
    if (clamped < loopStart) {
      onLoopStartChange(clamped);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#27272a] bg-[#121217] p-4">
      {/* Top Controls: Selection Presets & Range Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272a]/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-white">TIMELINE REEL</span>
          <span className="rounded bg-[#18181c] px-2 py-0.5 font-mono text-[11px] text-[#10b981] border border-[#27272a]">
            LOOP: [{String(loopStart).padStart(2, "0")} → {String(loopEnd).padStart(2, "0")}]
          </span>
        </div>

        {/* Selection Presets */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] text-[#71717a] pr-1">Select:</span>
          <button
            onClick={onSelectAll}
            className="rounded border border-[#27272a] bg-[#18181c] px-2 py-0.5 text-xs font-mono text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors"
          >
            All
          </button>
          <button
            onClick={onSelectEven}
            className="rounded border border-[#27272a] bg-[#18181c] px-2 py-0.5 text-xs font-mono text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors"
          >
            Even
          </button>
          <button
            onClick={onSelectOdd}
            className="rounded border border-[#27272a] bg-[#18181c] px-2 py-0.5 text-xs font-mono text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors"
          >
            Odd
          </button>
          <button
            onClick={onFindDuplicates}
            className="flex items-center gap-1 rounded border border-[#27272a] bg-[#18181c] px-2.5 py-0.5 text-xs font-mono text-[#00f0ff] hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 transition-colors"
            title="Auto-detect and mark duplicate frames"
          >
            <Copy className="h-3 w-3" />
            Dups
          </button>
        </div>
      </div>

      {/* Frame Filmstrip Thumbnails */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {frames.length === 0 ? (
          <div className="py-4 text-center font-mono text-xs text-[#71717a] w-full">
            No frames available in timeline.
          </div>
        ) : (
          frames.map((frame) => {
            const isActive = frame.index === currentIndex;
            const inLoop = frame.index >= loopStart && frame.index <= loopEnd;
            const isStart = frame.index === loopStart;
            const isEnd = frame.index === loopEnd;

            return (
              <div
                key={frame.index}
                onClick={() => onSelectFrame(frame.index)}
                className={`group relative flex flex-shrink-0 flex-col items-center rounded-lg border p-1 cursor-pointer transition-all ${
                  isActive
                    ? "border-[#ff5722] bg-[#1a1a22] ring-2 ring-[#ff5722]/50 scale-105 z-10"
                    : inLoop
                    ? "border-[#27272a] bg-[#16161d] hover:border-[#3f3f46]"
                    : "border-[#27272a]/40 bg-[#0d0d12] opacity-40 hover:opacity-70"
                } ${!frame.selected ? "opacity-30 border-red-900" : ""}`}
              >
                {/* Loop Boundary Badges */}
                {isStart && (
                  <span className="absolute -top-2 left-1 rounded bg-[#10b981] px-1 text-[8px] font-mono font-bold text-black shadow z-20">
                    START
                  </span>
                )}
                {isEnd && (
                  <span className="absolute -top-2 right-1 rounded bg-[#ff5722] px-1 text-[8px] font-mono font-bold text-white shadow z-20">
                    END
                  </span>
                )}

                {/* Thumbnail Canvas */}
                <div className="relative h-14 w-14 overflow-hidden rounded bg-[#09090b]">
                  <ThumbnailCanvas frame={frame} />
                  {!frame.selected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <X className="h-4 w-4 text-red-500 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Index tag */}
                <span
                  className={`mt-1 font-mono text-[10px] ${
                    isActive ? "font-bold text-[#ff5722]" : "text-[#71717a]"
                  }`}
                >
                  #{String(frame.index).padStart(2, "0")}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Dual Loop Sliders (Start & End) */}
      {frames.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-[#27272a]/40 text-xs font-mono text-[#a1a1aa]">
          {/* Start Slider */}
          <div className="flex items-center gap-3">
            <span className="w-20 text-[#10b981] font-semibold">Start Frame:</span>
            <input
              type="range"
              min={0}
              max={maxFrame}
              value={loopStart}
              onChange={(e) => handleStartChange(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-[#27272a] accent-[#10b981]"
            />
            <span className="w-8 text-right text-white">#{loopStart}</span>
          </div>

          {/* End Slider */}
          <div className="flex items-center gap-3">
            <span className="w-20 text-[#ff5722] font-semibold">End Frame:</span>
            <input
              type="range"
              min={0}
              max={maxFrame}
              value={loopEnd}
              onChange={(e) => handleEndChange(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-[#27272a] accent-[#ff5722]"
            />
            <span className="w-8 text-right text-white">#{loopEnd}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ThumbnailCanvas({ frame }: { frame: ProcessedFrame }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 56;
    canvas.height = 56;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 56, 56);

    const source = frame.alignedCanvas || frame.canvas;
    if (source) {
      ctx.drawImage(source, 0, 0, 56, 56);
    }
  }, [frame]);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
}
