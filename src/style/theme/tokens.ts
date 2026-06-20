import {toEntries} from '#Record'
import {toKebabCase} from '#String'
import {Array, pipe} from 'effect'

export const tokens = {
  color: {
    ink: '#121014',
    fgControl: '#545258',
    fgControlHover: '#666666',
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

    textShadowLightest: '#ffffffcc',
    textShadowLighter: '#ffffff99',
    textShadowLight: '#ffffff66',
    textShadowDark: '#ffffff44',
    textShadowDarker: '#bbbbbb33',
    textShadowDarkest: '#99999944',
  },
  button: {
    gradientHighestBase: '#eaebef',
    gradientHighBase: '#e0e2e3',
    gradientLowBase: '#dadcde',
    gradientLowestBase: '#d0d2d6',
    gradientHighestActive: '#c0c0c4',
    gradientHighActive: '#cacacc',
    gradientLowActive: '#d2d2d2',
    gradientLowestActive: '#d6d6d8',
  },
} as const satisfies Record<string, Record<string, string>>

export const cssVars = mapColors(
  (prefix, name, color) => `  --${prefix}-${toKebabCase(name)}: ${color};`,
)

export const theme: [prefix: string, name: string, color: string][] = mapColors(
  (prefix, name, color) => [prefix, name, color],
)

function mapColors<R>(
  f: (prefix: string, name: string, color: string) => R,
): R[] {
  return pipe(
    tokens,
    toEntries,
    Array.flatMap(([prefix, colors]) =>
      pipe(
        Object.entries(colors),
        Array.map(([name, color]) => f(prefix, name, color)),
      ),
    ),
  )
}
