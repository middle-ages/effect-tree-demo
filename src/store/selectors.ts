import {constTrue} from '#Function'
import {MAX_NODE_COUNT} from '#model'
import {
  createSelector,
  type OutputSelector,
  type Selector,
} from '@reduxjs/toolkit'
import {Boolean} from 'effect'
import {Codec} from 'effect-tree'
import type {RootSelector, RootState} from './data'
import {selectCode} from './dataSlice'
import {normalizeGuard, type Guard, type GuardSelector} from './guard'

const selectIsFirstCode: OutputSelector<[RootSelector<number[]>], boolean> =
  createSelector([selectCode], Codec.Prufer.isFirstCode)

const selectIsLastCode: OutputSelector<[RootSelector<number[]>], boolean> =
  createSelector([selectCode], Codec.Prufer.isLastCode)

const selectIsFirstNodeCount: OutputSelector<
  [RootSelector<number[]>],
  boolean
> = createSelector([selectCode], code => code.length === 0)

const selectIsLastNodeCount: OutputSelector<[RootSelector<number[]>], boolean> =
  createSelector(
    [selectCode],
    code => Codec.Prufer.computeNodeCount(code) >= MAX_NODE_COUNT,
  )

type GuardOutputSelector = OutputSelector<
  readonly Selector<RootState>[],
  boolean
>

const selectConstantTrue: OutputSelector<[], boolean> = createSelector(
  [],
  constTrue,
)

const guardSelectors = {
  selectIsFirstCode,
  selectIsLastCode,
  selectIsFirstNodeCount,
  selectIsLastNodeCount,
  selectIsFirstTree: createSelector(
    [selectIsFirstCode, selectIsFirstNodeCount],
    Boolean.and,
  ),
  selectIsLastTree: createSelector(
    [selectIsLastCode, selectIsLastNodeCount],
    Boolean.and,
  ),
} as const satisfies Record<GuardSelector, GuardOutputSelector>

export const guardSelector = (
  maybeGuard?: Guard,
): [GuardOutputSelector | typeof selectConstantTrue, string] => {
  const [key, disabledNote] = normalizeGuard(maybeGuard)
  return [
    key === 'selectConstantTrue' ? selectConstantTrue : guardSelectors[key],
    disabledNote,
  ]
}
