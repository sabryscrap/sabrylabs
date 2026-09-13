"use client";

import React from "react";
import { Download, FileArchive, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import BracketTag from "@/components/ui/BracketTag";

interface ExportToolbarProps {
  activeFrameCount: number;
  totalFrameCount: number;
  targetSize: number;
  onDownloadSheet: () => void;
  onDownloadZip: () => void;
  isExporting: boolean;
}

export default function ExportToolbar({
  activeFrameCount,
  totalFrameCount,
  targetSize,
  onDownloadSheet,
  onDownloadZip,
  isExporting,
}: ExportToolbarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27272a] bg-[#121217]/95 px-5 py-3.5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ff5722]/10 border border-[#ff5722]/30 text-[#ff5722]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h1 className="font-mono text-base font-bold tracking-tight text-white flex items-center gap-2">
              SPRI<span className="text-[#ff5722]">TELY</span>
              <span className="text-xs font-normal text-[#a1a1aa] font-sans">{"//"} Anti-Jitter Sprite Studio</span>
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-2">
          <BracketTag variant="mint" size="sm">
            {activeFrameCount > 0 ? `● ${activeFrameCount} / ${totalFrameCount} ACTIVE` : "NO SHEET LOADED"}
          </BracketTag>
          <BracketTag variant="cyan" size="sm">
            {`${targetSize}x${targetSize}px`}
          </BracketTag>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadSheet}
          disabled={activeFrameCount === 0 || isExporting}
          className="gap-1.5 text-xs font-mono border-[#27272a] hover:border-[#10b981]/50 text-white"
        >
          <Download className="h-3.5 w-3.5 text-[#10b981]" />
          Download Sheet (.png)
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onDownloadZip}
          disabled={activeFrameCount === 0 || isExporting}
          className="gap-1.5 text-xs font-mono"
        >
          <FileArchive className="h-3.5 w-3.5" />
          {isExporting ? "Packaging ZIP..." : "Download Frames (.zip)"}
        </Button>
      </div>
    </header>
  );
}
