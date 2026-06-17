import {pipe} from '#Function'
import {
  drawRomanTree,
  TreeCode,
  TreeStyle,
  type NumericFormat,
  type RootState,
} from '#model'
import {pluck} from '#Record'
import {
  createSelector,
  type OutputSelector,
  type Selector,
} from '@reduxjs/toolkit'
import {Draw, type Branch} from 'effect-tree'

type RootSelector<A> = Selector<RootState, A>

const [{codeSlice}, {styleSlice}] = [TreeCode, TreeStyle]

export const [codeAdapter, styleAdapter] = [
  pipe(pluck('code')<RootState>, codeSlice.getSelectors<RootState>),
  pipe(pluck('style')<RootState>, styleSlice.getSelectors<RootState>),
]

type Dependencies = [
  RootSelector<Branch<number>>,
  RootSelector<NumericFormat>,
  RootSelector<Draw.ThemeName>,
]
const dependencies: Dependencies = [
  codeAdapter.selectTree,
  styleAdapter.selectFormat,
  styleAdapter.selectTheme,
]

export const linesSelector: OutputSelector<Dependencies, string[]> =
  createSelector([...dependencies], drawRomanTree)
