/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      screens: {
        'min-sm': '640px',
        'min-md': '768px',
        'min-lg': '1024px',
        'min-xl': '1280px',
        'max-xl': { 'max': '1279px' },
        'max-lg': { 'max': '1023px' },
        'max-md': { 'max': '767px' },
        'max-sm': { 'max': '639px' },
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}

