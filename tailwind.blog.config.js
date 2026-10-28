/** Blog (blog/**). Rode `npm run build:css` após mudar classes. */
module.exports = {
  content: ['./blog/**/*.html'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0E1A3F', 900: '#0A1330', 800: '#0E1A3F', 700: '#182a5e' },
        brand: { DEFAULT: '#1B39B8', 600: '#1B39B8', 500: '#2f4fd6', 400: '#5f77e6' },
        mint: { DEFAULT: '#22C55E', 600: '#16a34a' },
        wa: { DEFAULT: '#25D366', 600: '#1EBE5D', 700: '#128C7E' },
        paper: '#F5F7FB',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(14,26,63,0.18)',
        card: '0 2px 12px -2px rgba(14,26,63,0.10)',
      },
    },
  },
};
