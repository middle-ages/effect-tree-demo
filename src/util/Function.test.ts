import {apply0} from './Function'
import {expect, test} from '@effect/vitest'

test('apply0', () => {
  expect(apply0(() => 123)).toBe(123)
})
