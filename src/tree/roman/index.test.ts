import {test, expect, describe} from 'vitest'
import {formatRoman, toRoman} from './index'

test('toRoman', () => {
  expect(toRoman(1234)).toBe('ⅯⅭⅭⅩⅩⅩⅣ')
})

test('toRoman.lower', () => {
  expect(toRoman.lower(3999)).toBe('ⅿⅿⅿⅽⅿⅹⅽⅸ')
})

test('toRoman.upperAscii', () => {
  expect(toRoman.upperAscii(1234)).toBe('MCCXXXIV')
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
    expect(formatRoman('lower')(1234)).toBe('ⅿⅽⅽⅹⅹⅹⅳ')
  })

  test('upperAscii', () => {
    expect(formatRoman('upperAscii')(1234)).toBe('MCCXXXIV')
  })

  test('lowerAscii', () => {
    expect(formatRoman('lowerAscii')(1234)).toBe('mccxxxiv')
  })
})
