import {pipe} from '#Function'
import type {QuickStats, StatValues} from '#model'
import {pluck} from '#Record'
import type {DigitAndCount} from '#store'
import {
  createSelector,
  createSlice,
  type OutputSelector,
  type PayloadAction,
  type ReducerCreators,
  type Slice,
} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import * as data from './data'
import {type ComputedState, type RootSelector, type RootState} from './data'
import {initialComputed as initialState} from './initialState'
import type {ComputeTag, ResponseMap} from './worker/message'

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
  selectMaxDegree: data.pluckMaxDegree,
  selectMaxDepth: data.pluckMaxDepth,
  selectSvg: data.pluckSvg,
  selectComputedCode: data.pluckCode,
} as const

const reducers = (create: ReducerCreators<ComputedState>) => ({
  setTree: create.reducer<Branch<number>>((state, {payload}) =>
    data.setTree(state)(payload),
  ),

  setLines: create.reducer<string[]>((state, {payload}) =>
    data.setLines(state)(payload),
  ),

  setQuickStats: create.reducer<QuickStats>((state, {payload}) =>
    data.setQuickStats(state)(payload),
  ),

  setMaxDegree: create.reducer<string>((state, {payload}) =>
    data.setMaxDegree(state)(payload),
  ),

  setMaxDepth: create.reducer<string>((state, {payload}) =>
    data.setMaxDepth(state)(payload),
  ),

  setSvg: create.reducer<string>((state, {payload}) =>
    data.setSvg(state)(payload),
  ),

  setComputed: create.reducer<ComputedState>((_, {payload}) => payload),

  setComputedCode: create.reducer<number[]>((state, {payload: code}) =>
    data.setComputedCode(state)(code),
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
} & {
  selectStats: RootSelector<StatValues>
  selectComputedCode: RootSelector<number[]>
}

export const {
  selectTree,
  selectLines,
  selectStats,
  selectMaxDegree,
  selectMaxDepth,
  selectSvg,
  selectComputedCode,
}: ComputedSelectors = computedAdapter

export const {
  setTree,
  setLines,
  setQuickStats,
  setMaxDegree,
  setMaxDepth,
  setSvg,
  setComputed,
  setComputedCode,
} = computedSlice.actions

export type ComputeActionName<Tag extends ComputeTag> =
  `computed/set${Capitalize<Tag>}`

export type ComputePayloadAction<Tag extends ComputeTag> = PayloadAction<
  ResponseMap[Tag],
  ComputeActionName<Tag>
>

export const selectComputedDigitAndCount = (
  index: number,
): OutputSelector<[RootSelector<number[]>], DigitAndCount> =>
  createSelector([selectComputedCode], code => ({
    index,
    digit: code[index] ?? 0,
    digitCount: code.length,
  }))
