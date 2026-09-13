export const springPhysics = {
  // Snappy button taps
  buttonTap: {
    scale: 0.96,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  // Card hover elevation
  cardHover: {
    y: -3,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  // Modal / drawer spring entry
  sheetTransition: {
    initial: { y: 16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 16, opacity: 0 },
    transition: { type: "spring", stiffness: 320, damping: 32 },
  },
  // Fade in with subtle scale
  fadeInScale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  // Standard spring presets
  springBouncy: { type: "spring", stiffness: 500, damping: 25 },
  springSmooth: { type: "spring", stiffness: 400, damping: 30 },
  springStiff: { type: "spring", stiffness: 600, damping: 35 },
} as const;
