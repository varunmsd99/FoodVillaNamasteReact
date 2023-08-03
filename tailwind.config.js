/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
          'green': '#14883F',
          'rusty-orange': '#DB7C38',
          'goldenrod': '#E1B055',
          'vivid-red': '#E9250B'
        },
      }
    },
  plugins: [],
}

