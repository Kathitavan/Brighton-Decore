/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure Palette Foundation (No dynamic theme bleeding)
        gold: {
          DEFAULT: '#C9A55A',
          light: '#DFBF7A',
          dark: '#A68238',
          pale: 'rgba(201, 165, 90, 0.15)',
        },
        obsidian: {
          DEFAULT: '#0A0908',
          surface: '#171816',
          card: '#121210',
        },
        forest: {
          DEFAULT: '#0A120E',
          emerald: '#52B788',
          sage: '#74C69D',
        },
        walnut: {
          DEFAULT: '#140F0B',
          dune: '#D9C5A0',
          sand: '#FAF6EF',
        },
        terracotta: {
          DEFAULT: '#D96B43',
          warm: '#140C08',
          cream: '#FFFDF7',
        },
        amber: {
          DEFAULT: '#D97736',
          sandstone: '#1F1A14',
          cream: '#F5EBE1',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
