import {pipe} from '#Function'
import {drawRomanTree, TreeCode, TreeStyle, type NumericFormat} from '#model'
import {pluck} from '#Record'
import {
  combineSlices,
  configureStore,
  createSelector,
  type OutputSelector,
  type Selector,
} from '@reduxjs/toolkit'
import {Draw, type Branch} from 'effect-tree'

export type RootState = ReturnType<typeof reducer>
export type RootSelector<A> = Selector<RootState, A>

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

const [{codeSlice}, {styleSlice}] = [TreeCode, TreeStyle]

export const reducer = combineSlices(codeSlice, styleSlice)
export const store = configureStore({reducer})

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
