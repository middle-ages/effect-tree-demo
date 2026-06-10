import '../src/style.css'

const preview = {
  parameters: {
    layout: 'fullscreen',
    tags: ['autodocs'],
    docs: {codePanel: true},
    backgrounds: {
      options: {
        dark: {name: 'Dark', value: '#555'},
        light: {name: 'Light', value: 'var(--bg)'},
      },

      grid: {
        cellSize: 28,
        opacity: 0.5,
        cellAmount: 8,
        offsetX: 0,
        offsetY: 7,
      },
    },
  },
  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
}

export default preview
