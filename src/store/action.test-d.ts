import {expectTypeOf, test} from 'vitest'
import type {Action, ActionList} from './action'

test('ActionList', () => {
  expectTypeOf<ActionList<'nodeCount', 'inc'>>().toEqualTypeOf<
    [Action<'incNodes'>, Action<'incHalfNodeCount'>, Action<'lastNodeCount'>]
  >()
})
