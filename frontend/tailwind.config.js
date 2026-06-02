export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['"DM Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        navy: {
          50: '#f0f4ff', 100: '#e0e9ff', 200: '#c7d7fe',
          300: '#a5b8fc', 400: '#8193f8', 500: '#6270f3',
          600: '#4f54e8', 700: '#3d3fca', 800: '#1e2a5e',
          900: '#111827', 950: '#080c18',
        },
        gold: {
          300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b',
          600: '#d97706', 700: '#b45309',
        },
      },
    },
  },
  plugins: [],
};
