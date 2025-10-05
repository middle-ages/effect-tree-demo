const preview = {
  parameters: {
    layout: 'fullscreen',
    tags: ['autodocs'],
    docs: {codePanel: true},
    backgrounds: {
      options: {
        dark: {name: 'Dark', value: '#555'},
        light: {name: 'Light', value: '#ffffff'},
        grey: {name: 'Grey', value: '#eaeaea'},
      },
      grid: {
        opacity: 0.3,
        cellAmount: 8,
      },
    },
  },
  initialGlobals: {
    backgrounds: {
      value: 'grey',
    },
  },
}

export default preview
