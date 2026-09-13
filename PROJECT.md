# Project: Sabry Labs Production Website & Digital Storefront (sabrylabs.com)

## Architecture
- Framework: Next.js 15.1.7 (App Router), React 19, TypeScript 5, Tailwind CSS 3.4
- Design System: Dark Obsidian (#09090b canvas, #121217 card surface, #1a1a22 elevated panels, #27272a technical borders, #ff5722 electric orange accent, #10b981 mint, #00b4d8 cyan, #f59e0b amber)
- Typography: Space Grotesk (headings, logo), Inter (body, UI), JetBrains Mono (bracketed metadata tags, terminal metrics, code)
- Motion Engine: motion/react with Apple-grade physical springs (buttons: scale 0.96 / stiffness 500 / damping 30; cards: y -3 / stiffness 400 / damping 25; modal sheets: y 16->0 / stiffness 320 / damping 32)
- Audio Engine: Pure mathematical Web Audio API synthesis (40Hz binaural/isochronic gamma pulse, continuous Brownian noise buffer, AnalyserNode frequency bars)
- Interactive Tools: In-browser client-side HTML5 Canvas Spritely Aligner (slicing, chroma key despill, union bounding box anti-jitter alignment, animation loop preview, JSZip client export)
- Content Engine: Local markdown logbook with frontmatter parser (gray-matter), code highlighting, and RSS 2.0 XML route handler (/feed.xml)
- Commerce: Lemon Squeezy overlay script (https://assets.lemonsqueezy.com/lemon.js, lemonsqueezy-button, data-theme="dark")

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Dark Obsidian Palette Tokens | Exact CSS variables & Tailwind color mappings (#09090b, #121217, #1a1a22, #27272a, #ff5722, etc.) | M1 | Brand Survey |
| 2 | Typography Hierarchy | Space Grotesk, Inter, and JetBrains Mono via next/font/google with custom CSS variables | M1 | Brand Survey |
| 3 | Signature Bracket Tags | JetBrains Mono bracketed metadata components ([01] // FLAGSHIP_APP, [LAB ONLINE // SHIPPED: 3 APPS]) | M1 | Brand Survey |
| 4 | Global Navigation Header | Responsive header with studio cube logo, live status ping badge, nav links, and CTA button | M1 | Brand Survey |
| 5 | Global Technical Footer | Studio motto, system latency metadata, route sitemap columns, copyright notice | M1 | Brand Survey |
| 6 | Asset Ingestion Pipeline | Copy 10 4K mockups to public/images/reverie/ and sample spritesheets to public/demo/ | M1 | Reverie & Spritely Survey |
| 7 | Homepage Hero & Terminal | Hero value proposition and live interactive terminal card with simulated system & commit metrics | M2 | Request R2 |
| 8 | Flagship Showcase Card | Spotlight card on homepage with Reverie 4K preview, feature bullets, price, and direct actions | M2 | Request R2 |
| 9 | Filterable Experiments Grid | Interactive grid with filter tabs (All, Desktop Apps, Browser Tools, AI Workflows) and 4 product cards | M2 | Request R2 |
| 10 | Devlog Highlights on Home | Top 3 engineering logbook preview cards linking to full articles | M2 | Request R2 |
| 11 | Founder Manifesto Section | Authentic narrative of Sabry Belal, vibe-coding philosophy, and local-first software ethos | M2 | Request R2 |
| 12 | Software Catalog Route (/apps) | Dedicated catalog page with filter tabs, metadata pills, platform compatibility icons (macOS, Win, Web) | M2 | Request R2 |
| 13 | Mockup Gallery Carousel | 10-view 4K interactive mockup carousel with thumbnail strip, figure captions, and lightbox zoom | M3 | Reverie Survey |
| 14 | Web Audio API Focus Tester | Pure client-side synthesis of 40Hz Gamma isochronic pulse and Brownian noise with volume and frequency visualizer | M3 | Reverie Survey |
| 15 | Swiss Brutalist Feature Matrix | Side-by-side comparison table contrasting generic cloud Pomodoro tools vs Reverie desktop engine | M3 | Reverie Survey |
| 16 | Lifetime Pricing & Download CTA | $19 lifetime pricing card with Lemon Squeezy checkout trigger and free 14-day trial download button | M3 | Reverie Survey |
| 17 | Spritely Drag & Drop Uploader | Upload dropzone for spritesheet images with dragover visual state and 1-click sample spritesheet loader | M4 | Spritely Survey |
| 18 | Slicing Grid Engine | Interactive column/row slicing, cell pixel size mode, and connected components BFS auto-detection | M4 | Spritely Survey |
| 19 | Chroma Key & Pipette | Euclidean RGB distance background removal with tolerance/feather sliders and canvas eyedropper pipette | M4 | Spritely Survey |
| 20 | Anti-Jitter Centering Engine | Union Bounding Box and Centroid alignment over 9-point anchor grid with nearest-neighbor scaling | M4 | Spritely Survey |
| 21 | Morphological Erosion Shaver | Edge halo despill shaver for green screen fringing with width and alpha threshold controls | M4 | Spritely Survey |
| 22 | Animation Playback & Scrubber | Monotonic loop player (1-60 FPS), loop range trim sliders, onion skinning, and timeline frame scrubber | M4 | Spritely Survey |
| 23 | Client-Side Exporters | Zero-server ZIP download of individual frame PNGs (jszip) and stitched composite aligned spritesheet PNG | M4 | Spritely Survey |
| 24 | Logbook Index (/logbook) | Fast engineering blog index with search/category tags, reading time, and article cards | M5 | Request R2 |
| 25 | Article Reader (/logbook/[slug]) | Dynamic markdown renderer with syntax-highlighted code blocks, copy buttons, and dev retrospectives | M5 | Request R2 |
| 26 | Seed Devlog Content | 3 comprehensive starter devlogs (Reverie architecture, AutoCut vibe coding, Spritely anti-jitter math) | M5 | Spritely Survey |
| 27 | License Desk (/license) | Desktop license activation walkthrough, Lemon Squeezy order lookup portal link, hardware policy, FAQs | M5 | Request R2 |
| 28 | RSS 2.0 Feed (/feed.xml) | Next.js Edge Route Handler returning valid RSS 2.0 XML with dynamic channel and items | M5 | Request R2 |
| 29 | Tactile Motion Physics | Standardized motion/react spring physics on all buttons (scale 0.96), cards (y -3), and modal sheets | M6 | Request R3 |
| 30 | Lemon Squeezy Overlay | Global lemon.js integration with data-theme="dark" and lemonsqueezy-button checkout triggers | M6 | Request R4 |
| 31 | Full E2E Test Suite Pass | 100% pass on all requirement-driven test cases across Tiers 1-4 | M6 | E2E Testing Track |
| 32 | Adversarial Coverage Hardening | White-box edge-case and boundary verification with Challenger (Tier 5) | M6 | E2E Testing Track |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Core Foundation & Dark Obsidian Tokens | Install packages, configure tokens, typography, layout, Navbar, Footer, copy assets | none | DONE |
| M2 | Laboratory Homepage & Catalog (/ & /apps) | Hero terminal, Reverie card, experiments grid, manifesto, /apps catalog with filters | M1 | PLANNED |
| M3 | Reverie Showcase Landing Page (/apps/reverie) | 10-view carousel, Web Audio 40Hz/Brown noise tester, feature matrix, $19 pricing card | M1 | PLANNED |
| M4 | Interactive Spritely Aligner Workspace (/tools/spritely) | Drag-drop upload, slice grid, chroma key despill, anti-jitter alignment, animation loop, ZIP/PNG export | M1 | PLANNED |
| M5 | Engineering Logbook, License & RSS (/logbook, /license, /feed.xml) | Markdown blog, syntax highlighting, 3 seed devlogs, license FAQ accordion, RSS 2.0 route | M1 | PLANNED |
| M6 | Final Integration, Commerce & E2E Validation | Spring physics polish, Lemon Squeezy integration, Tier 1-4 E2E test pass, Tier 5 adversarial hardening | M2, M3, M4, M5 | PLANNED |

## Interface Contracts
### Design System & Layout Interface (src/components/layout/)
- Navbar: Props: none. Renders studio logo, live status badge ([● LAB ONLINE // SHIPPED: 3 APPS]), nav links (/apps, /tools/spritely, /logbook, /license), and Get Reverie ($19) button.
- Footer: Props: none. Renders studio motto, latency metadata, sitemap links, and copyright.
- BracketTag: Props: { label: string, variant?: 'orange' | 'mint' | 'cyan' | 'amber' }. Renders monospace bracketed tag.

### Web Audio Synthesis Engine (src/lib/audio-synth.ts)
- FocusAudioSynthesizer:
  - startGamma(volume: number): starts 200Hz carrier modulated with 40Hz isochronic pulse.
  - startBrownNoise(volume: number): starts 6-second seamless Brownian noise buffer loop.
  - stop(): smoothly ramps gain to 0 in 100ms and disconnects nodes.
  - setVolume(volume: number): adjusts master gain node [0.0 - 1.0].
  - getFrequencyData(array: Uint8Array): queries AnalyserNode for frequency bar visualizer.

### Spritely Aligner Core (src/lib/spritely/)
- sliceSheet(image: HTMLImageElement, options: SliceOptions): FrameCanvas[]
- applyChromaKey(canvas: HTMLCanvasElement, keyColor: RGB, tolerance: number, feather: number): HTMLCanvasElement
- alignFrames(frames: FrameCanvas[], options: AlignOptions): AlignedFrame[]
- exportZip(frames: AlignedFrame[], size: number): Promise<Blob>
- exportCompositeSheet(frames: AlignedFrame[], cols: number, size: number): Promise<Blob>

### Content & Markdown Engine (src/lib/posts.ts)
- getAllPosts(): PostMetadata[]
- getPostBySlug(slug: string): Promise<{ metadata: PostMetadata, contentHtml: string }>

## Code Layout
d:/ANTIGRAVITY/sabrylabs/
  public/
    images/
      reverie/              # 10 4K uncompressed mockup screenshots
      logo/                 # Studio brand icons
    demo/                   # walking.png and walking.jpeg sample spritesheets
  src/
    app/
      layout.tsx            # Fonts (Space Grotesk, Inter, JetBrains Mono) + Lemon.js script
      globals.css           # Dark Obsidian tokens, grid patterns, glow utilities
      page.tsx              # Homepage (Terminal, Reverie Spotlight, Experiments, Devlogs, Manifesto)
      apps/
        page.tsx            # Software Catalog with category filters & platform pills
        reverie/
          page.tsx          # Reverie 10-view carousel, Web Audio tester, $19 card
      tools/
        spritely/
          page.tsx          # Client-side interactive Spritely Aligner studio
      logbook/
        page.tsx            # Devlog article catalog
        [slug]/
          page.tsx          # Markdown article reader with syntax highlighting
      license/
        page.tsx            # Desktop license guide, Lemon Squeezy portal link, FAQ
      feed.xml/
        route.ts            # RSS 2.0 XML route handler
    components/
      layout/               # Navbar, Footer
      home/                 # HeroTerminal, FlagshipCard, ExperimentsGrid, ManifestoSection
      reverie/              # MockupCarousel, AudioTester, FeatureMatrix, PricingCard
      spritely/             # SpritelyWorkspace, ControlsSidebar, Viewport, Canvas, Exporters
      ui/                   # BracketTag, Pill, Button, Modal, Accordion
    content/
      logbook/              # Markdown posts (.md)
    lib/
      motion.ts             # Spring physics presets (motion/react)
      audio-synth.ts        # Web Audio API 40Hz & Brownian noise generators
      spritely/             # Pure slicing, chroma, erosion, and alignment algorithms
      posts.ts              # Markdown reader & frontmatter parser
  tests/
    e2e/                    # Opaque-box E2E test suite (Tiers 1-4)
  tailwind.config.ts        # Dark Obsidian colors, fonts, shadows
  package.json