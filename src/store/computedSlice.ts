import {pipe} from '#Function'
import type {PrimedStats} from '#model'
import {pluck} from '#Record'
import {
  createSlice,
  type ActionCreatorWithPayload,
  type PayloadAction,
  type ReducerCreators,
  type Slice,
} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import {
  type ComputedState,
  type RootSelector,
  type RootState,
  initialComputedState as initialState,
} from './data'
import * as data from './data'
import type {ComputeTag, ResponseMap} from './worker'

export type ComputedSlice = Slice<
  ComputedState,
  ReturnType<typeof reducers>,
  'computed',
  'computed',
  typeof selectors
>

const selectors = {
  selectTree: data.pluckTree,
  selectLines: data.pluckLines,
  selectStats: data.pluckStats,
  selectSvg: data.pluckSvg,
} as const

const reducers = (create: ReducerCreators<ComputedState>) => ({
  setTree: create.reducer<Branch<number>>((state, {payload}) =>
    data.setTree(state)(payload),
  ),
  setLines: create.reducer<string[]>((state, {payload}) =>
    data.setLines(state)(payload),
  ),

  setStats: create.reducer<PrimedStats>((state, {payload}) =>
    data.setStats(state)(payload),
  ),

  setSvg: create.reducer<string>((state, {payload}) =>
    data.setSvg(state)(payload),
  ),
})

export const computedSlice: ComputedSlice = createSlice({
  name: 'computed',
  initialState,
  reducers,
  selectors,
})

const computedAdapter = pipe(
  pluck('computed')<RootState>,
  computedSlice.getSelectors<RootState>,
)

type ComputedSelectors = {
  [Tag in ComputeTag as `select${Capitalize<Tag>}`]: RootSelector<
    ResponseMap[Tag]
  >
}

export const {
  selectTree: selectComputedTree,
  selectLines: selectComputedLines,
  selectStats: selectComputedStats,
  selectSvg: selectComputedSvg,
}: ComputedSelectors = computedAdapter

export const {setTree, setLines, setStats, setSvg} = computedSlice.actions

export type ComputeActionName<Tag extends ComputeTag> =
  `computed/set${Capitalize<Tag>}`

export type ComputePayloadAction<Tag extends ComputeTag> = PayloadAction<
  ResponseMap[Tag],
  ComputeActionName<Tag>
>

export const computeActions: {
  [Tag in ComputeTag]: ActionCreatorWithPayload<
    ResponseMap[Tag],
    ComputeActionName<Tag>
  >
} = {
  tree: setTree,
  lines: setLines,
  stats: setStats,
  svg: setSvg,
}
