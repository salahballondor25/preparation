/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette premium — noir profond, anthracite, blanc cassé, accent bleu électrique.
        // Les couleurs "surface" utilisent des variables CSS pour permettre le mode clair/sombre
        // et la personnalisation de l'accent depuis les paramètres.
        ink: {
          950: "#08090c",
          900: "#0b0d12",
          850: "#101319",
          800: "#161a22",
          700: "#1e232d",
          600: "#2a303c",
          500: "#3a414f",
        },
        chalk: {
          50: "#f7f8fa",
          100: "#eceef2",
          200: "#d7dbe3",
          300: "#aab1bf",
          400: "#7b8394",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent) / 0.14)",
        },
        surface: {
          base: "rgb(var(--surface-base) / <alpha-value>)",
          card: "rgb(var(--surface-card) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          line: "rgb(var(--surface-line) / <alpha-value>)",
        },
        content: {
          hi: "rgb(var(--content-hi) / <alpha-value>)",
          mid: "rgb(var(--content-mid) / <alpha-value>)",
          lo: "rgb(var(--content-lo) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(255 255 255 / 0.03) inset, 0 8px 24px -12px rgb(0 0 0 / 0.6)",
        pop: "0 20px 60px -20px rgb(0 0 0 / 0.7)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.4), 0 8px 30px -8px rgb(var(--accent) / 0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out both",
        "scale-in": "scale-in 0.18s ease-out both",
        "pop": "pop 0.3s ease-out",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
