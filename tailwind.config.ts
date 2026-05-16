import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#050505',
          800: '#0a0a0b',
          700: '#111113',
          600: '#16161a',
          500: '#1d1d22',
          400: '#26262d',
          300: '#3a3a44'
        },
        bone: {
          100: '#f5f5f0',
          200: '#dcdcd6',
          300: '#a8a89e'
        },
        acid: {
          DEFAULT: '#e6ff04',
          400: '#f0ff4a',
          500: '#e6ff04',
          600: '#c9e000'
        },
        flare: {
          DEFAULT: '#ff5b1f',
          400: '#ff7a45',
          500: '#ff5b1f',
          600: '#e64a10'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif']
      },
      backgroundImage: {
        'grid-radial':
          'radial-gradient(circle at 50% 50%, rgba(230,255,4,0.08), transparent 60%)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")"
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -2px)' },
          '80%': { transform: 'translate(1px, 2px)' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(230,255,4,0.6)' },
          '50%': { boxShadow: '0 0 40px 8px rgba(230,255,4,0.25)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        glitch: 'glitch 1.5s infinite steps(2,end)',
        scan: 'scan 5s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
