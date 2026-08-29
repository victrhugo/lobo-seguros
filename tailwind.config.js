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
        rust: "rgb(var(--color-rust) / <alpha-value>)",
        rustDark: "rgb(var(--color-rust-dark) / <alpha-value>)",
        moss: "rgb(var(--color-moss) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Arial Narrow", "Avenir Next Condensed", "Helvetica Neue", "sans-serif"],
        sans: ["Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        tighter2: "-0.055em",
      },
      boxShadow: {
        paper: "0 18px 50px rgba(21, 20, 15, 0.12)",
      },
    },
  },
  plugins: [],
};
