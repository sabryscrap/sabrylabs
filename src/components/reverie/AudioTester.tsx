"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Square,
  Volume2,
  VolumeX,
  Radio,
  Waves,
  CloudRain,
  Zap,
  Activity,
  Info,
} from "lucide-react";
import { FocusAudioSynthesizer, FocusSoundMode } from "@/lib/audio-synth";

interface SoundPreset {
  id: FocusSoundMode;
  name: string;
  badge: string;
  description: string;
  icon: React.ElementType;
}

const SOUND_PRESETS: SoundPreset[] = [
  {
    id: "gamma_40hz",
    name: "40Hz Gamma Focus Tone",
    badge: "ISOCHRONIC PULSE",
    description:
      "Pure 200Hz carrier wave amplitude-modulated by a 40Hz isochronic pulse. Entrains frontal gamma rhythms for working memory binding and laser focus.",
    icon: Radio,
  },
  {
    id: "brown_noise",
    name: "Deep Brownian Noise",
    badge: "1/f² SPECTRUM",
    description:
      "Continuous Brownian noise generated in memory via leaky integrator math. Deep 6 dB/octave roll-off masks speech and background chatter without mental fatigue.",
    icon: Waves,
  },
  {
    id: "rain",
    name: "Acoustic Rain Texture",
    badge: "CALMING MASK",
    description:
      "Soothing multi-layered acoustic rain texture with Poisson droplet dynamics and gentle low-pass warmth for restorative flow state.",
    icon: CloudRain,
  },
  {
    id: "hybrid",
    name: "Hybrid Focus Matrix",
    badge: "GAMMA + NOISE",
    description:
      "Simultaneous 40Hz isochronic rhythmic pulse layered over a Brownian soundscape for impenetrable distraction shielding.",
    icon: Zap,
  },
];

