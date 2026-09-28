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
          bg: 'var(--ops-bg)',
          sidebar: 'var(--ops-sidebar)',
          header: 'var(--ops-header)',
          card: 'var(--ops-card)',
          'card-dark': 'var(--ops-card-sub)',
          'card-hover': 'var(--ops-card-hover)',
          border: 'var(--ops-border)',
          'border-light': 'var(--ops-border-light)',
          'border-subtle': 'var(--ops-border-subtle)',
          cyan: 'var(--ops-cyan)',
          'cyan-muted': 'var(--ops-cyan-muted)',
          sky: 'var(--ops-sky)',
          amber: 'var(--ops-amber)',
          orange: 'var(--ops-orange)',
          red: 'var(--ops-red)',
          green: 'var(--ops-green)',
          text: 'var(--ops-text)',
          'text-dim': 'var(--ops-text-dim)',
          'text-muted': 'var(--ops-text-muted)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'ops-card': 'var(--ops-shadow-card)',
        'ops-glow': '0 0 15px -3px rgba(14, 165, 233, 0.25)',
        'ops-amber': '0 0 15px -3px rgba(234, 88, 12, 0.25)',
      }
    },
  },
  plugins: [],
}
