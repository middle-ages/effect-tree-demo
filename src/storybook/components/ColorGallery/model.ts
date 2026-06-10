import {theme} from '#tokens'
import type {Tuple3} from '#Tuple'
import {hsl, srgb} from '@thi.ng/color'
import {Order} from 'effect'
import {identity, String, pipe, type SortDirection, Array} from '#util'

export interface ColorSortState {
  sortBy: ColorSortKey
  direction: SortDirection
}

export const initialSortState: ColorSortState = {
  sortBy: 'luminance',
  direction: 'ascending',
}

export const colorEntryKeys = [
  'name',
  'red',
  'green',
  'blue',
  'hue',
  'saturation',
  'luminance',
  'alpha',
  'color',
] as const

export type ColorSortKey = (typeof colorEntryKeys)[number]

export interface ColorEntry extends Record<ColorSortKey, string> {}

export interface ColorSortHandlers extends ColorSortState {
  setSortBy: (sortBy: ColorSortKey) => void
  flipDirection: () => void
}

const buildColorEntry = ([
  prefix,
  name,
  color,
]: Tuple3<string>): ColorEntry => ({
  name: `${prefix}${String.capitalize(name)}`,
  red: color.slice(1, 3),
  green: color.slice(3, 5),
  blue: color.slice(5, 7),
  hue: toHsl(color, 0),
  saturation: toHsl(color, 1),
  luminance: toHsl(color, 2),
  alpha: color.slice(7, 9) === '' ? 'FF' : color.slice(7, 9),
  color,
})

export const colorEntryOrder = ({
  sortBy,
  direction,
}: ColorSortState): Order.Order<ColorEntry> =>
  pipe(
    String.Order,
    Order.mapInput((entry: ColorEntry): string => entry[sortBy]),
    direction === 'ascending' ? identity : Order.reverse,
  )

export const sortedThemeColors = (state: ColorSortState): ColorEntry[] =>
  pipe(theme, Array.map(buildColorEntry), Array.sort(colorEntryOrder(state)))

function toHsl(color: string, index: 0 | 1 | 2): string {
  return (hsl(srgb(color))[index] ?? 0).toFixed(2)
}
