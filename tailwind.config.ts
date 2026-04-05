import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080610',
        accent: '#c77dff',
        lilac: '#e0aaff',
        rose: '#ff85a1',
        champagne: '#ffd6a5',
        'text-primary': '#f0eaff',
        'text-muted': 'rgba(240,234,255,0.50)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}

export default config
