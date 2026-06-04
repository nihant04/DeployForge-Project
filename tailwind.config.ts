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
        background: "#030712", // Very deep blue-black (slate-950)
        foreground: "#f8fafc", // slate-50
        "navy-deep": "#070b19",
        "navy-dark": "#0d1527",
        "navy-medium": "#15223f",
        "brand-blue": "#3b82f6",
        "brand-cyan": "#06b6d4",
        "brand-violet": "#8b5cf6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-glow": "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "spin-slow": "spin 12s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", filter: "drop-shadow(0 0 5px rgba(59,130,246,0.3))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(59,130,246,0.6))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
