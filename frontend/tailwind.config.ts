import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F8F4EC",
        surface: "#FFFFFF",
        "surface-alt": "#F3EEE3",
        ink: "#211C16",
        "ink-soft": "#726A5C",
        "ink-faint": "#A79E8D",
        line: "rgba(33,28,22,0.09)",
        "line-strong": "rgba(33,28,22,0.18)",
        sidebar: "#221C15",
        "sidebar-hi": "#2E2718",
        "sidebar-text": "#E9E1D2",
        "sidebar-text-soft": "#B4A990",
        copper: "#BE5B21",
        "copper-deep": "#8F430F",
        "copper-tint": "#FBEBDD",
        basil: "#4C7A57",
        "basil-tint": "#E6EFE6",
        wine: "#A23B32",
        "wine-tint": "#F7E7E3",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Work Sans", "ui-sans-serif", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,28,22,0.04), 0 8px 20px -12px rgba(33,28,22,0.12)",
        pop: "0 24px 60px -20px rgba(33,28,22,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
