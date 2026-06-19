import {identity, pipe} from '#Function'
import {pluck} from '#Record'
import type {NumericFormat} from '#model'
import {createSlice, type Slice} from '@reduxjs/toolkit'
import type {Draw} from 'effect-tree'
import {reducers, type Reducers} from './reducers'
import {
  initialState,
  pluckCode,
  pluckFormat,
  pluckTheme,
  type RootDataState,
  type RootSelector,
  type RootState,
} from './data'

const dataSelectors = {
  selectCode: pluckCode,
  selectFormat: pluckFormat,
  selectTheme: pluckTheme,
  selectData: identity<RootDataState>,
}

type DataSelectors = typeof dataSelectors

export type DataSlice = Slice<
  RootDataState,
  Reducers,
  'data',
  'data',
  DataSelectors
>

export const dataSlice: DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers,
  selectors: dataSelectors,
})

export const dataAdapter = pipe(
  pluck('data')<RootState>,
  dataSlice.getSelectors<RootState>,
)

export const [selectCode, selectFormat, selectTheme, selectData]: [
  RootSelector<number[]>,
  RootSelector<NumericFormat>,
  RootSelector<Draw.ThemeName>,
  RootSelector<RootDataState>,
] = [
  dataAdapter.selectCode,
  dataAdapter.selectFormat,
  dataAdapter.selectTheme,
  dataAdapter.selectData,
]

export const {
  setCode,
  setDigit,

  setTreeIndex,
  setNodeCount,

  firstCode,
  decHalfCode,
  decCode,

  incCode,
  incHalfCode,
  lastCode,

  firstNodeCount,
  decHalfNodeCount,
  decNodes,

  incNodes,
  incHalfNodeCount,
  lastNodeCount,

  randomCode,
  randomBoth,
  randomNodes,

  setFormat,
  setTheme,
} = dataSlice.actions
