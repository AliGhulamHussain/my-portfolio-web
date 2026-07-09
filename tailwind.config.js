/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F3F5FA",
        surface: "#FFFFFF",
        ink: "#10151F",
        muted: "#5F6774",
        line: "#E2E7F0",
        accent: "#2E5BFF",
        accent2: "#0FB5A0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
