import {segmentString, unwords} from '#String'
import {Array, pipe} from '#util'

export const MAX_ROMAN = 3_999

export const upToTen = {
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
  Ⅽ: ['ⅼ', 'C', 'c'],
  Ⅼ: ['ⅽ', 'L', 'l'],
  Ⅾ: ['ⅾ', 'D', 'd'],
  Ⅿ: ['ⅿ', 'M', 'm'],
} as const

const convert = (s: string): [string, string, string] =>
  _convert[s as keyof typeof convert]

const convertToLower = (s: string) => convert(s)[0]
const convertToUpperAscii = (s: string) => convert(s)[1]
const convertToLowerAscii = (s: string) => convert(s)[2]

export const toRoman = (n: number): string => {
  if (n < 1 || n > MAX_ROMAN) {
    return ' '
  }

  return unwords.rest(
    powers[3]?.[Math.floor(n / 1000)] ?? ' ',
    powers[2]?.[Math.floor((n % 1000) / 100)] ?? ' ',
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
