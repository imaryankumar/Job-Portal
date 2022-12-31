/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '300px', 'max': '640px'},
      // => @media (min-width: 300px and max-width: 640px) { ... }
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}