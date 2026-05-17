import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        "accent-soft": "hsl(var(--accent) / 0.06)",
      },
      fontFamily: {
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "680px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
