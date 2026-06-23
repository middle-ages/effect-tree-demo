import {pipe} from '#Function'
import type {PrimedStats} from '#model'
import {pluck} from '#Record'
import {
  createSlice,
  type ReducerCreators,
  type Slice,
  type SliceSelectors,
} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import type {ComputedState, RootSelector, RootState} from './data'
import * as data from './data'

export type ComputedSlice = Slice<
  ComputedState,
  ComputedReducers,
  'computed',
  'computed',
  SelectorDefinitions
>

interface SelectorDefinitions extends SliceSelectors<ComputedState> {
  selectTree: (state: ComputedState) => Branch<number>
  selectLines: (state: ComputedState) => string[]
  selectStats: (state: ComputedState) => PrimedStats
  selectDot: (state: ComputedState) => string
  selectSvg: (state: ComputedState) => string
}

const selectors: SelectorDefinitions = {
  selectTree: data.pluckTree,
  selectLines: data.pluckLines,
  selectStats: data.pluckStats,
  selectDot: data.pluckDot,
  selectSvg: data.pluckSvg,
}

type ComputedReducers = ReturnType<typeof reducers>

const reducers = (create: ReducerCreators<ComputedState>) => ({
  setTree: create.reducer<Branch<number>>((state, {payload}) =>
    data.setTree(state, payload),
  ),
  setLines: create.reducer<string[]>((state, {payload}) =>
    data.setLines(state, payload),
  ),

  setStats: create.reducer<PrimedStats>((state, {payload}) =>
    data.setStats(state, payload),
  ),

  setDot: create.reducer<string>((state, {payload}) =>
    data.setDot(state, payload),
  ),

  setSvg: create.reducer<string>((state, {payload}) =>
    data.setSvg(state, payload),
  ),
})

export const computedSlice: ComputedSlice = createSlice({
  name: 'computed',
  initialState: data.initialComputedState,
  reducers,
  selectors,
})

const computedAdapter = pipe(
  pluck('computed')<RootState>,
  computedSlice.getSelectors<RootState>,
)

interface ComputedSelectors {
  selectTree: RootSelector<Branch<number>>
  selectLines: RootSelector<string[]>
  selectStats: RootSelector<PrimedStats>
  selectDot: RootSelector<string>
  selectSvg: RootSelector<string>
}

export const {
  selectTree: selectComputedTree,
  selectLines: selectComputedLines,
  selectStats: selectComputedStats,
  selectDot: selectComputedDot,
  selectSvg: selectComputedSvg,
}: ComputedSelectors = computedAdapter

export const {setTree, setLines, setStats, setDot, setSvg} =
  computedSlice.actions
