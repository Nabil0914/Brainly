/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c",
        },
        purple: {
          100: "#eae8fd",   // Light background (Share Brain)
          200: "#d9ddee",   // Soft lavender
          500: "#9492db",   // Medium purple
          600: "#7164c0",   // Slightly darker
          700: "#5f3dd6",   // Button + text color (Share Brain + Add Content)
        }
      }
    },
  },
  plugins: [],
}

