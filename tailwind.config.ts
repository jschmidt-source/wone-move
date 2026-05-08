// Wone MOVE — Tailwind config
// Note: Tailwind v4 uses CSS-based configuration (globals.css @theme).
// This file documents the brand token mapping for tooling and type reference.
// Active brand tokens are wired in src/app/globals.css.

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f7f7",
        foreground: "#1c2642",
        primary: {
          DEFAULT: "#646efb",
          foreground: "#ffffff",
          light: "#d2d5fc",
        },
        muted: {
          DEFAULT: "#f6f7f7",
          foreground: "#5b6377",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#d2d5fc",
        input: "#d2d5fc",
        ring: "#646efb",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1c2642",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
