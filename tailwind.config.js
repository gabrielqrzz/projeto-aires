/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          red: "#900B09",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
}
