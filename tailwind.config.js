export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { saffron: '#F28C28', india: '#1DB954', ink: '#07090D', panel: '#10141B', line: '#1E2530', mist: '#F5F6F8', neon: '#38E1FF' },
    fontFamily: {
      display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      sans: ['Figtree', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
    }
  } },
  plugins: []
}
