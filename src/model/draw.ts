import * as Array from '#Array'
import {dual, type EndoOf} from '#Function'
import {mapEntries} from '#Record'
import {segmentString, suffix, trimEnd, unwords} from '#String'
import type {SelectItem} from '#types'
import {flow, pipe} from 'effect'
import {drawTree, map, type Draw, type Tree} from 'effect-tree'

export const MAX_ROMAN = 3_999

export const romanFormats = [
  'upper',
  'lower',
  'upperAscii',
  'lowerAscii',
] as const

const _formats: Record<NumericFormat, Omit<SelectItem, 'id'>> = {
  decimal: {
    icon: '1,2,3',
    label: 'Decimal',
    title: 'Format labels as decimals.',
  },
  lower: {
    icon: 'ⅰ,ⅱ,ⅲ',
    label: 'Unicode',
    title:
      'Use lowercase Unicode Roman numerals from the ‘Number Forms’ block (U+2150…U+218F)',
  },
  upper: {
    icon: 'Ⅰ,Ⅱ,Ⅲ',
    label: 'Unicode Caps',
    title:
      'Use uppercase Unicode Roman numerals from the ‘Number Forms’ block (U+2150…U+218F)',
  },
  lowerAscii: {
    icon: 'i,ii,iii',
    label: 'ASCII',
    title: 'Use lowercase ASCII emulation of Roman numerals.',
  },
  upperAscii: {
    icon: 'I,II,III',
    label: 'ASCII Caps',
    title: 'Use uppercase ASCII emulation of Roman numerals.',
  },
  none: {
    icon: '╼',
    label: 'Single glyph',
    title: 'Show all nodes using the same glyph.',
  },
}

export const formats: Record<NumericFormat, SelectItem> = pipe(
  _formats,
  mapEntries((entry, id) => [id, {id, ...entry}]),
)

export const numericFormats = ['decimal', ...romanFormats, 'none'] as const

export type RomanFormat = (typeof romanFormats)[number]
export type NumericFormat = (typeof numericFormats)[number]

export const upToTen: Record<RomanFormat, string[]> = {
  upper: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'],
  lower: ['ⅰ', 'ⅱ', 'ⅲ', 'ⅳ', 'ⅴ', 'ⅵ', 'ⅶ', 'ⅷ', 'ⅸ', 'ⅹ', 'ⅺ', 'ⅻ'],
  upperAscii: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
  lowerAscii: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'],
}

export const romanDigit = (digit: number): string => upToTen.upper[digit] ?? ' '

romanDigit.lower = (digit: number): string => upToTen.lower[digit] ?? ' '

romanDigit.upperAscii = (digit: number): string =>
  upToTen.upperAscii[digit] ?? ' '

romanDigit.lowerAscii = (digit: number): string =>
  upToTen.lowerAscii[digit] ?? ' '

export const powers = [
  ['', ...upToTen.upper.slice(0, 9)],
  ['', 'Ⅹ', 'ⅩⅩ', 'ⅩⅩⅩ', 'ⅩⅬ', 'Ⅼ', 'ⅬⅩ', 'ⅬⅩⅩ', 'ⅬⅩⅩⅩ', 'ⅩⅭ'],
  ['', 'Ⅽ', 'ⅭⅭ', 'ⅭⅭⅭ', 'ⅭⅮ', 'Ⅾ', 'ⅮⅭ', 'ⅮⅭⅭ', 'ⅮⅭⅭⅭ', 'ⅭⅯ'],
  ['', 'Ⅿ', 'ⅯⅯ', 'ⅯⅯⅯ'],
]

const _convert = {
  Ⅰ: ['ⅰ', 'I', 'i'],
  Ⅱ: ['ⅱ', 'II', 'ii'],
  Ⅲ: ['ⅲ', 'III', 'iii'],
  Ⅳ: ['ⅳ', 'IV', 'iv'],
  Ⅴ: ['ⅴ', 'V', 'v'],
  Ⅵ: ['ⅵ', 'VI', 'vi'],
  Ⅶ: ['ⅶ', 'VII', 'vii'],
  Ⅷ: ['ⅷ', 'VIII', 'viii'],
  Ⅸ: ['ⅸ', 'IX', 'ix'],
  Ⅹ: ['ⅹ', 'X', 'x'],
  Ⅺ: ['ⅺ', 'XI', 'xi'],
  Ⅻ: ['ⅻ', 'XII', 'xii'],
  Ⅽ: ['ⅽ', 'C', 'c'],
  Ⅼ: ['ⅼ', 'L', 'l'],
  Ⅾ: ['ⅾ', 'D', 'd'],
  Ⅿ: ['ⅿ', 'M', 'm'],
} as const

const convert = (s: string): [string, string, string] =>
  _convert[s as keyof typeof convert]

const convertToLower = (s: string) => convert(s)[0]
const convertToUpperAscii = (s: string) => convert(s)[1]
const convertToLowerAscii = (s: string) => convert(s)[2]

const convertFormat =
  (format: RomanFormat): EndoOf<string> =>
  s =>
    format === 'upper'
      ? s
      : convert(s)[format === 'lower' ? 0 : format === 'upperAscii' ? 1 : 2]

export const toRoman = (n: number): string => {
  if (n < 1 || n > MAX_ROMAN) {
    return ' '
  }

  return unwords.rest(
    powers[3]?.[Math.floor(n / 1_000)] ?? ' ',
    powers[2]?.[Math.floor((n % 1_000) / 100)] ?? ' ',
    powers[1]?.[Math.floor((n % 100) / 10)] ?? ' ',
    powers[0]?.[n % 10] ?? ' ',
  )
}

toRoman.lower = (n: number): string =>
  pipe(n, toRoman, segmentString, Array.map(convertToLower), unwords)

toRoman.upperAscii = (n: number): string =>
  pipe(n, toRoman, segmentString, Array.map(convertToUpperAscii), unwords)

toRoman.lowerAscii = (n: number): string =>
  pipe(n, toRoman, segmentString, Array.map(convertToLowerAscii), unwords)

export const formatRoman =
  (format: NumericFormat) =>
  (n: number): string => {
    if (format === 'decimal') {
      return n.toLocaleString()
    } else if (format === 'none') {
      return '╼'
    }
    const f = convertFormat(format)
    return pipe(n, toRoman, segmentString, Array.map(f), unwords)
  }

export const drawRomanTree: {
  (self: Tree<number>, format: NumericFormat, theme: Draw.ThemeName): string[]
  (
    format: NumericFormat,
    theme: Draw.ThemeName,
  ): (self: Tree<number>) => string[]
} = dual(
  3,
  (
    self: Tree<number>,
    format: NumericFormat,
    theme: Draw.ThemeName,
  ): string[] =>
    pipe(
      self,
      map(n => (n > MAX_ROMAN ? n.toLocaleString() : formatRoman(format)(n))),
      drawTree[theme],
      Array.map(flow(trimEnd, suffix('\n'))),
    ),
)
