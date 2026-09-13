"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

export interface MockupScene {
  id: number;
  figure: string;
  title: string;
  tag: string;
  category: string;
  description: string;
  src: string;
  alt: string;
}

export const REVERIE_MOCKUP_SCENES: MockupScene[] = [
  {
    id: 1,
    figure: "FIG 01 // SWISS INDUSTRIAL LIGHT SPECIFICATION",
    title: "Swiss Industrial Light // Dieter Rams Edition",
    tag: "SWISS LIGHT",
    category: "High-Contrast Monochrome Specification",
    description:
      "Pure neo-brutalist industrial aesthetic inspired by Dieter Rams' Braun functionalism. Features stark 2px solid black borders, 3px hard offset shadows, Swiss International Orange accents, and clean chronometric discipline.",
    src: "/images/clean_listing/01_hero_swiss_light_clean.png",
    alt: "Reverie Pomodoro Swiss Industrial Light Edition with Dieter Rams neo-brutalist styling",
  },
  {
    id: 2,
    figure: "FIG 02 // 30-MIN CONTINUOUS VECTOR DIAL",
    title: "Vector Countdown Dial & Step Architecture",
    tag: "ARC GEOMETRY",
    category: "Sub-Pixel Countdown Geometry",
    description:
      "Antialiased SVG circular countdown dial calibrated with magnetic 5-minute detents. Displays session step progress (1/3), active focus lock, and tactile dial scrubbing up to 180 minutes.",
    src: "/images/clean_listing/02_timer_dial_30m_clean.png",
    alt: "Reverie Pomodoro 30-Minute Dial with clean step counter and task lock",
  },
  {
    id: 3,
    figure: "FIG 03 // ACTIVE WORK SESSION // REAL-TIME DISCIPLINE",
    title: "Active Focus Session & Flow State",
    tag: "FLOW STATE",
    category: "Tactile Countdown Engine",
    description:
      "Active Pomodoro work session ticking down in real time. Dynamic color coordination, active interval indicator, zero eye fatigue, and soft overtime flow extension when reaching 00:00.",
    src: "/images/clean_listing/03_timer_active_running_clean.jpg",
    alt: "Reverie Pomodoro Active Running Timer Session in Swiss Industrial theme",
  },
  {
    id: 4,
    figure: "FIG 04 // PRESET SEQUENCE EDITOR // CALIBRATION",
    title: "Fast Interval Calibration & Sequencing",
    tag: "INTERVAL EDITOR",
    category: "Custom Interval Sequencing",
    description:
      "Configure custom interval cycles with drag handles, quick duplication, and custom work/rest durations. Seamlessly switch presets mid-workflow with zero loss of daily focus statistics.",
    src: "/images/clean_listing/04_preset_editor_0m36s_clean.jpg",
    alt: "Reverie Pomodoro Preset Interval Sequence Editor showing quick time calibration",
  },
  {
    id: 5,
    figure: "FIG 05 // WORKFLOW SEQUENCE & PRESET MANAGER",
    title: "Expansive 2-Column Preset Architecture",
    tag: "WORKFLOW SUITE",
    category: "Drag-and-Drop Interval Builder",
    description:
      "Comprehensive interval sequence manager. Reorder presets with drag-and-drop handles, duplicate workflows in 1 click, and customize work/rest intervals with atomic JSON persistence.",
    src: "/images/clean_listing/05_preset_editor_full_clean.jpg",
    alt: "Reverie Pomodoro Full Preset & Sequence Configuration Manager",
  },
  {
    id: 6,
    figure: "FIG 06 // PSYCHOACOUSTIC SOUND ENGINE",
    title: "Ambient Focus Sound Generator & Custom Audio",
    tag: "ACOUSTIC SUITE",
    category: "Mathematical Sound Synthesis",
    description:
      "Integrated 40Hz Gamma binaural pulses, deep Brownian noise, and natural rain/ocean soundscapes. Custom audio track import with persistent base64 storage and dedicated multi-channel volume mixers.",
    src: "/images/clean_listing/06_ambient_sounds_1m05s_clean.jpg",
    alt: "Reverie Pomodoro Ambient Sound Card and acoustic controls",
  },
  {
    id: 7,
    figure: "FIG 07 // TACTICAL OLED PURE BLACK",
    title: "Tactical OLED Dark // Nocturnal Edition",
    tag: "TACTICAL OLED",
    category: "High-Voltage Nocturnal Theme",
    description:
      "Zero-emission pitch black chassis engineered for midnight deep work sessions. High-contrast Swiss orange vector arc with zero eye strain, minimal battery draw, and surgical legibility.",
    src: "/images/clean_listing/07_oled_pure_black_clean.jpg",
    alt: "Reverie Pomodoro Tactical OLED Pure Black Theme",
  },
  {
    id: 8,
    figure: "FIG 08 // 365-DAY AUDIT MATRIX & MASTERY LEVELING",
    title: "Deep Work Analytics & Consistency Heatmap",
    tag: "BEHAVIORAL AUDIT",
    category: "Offline Retention & Mastery Ranks",
    description:
      "Full-card GitHub-style consistency matrix dynamically scaling to 100% width. Tracks focus prime time, day-of-week distribution, 6 RPG mastery leveling ranks, and 1-click RFC-4180 CSV export.",
    src: "/images/clean_listing/08_stats_dashboard_clean.jpg",
    alt: "Reverie Pomodoro Deep Work Analytics Dashboard and consistency matrix",
  },
  {
    id: 9,
    figure: "FIG 09 // WORKDAY SHUTDOWN & DISENGAGEMENT RITUAL",
    title: "Cognitive Disengagement & Priority Locking",
    tag: "SHUTDOWN RITUAL",
    category: "Deliberate Cognitive Boundary",
    description:
      "End-of-day shutdown modal that prompts you to record tomorrow's top 3 priorities, acknowledge your focus achievements, and cleanly disengage from work to protect mental rest.",
    src: "/images/clean_listing/09_shutdown_ritual_2m12s_clean.jpg",
    alt: "Reverie Pomodoro Workday Shutdown Ritual and priority locking modal",
  },
];

