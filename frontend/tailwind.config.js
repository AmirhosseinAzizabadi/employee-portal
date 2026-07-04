/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: '#059669', // A deep, professional emerald green
        brandDark: '#0f172a', // Slate 900 for modern dark mode
        brandCard: '#1e293b', // Slate 800 for dark mode cards
        brandLight: '#f8fafc', // Slate 50 for light mode background
      }
    },
  },
  plugins: [],
}