import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // màu chủ đề theo chỉ số
        resource: "#22c55e",
        ownership: "#eab308",
        inequality: "#f97316",
        conflict: "#ef4444",
        stability: "#3b82f6",
        statepower: "#a855f7",
      },
    },
  },
  plugins: [],
} satisfies Config;
