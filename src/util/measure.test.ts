import {px} from '#util'
import {describe, expect, test} from 'vitest'
import {digitWidthPx, horizontalSpacingPx, computeWidth} from './measure'

describe('computeWidth', () => {
  test('single character', () => {
    expect(computeWidth({})('3')).toEqual(
      px(horizontalSpacingPx() + digitWidthPx),
    )
  })

  test('4 digits', () => {
    expect(computeWidth()('1234')).toEqual(
      px(horizontalSpacingPx() + 4 * digitWidthPx),
    )
  })

  describe('flat', () => {
    test('4 digits', () => {
      expect(computeWidth({isFlat: true, padPx: 0})('1234')).toEqual(
        px(horizontalSpacingPx({isFlat: true, padPx: 0}) + 4 * digitWidthPx),
      )
    })
  })
})
