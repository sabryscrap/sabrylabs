export type FeatureStatus = "under-review" | "planned" | "in-progress" | "shipped";

export type FeatureCategory = 
  | "acoustics"
  | "dial-ux"
  | "presets"
  | "desktop"
  | "analytics"
  | "integrations";

export interface FeatureIdea {
  id: string;
  title: string;
  description: string;
  category: FeatureCategory;
  status: FeatureStatus;
  votes: number;
  milestone?: string;
  author: string;
  createdAt: string;
  isOfficial?: boolean;
}

export const CATEGORY_CONFIG: Record<FeatureCategory, { label: string; code: string; color: string }> = {
  acoustics: { label: "Acoustics & Sound", code: "ACOUSTIC", color: "#ff4400" },
  "dial-ux": { label: "Dial & Timer UX", code: "DIAL_UX", color: "#00b4d8" },
  presets: { label: "Workflows & Presets", code: "PRESETS", color: "#f59e0b" },
  desktop: { label: "Desktop & System", code: "DESKTOP", color: "#10b981" },
  analytics: { label: "Deep Work Analytics", code: "ANALYTICS", color: "#8b5cf6" },
  integrations: { label: "Local Integrations", code: "INTEGRATE", color: "#ec4899" },
};

export const STATUS_CONFIG: Record<FeatureStatus, { label: string; tag: string; badgeClass: string }> = {
  "under-review": {
    label: "Under Consideration",
    tag: "[01] UNDER_REVIEW",
    badgeClass: "bg-zinc-100 text-zinc-800 border-zinc-400",
  },
  planned: {
    label: "Planned for Next Sprint",
    tag: "[02] PLANNED",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-500",
  },
  "in-progress": {
    label: "Currently in Engineering",
    tag: "[03] IN_PROGRESS",
    badgeClass: "bg-cyan-100 text-cyan-900 border-cyan-500",
  },
  shipped: {
    label: "Shipped in v1.x",
    tag: "[04] SHIPPED",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-500",
  },
};

export const INITIAL_FEATURE_IDEAS: FeatureIdea[] = [
  {
    id: "feat-obsidian-vault-logger",
    title: "Obsidian & Logseq Markdown Vault Focus Logger",
    description: "Automatically append completed focus intervals, tasks worked on, and distraction notes to daily markdown notes in your local Obsidian or Logseq vault with zero cloud sync.",
    category: "integrations",
    status: "in-progress",
    votes: 142,
    milestone: "v1.1",
    author: "@sabrybelal",
    createdAt: "2026-08-20",
    isOfficial: true,
  },
  {
    id: "feat-global-hotkey-dump",
    title: "Global Hotkey Distraction Dump (Ctrl+Shift+D)",
    description: "Summon the Distraction Dump Pad anywhere on your desktop via global keyboard shortcut without losing current editor or terminal cursor focus.",
    category: "desktop",
    status: "in-progress",
    votes: 118,
    milestone: "v1.1",
    author: "@community",
    createdAt: "2026-08-22",
    isOfficial: true,
  },
  {
    id: "feat-wayland-linux-capsule",
    title: "Wayland & Hyprland Native Taskbar Mini-Widget Support",
    description: "Provide native layer-shell integration so the taskbar-docked mini-widget capsule docks cleanly on Wayland compositors (Hyprland, Sway, GNOME 47) on Linux.",
    category: "desktop",
    status: "planned",
    votes: 94,
    milestone: "v1.2",
    author: "@community",
    createdAt: "2026-08-25",
    isOfficial: true,
  },
  {
    id: "feat-mechanical-click-acoustics",
    title: "Mechanical Stepping Click Audio Pack (Braun / Dieter Rams)",
    description: "Tactile acoustic feedback synthesizing high-density tactile detent clicks when scrubbing the vector clock dial, inspired by vintage Braun mechanical timers.",
    category: "acoustics",
    status: "planned",
    votes: 86,
    milestone: "v1.2",
    author: "@community",
    createdAt: "2026-08-28",
    isOfficial: true,
  },
  {
    id: "feat-spotify-auto-pause",
    title: "Spotify & Apple Music Local Session Sync",
    description: "Automatically pause active music playback when a Pomodoro focus sprint ends, and resume your ambient track when the next work sprint begins.",
    category: "integrations",
    status: "under-review",
    votes: 73,
    author: "@community",
    createdAt: "2026-09-01",
    isOfficial: true,
  },
  {
    id: "feat-multi-display-pinning",
    title: "Multi-Monitor Sticky Taskbar Widget Pinning",
    description: "Allow selecting which specific monitor display the mini-widget docks to, or let it follow the active foreground window across multi-screen setups.",
    category: "desktop",
    status: "under-review",
    votes: 61,
    author: "@community",
    createdAt: "2026-09-03",
    isOfficial: true,
  },
  {
    id: "feat-csv-interval-batch-importer",
    title: "Custom CSV Interval Sequence Batch Importer",
    description: "Import complex custom training sequences, HIIT workflows, or client billing intervals directly from spreadsheet CSV files into the Preset Manager.",
    category: "presets",
    status: "under-review",
    votes: 49,
    author: "@community",
    createdAt: "2026-09-05",
    isOfficial: true,
  },
  {
    id: "feat-home-assistant-webhook",
    title: "Local Home Assistant Focus Mode Webhook",
    description: "Fire a local HTTP webhook on session start and finish to dim desk lamps, mute smart speakers, and turn on external 'Do Not Disturb' indicator lights.",
    category: "integrations",
    status: "under-review",
    votes: 45,
    author: "@community",
    createdAt: "2026-09-07",
    isOfficial: true,
  },
  {
    id: "feat-brutalist-palette-editor",
    title: "Full Monospace Brutalist Theme Customizer (HEX Palette Editor)",
    description: "Customize all primary dial accents, work/rest tracks, and card borders with custom RGB/HEX color inputs while preserving the harsh CNC 90-degree aesthetic.",
    category: "dial-ux",
    status: "in-progress",
    votes: 112,
    milestone: "v1.1",
    author: "@sabrybelal",
    createdAt: "2026-08-15",
    isOfficial: true,
  },
  {
    id: "feat-shipped-gamma-engine",
    title: "40Hz Gamma & Brown Noise Dual Psychoacoustic Engine",
    description: "Synthesized in-memory binaural and isochronic frequency soundscapes to drown out office reverberation without relying on external streaming audio.",
    category: "acoustics",
    status: "shipped",
    votes: 215,
    milestone: "v1.0",
    author: "@sabrybelal",
    createdAt: "2026-07-10",
    isOfficial: true,
  },
  {
    id: "feat-shipped-shutdown-ritual",
    title: "Workday Shutdown Ritual & Intentional Disengage Protocol",
    description: "An evening audit ritual prompting you to review completed deep work, log tomorrow's top 3 priority tasks, and quit the app completely to eliminate bedtime work anxiety.",
    category: "dial-ux",
    status: "shipped",
    votes: 189,
    milestone: "v1.0",
    author: "@sabrybelal",
    createdAt: "2026-07-20",
    isOfficial: true,
  },
  {
    id: "feat-shipped-consistency-matrix",
    title: "16-Week Consistency Matrix & Printable PDF Report",
    description: "GitHub-style deep work consistency heatmap with Monday alignments, peak focus hours, and 1-click printable PDF generation via native browser print.",
    category: "analytics",
    status: "shipped",
    votes: 174,
    milestone: "v1.0",
    author: "@sabrybelal",
    createdAt: "2026-07-25",
    isOfficial: true,
  },
];
