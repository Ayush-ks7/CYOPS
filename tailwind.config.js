/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ops: {
          bg: '#080c14',
          sidebar: '#0a0f19',
          header: '#0d1320',
          card: '#0f1726',
          'card-dark': '#0b111d',
          'card-hover': '#152136',
          border: '#1a2742',
          'border-light': '#223456',
          'border-subtle': '#141e33',
          cyan: '#00f0ff',
          'cyan-muted': '#0284c7',
          sky: '#38bdf8',
          amber: '#f97316',
          orange: '#ea580c',
          red: '#ef4444',
          green: '#22c55e',
          text: '#e2e8f0',
          'text-dim': '#94a3b8',
          'text-muted': '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'ops-glow': '0 0 15px -3px rgba(0, 240, 255, 0.15)',
        'ops-amber': '0 0 15px -3px rgba(249, 115, 22, 0.2)',
        'ops-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
