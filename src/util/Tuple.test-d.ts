import {expectTypeOf, test} from '@effect/vitest'
import type {Init, Tail} from './Tuple'

type SomeTuple = readonly ['a', 'b', 'c']

test('Init', () => {
  expectTypeOf<Init<SomeTuple>>().toEqualTypeOf<readonly ['a', 'b']>()
})

test('Tail', () => {
  expectTypeOf<Tail<SomeTuple>>().toEqualTypeOf<readonly ['b', 'c']>()
})
