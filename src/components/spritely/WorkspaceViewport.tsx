"use client";

import React from "react";
import { Scissors, Play, Grid } from "lucide-react";
import { BoundingBox, ProcessedFrame, RGB, SliceMode } from "@/lib/spritely/types";
import SliceViewCanvas from "./SliceViewCanvas";
import AnimationPlayer from "./AnimationPlayer";
import SpritelySheetView from "./SpritelySheetView";

interface WorkspaceViewportProps {
  activeTab: "slice" | "preview" | "sheet";
  onTabChange: (tab: "slice" | "preview" | "sheet") => void;

  // Slice props
  image: HTMLImageElement | null;
  sliceMode: SliceMode;
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  detectedBoxes: BoundingBox[];
  sliceZoom: number;
  onSliceZoomChange: (zoom: number) => void;

  // Animation props
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
  previewZoom: number;
  onPreviewZoomChange: (zoom: number) => void;
  targetSize: number;

  // Pipette
  pipetteActive: boolean;
  onPipettePick: (color: RGB) => void;

  // Sheet props
  frames: ProcessedFrame[];
  loopStart: number;
  loopEnd: number;
  onToggleFrame: (index: number) => void;
}

export default function WorkspaceViewport({
  activeTab,
  onTabChange,
  image,
  sliceMode,
  cols,
  rows,
  cellW,
  cellH,
  detectedBoxes,
  sliceZoom,
  onSliceZoomChange,
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
  previewZoom,
  onPreviewZoomChange,
  targetSize,
  pipetteActive,
  onPipettePick,
  frames,
  loopStart,
  loopEnd,
  onToggleFrame,
}: WorkspaceViewportProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#27272a] bg-[#121217] px-4 py-2">
        <button
          onClick={() => onTabChange("slice")}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
            activeTab === "slice"
              ? "bg-[#ff5722] text-white shadow-glow-btn"
              : "text-[#a1a1aa] hover:bg-[#1a1a22] hover:text-white"
          }`}
        >
          <Scissors className="h-3.5 w-3.5" />
          Slice Grid View
        </button>

        <button
          onClick={() => onTabChange("preview")}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
            activeTab === "preview"
              ? "bg-[#ff5722] text-white shadow-glow-btn"
              : "text-[#a1a1aa] hover:bg-[#1a1a22] hover:text-white"
          }`}
        >
          <Play className="h-3.5 w-3.5" />
          Animation Player
        </button>

        <button
          onClick={() => onTabChange("sheet")}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
            activeTab === "sheet"
              ? "bg-[#ff5722] text-white shadow-glow-btn"
              : "text-[#a1a1aa] hover:bg-[#1a1a22] hover:text-white"
          }`}
        >
          <Grid className="h-3.5 w-3.5" />
          Spritely Sheet View
        </button>
      </div>

      {/* Active Tab Viewport Area */}
      <div className="flex-1 p-4 overflow-hidden">
        {activeTab === "slice" && (
          <SliceViewCanvas
            image={image}
            sliceMode={sliceMode}
            cols={cols}
            rows={rows}
            cellW={cellW}
            cellH={cellH}
            detectedBoxes={detectedBoxes}
            zoom={sliceZoom}
            onZoomChange={onSliceZoomChange}
            pipetteActive={pipetteActive}
            onPipettePick={onPipettePick}
          />
        )}

        {activeTab === "preview" && (
          <AnimationPlayer
            currentFrame={currentFrame}
            prevFrame={prevFrame}
            nextFrame={nextFrame}
            isPlaying={isPlaying}
            fps={fps}
            onFpsChange={onFpsChange}
            onTogglePlay={onTogglePlay}
            onStep={onStep}
            ghostActive={ghostActive}
            onToggleGhost={onToggleGhost}
            gridActive={gridActive}
            onToggleGrid={onToggleGrid}
            zoom={previewZoom}
            onZoomChange={onPreviewZoomChange}
            targetSize={targetSize}
            pipetteActive={pipetteActive}
            onPipettePick={onPipettePick}
          />
        )}

        {activeTab === "sheet" && (
          <SpritelySheetView
            frames={frames}
            cols={cols}
            targetSize={targetSize}
            loopStart={loopStart}
            loopEnd={loopEnd}
            onToggleFrame={onToggleFrame}
          />
        )}
      </div>
    </div>
  );
}
