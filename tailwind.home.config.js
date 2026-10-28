/** Landing page (index.html). Rode `npm run build:css` após mudar classes. */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        paper: '#EEF1F6',
        ink: { DEFAULT: '#12161D', 700: '#38414f', 500: '#5b6675' },
        royal: { DEFAULT: '#1E3FC7', 600: '#1E3FC7', 700: '#1830a0', 900: '#111E63' },
        stamp: '#B3261E',
        paid: '#0E7C5A',
        wa: { DEFAULT: '#25D366', 600: '#1EBE5D' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
};
