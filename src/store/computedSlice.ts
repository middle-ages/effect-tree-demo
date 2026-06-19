import {identity, pipe} from '#Function'
import type {PrimedStats} from '#model'
import {pluck} from '#Record'
import {
  createSlice,
  type ReducerCreators,
  type Slice,
  type SliceSelectors,
} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import {
  initialComputedState,
  type ComputedState,
  type RootSelector,
  type RootState,
} from './data'

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
  selectComputed: (state: ComputedState) => ComputedState
}

const selectors: SelectorDefinitions = {
  selectTree: pluck('tree'),
  selectLines: pluck('lines'),
  selectStats: pluck('stats'),
  selectComputed: identity<ComputedState>,
}

type ComputedReducers = ReturnType<typeof reducers>

const reducers = (create: ReducerCreators<ComputedState>) => ({
  setComputed: create.reducer<ComputedState>((state, {payload}) => ({
    ...state,
    ...payload,
  })),
})

export const computedSlice: ComputedSlice = createSlice({
  name: 'computed',
  initialState: initialComputedState,
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
  selectComputed: RootSelector<ComputedState>
}

export const {
  selectTree: selectComputedTree,
  selectLines: selectComputedLines,
  selectStats: selectComputedStats,
  selectComputed: selectComputedState,
}: ComputedSelectors = computedAdapter

export const {setComputed} = computedSlice.actions
