import {test, expect, describe} from 'vitest'
import {formatRoman, toRoman} from './roman'

test('toRoman', () => {
  expect(toRoman(1234)).toBe('ⅯⅭⅭⅩⅩⅩⅣ')
})

test('toRoman.lower', () => {
  expect(toRoman.lower(3999)).toBe('ⅿⅿⅿⅼⅿⅹⅼⅸ')
})

test('toRoman.upperAscii', () => {
  expect(toRoman.lower(1234)).toBe('ⅿⅼⅼⅹⅹⅹⅳ')
})

test('toRoman.lowerAscii', () => {
  expect(toRoman.lowerAscii(9)).toBe('ix')
})

describe('formatRoman', () => {
  test('decimal', () => {
    expect(formatRoman('decimal')(1234)).toBe((1234).toLocaleString())
  })

  test('upper', () => {
    expect(formatRoman('upper')(1234)).toBe('ⅯⅭⅭⅩⅩⅩⅣ')
  })

  test('lower', () => {
    expect(formatRoman('lower')(1234)).toBe('ⅿⅼⅼⅹⅹⅹⅳ')
  })

  test('upperAscii', () => {
    expect(formatRoman('upperAscii')(1234)).toBe('MCCXXXIV')
  })

  test('lowerAscii', () => {
    expect(formatRoman('lowerAscii')(1234)).toBe('mccxxxiv')
  })
})
