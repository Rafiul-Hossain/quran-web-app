import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        scheherazade: ['"Scheherazade New"', 'serif'],
        'noto-naskh': ['"Noto Naskh Arabic"', 'serif'],
        'ibm-plex': ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'bg-sidebar': 'var(--bg-sidebar)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        border: 'var(--border-color)',
        'icon-bg': 'var(--icon-bg)',
      },
    },
  },
  plugins: [],
};

export default config;