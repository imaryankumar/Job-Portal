/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '300px', 'max': '424px'},
      // => @media (min-width: 300px and max-width: 450px) { ... }
      ...defaultTheme.screens,
    },
    extend: {
      colors:{
        'dark-blue':'#1A253C',
        'light-blue':'#43AFFF',
        'light-dark':'#303F60',
        'white-blue':'#edf6ff'
      }
    },
  },
  plugins: [],
}