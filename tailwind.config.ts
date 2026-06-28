import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111214",
        paper: "#f6f2ea",
        brass: "#c99b48",
        mint: "#7bc8a4",
        coral: "#ff6f61",
        plum: "#673f8f",
        night: "#151826",
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 18px 70px rgba(17, 18, 20, 0.12)",
        insetLine: "inset 0 0 0 1px rgba(17, 18, 20, 0.08)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(17,18,20,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17,18,20,.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
