/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tga-green':    '#4A6228',
        'tga-sage':     '#8FAE6B',
        'tga-gold':     '#9B8C00',
        'tga-red':      '#8B1A1A',
        'tga-offwhite': '#F8F5EF',
        'tga-charcoal': '#1A1A1A',
        'tga-muted':    '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
