import {constTrue} from '#Function'
import {
  createSelector,
  type OutputSelector,
  type Selector,
} from '@reduxjs/toolkit'
import * as Boolean from 'effect/Boolean'
import type {RootSelector, RootState} from '../data'
import {
  guardPredicateMap,
  normalizeGuard,
  type Guard,
  type GuardSelector,
} from './guard'
import {selectCode} from './slice'
import type {ReactNode} from 'react'

const selectIsFirstCode: OutputSelector<[RootSelector<number[]>], boolean> =
  createSelector([selectCode], guardPredicateMap.selectIsFirstCode)

const selectIsLastCode: OutputSelector<[RootSelector<number[]>], boolean> =
  createSelector([selectCode], guardPredicateMap.selectIsLastCode)

const selectIsFirstNodeCount: OutputSelector<
  [RootSelector<number[]>],
  boolean
> = createSelector([selectCode], guardPredicateMap.selectIsFirstNodeCount)

const selectIsLastNodeCount: OutputSelector<[RootSelector<number[]>], boolean> =
  createSelector([selectCode], guardPredicateMap.selectIsLastNodeCount)

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
): [GuardOutputSelector | typeof selectConstantTrue, ReactNode] => {
  const [key, disabledNote] = normalizeGuard(maybeGuard)
  return [
    key === 'selectConstantTrue' ? selectConstantTrue : guardSelectors[key],
    disabledNote,
  ]
}

export interface DigitAndCount {
  index: number
  digit: number
  digitCount: number
}

export const selectDigitAndCount = (
  index: number,
): OutputSelector<[RootSelector<number[]>], DigitAndCount> =>
  createSelector([selectCode], code => ({
    index,
    digit: code[index] as number,
    digitCount: code.length,
  }))
