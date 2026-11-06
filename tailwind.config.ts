import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        // Base deep-navy family aligned to innovationdecoded.com (#141430 / #1d1d3f / #2f2f5c)
        navy: {
          DEFAULT: "#1d1d3f",
          50: "#e8e8f1",
          100: "#c6c6dc",
          200: "#9d9dc0",
          300: "#6d6da0",
          400: "#45457a",
          500: "#2f2f5c",
          600: "#26264f",
          700: "#1d1d3f",
          800: "#191938",
          900: "#141430",
          950: "#0d0d22",
        },
        plum: {
          DEFAULT: "#8b2fb0",
          50: "#f7ecfb",
          100: "#edd2f5",
          200: "#dda6ec",
          300: "#c977df",
          400: "#b44ccf",
          500: "#8b2fb0",
          600: "#6f2490",
          700: "#561b70",
          800: "#3d1351",
          900: "#280d36",
        },
        // Accent purple aligned to reference #9d4ccd (with #8a3dba as the deeper accent)
        purple: {
          DEFAULT: "#9d4ccd",
          50: "#f6edfb",
          100: "#e9d2f3",
          200: "#d9b8f0",
          300: "#c99bf0",
          400: "#b06ad9",
          500: "#9d4ccd",
          600: "#8a3dba",
          700: "#694078",
          800: "#4f2d5a",
          900: "#331d3c",
        },
        // Accent blue aligned to reference #3876ff (deep #2453c7)
        azure: {
          DEFAULT: "#3876ff",
          50: "#eaf1ff",
          100: "#cfdeff",
          200: "#a6c0ff",
          300: "#6f98ff",
          400: "#4f87f8",
          500: "#3876ff",
          600: "#2453c7",
          700: "#1c3f99",
          800: "#162f70",
          900: "#112150",
        },
        // Accent turquoise aligned to reference #07c2c9 / #8ff0f3
        turquoise: {
          DEFAULT: "#07c2c9",
          50: "#e4fbfc",
          100: "#bdf4f6",
          200: "#8ff0f3",
          300: "#52e0e5",
          400: "#22cfd5",
          500: "#07c2c9",
          600: "#0699a0",
          700: "#07757a",
          800: "#0a585c",
          900: "#0b3d40",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(157, 76, 205, 0.55)",
        "glow-sm": "0 0 20px -6px rgba(157, 76, 205, 0.45)",
        "glow-turquoise": "0 0 40px -8px rgba(7, 194, 201, 0.5)",
        "glow-azure": "0 0 44px -6px rgba(56, 118, 255, 0.5)",
        "glow-plum": "0 0 48px -8px rgba(138, 61, 186, 0.55)",
      },
      backgroundImage: {
        // Aligned to innovationdecoded.com accent trio (purple #9d4ccd, turquoise #07c2c9, blue #3876ff)
        "gradient-brand":
          "linear-gradient(120deg, #3876ff 0%, #9d4ccd 45%, #8a3dba 70%, #07c2c9 100%)",
        // Reference hero base: deep radial navy
        "gradient-hero-navy":
          "radial-gradient(at 50% 42%, #2f2f5c 0%, #1d1d3f 55%, #141430 100%)",
        // Colour-wash accents layered over the base (matches the reference's offset glow blobs)
        "gradient-hero":
          "radial-gradient(40% 50% at 75% 45%, rgba(157,76,205,0.55), transparent 70%), radial-gradient(30% 40% at 85% 70%, rgba(7,194,201,0.35), transparent 70%), radial-gradient(35% 45% at 15% 20%, rgba(56,118,255,0.25), transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        // Reference signature: a cream diagonal sheen sweeping across a surface
        "sheen-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        shimmer: "shimmer 8s ease infinite",
        "sheen-sweep": "sheen-sweep 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
