"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  SpritelyState,
  ProcessedFrame,
} from "@/lib/spritely/types";
import {
  sliceGrid,
  sliceBySize,
  sliceByBoxes,
  runConnectedComponentsBfs,
} from "@/lib/spritely/slicing";
import {
  applyChromaKey,
  sampleImagePixel,
  rgbToHex,
} from "@/lib/spritely/chroma";
import { applyMorphologicalErosion } from "@/lib/spritely/erosion";
import {
  computeBoundingBoxAndCentroid,
  computeUnionBoundingBox,
  alignFrame,
} from "@/lib/spritely/alignment";
import { findDuplicateIndices } from "@/lib/spritely/duplicates";
import { downloadCompositeSheet } from "@/lib/spritely/sheetExporter";
import { downloadFramesZip } from "@/lib/spritely/zipExporter";

import ExportToolbar from "./ExportToolbar";
import ControlsSidebar from "./ControlsSidebar";
import WorkspaceViewport from "./WorkspaceViewport";
import TimelineScrubber from "./TimelineScrubber";

export default function SpritelyWorkspace() {
  const [state, setState] = useState<SpritelyState>({
    spritesheetImage: null,
    sheetWidth: 0,
    sheetHeight: 0,
    fileName: "",

    sliceMode: "grid",
    cols: 8,
    rows: 1,
    cellW: 172,
    cellH: 768,
    autoMinSize: 8,
    autoMergeDist: 4,
    detectedBoxes: [],

    frames: [],

    chromaEnabled: false,
    chromaColor: { r: 5, g: 196, b: 4 },
    chromaColorHex: "#05c404",
    tolerance: 45,
    feather: 2,

    haloEnabled: false,
    haloErosion: 0,
    alphaThreshold: 10,

    alignEnabled: true,
    centeringMode: "union",
    alignment: "bottom-center",
    targetCellSize: 128,
    reducePadding: 12,
    sharpPixelArt: true,

    nudgeEnabled: true,
    manualOffsets: [],
    manualScales: [],

    loopStart: 0,
    loopEnd: 7,
    currentFrameIndex: 0,
    isPlaying: true,
    previewFps: 12,

    ghostActive: false,
    gridActive: true,
    activeTab: "preview",
    pipetteActive: false,
    previewZoom: 1.5,
    sliceZoom: 0.75,
  });

  const [isExporting, setIsExporting] = useState(false);
  const rawSlicedCanvasesRef = useRef<HTMLCanvasElement[]>([]);

  // Update a single key in state
  const updateState = useCallback(
    <K extends keyof SpritelyState>(key: K, value: SpritelyState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Core Pipeline Execution
  const runPipeline = useCallback(
    (
      rawCanvases: HTMLCanvasElement[],
      currentState: SpritelyState,
      resetLoop: boolean = false
    ) => {
      if (rawCanvases.length === 0) return;

      const processedList: ProcessedFrame[] = [];

      // Step 1: Chroma & Erosion & Bounding Box for each frame
      for (let i = 0; i < rawCanvases.length; i++) {
        let canvas = rawCanvases[i];

        if (currentState.chromaEnabled) {
          canvas = applyChromaKey(
            canvas,
            currentState.chromaColor,
            currentState.tolerance,
            currentState.feather
          );
        }

        if (currentState.haloEnabled && currentState.haloErosion > 0) {
          canvas = applyMorphologicalErosion(
            canvas,
            currentState.haloErosion,
            currentState.alphaThreshold
          );
        }

        const { bbox, centroid } = computeBoundingBoxAndCentroid(
          canvas,
          currentState.alphaThreshold
        );

        const existingFrame = currentState.frames[i];
        const selected = existingFrame !== undefined ? existingFrame.selected : true;

        processedList.push({
          index: i,
          canvas: rawCanvases[i],
          processedCanvas: canvas,
          selected,
          boundingBox: bbox,
          centroid,
        });
      }

      // Step 2: Global Union Bounding Box across active frames
      const loopStart = resetLoop ? 0 : currentState.loopStart;
      const loopEnd = resetLoop
        ? Math.max(0, processedList.length - 1)
        : Math.min(currentState.loopEnd, processedList.length - 1);

      const activeFrames = processedList.filter(
        (f) => f.selected && f.index >= loopStart && f.index <= loopEnd
      );

      const unionBox = computeUnionBoundingBox(activeFrames.map((f) => f.boundingBox));

      // Step 3: Alignment on destination cells
      const alignedList = processedList.map((frame) => {
        const manualOffset = currentState.manualOffsets[frame.index] || { x: 0, y: 0 };
        const manualScale = currentState.manualScales[frame.index] || 1.0;

        const alignedCanvas = alignFrame(
          frame.processedCanvas || frame.canvas,
          frame.boundingBox,
          frame.centroid,
          unionBox,
          {
            targetSize: currentState.targetCellSize,
            padding: currentState.reducePadding,
            alignment: currentState.alignment,
            centeringMode: currentState.centeringMode,
            alignEnabled: currentState.alignEnabled,
            sharpPixelArt: currentState.sharpPixelArt,
            nudgeEnabled: currentState.nudgeEnabled,
            manualOffset,
            manualScale,
          }
        );

        return {
          ...frame,
          alignedCanvas,
        };
      });

      setState((prev) => ({
        ...prev,
        frames: alignedList,
        loopStart,
        loopEnd,
        manualOffsets:
          prev.manualOffsets.length === alignedList.length
            ? prev.manualOffsets
            : new Array(alignedList.length).fill({ x: 0, y: 0 }),
        manualScales:
          prev.manualScales.length === alignedList.length
            ? prev.manualScales
            : new Array(alignedList.length).fill(1.0),
      }));
    },
    []
  );

  // Slicing Sheet Handler
  const sliceCurrentSheet = useCallback(
    (image: HTMLImageElement, currentState: SpritelyState) => {
      let sliced: HTMLCanvasElement[] = [];
      let detectedBoxes = currentState.detectedBoxes;

      if (currentState.sliceMode === "grid") {
        sliced = sliceGrid(image, currentState.cols, currentState.rows);
      } else if (currentState.sliceMode === "size") {
        const res = sliceBySize(image, currentState.cellW, currentState.cellH);
        sliced = res.frames;
      } else if (currentState.sliceMode === "auto") {
        // Auto BFS Connected Components
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = image.naturalWidth || image.width;
        tempCanvas.height = image.naturalHeight || image.height;
        const ctx = tempCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          if (currentState.chromaEnabled) {
            const imgData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            // apply chroma key
            const len = imgData.data.length;
            const key = currentState.chromaColor;
            for (let i = 0; i < len; i += 4) {
              const r = imgData.data[i];
              const g = imgData.data[i + 1];
              const b = imgData.data[i + 2];
              const d = Math.sqrt((r - key.r) ** 2 + (g - key.g) ** 2 + (b - key.b) ** 2);
              if (d < currentState.tolerance) {
                imgData.data[i + 3] = 0;
              }
            }
            ctx.putImageData(imgData, 0, 0);
          }
          const imgData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          detectedBoxes = runConnectedComponentsBfs(
            tempCanvas.width,
            tempCanvas.height,
            imgData.data,
            currentState.autoMinSize,
            currentState.autoMergeDist,
            currentState.alphaThreshold
          );
        }
        sliced = sliceByBoxes(image, detectedBoxes);
      }

      rawSlicedCanvasesRef.current = sliced;
      setState((prev) => ({ ...prev, detectedBoxes }));
      runPipeline(sliced, currentState, true);
    },
    [runPipeline]
  );

  // Ingest Image from File or URL
  const ingestImage = useCallback(
    (img: HTMLImageElement, fileName: string, isChromaDemo: boolean = false) => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      // Sample (0,0) for chroma color
      const sample = sampleImagePixel(img, 0, 0);
      const hex = rgbToHex(sample);

      // Infer column and row heuristics
      let cols = 8;
      let rows = 1;
      if (width === 1376 && height === 768) {
        cols = 8;
        rows = 1;
      } else if (width % 128 === 0 && height % 128 === 0) {
        cols = Math.max(1, Math.floor(width / 128));
        rows = Math.max(1, Math.floor(height / 128));
      } else if (width % 64 === 0 && height % 64 === 0) {
        cols = Math.max(1, Math.floor(width / 64));
        rows = Math.max(1, Math.floor(height / 64));
      }

      const nextState: SpritelyState = {
        ...state,
        spritesheetImage: img,
        sheetWidth: width,
        sheetHeight: height,
        fileName,
        cols,
        rows,
        cellW: Math.floor(width / cols),
        cellH: Math.floor(height / rows),
        chromaColor: sample,
        chromaColorHex: hex,
        chromaEnabled: isChromaDemo,
        haloEnabled: isChromaDemo,
        haloErosion: isChromaDemo ? 1 : 0,
        loopStart: 0,
        loopEnd: cols * rows - 1,
        currentFrameIndex: 0,
      };

      setState(nextState);
      sliceCurrentSheet(img, nextState);
    },
    [sliceCurrentSheet, state]
  );

  // Initial Load: Load sample spritesheet on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ingestImage(img, "walking.png", false);
    };
    img.src = "/demo/walking.png";
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-run pipeline when chroma, erosion, or alignment settings change
  useEffect(() => {
    if (rawSlicedCanvasesRef.current.length > 0) {
      runPipeline(rawSlicedCanvasesRef.current, state, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.chromaEnabled,
    state.chromaColorHex,
    state.tolerance,
    state.feather,
    state.haloEnabled,
    state.haloErosion,
    state.alphaThreshold,
    state.alignEnabled,
    state.centeringMode,
    state.alignment,
    state.targetCellSize,
    state.reducePadding,
    state.sharpPixelArt,
    state.nudgeEnabled,
    state.manualOffsets,
    state.manualScales,
  ]);

  // Animation Playback Interval
  useEffect(() => {
    if (!state.isPlaying || state.frames.length === 0) return;

    const intervalMs = Math.round(1000 / Math.max(1, Math.min(60, state.previewFps)));

    const timer = setInterval(() => {
      setState((prev) => {
        const activeIndices = prev.frames
          .filter((f) => f.selected && f.index >= prev.loopStart && f.index <= prev.loopEnd)
          .map((f) => f.index);

        if (activeIndices.length === 0) return prev;

        const currentPos = activeIndices.indexOf(prev.currentFrameIndex);
        const nextPos = (currentPos + 1) % activeIndices.length;
        return {
          ...prev,
          currentFrameIndex: activeIndices[nextPos],
        };
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [state.isPlaying, state.previewFps, state.frames]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleStep(-1);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleStep(1);
      } else if (e.code === "KeyW") {
        e.preventDefault();
        handleNudge(0, -1);
      } else if (e.code === "KeyS") {
        e.preventDefault();
        handleNudge(0, 1);
      } else if (e.code === "KeyA") {
        e.preventDefault();
        handleNudge(-1, 0);
      } else if (e.code === "KeyD") {
        e.preventDefault();
        handleNudge(1, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.frames, state.loopStart, state.loopEnd, state.currentFrameIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleStep = (delta: number) => {
    const activeIndices = state.frames
      .filter((f) => f.selected && f.index >= state.loopStart && f.index <= state.loopEnd)
      .map((f) => f.index);

    if (activeIndices.length === 0) return;

    const currentPos = activeIndices.indexOf(state.currentFrameIndex);
    const nextPos =
      (currentPos + delta + activeIndices.length) % activeIndices.length;
    setState((prev) => ({
      ...prev,
      currentFrameIndex: activeIndices[nextPos],
      isPlaying: false, // Pause when manually stepping
    }));
  };

  const handleNudge = (dx: number, dy: number) => {
    setState((prev) => {
      const offsets = [...prev.manualOffsets];
      const cur = offsets[prev.currentFrameIndex] || { x: 0, y: 0 };
      offsets[prev.currentFrameIndex] = { x: cur.x + dx, y: cur.y + dy };
      return { ...prev, manualOffsets: offsets };
    });
  };

  const handleResetNudgeCurrent = () => {
    setState((prev) => {
      const offsets = [...prev.manualOffsets];
      const scales = [...prev.manualScales];
      offsets[prev.currentFrameIndex] = { x: 0, y: 0 };
      scales[prev.currentFrameIndex] = 1.0;
      return { ...prev, manualOffsets: offsets, manualScales: scales };
    });
  };

  const handleResetNudgeAll = () => {
    setState((prev) => ({
      ...prev,
      manualOffsets: new Array(prev.frames.length).fill({ x: 0, y: 0 }),
      manualScales: new Array(prev.frames.length).fill(1.0),
    }));
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        ingestImage(img, file.name, false);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleLoadSample = (url: string = "/demo/walking.png") => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const isChroma = url.includes("jpeg");
      ingestImage(img, url.split("/").pop() || "sample.png", isChroma);
    };
    img.src = url;
  };

  const handleToggleFrame = (idx: number) => {
    setState((prev) => {
      const frames = prev.frames.map((f) =>
        f.index === idx ? { ...f, selected: !f.selected } : f
      );
      return { ...prev, frames };
    });
  };

  const handleSelectAll = () => {
    setState((prev) => ({
      ...prev,
      frames: prev.frames.map((f) => ({ ...f, selected: true })),
    }));
  };

  const handleSelectEven = () => {
    setState((prev) => ({
      ...prev,
      frames: prev.frames.map((f) => ({ ...f, selected: f.index % 2 === 0 })),
    }));
  };

  const handleSelectOdd = () => {
    setState((prev) => ({
      ...prev,
      frames: prev.frames.map((f) => ({ ...f, selected: f.index % 2 !== 0 })),
    }));
  };

  const handleFindDuplicates = () => {
    const dups = findDuplicateIndices(state.frames);
    if (dups.length > 0) {
      setState((prev) => ({
        ...prev,
        frames: prev.frames.map((f) =>
          dups.includes(f.index) ? { ...f, selected: false } : f
        ),
      }));
    }
  };

  // Exporters
  const getActiveCanvases = () => {
    return state.frames
      .filter((f) => f.selected && f.index >= state.loopStart && f.index <= state.loopEnd)
      .map((f) => f.alignedCanvas || f.canvas);
  };

  const handleDownloadSheet = () => {
    const canvases = getActiveCanvases();
    if (canvases.length === 0) return;
    downloadCompositeSheet(canvases, state.cols, state.targetCellSize);
  };

  const handleDownloadZip = async () => {
    const canvases = getActiveCanvases();
    if (canvases.length === 0) return;
    setIsExporting(true);
    try {
      await downloadFramesZip(canvases, state.targetCellSize);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  // Active Frames Calculation
  const activeFrameCount = state.frames.filter(
    (f) => f.selected && f.index >= state.loopStart && f.index <= state.loopEnd
  ).length;

  const currentFrame =
    state.frames.find((f) => f.index === state.currentFrameIndex) || state.frames[0] || null;

  const activeIndices = state.frames
    .filter((f) => f.selected && f.index >= state.loopStart && f.index <= state.loopEnd)
    .map((f) => f.index);

  const curPos = currentFrame ? activeIndices.indexOf(currentFrame.index) : -1;
  const prevIdx =
    curPos > -1
      ? activeIndices[(curPos - 1 + activeIndices.length) % activeIndices.length]
      : -1;
  const nextIdx =
    curPos > -1 ? activeIndices[(curPos + 1) % activeIndices.length] : -1;

  const prevFrame = state.frames.find((f) => f.index === prevIdx) || null;
  const nextFrame = state.frames.find((f) => f.index === nextIdx) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] min-h-[700px] w-full bg-[#09090b] text-[#fafafa]">
      {/* Top Export Toolbar */}
      <ExportToolbar
        activeFrameCount={activeFrameCount}
        totalFrameCount={state.frames.length}
        targetSize={state.targetCellSize}
        onDownloadSheet={handleDownloadSheet}
        onDownloadZip={handleDownloadZip}
        isExporting={isExporting}
      />

      {/* Main Studio Area: Sidebar + Viewport + Scrubber */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Left 5-Step Controls Sidebar */}
        <ControlsSidebar
          state={state}
          onUpdateState={updateState}
          onFileUpload={handleFileUpload}
          onLoadSample={handleLoadSample}
          onTriggerSlice={() => {
            if (state.spritesheetImage) {
              sliceCurrentSheet(state.spritesheetImage, state);
            }
          }}
          onNudge={handleNudge}
          onResetNudgeCurrent={handleResetNudgeCurrent}
          onResetNudgeAll={handleResetNudgeAll}
        />

        {/* Center/Right Stage: Viewport + Bottom Timeline */}
        <main className="flex flex-1 flex-col overflow-hidden bg-[#09090b]">
          <WorkspaceViewport
            activeTab={state.activeTab}
            onTabChange={(tab) => updateState("activeTab", tab)}
            image={state.spritesheetImage}
            sliceMode={state.sliceMode}
            cols={state.cols}
            rows={state.rows}
            cellW={state.cellW}
            cellH={state.cellH}
            detectedBoxes={state.detectedBoxes}
            sliceZoom={state.sliceZoom}
            onSliceZoomChange={(z) => updateState("sliceZoom", z)}
            currentFrame={currentFrame}
            prevFrame={prevFrame}
            nextFrame={nextFrame}
            isPlaying={state.isPlaying}
            fps={state.previewFps}
            onFpsChange={(fps) => updateState("previewFps", fps)}
            onTogglePlay={() => updateState("isPlaying", !state.isPlaying)}
            onStep={handleStep}
            ghostActive={state.ghostActive}
            onToggleGhost={() => updateState("ghostActive", !state.ghostActive)}
            gridActive={state.gridActive}
            onToggleGrid={() => updateState("gridActive", !state.gridActive)}
            previewZoom={state.previewZoom}
            onPreviewZoomChange={(z) => updateState("previewZoom", z)}
            targetSize={state.targetCellSize}
            pipetteActive={state.pipetteActive}
            onPipettePick={(color) => {
              updateState("chromaColor", color);
              updateState("chromaColorHex", rgbToHex(color));
              updateState("pipetteActive", false);
              updateState("chromaEnabled", true);
            }}
            frames={state.frames}
            loopStart={state.loopStart}
            loopEnd={state.loopEnd}
            onToggleFrame={handleToggleFrame}
          />

          {/* Bottom Timeline Scrubber */}
          <div className="p-4 pt-0">
            <TimelineScrubber
              frames={state.frames}
              currentIndex={state.currentFrameIndex}
              loopStart={state.loopStart}
              loopEnd={state.loopEnd}
              onSelectFrame={(idx) => {
                updateState("currentFrameIndex", idx);
                updateState("isPlaying", false);
              }}
              onLoopStartChange={(s) => updateState("loopStart", s)}
              onLoopEndChange={(e) => updateState("loopEnd", e)}
              onSelectAll={handleSelectAll}
              onSelectEven={handleSelectEven}
              onSelectOdd={handleSelectOdd}
              onFindDuplicates={handleFindDuplicates}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
