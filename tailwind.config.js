/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#00F0FF', // Ciano Cyberpunk
        danger: '#FF2E63', // Rosso Allarme
        dark: '#08080A',
        glass: 'rgba(255, 255, 255, 0.05)'
      },
      fontFamily: {
        head: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'glow-text': 'glow-text 2s ease-in-out infinite alternate',
        'x-move': 'x-move 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.8), 0 0 80px rgba(0, 240, 255, 0.6), 0 0 120px rgba(0, 240, 255, 0.3)',
            opacity: '0.9'
          }
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(400%)', opacity: '0' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'glow-text': {
          '0%': { 
            textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.6), 0 0 30px rgba(0, 240, 255, 0.4)'
          },
          '100%': { 
            textShadow: '0 0 20px rgba(0, 240, 255, 1), 0 0 40px rgba(0, 240, 255, 0.8), 0 0 60px rgba(0, 240, 255, 0.6), 0 0 80px rgba(0, 240, 255, 0.4)'
          }
        },
        'x-move': {
          '0%, 100%': { 
            transform: 'translateX(0) scale(1)',
            opacity: '1'
          },
          '25%': { 
            transform: 'translateX(-2px) scale(1.1)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateX(0) scale(1.2)',
            opacity: '1'
          },
          '75%': { 
            transform: 'translateX(2px) scale(1.1)',
            opacity: '0.8'
          }
        }
      }
    }
  },
  plugins: [],
}

