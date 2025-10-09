import {create} from 'storybook/theming'

const theme = create({
  base: 'light',
  brandTitle: 'effect-tree Stories',
  brandUrl: 'https://middle-ages.github.io',
  brandTarget: '_self',
  fontBase: 'Inter, sans-serif',
  fontCode: 'Fira Code',
  colorPrimary: '#842',
  colorSecondary: '#769',

  appBg: '#f8f8f8',
  appContentBg: '#fcfcfc',
  appPreviewBg: '#eee',
  appBorderColor: '#ddd',

  textColor: '#000',
  textInverseColor: '#fff',
  textMutedColor: '#758',

  barBg: '#f8f8f8',
  barHoverColor: '#85a',
  barSelectedColor: '#000',

  inputBg: '#fff',
  inputBorder: '#aaa',
  inputTextColor: '#000',
})

export default theme
