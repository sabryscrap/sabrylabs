import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          base: "#09090b",
          card: "#121217",
          panel: "#1a1a22",
          secondary: "#18181c",
        },
        border: {
          technical: "#27272a",
          subtle: "#1f1f23",
          active: "#3f3f46",
        },
        accent: {
          orange: "#ff5722",
          mint: "#10b981",
          cyan: "#00b4d8",
          amber: "#f59e0b",
        },
        content: {
          main: "#fafafa",
          heading: "#ffffff",
          muted: "#a1a1aa",
          caption: "#71717a",
        },
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 2px 6px -1px rgba(0, 0, 0, 0.4)",
        elevated: "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
        "glow-orange": "0 0 24px rgba(255, 87, 34, 0.4)",
        "glow-btn": "0 0 16px rgba(255, 87, 34, 0.35)",
        "glow-mint": "0 0 20px rgba(16, 185, 129, 0.3)",
        "glow-cyan": "0 0 20px rgba(0, 180, 216, 0.3)",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