export default function AudioTester() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<FocusSoundMode>("gamma_40hz");
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const synthRef = useRef<FocusAudioSynthesizer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    synthRef.current = new FocusAudioSynthesizer();
    return () => {
      if (synthRef.current) {
        synthRef.current.destroy();
        synthRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!synthRef.current) return;
    if (isPlaying) {
      await synthRef.current.stop();
      setIsPlaying(false);
    } else {
      await synthRef.current.start(activeMode, isMuted ? 0 : volume);
      setIsPlaying(true);
    }
  };

  const handleModeSwitch = async (mode: FocusSoundMode) => {
    setActiveMode(mode);
    if (synthRef.current && isPlaying) {
      await synthRef.current.switchMode(mode);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
    if (synthRef.current) {
      synthRef.current.setVolume(isMuted ? 0 : newVol);
    }
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (synthRef.current) {
      synthRef.current.setVolume(nextMuted ? 0 : volume);
    }
  };

  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const synth = synthRef.current;
    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      if (synth && isPlaying) {
        const bufferLength = 64;
        const dataArray = new Uint8Array(bufferLength);
        synth.getFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height;

          ctx.fillStyle = activeMode === "gamma_40hz" ? "#ff4400" : "#00a854";
          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

          x += barWidth;
          if (x > width) break;
        }
      } else {
        ctx.strokeStyle = "#27272a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
  }, [activeMode, isPlaying]);

  useEffect(() => {
    drawVisualizer();
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [drawVisualizer]);

  return (
    <section className="relative w-full py-8" id="audio" aria-label="Psychoacoustic Audio Station">
      <div className="relative card-brutal p-6 sm:p-8 bg-white">
        {/* Drafting Crosshairs */}
        <span className="absolute top-1.5 left-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute top-1.5 right-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute bottom-1.5 right-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="badge-brutal text-[#ff4400]">
                ACOUSTIC_RUNNER // PSYCHOACOUSTIC ENGINE
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-black">
                <Activity className="w-3.5 h-3.5 text-[#00a854]" strokeWidth={2.2} />
                <span>REAL-TIME SYNTHESIS</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-black font-space">
              Test 40Hz Gamma &amp; Brownian Masking in Browser
            </h2>
            <p className="mt-1 text-sm text-zinc-600 font-normal">
              Pure mathematical Web Audio API synthesis running locally on your sound card. Zero audio streaming.
            </p>
          </div>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Stop audio" : "Play focus audio"}
            className={`btn-brutal-primary inline-flex items-center gap-2.5 px-6 py-3 font-mono text-xs uppercase tracking-wider ${
              isPlaying ? "!bg-black text-white" : ""
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current text-[#ff4400]" strokeWidth={2.2} />
                <span>STOP SYNTHESIZER</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" strokeWidth={2.2} />
                <span>START FOCUS AUDIO</span>
              </>
            )}
          </button>
        </div>

        {/* Live Spectrum Canvas */}
        <div className="mt-6 p-4 border-2 border-black bg-black rounded-[3px] shadow-brutal-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-white tabular-nums">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? "bg-[#00a854] animate-ping" : "bg-zinc-600"
                }`}
              />
              <span>
                SPECTRUM ANALYSER // {isPlaying ? "ACTIVE (60 FPS SYNTHESIS)" : "IDLE (PRESS START)"}
              </span>
            </div>
            <span className="text-zinc-400">64-POINT FFT • 0.8 SMOOTHING</span>
          </div>

          <canvas
            ref={canvasRef}
            width={640}
            height={90}
            className="w-full h-[90px] bg-black select-none rounded-[2px]"
          />
        </div>

        {/* Presets Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SOUND_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = activeMode === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleModeSwitch(preset.id)}
                className={`p-4 border-2 border-black rounded-[3px] text-left transition-all duration-100 ${
                  isSelected
                    ? "bg-[#ff4400] text-white shadow-brutal translate-x-[-1px] translate-y-[-1px]"
                    : "bg-[#f4f4ee] text-black hover:bg-white shadow-brutal-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 border border-black rounded-[2px] ${isSelected ? "bg-white text-black" : "bg-black text-white"}`}>
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <span className={`font-mono text-[9px] font-bold border border-black rounded-[2px] px-1.5 py-0.5 ${isSelected ? "bg-black text-white" : "bg-white text-black"}`}>
                    {preset.badge}
                  </span>
                </div>

                <div className="text-sm font-black font-space tracking-tight">{preset.name}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isSelected ? "text-white/90" : "text-zinc-600"}`}>
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Volume & Notice */}
        <div className="mt-6 pt-5 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-72">
            <button
              onClick={handleMuteToggle}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="btn-brutal-secondary p-2 flex items-center justify-center"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-[#ff4400]" strokeWidth={2.2} />
              ) : (
                <Volume2 className="w-4 h-4 text-black" strokeWidth={2.2} />
              )}
            </button>

            <div className="flex-1 flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="Master synthesizer volume"
                className="w-full h-2 bg-zinc-300 rounded appearance-none cursor-pointer accent-[#ff4400]"
              />
              <span className="font-mono text-xs font-bold text-black w-10 text-right tabular-nums">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-zinc-600 tabular-nums">
            <Info className="w-3.5 h-3.5 text-black" strokeWidth={2.2} />
            <span>CAD SPEC: 40.00Hz ±0.01Hz • 0.1s POP-FREE GAIN RAMP • ZERO DC OFFSET</span>
          </div>
        </div>

        {/* Cognitive Science Note */}
        <div className="relative mt-6 p-4 border-2 border-black bg-[#f4f4ee] rounded-[3px] flex items-start gap-3 text-xs text-black leading-relaxed">
          <div className="p-1 border border-black bg-[#ff4400] text-white rounded-[2px] shrink-0 mt-0.5">
            <Radio className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <div>
            <strong className="block font-space font-bold text-black mb-0.5 tracking-tight">
              Why 40Hz Gamma &amp; Brownian Masking Work
            </strong>
            Gamma oscillations (centered at 40 Hz) correspond to peak cognitive synchronization across frontal and parietal working memory networks. Amplitude-modulating a gentle carrier tone at 40 Hz recruits auditory steady-state evoked potentials (ASSEP) that sustain attentional momentum, while Brownian noise ($1/f^2$) fills distracting acoustic voids without the neurological fatigue associated with harsh white noise.
          </div>
        </div>
      </div>
    </section>
  );
}
