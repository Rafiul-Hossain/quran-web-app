import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['var(--font-amiri)', 'serif'],
        scheherazade: ['var(--font-scheherazade)', 'serif'],
        'noto-naskh': ['var(--font-noto-naskh)', 'serif'],
      },
      colors: {
        // Deep navy — primary brand
        brand: {
          50: '#f1f4f9',
          100: '#dde4ee',
          200: '#b9c9dc',
          300: '#8ba6c5',
          400: '#5b7fa5',
          500: '#3a5f87',
          600: '#2b4a6d',
          700: '#1e3a5f',
          800: '#162b46',
          900: '#0e1d30',
        },
        // Antique gold — accent
        gold: {
          50: '#fbf7ec',
          100: '#f5ebcb',
          200: '#ead590',
          300: '#dcbc5b',
          400: '#c9a961',
          500: '#b8913e',
          600: '#9a7530',
          700: '#7a5c29',
          800: '#5a4421',
        },
        // Parchment cream — background
        cream: {
          50: '#fdfcf7',
          100: '#faf8f3',
          200: '#f3eee1',
        },
      },
      backgroundImage: {
        'islamic-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23c9a961' stroke-opacity='0.15' stroke-width='1'%3E%3Cpath d='M30 0l7.5 15L30 30l-7.5-15zM30 30l7.5 15L30 60l-7.5-15zM0 30l15-7.5L30 30l-15 7.5zM30 30l15-7.5L60 30l-15 7.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;