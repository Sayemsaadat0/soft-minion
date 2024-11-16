import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary_color': '#6ebbb7',
        'secondary_color': '#f2e9e0',
        'success_1': '#a2c483',
        'warning_1': '#e8bc60',
        'error_1': '#f75140',
      },
    },
  },
  plugins: [],
} satisfies Config;
