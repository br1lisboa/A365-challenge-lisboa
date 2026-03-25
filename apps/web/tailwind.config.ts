import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          900: "var(--brand-900)",
        },
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          muted: "var(--surface-muted)",
          border: "var(--surface-border)",
          "border-strong": "var(--surface-border-strong)",
        },
        foreground: {
          primary: "var(--foreground-primary)",
          secondary: "var(--foreground-secondary)",
          muted: "var(--foreground-muted)",
          inverse: "var(--foreground-inverse)",
        },
        status: {
          success: {
            bg: "var(--status-success-bg)",
            text: "var(--status-success-text)",
          },
          error: {
            bg: "var(--status-error-bg)",
            text: "var(--status-error-text)",
            "bg-muted": "var(--status-error-bg-muted)",
          },
          warning: {
            bg: "var(--status-warning-bg)",
            text: "var(--status-warning-text)",
          },
          info: {
            bg: "var(--status-info-bg)",
            text: "var(--status-info-text)",
            "bg-muted": "var(--status-info-bg-muted)",
            border: "var(--status-info-border)",
            "text-strong": "var(--status-info-text-strong)",
          },
        },
      },
      borderRadius: {
        card: "0.75rem",
        control: "0.5rem",
        badge: "9999px",
      },
      spacing: {
        "card-padding": "1.25rem",
        "section-gap": "2rem",
        "control-x": "1rem",
        "control-y": "0.625rem",
      },
      fontSize: {
        heading: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        body: ["0.875rem", { lineHeight: "1.25rem" }],
        caption: ["0.75rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
