import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#173F35",
          dark: "#0F2B24",
          light: "#2A5A4C",
        },
        ivory: {
          DEFAULT: "#F7F3EA",
          dark: "#EFE9DB",
        },
        sand: {
          DEFAULT: "#E7DDCC",
          dark: "#D9CDB6",
        },
        burgundy: {
          DEFAULT: "#722F37",
          dark: "#5A242B",
        },
        ink: {
          DEFAULT: "#171A18",
          soft: "#3E4541",
        },
        moss: {
          DEFAULT: "#879B8F",
          light: "#A8B8AE",
          faint: "#D6DFD9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        soft: "14px",
      },
      boxShadow: {
        card: "0 2px 12px -2px rgba(23, 26, 24, 0.08)",
        lift: "0 10px 28px -8px rgba(23, 26, 24, 0.16)",
        soft: "0 1px 4px rgba(23, 26, 24, 0.05)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
