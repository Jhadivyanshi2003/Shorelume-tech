/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f6fe',
          100: '#eaedfc',
          200: '#d9dffa',
          300: '#bdc8f6',
          400: '#9aa8f0',
          500: '#7381e9',
          600: '#5c66de',
          700: '#4c52cc',
          800: '#4044a8',
          900: '#383b87',
          950: '#232551',
        },
        darkBg: '#090a0f',
        glassBg: 'rgba(255, 255, 255, 0.03)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}

