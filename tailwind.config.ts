import type { Config } from "tailwindcss";

/** Cinematic Sentinel palette — mirrors sentinel-frontend design tokens. */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface2) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        hair: "rgb(var(--hair) / <alpha-value>)",
        ink: {
          950: "#0B0C0F",
          900: "#0E1014",
          800: "#111318",
          700: "#191C23",
          600: "#23262e",
          500: "#2c2f38",
        },
        porcelain: "#ECEAE3",
        gold: { DEFAULT: "#E7A03C", deep: "#B97718" },
        graphite: { DEFAULT: "#80848F", dim: "#4A4E58" },
        sentinel: {
          300: "#a5bafc",
          400: "#8193f8",
          500: "#6366f1",
          900: "#312e81",
        },
        trust: { low: "#ef4444", medium: "#f59e0b", high: "#22c55e", elite: "#10b981" },
      },
      fontFamily: {
        "brand-mono": ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "aurora-radial":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(231,160,60,0.18), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
