import {
  drawRomanTree,
  MAX_NODE_COUNT,
  primeStats,
  type NumericFormat,
  type PrimedStats,
} from '#model'
import {
  createSelector,
  type OutputSelector,
  type Selector,
} from '@reduxjs/toolkit'
import {Boolean} from 'effect'
import {Codec, type Branch, type Draw} from 'effect-tree'
import {selectCode, selectFormat, selectTheme} from './dataSlice'
import type {RootSelector, RootState, TreeStyle} from './data'
import {normalizeGuard, type Guard, type GuardSelector} from './guard'
import {constTrue} from '#Function'

export const selectStyle: OutputSelector<
  [RootSelector<NumericFormat>, RootSelector<Draw.ThemeName>],
  TreeStyle
> = createSelector([selectFormat, selectTheme], (format, theme) => ({
  format,
  theme,
}))

export const selectTree: OutputSelector<
  [RootSelector<number[]>],
  Branch<number>
> = createSelector([selectCode], Codec.Prufer.decode)

export const selectLines: OutputSelector<
  [RootSelector<Branch<number>>, RootSelector<TreeStyle>],
  string[]
> = createSelector([selectTree, selectStyle], (tree, {format, theme}) =>
  drawRomanTree(tree, format, theme),
)

export const selectStats: OutputSelector<
  [RootSelector<number[]>, RootSelector<Branch<number>>],
  PrimedStats
> = createSelector([selectCode, selectTree], primeStats.untupled)

export const selectDot: OutputSelector<[RootSelector<Branch<number>>], string> =
  createSelector([selectTree], Codec.treeToGraphViz)

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
