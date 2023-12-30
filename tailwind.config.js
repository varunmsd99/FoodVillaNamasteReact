/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.html"],
  theme: {
    extend: {
        colors: {
          'green': '#14883F',
          'rusty-orange': '#DB7C38',
          'goldenrod': '#E1B055',
          'vivid-red': '#E9250B',
          'orange': '#f3730a',
          'linkedIn': '#0a66c2',
          'github': '#333',
          'twitter': '#00acee',
          'discord': '#7289da'
        }
      }
    },
  plugins: [],
}