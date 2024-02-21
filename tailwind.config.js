/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: [{ 'min': '360px', 'max': '480px' }],
      md: [{ 'min': '490', 'max': '670px' }],
      lg: [{ 'min': '700', 'max': '976px' }],
      xl: '1020px'
    },
    extend: {},
  },
  plugins: [],
}