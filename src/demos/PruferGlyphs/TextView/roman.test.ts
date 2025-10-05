import {test, expect} from 'vitest'
import {toRoman} from './roman'

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
