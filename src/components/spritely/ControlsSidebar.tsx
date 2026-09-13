"use client";

import React, { useState } from "react";
import {
  Upload,
  Scissors,
  Pipette,
  ChevronDown,
  ChevronRight,
  Shield,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  AnchorPoint,
  CenteringMode,
  SliceMode,
  SpritelyState,
} from "@/lib/spritely/types";
import { hexToRgb } from "@/lib/spritely/chroma";

interface ControlsSidebarProps {
  state: SpritelyState;
  onUpdateState: <K extends keyof SpritelyState>(key: K, value: SpritelyState[K]) => void;
  onFileUpload: (file: File) => void;
  onLoadSample: (path?: string) => void;
  onTriggerSlice: () => void;
  onNudge: (dx: number, dy: number) => void;
  onResetNudgeCurrent: () => void;
  onResetNudgeAll: () => void;
}

export default function ControlsSidebar({
  state,
  onUpdateState,
  onFileUpload,
  onLoadSample,
  onTriggerSlice,
  onNudge,
  onResetNudgeCurrent,
  onResetNudgeAll,
}: ControlsSidebarProps) {
  // Accordion open states
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: false,
  });

  const [dragOver, setDragOver] = useState(false);

  const toggleStep = (step: number) => {
    setOpenSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        onFileUpload(file);
      }
    }
  };

  const currentOffset = state.manualOffsets[state.currentFrameIndex] || { x: 0, y: 0 };
  const currentScale = state.manualScales[state.currentFrameIndex] || 1.0;

  return (
    <aside className="flex w-full md:w-80 lg:w-96 flex-shrink-0 flex-col gap-3 overflow-y-auto bg-[#09090b] p-3 text-sm scrollbar-thin">
      {/* Step 1: Upload & Slice */}
      <div className="rounded-xl border border-[#27272a] bg-[#121217] overflow-hidden">
        <button
          onClick={() => toggleStep(1)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-mono font-bold text-white hover:bg-[#18181c] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#ff5722]/20 text-[10px] text-[#ff5722]">
              1
            </span>
            <span>Upload & Slice</span>
          </div>
          {openSteps[1] ? <ChevronDown className="h-4 w-4 text-[#a1a1aa]" /> : <ChevronRight className="h-4 w-4 text-[#a1a1aa]" />}
        </button>

        {openSteps[1] && (
          <div className="space-y-4 border-t border-[#27272a] p-4">
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
                dragOver
                  ? "border-[#ff5722] bg-[#ff5722]/10 text-white"
                  : "border-[#27272a] bg-[#0d0d12] text-[#a1a1aa] hover:border-[#3f3f46]"
              }`}
            >
              <Upload className="h-6 w-6 text-[#ff5722] mb-1.5" />
              <p className="text-xs font-medium text-white">Drag & drop spritesheet</p>
              <p className="text-[11px] text-[#71717a] mt-0.5">PNG, JPEG, WebP</p>

              <label className="mt-2.5 cursor-pointer rounded bg-[#1f1f27] px-3 py-1 text-xs font-medium text-white border border-[#27272a] hover:bg-[#272733] transition-colors">
                Browse File
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) onFileUpload(e.target.files[0]);
                  }}
                />
              </label>
            </div>

            {/* 1-Click Try Sample Buttons */}
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => onLoadSample("/demo/walking.png")}
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#ff5722]/40 bg-[#ff5722]/10 py-1.5 text-xs font-mono font-medium text-[#ff5722] hover:bg-[#ff5722]/20 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Try Sample Spritesheet (walking.png)
              </button>
              <button
                onClick={() => onLoadSample("/demo/walking.jpeg")}
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#10b981]/40 bg-[#10b981]/10 py-1.5 text-xs font-mono font-medium text-[#10b981] hover:bg-[#10b981]/20 transition-colors"
              >
                <Shield className="h-3.5 w-3.5" />
                Try Chroma Key Test (walking.jpeg)
              </button>
            </div>

            {/* Slicing Mode Tabs */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#a1a1aa]">Slicing Mode:</label>
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#0d0d12] p-1 border border-[#27272a]">
                {(["grid", "size", "auto"] as SliceMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => onUpdateState("sliceMode", mode)}
                    className={`rounded py-1 text-xs font-mono transition-colors capitalize ${
                      state.sliceMode === mode
                        ? "bg-[#1f1f27] text-[#ff5722] font-semibold shadow"
                        : "text-[#a1a1aa] hover:text-white"
                    }`}
                  >
                    {mode === "grid" ? "Grid" : mode === "size" ? "Cell Px" : "Auto BFS"}
                  </button>
                ))}
              </div>

              {/* Grid Mode Fields */}
              {state.sliceMode === "grid" && (
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div>
                    <label className="text-[11px] text-[#71717a]">Columns:</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={state.cols}
                      onChange={(e) => onUpdateState("cols", Math.max(1, Number(e.target.value)))}
                      className="mt-1 w-full rounded bg-[#18181c] border border-[#27272a] px-2 py-1 text-white text-xs outline-none focus:border-[#ff5722]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#71717a]">Rows:</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={state.rows}
                      onChange={(e) => onUpdateState("rows", Math.max(1, Number(e.target.value)))}
                      className="mt-1 w-full rounded bg-[#18181c] border border-[#27272a] px-2 py-1 text-white text-xs outline-none focus:border-[#ff5722]"
                    />
                  </div>
                </div>
              )}

              {/* Cell Size Mode Fields */}
              {state.sliceMode === "size" && (
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div>
                    <label className="text-[11px] text-[#71717a]">Cell Width (px):</label>
                    <input
                      type="number"
                      min={8}
                      max={2048}
                      value={state.cellW}
                      onChange={(e) => onUpdateState("cellW", Math.max(8, Number(e.target.value)))}
                      className="mt-1 w-full rounded bg-[#18181c] border border-[#27272a] px-2 py-1 text-white text-xs outline-none focus:border-[#ff5722]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#71717a]">Cell Height (px):</label>
                    <input
                      type="number"
                      min={8}
                      max={2048}
                      value={state.cellH}
                      onChange={(e) => onUpdateState("cellH", Math.max(8, Number(e.target.value)))}
                      className="mt-1 w-full rounded bg-[#18181c] border border-[#27272a] px-2 py-1 text-white text-xs outline-none focus:border-[#ff5722]"
                    />
                  </div>
                </div>
              )}

              {/* Auto BFS Mode Fields */}
              {state.sliceMode === "auto" && (
                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-[#a1a1aa]">
                      <span>Min Sprite Size:</span>
                      <span className="text-white">{state.autoMinSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={100}
                      value={state.autoMinSize}
                      onChange={(e) => onUpdateState("autoMinSize", Number(e.target.value))}
                      className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-[#a1a1aa]">
                      <span>Merge Distance:</span>
                      <span className="text-white">{state.autoMergeDist}px</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={state.autoMergeDist}
                      onChange={(e) => onUpdateState("autoMergeDist", Number(e.target.value))}
                      className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                    />
                  </div>
                </div>
              )}

              {/* Action: Trigger Slice */}
              <button
                onClick={onTriggerSlice}
                disabled={!state.spritesheetImage}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg bg-[#ff5722] py-2 text-xs font-mono font-semibold text-white shadow-glow-btn hover:bg-[#f4511e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Scissors className="h-3.5 w-3.5" />
                Slice Spritesheet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Chroma Key & Eyedropper */}
      <div className="rounded-xl border border-[#27272a] bg-[#121217] overflow-hidden">
        <button
          onClick={() => toggleStep(2)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-mono font-bold text-white hover:bg-[#18181c] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#00f0ff]/20 text-[10px] text-[#00f0ff]">
              2
            </span>
            <span>Chroma Key & Pipette</span>
          </div>
          {openSteps[2] ? <ChevronDown className="h-4 w-4 text-[#a1a1aa]" /> : <ChevronRight className="h-4 w-4 text-[#a1a1aa]" />}
        </button>

        {openSteps[2] && (
          <div className="space-y-4 border-t border-[#27272a] p-4">
            {/* Enable switch */}
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs text-white">Enable Chroma Key:</label>
              <input
                type="checkbox"
                checked={state.chromaEnabled}
                onChange={(e) => onUpdateState("chromaEnabled", e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-[#ff5722]"
              />
            </div>

            {state.chromaEnabled && (
              <>
                {/* Color preview & Eyedropper */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] text-[#a1a1aa]">Key Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={state.chromaColorHex}
                      onChange={(e) => {
                        const hex = e.target.value;
                        onUpdateState("chromaColorHex", hex);
                        onUpdateState("chromaColor", hexToRgb(hex));
                      }}
                      className="h-8 w-10 cursor-pointer rounded border border-[#27272a] bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={state.chromaColorHex}
                      onChange={(e) => {
                        const hex = e.target.value;
                        onUpdateState("chromaColorHex", hex);
                        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                          onUpdateState("chromaColor", hexToRgb(hex));
                        }
                      }}
                      className="w-24 rounded bg-[#18181c] border border-[#27272a] px-2 py-1 text-xs font-mono text-white outline-none focus:border-[#ff5722]"
                    />

                    <button
                      onClick={() => onUpdateState("pipetteActive", !state.pipetteActive)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded py-1.5 px-2 text-xs font-mono border transition-colors ${
                        state.pipetteActive
                          ? "border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] animate-pulse"
                          : "border-[#27272a] bg-[#1a1a22] text-[#fafafa] hover:border-[#3f3f46]"
                      }`}
                      title="Click to pick key color from canvas"
                    >
                      <Pipette className="h-3.5 w-3.5" />
                      Pipette
                    </button>
                  </div>
                </div>

                {/* Tolerance Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#a1a1aa]">Tolerance:</span>
                    <span className="text-white">{state.tolerance}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={state.tolerance}
                    onChange={(e) => onUpdateState("tolerance", Number(e.target.value))}
                    className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                  />
                </div>

                {/* Feather Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#a1a1aa]">Edge Feathering:</span>
                    <span className="text-white">{state.feather}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={state.feather}
                    onChange={(e) => onUpdateState("feather", Number(e.target.value))}
                    className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Step 3: Centering & Anchor */}
      <div className="rounded-xl border border-[#27272a] bg-[#121217] overflow-hidden">
        <button
          onClick={() => toggleStep(3)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-mono font-bold text-white hover:bg-[#18181c] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#10b981]/20 text-[10px] text-[#10b981]">
              3
            </span>
            <span>Centering & Anchor</span>
          </div>
          {openSteps[3] ? <ChevronDown className="h-4 w-4 text-[#a1a1aa]" /> : <ChevronRight className="h-4 w-4 text-[#a1a1aa]" />}
        </button>

        {openSteps[3] && (
          <div className="space-y-4 border-t border-[#27272a] p-4">
            {/* Centering Mode */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#a1a1aa]">Centering Mode:</label>
              <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                {[
                  { id: "union", label: "Union Bounding Box", desc: "Preserves natural character bobbing" },
                  { id: "centroid", label: "Center of Mass (Centroid)", desc: "Calculates average pixel coordinates" },
                  { id: "individual", label: "Individual Centering", desc: "Centers each frame independently" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onUpdateState("centeringMode", item.id as CenteringMode)}
                    className={`flex flex-col text-left rounded-lg p-2 border transition-colors ${
                      state.centeringMode === item.id
                        ? "border-[#ff5722] bg-[#ff5722]/10 text-white"
                        : "border-[#27272a] bg-[#18181c] text-[#a1a1aa] hover:border-[#3f3f46]"
                    }`}
                  >
                    <span className="font-semibold text-xs text-white">{item.label}</span>
                    <span className="text-[10px] text-[#71717a]">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 9-Point Anchor Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-mono text-xs text-[#a1a1aa]">9-Point Anchor Grid:</label>
                <span className="font-mono text-[11px] text-[#ff5722]">{state.alignment}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 w-40 mx-auto rounded-lg bg-[#0d0d12] p-2 border border-[#27272a]">
                {(
                  [
                    ["top-left", "TL"],
                    ["top-center", "TC"],
                    ["top-right", "TR"],
                    ["center-left", "CL"],
                    ["center-center", "CC"],
                    ["center-right", "CR"],
                    ["bottom-left", "BL"],
                    ["bottom-center", "BC"],
                    ["bottom-right", "BR"],
                  ] as [AnchorPoint, string][]
                ).map(([anchor, short]) => (
                  <button
                    key={anchor}
                    onClick={() => onUpdateState("alignment", anchor)}
                    className={`h-9 rounded font-mono text-xs font-bold transition-colors ${
                      state.alignment === anchor
                        ? "bg-[#ff5722] text-white shadow-glow-btn"
                        : "bg-[#18181c] text-[#a1a1aa] hover:bg-[#252530] hover:text-white border border-[#27272a]"
                    }`}
                    title={anchor}
                  >
                    {short}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Cell Size */}
            <div className="space-y-1">
              <label className="font-mono text-xs text-[#a1a1aa]">Target Cell Size:</label>
              <select
                value={state.targetCellSize}
                onChange={(e) => onUpdateState("targetCellSize", Number(e.target.value))}
                className="w-full rounded bg-[#18181c] border border-[#27272a] px-2.5 py-1.5 text-xs font-mono text-white outline-none focus:border-[#ff5722]"
              >
                {[32, 64, 128, 256, 512].map((s) => (
                  <option key={s} value={s}>
                    {s} &times; {s} px
                  </option>
                ))}
              </select>
            </div>

            {/* Inset Padding Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#a1a1aa]">Reduce Sprite (Padding):</span>
                <span className="text-white">{state.reducePadding}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.floor(state.targetCellSize / 3)}
                value={state.reducePadding}
                onChange={(e) => onUpdateState("reducePadding", Number(e.target.value))}
                className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
              />
            </div>

            {/* Sharp Pixel Art Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="font-mono text-xs text-white">Sharp Pixel Art (Nearest Neighbor):</label>
              <input
                type="checkbox"
                checked={state.sharpPixelArt}
                onChange={(e) => onUpdateState("sharpPixelArt", e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-[#ff5722]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Step 4: Halo Shaver (Morphological Erosion) */}
      <div className="rounded-xl border border-[#27272a] bg-[#121217] overflow-hidden">
        <button
          onClick={() => toggleStep(4)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-mono font-bold text-white hover:bg-[#18181c] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f59e0b]/20 text-[10px] text-[#f59e0b]">
              4
            </span>
            <span>Halo Shaver (Erosion)</span>
          </div>
          {openSteps[4] ? <ChevronDown className="h-4 w-4 text-[#a1a1aa]" /> : <ChevronRight className="h-4 w-4 text-[#a1a1aa]" />}
        </button>

        {openSteps[4] && (
          <div className="space-y-4 border-t border-[#27272a] p-4">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs text-white">Enable Halo Shaver:</label>
              <input
                type="checkbox"
                checked={state.haloEnabled}
                onChange={(e) => onUpdateState("haloEnabled", e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-[#ff5722]"
              />
            </div>

            {state.haloEnabled && (
              <>
                {/* Erosion Width Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#a1a1aa]">Erosion Width:</span>
                    <span className="text-white">{state.haloErosion}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    value={state.haloErosion}
                    onChange={(e) => onUpdateState("haloErosion", Number(e.target.value))}
                    className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                  />
                </div>

                {/* Alpha Threshold Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#a1a1aa]">Alpha Threshold:</span>
                    <span className="text-white">{state.alphaThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={255}
                    value={state.alphaThreshold}
                    onChange={(e) => onUpdateState("alphaThreshold", Number(e.target.value))}
                    className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Step 5: Fine-Tuning Nudge D-Pad & Scale */}
      <div className="rounded-xl border border-[#27272a] bg-[#121217] overflow-hidden">
        <button
          onClick={() => toggleStep(5)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-mono font-bold text-white hover:bg-[#18181c] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#a1a1aa]/20 text-[10px] text-[#a1a1aa]">
              5
            </span>
            <span>Fine-Tuning Nudge & Scale</span>
          </div>
          {openSteps[5] ? <ChevronDown className="h-4 w-4 text-[#a1a1aa]" /> : <ChevronRight className="h-4 w-4 text-[#a1a1aa]" />}
        </button>

        {openSteps[5] && (
          <div className="space-y-4 border-t border-[#27272a] p-4">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs text-white">Enable Manual Nudge:</label>
              <input
                type="checkbox"
                checked={state.nudgeEnabled}
                onChange={(e) => onUpdateState("nudgeEnabled", e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-[#ff5722]"
              />
            </div>

            {state.nudgeEnabled && (
              <>
                <div className="flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
                  <span>Frame #{state.currentFrameIndex}:</span>
                  <span className="text-[#00f0ff]">
                    X: {currentOffset.x > 0 ? `+${currentOffset.x}` : currentOffset.x}px, Y:{" "}
                    {currentOffset.y > 0 ? `+${currentOffset.y}` : currentOffset.y}px
                  </span>
                </div>

                {/* D-Pad Controls */}
                <div className="flex flex-col items-center gap-1.5 py-1">
                  <button
                    onClick={() => onNudge(0, -1)}
                    className="h-8 w-10 rounded border border-[#27272a] bg-[#1a1a22] flex items-center justify-center hover:bg-[#252530] text-white transition-colors"
                    title="Nudge Up (W)"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNudge(-1, 0)}
                      className="h-8 w-10 rounded border border-[#27272a] bg-[#1a1a22] flex items-center justify-center hover:bg-[#252530] text-white transition-colors"
                      title="Nudge Left (A)"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div className="h-8 w-8 rounded bg-[#101015] border border-[#27272a] flex items-center justify-center text-[10px] font-mono text-[#71717a]">
                      DPAD
                    </div>
                    <button
                      onClick={() => onNudge(1, 0)}
                      className="h-8 w-10 rounded border border-[#27272a] bg-[#1a1a22] flex items-center justify-center hover:bg-[#252530] text-white transition-colors"
                      title="Nudge Right (D)"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onNudge(0, 1)}
                    className="h-8 w-10 rounded border border-[#27272a] bg-[#1a1a22] flex items-center justify-center hover:bg-[#252530] text-white transition-colors"
                    title="Nudge Down (S)"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Scale Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#a1a1aa]">Per-Frame Scale:</span>
                    <span className="text-white">{Math.round(currentScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={150}
                    value={Math.round(currentScale * 100)}
                    onChange={(e) => {
                      const newScales = [...state.manualScales];
                      newScales[state.currentFrameIndex] = Number(e.target.value) / 100;
                      onUpdateState("manualScales", newScales);
                    }}
                    className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#27272a] accent-[#ff5722]"
                  />
                </div>

                {/* Reset Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={onResetNudgeCurrent}
                    className="flex-1 rounded border border-[#27272a] bg-[#18181c] py-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] transition-colors"
                  >
                    Reset Frame
                  </button>
                  <button
                    onClick={onResetNudgeAll}
                    className="flex-1 rounded border border-[#27272a] bg-[#18181c] py-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                <div className="rounded bg-[#0d0d12] p-2 text-[10px] font-mono text-[#71717a] border border-[#27272a]">
                  💡 Hotkeys: Space (Play/Pause), WASD (Nudge), Left/Right (Step)
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