export default function MockupCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  const activeScene = REVERIE_MOCKUP_SCENES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % REVERIE_MOCKUP_SCENES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + REVERIE_MOCKUP_SCENES.length) % REVERIE_MOCKUP_SCENES.length
    );
  }, []);

  const handleSelect = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(REVERIE_MOCKUP_SCENES.length - 1, index)));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") setIsLightboxOpen(false);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        return;
      }

      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeThumb = thumbnailStripRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

  return (
    <section className="relative w-full py-8" id="gallery" aria-label="Reverie Showcase Gallery">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="badge-brutal text-[#ff4400]">
              FIG 01-09 // PRODUCT GALLERY
            </span>
            <span className="font-mono text-xs font-bold text-zinc-600 tabular-nums">
              SCENE {String(currentIndex + 1).padStart(2, "0")} / {REVERIE_MOCKUP_SCENES.length}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-black font-space">
            Real Application Showcase &amp; Views
          </h2>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous scene"
            className="btn-brutal-secondary p-2 flex items-center justify-center text-black"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next scene"
            className="btn-brutal-secondary p-2 flex items-center justify-center text-black"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Main Presentation Stage */}
      <div className="relative w-full card-brutal p-4 sm:p-6 overflow-hidden">
        {/* Drafting Crosshairs */}
        <span className="absolute top-1.5 left-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute top-1.5 right-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>
        <span className="absolute bottom-1.5 right-1.5 font-mono text-[10px] text-zinc-400 select-none pointer-events-none leading-none z-10">+</span>

        {/* Stage Header Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-xs font-bold text-[#ff4400] tracking-wider">
              {activeScene.figure}
            </span>
            <span className="text-black hidden sm:inline">•</span>
            <span className="text-xs font-mono font-bold text-black bg-[#f4f4ee] px-2.5 py-0.5 border border-black rounded-[2px]">
              {activeScene.category}
            </span>
          </div>

          <button
            onClick={() => {
              setZoomLevel(1);
              setIsLightboxOpen(true);
            }}
            className="btn-brutal-secondary inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-black"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#ff4400]" strokeWidth={2.2} />
            <span>Inspect 4K</span>
          </button>
        </div>

        {/* Viewport Image Area */}
        <div
          className="relative mt-4 aspect-[16/9] w-full border-2 border-black bg-[#e9e9e4] group cursor-pointer overflow-hidden shadow-brutal-sm"
          onClick={() => {
            setZoomLevel(1);
            setIsLightboxOpen(true);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeScene.src}
                alt={activeScene.alt}
                fill
                priority={activeScene.id === 1}
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1200px"
                className="object-contain w-full h-full select-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* On-Image Back & Next Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image (Back)"
            title="Previous Image (Back)"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-2 bg-white/95 hover:bg-[#ff4400] text-black hover:text-white border-2 border-black rounded-[3px] shadow-brutal-sm hover:shadow-brutal transition-all duration-100 font-mono text-xs font-black uppercase tracking-wider group/btn cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-0.5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image (Next)"
            title="Next Image (Next)"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-2 bg-white/95 hover:bg-[#ff4400] text-black hover:text-white border-2 border-black rounded-[3px] shadow-brutal-sm hover:shadow-brutal transition-all duration-100 font-mono text-xs font-black uppercase tracking-wider group/btn cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" strokeWidth={2.5} />
          </button>

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-white border-2 border-black shadow-brutal-sm px-3 py-1.5 font-mono text-xs font-bold text-black flex items-center gap-1.5 select-none">
            <Maximize2 className="w-3.5 h-3.5 text-[#ff4400]" />
            <span>Click to Enlarge</span>
          </div>
        </div>

        {/* Caption & Description */}
        <div className="mt-5 pt-4 border-t-2 border-black grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-1">
            <h3 className="text-lg font-black text-black font-sans">{activeScene.title}</h3>
            <div className="mt-1">
              <span className="badge-brutal text-black bg-[#f4f4ee]">
                {activeScene.tag}
              </span>
            </div>
          </div>
          <p className="md:col-span-2 text-sm text-zinc-700 leading-relaxed font-normal">
            {activeScene.description}
          </p>
        </div>

        {/* 10-View Thumbnail Strip */}
        <div className="mt-6 pt-5 border-t-2 border-black">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-[11px] font-bold text-black tracking-wider uppercase">
              Thumbnail Strip // 9 Uncompressed Scenes
            </span>
            <span className="font-mono text-[11px] text-zinc-500 font-bold">
              Click to view scene
            </span>
          </div>

          <div
            ref={thumbnailStripRef}
            className="flex items-center gap-3 overflow-x-auto pb-3 pt-1"
          >
            {REVERIE_MOCKUP_SCENES.map((scene, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSelect(idx)}
                  className={`relative flex-shrink-0 w-[120px] sm:w-[140px] aspect-[16/9] overflow-hidden border-2 rounded-[3px] transition-all duration-100 bg-[#e9e9e4] ${
                    isActive
                      ? "border-[#ff4400] ring-2 ring-[#ff4400] shadow-brutal translate-y-[-2px]"
                      : "border-black opacity-70 hover:opacity-100 hover:border-black"
                  }`}
                  aria-label={`Switch to ${scene.figure}`}
                >
                  <Image
                    src={scene.src}
                    alt={scene.title}
                    width={140}
                    height={79}
                    className="object-cover w-full h-full select-none"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/85 p-1 flex items-center justify-between">
                    <span
                      className={`font-mono text-[9px] font-bold ${
                        isActive ? "text-[#ff4400]" : "text-zinc-200"
                      }`}
                    >
                      FIG {String(idx + 1).padStart(2, "0")}
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff4400]"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-[95vw] w-full border-2 border-black bg-white p-4 shadow-brutal-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-black text-black">
              <div className="font-mono text-xs font-bold">
                {activeScene.figure}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="btn-brutal-secondary p-1.5"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="btn-brutal-secondary p-1.5"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="btn-brutal-secondary p-1.5"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="btn-brutal-primary p-1.5"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative mt-3 flex-1 min-h-[60vh] max-h-[75vh] w-full overflow-auto bg-[#e9e9e4] border-2 border-black flex items-center justify-center">
              <div
                style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.15s ease-out" }}
                className="relative w-full h-full min-h-[500px]"
              >
                <Image
                  src={activeScene.src}
                  alt={activeScene.alt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Lightbox Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image (Back)"
                title="Previous Image (Back)"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-[#ff4400] text-black hover:text-white border-2 border-black rounded-[3px] shadow-brutal hover:shadow-brutal-lg transition-all font-mono text-xs font-black uppercase tracking-wider group/btn cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" strokeWidth={2.5} />
                <span className="hidden sm:inline">Back</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image (Next)"
                title="Next Image (Next)"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-[#ff4400] text-black hover:text-white border-2 border-black rounded-[3px] shadow-brutal hover:shadow-brutal-lg transition-all font-mono text-xs font-black uppercase tracking-wider group/btn cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
