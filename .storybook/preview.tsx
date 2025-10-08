const preview = {
  parameters: {
    layout: 'fullscreen',
    tags: ['autodocs'],
    docs: {codePanel: true},
    backgrounds: {
      options: {
        dark: {name: 'Dark', value: '#555'},
        light: {name: 'Light', value: '#e8e8ee'},
      },
      grid: {
        opacity: 0.3,
        cellAmount: 8,
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
