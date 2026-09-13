"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Copy, Check, Play, RefreshCw } from "lucide-react";
import { springPhysics } from "@/lib/motion";

type CommandKey = "status" | "apps" | "metrics";

interface CommandOutput {
  command: string;
  lines: string[];
}

const COMMAND_OUTPUTS: Record<CommandKey, CommandOutput> = {
  status: {
    command: "sabrylabs $ status --all",
    lines: [
      "[SYS] STATUS: NOMINAL (99.98% UPTIME)",
      "[LOC] SHIPPED APPS: 3 (REVERIE, SPRITELY, AUTOCUT)",
      "[DEV] COMMITS: 842+ â¢ CORE: LOCAL-FIRST & TACTILE",
      "[RND] ACTIVE EXPERIMENT: SCREEN DEMO AUTO-POLISH (v0.4.0)",
    ],
  },
  apps: {
    command: "sabrylabs $ apps --list",
    lines: [
      "[01] REVERIE POMODORO     â¢ [DESKTOP_EXE â¢ v1.0.0] â¢ ACTIVE_SHIPPED",
      "[02] SPRITELY ALIGNER    â¢ [BROWSER_WASM â¢ LIVE]   â¢ CLIENT_SIDE_TOOL",
      "[03] AUTOCUT AI ENGINE   â¢ [LOCAL_WHISPER â¢ CLI]   â¢ 75%_CUT_EFFICIENCY",
      "[04] WINAPP-MCP SERVER   â¢ [WINDOWS_UIA â¢ .NET 10] â¢ LOCAL_PROTOCOL",
    ],
  },
  metrics: {
    command: "sabrylabs $ metrics --telemetry",
    lines: [
      "[PERF] RUNTIME LATENCY    : < 16 MS (ZERO CLIENT LAG)",
      "[MEM]  REVERIE MEMORY     : 42 MB (NATIVE ELECTRON FSM)",
      "[AUD]  AUDIO SYNTHESIS    : 40.0 HZ ISOCHRONIC + BROWNIAN",
      "[SEC]  DATA SOVEREIGNTY   : 100% LOCAL-FIRST (ZERO TELEMETRY)",
    ],
  },
};

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<CommandKey>("status");
  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState(14);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Subtle realistic latency fluctuation between 11ms and 16ms
    const interval = setInterval(() => {
      setLatency(11 + Math.floor(Math.random() * 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = COMMAND_OUTPUTS[activeTab];

  const handleCopy = async () => {
    const textToCopy = `${current.command}\n${current.lines.join("\n")}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API unavailable
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLatency(9 + Math.floor(Math.random() * 4));
    setTimeout(() => setIsRefreshing(false), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springPhysics.springSmooth}
      whileHover={springPhysics.cardHover}
      className="w-full max-w-3xl mx-auto rounded-xl bg-[#121217] border border-[#27272a] shadow-card overflow-hidden text-left font-mono"
    >
      {/* Terminal Window Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#18181c] border-b border-[#27272a] select-none">
        <div className="flex items-center gap-2">
          {/* 3 macOS / Unix window controls */}
          <span className="h-3 w-3 rounded-full bg-[#ef4444]/80 border border-[#ef4444] inline-block" />
          <span className="h-3 w-3 rounded-full bg-[#f59e0b]/80 border border-[#f59e0b] inline-block" />
          <span className="h-3 w-3 rounded-full bg-[#10b981]/80 border border-[#10b981] inline-block" />
          <span className="ml-2 text-xs text-[#a1a1aa] font-medium tracking-wide flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-[#ff5722]" />
            <span>sabrylabs-telemetry ~ zsh</span>
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#71717a]">
            <span>PING:</span>
            <span className="text-[#10b981] font-semibold">{latency}ms</span>
          </div>

          <motion.button
            whileTap={springPhysics.buttonTap}
            onClick={handleRefresh}
            title="Refresh telemetry"
            className="p-1 rounded text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a] transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[#ff5722]" : ""}`} />
          </motion.button>

          <motion.button
            whileTap={springPhysics.buttonTap}
            onClick={handleCopy}
            title="Copy terminal output"
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-[#a1a1aa] hover:text-[#fafafa] bg-[#1a1a22] border border-[#27272a] hover:border-[#3f3f46] transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-[#10b981]" />
                <span className="text-[#10b981]">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>COPY</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Interactive Command Tabs Bar */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#0d0d10] border-b border-[#1f1f23] overflow-x-auto text-xs">
        <span className="text-[#71717a] text-[11px] mr-1 hidden sm:inline">PROMPT:</span>
        {(["status", "apps", "metrics"] as CommandKey[]).map((tabKey) => {
          const isActive = activeTab === tabKey;
          return (
            <motion.button
              key={tabKey}
              whileTap={springPhysics.buttonTap}
              onClick={() => setActiveTab(tabKey)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono transition-all ${
                isActive
                  ? "bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/40 font-semibold"
                  : "text-[#a1a1aa] hover:text-white hover:bg-[#18181c] border border-transparent"
              }`}
            >
              <Play className={`h-2.5 w-2.5 ${isActive ? "text-[#ff5722]" : "text-[#71717a]"}`} />
              <span>
                {tabKey === "status"
                  ? "status --all"
                  : tabKey === "apps"
                  ? "apps --list"
                  : "metrics --telemetry"}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Terminal Viewport Body */}
      <div className="p-4 sm:p-6 bg-[#09090b] min-h-[170px] space-y-3 font-mono text-xs sm:text-[13px] leading-relaxed select-text">
        {/* Active Command Line */}
        <div className="flex items-center gap-2 text-[#ff5722]">
          <span className="text-[#10b981] font-bold">sabrylabs</span>
          <span className="text-[#71717a]">$</span>
          <span className="text-[#fafafa] font-semibold">
            {current.command.replace("sabrylabs $ ", "")}
          </span>
          <span className="inline-block w-2 h-4 bg-[#ff5722] animate-pulse-slow ml-1" />
        </div>

        {/* Output Stream */}
        <div className="space-y-1.5 pt-1">
          {current.lines.map((line, idx) => {
            const isSys = line.startsWith("[SYS]");
            const isLoc = line.startsWith("[LOC]");
            const isDev = line.startsWith("[DEV]");
            const isRnd = line.startsWith("[RND]");

            return (
              <div
                key={idx}
                className="flex items-start tracking-wide text-zinc-300 font-mono"
              >
                <span
                  className={`font-semibold mr-2 shrink-0 ${
                    isSys
                      ? "text-[#10b981]"
                      : isLoc
                      ? "text-[#00b4d8]"
                      : isDev
                      ? "text-[#ff5722]"
                      : isRnd
                      ? "text-[#f59e0b]"
                      : "text-zinc-400"
                  }`}
                >
                  {line.slice(0, 5)}
                </span>
                <span className="text-[#e4e4e7]">{line.slice(5)}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt ready indicator */}
        <div className="pt-2 text-[#71717a] text-[11px] flex items-center justify-between border-t border-[#1f1f23]">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] inline-block animate-ping-slow" />
            <span>SESSION: ISOLATED_CONTAINER // ATELIER_HOST</span>
          </div>
          <span className="text-[#a1a1aa] font-medium hidden sm:inline">UTF-8 â¢ UNIX_LINE_BREAKS</span>
        </div>
      </div>
    </motion.div>
  );
}
