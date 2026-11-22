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
        cream: "#FBF7F1",
        sand: "#F1E7D9",
        oat: "#E6D7C3",
        clay: "#C05F3C",
        "clay-dark": "#9C4A2C",
        ink: "#2A211A",
        muted: "#6E6156",
        sage: "#7C8A6D",
        "sage-light": "#E9EDE3",
        honey: "#D9A441",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 30px 80px -30px rgba(42, 33, 26, 0.35)",
        card: "0 14px 40px -20px rgba(42, 33, 26, 0.22)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-8px) translateX(6px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 11s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
