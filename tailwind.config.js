/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        inkSoft: "rgb(var(--color-ink-soft) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        paperDeep: "rgb(var(--color-paper-deep) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentDark: "rgb(var(--color-accent-dark) / <alpha-value>)",
        steel: "rgb(var(--color-steel) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Archivo", "Arial Narrow", "Helvetica Neue", "sans-serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        tighter2: "-0.045em",
      },
      boxShadow: {
        card: "0 20px 48px rgba(17, 19, 24, 0.18)",
      },
    },
  },
  plugins: [],
};
