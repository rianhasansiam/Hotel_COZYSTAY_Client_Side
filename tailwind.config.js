/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        robotoslab: ["Roboto Slab", "serif"],
        marcellus: ["Marcellus", "serif"],
        jost: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#4A90A4",
          "secondary": "#D4A574",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "synthwave",
    ],
  },
}

