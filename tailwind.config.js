/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds — Navy
        bg: {
          DEFAULT:   '#0A1628',  // deep navy (main background)
          primary:   '#0A1628',  // alias for compat
          secondary: '#0F1E38',  // slightly lighter navy (sections)
          tertiary:  '#162844',  // card surfaces
          4:         '#1D3355',  // elevated cards / hover states
        },
        // Gold accent (from logo hexagon)
        gold: {
          DEFAULT: '#C4A265',   // primary gold (logo color exact)
          2:       '#A8863F',   // darker gold
          light:   '#E8CC8A',   // light gold for text on dark
          dark:    '#7A6030',   // deep gold
          muted:   '#A8863F',   // alias for compat
        },
        // Navy (from logo BD monogram)
        navy: {
          DEFAULT: '#1B3A5C',   // primary navy
          2:       '#0F2540',   // deep navy
          light:   '#2E5F8A',   // lighter navy
        },
        // Text
        ivory: {
          DEFAULT: '#F5F2EC',   // primary text
          2:       '#C8C0B0',   // secondary text
          3:       '#8A8070',   // muted text
          muted:   '#C8C0B0',   // alias for compat
        },
        // Status
        success: '#3FBF7F',
        warning: '#F4B942',
        error:   '#E25C5C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 20px rgba(196,162,101,0.15)',
        'gold-md': '0 0 40px rgba(196,162,101,0.28)',
        'gold-lg': '0 0 80px rgba(196,162,101,0.38)',
        'navy':    '0 8px 32px rgba(10,22,40,0.6)',
        '3d':      '0 25px 50px rgba(0,0,0,0.7)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float':   'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
