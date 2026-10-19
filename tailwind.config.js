/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flame-orange': '#F97316',
        'flame-orange-dark': '#EA580C',
        'flame-dark': '#1C1917',
        'flame-darker': '#0F0D0C',
        'flame-cream': '#FAF7F2',
        'flame-gray': '#78716C',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}