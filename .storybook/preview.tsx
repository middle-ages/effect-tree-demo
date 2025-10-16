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
    },
  },
  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
}

export default preview
