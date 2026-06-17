import {
  drawRomanTree,
  primeStats,
  type NumericFormat,
  type PrimedStats,
} from '#model'
import {createSelector, type OutputSelector} from '@reduxjs/toolkit'
import {Codec, type Branch, type Draw} from 'effect-tree'
import {selectCode, selectFormat, selectTheme} from './dataSlice'
import type {RootSelector, TreeStyle} from './state'

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
