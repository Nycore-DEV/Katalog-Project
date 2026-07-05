import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#0A0E14",
          navy: "#0F1B3D",
          card: "#121A2E",
          border: "#1E2A4A"
        },
        accent: {
          blue: "#2F6BFF",
          blueLight: "#5B8CFF",
          gold: "#E8B84B",
          goldLight: "#F6D976"
        },
        ink: {
          white: "#F5F7FA",
          muted: "#8C97B8",
          faint: "#5C6785"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(160deg, #0A0E14 0%, #0F1B3D 55%, #14224A 100%)",
        "blue-gradient": "linear-gradient(135deg, #2F6BFF 0%, #5B8CFF 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8B84B 0%, #F6D976 100%)",
        "card-sheen": "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)"
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(0,0,0,0.5)",
        "card-hover": "0 16px 32px -12px rgba(47,107,255,0.35)",
        "gold-glow": "0 8px 24px -10px rgba(232,184,75,0.45)",
        nav: "0 -8px 24px -12px rgba(0,0,0,0.6)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
