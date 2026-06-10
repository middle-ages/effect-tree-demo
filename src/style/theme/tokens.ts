import {toKebabCase} from '#String'
import {toEntries} from '#Record'
import {Array, pipe} from 'effect'

export const tokens = {
  light: {
    ink: '#121014',
    fgControl: '#545258',
    fgControlHover: '#3d393a',
    fgControlDisabled: '#9c9a9d',

    lineLight: '#d4d0d6',
    lineDark: '#cccccc',
    lineDarkest: '#b5b0b8',

    ringInner: '#cfdaff',
    ring: '#506acf',

    borderTop: '#f2ebed',
    borderRight: '#dad4d8',
    borderBottom: '#bcb9ba',

    app: '#ebebf3',
    light: '#f0f0f5',
    dark: '#e1e1e6',
    darker: '#e2e0e4',
    paper: '#f4f3f2',

    input: '#f5f1f4',
    inputActive: '#fcfafd',

    control: '#eceaee',
    controlHover: '#f3edf5',
    controlDisabled: '#e3e0e9',
    controlActive: '#dedcdf',

    a: '#000574',
    aHover: '#000dbd',
    aActive: '#b10000',
    aVisited: '#390062',
    aVisitedHover: '#8900c6',

    scrollTop: '#2035432a',
    scrollBottom: '#4065732a',
  },
}

export const cssVars = (tokens: Record<string, string>): string[] =>
  pipe(
    tokens,
    toEntries,
    Array.map(([key, color]) => `  --color-${toKebabCase(key)}: ${color};`),
  )
