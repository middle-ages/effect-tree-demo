import {
  drawRomanTree,
  MAX_NODE_COUNT,
  primeStats,
  type NumericFormat,
  type PrimedStats,
} from '#model'
import {createSelector, type OutputSelector} from '@reduxjs/toolkit'
import {Boolean} from 'effect'
import {Codec, type Branch, type Draw} from 'effect-tree'
import {selectCode, selectFormat, selectTheme} from './dataSlice'
import type {RootSelector, TreeStyle} from './data'

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

export const selectIsFirstCode: OutputSelector<
  [RootSelector<number[]>],
  boolean
> = createSelector([selectCode], Codec.Prufer.isFirstCode)

export const selectIsLastCode: OutputSelector<
  [RootSelector<number[]>],
  boolean
> = createSelector([selectCode], Codec.Prufer.isLastCode)

export const selectIsFirstNodeCount: OutputSelector<
  [RootSelector<number[]>],
  boolean
> = createSelector([selectCode], code => code.length === 0)

export const selectIsLastNodeCount: OutputSelector<
  [RootSelector<number[]>],
  boolean
> = createSelector(
  [selectCode],
  code => Codec.Prufer.computeNodeCount(code) >= MAX_NODE_COUNT,
)

export const selectIsFirstTree: OutputSelector<
  [RootSelector<boolean>, RootSelector<boolean>],
  boolean
> = createSelector([selectIsFirstCode, selectIsFirstNodeCount], Boolean.and)

export const selectIsLastTree: OutputSelector<
  [RootSelector<boolean>, RootSelector<boolean>],
  boolean
> = createSelector([selectIsLastCode, selectIsLastNodeCount], Boolean.and)

export const guardSelectors = {
  selectIsFirstCode,
  selectIsLastCode,
  selectIsFirstNodeCount,
  selectIsLastNodeCount,
  selectIsFirstTree,
  selectIsLastTree,
} as const
