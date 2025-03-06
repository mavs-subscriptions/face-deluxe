/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mavericks: {
          black: '#0A0A0A',
          purple: {
            light: '#9D7FEA',
            DEFAULT: '#6E42CA',
            dark: '#4A2A8A'
          },
          orange: {
            light: '#FFA07A',
            DEFAULT: '#FF6347',
            dark: '#D84A32'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};