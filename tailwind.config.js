module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#030712",
        foreground: "#030712",
        primary: {
          DEFAULT: "#030712",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        chrome: "#ff9800", // ✅ Chrome Color
        safari: "#03a9f4", // ✅ Safari Color
        firefox: "#ff5722", // ✅ Firefox Color
        edge: "#4caf50", // ✅ Edge Color
        other: "#9c27b0", // ✅ Other Color
        chart1: "var(--chart-1)",
        chart2: "var(--chart-2)",
      },
      fill: (theme) => ({
        chrome: theme("colors.chrome"),
        safari: theme("colors.safari"),
        firefox: theme("colors.firefox"),
        edge: theme("colors.edge"),
        other: theme("colors.other"),
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
};
