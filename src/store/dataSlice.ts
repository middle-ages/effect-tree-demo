import {identity, pipe} from '#Function'
import {pluck} from '#Record'
import type {NumericFormat} from '#model'
import {
  createSlice,
  type ActionCreator,
  type ActionCreatorWithoutPayload,
  type ActionCreatorWithPayload,
  type Slice,
} from '@reduxjs/toolkit'
import type {Draw} from 'effect-tree'
import {reducers, type Reducers} from './reducers'
import {
  initialDataState,
  pluckCode,
  pluckFormat,
  pluckTheme,
  type DataState,
  type RootSelector,
  type RootState,
  type SetDigitPayload,
} from './data'

const dataSelectors = {
  selectCode: pluckCode,
  selectFormat: pluckFormat,
  selectTheme: pluckTheme,
  selectData: identity<DataState>,
}

type DataSelectors = typeof dataSelectors

export type DataSlice = Slice<
  DataState,
  Reducers,
  'data',
  'data',
  DataSelectors
>

export const dataSlice: DataSlice = createSlice({
  name: 'data',
  initialState: initialDataState,
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
  RootSelector<DataState>,
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

type NoPayload<Id extends string> = ActionCreatorWithoutPayload<Id>
type WithPayload<Payload, Id extends string> = ActionCreatorWithPayload<
  Payload,
  Id
>

export interface Actions {
  setCode: WithPayload<number[], 'data/setCode'>
  setDigit: WithPayload<SetDigitPayload, 'data/setDigit'>
  setTreeIndex: WithPayload<string, 'data/setTreeIndex'>
  setNodeCount: WithPayload<number, 'data/setNodeCount'>
  firstCode: NoPayload<'data/firstCode'>
  decHalfCode: NoPayload<'data/decHalfCode'>
  decCode: NoPayload<'data/decCode'>
  incCode: NoPayload<'data/incCode'>
  incHalfCode: NoPayload<'data/incHalfCode'>
  lastCode: NoPayload<'data/lastCode'>
  firstNodeCount: NoPayload<'data/firstNodeCount'>
  decHalfNodeCount: NoPayload<'data/decHalfNodeCount'>
  decNodes: NoPayload<'data/decNodes'>
  incNodes: NoPayload<'data/incNodes'>
  incHalfNodeCount: NoPayload<'data/incHalfNodeCount'>
  lastNodeCount: NoPayload<'data/lastNodeCount'>
  randomCode: NoPayload<'data/randomCode'>
  randomBoth: NoPayload<'data/randomBoth'>
  randomNodes: NoPayload<'data/randomNodes'>
  setFormat: ActionCreatorWithPayload<NumericFormat, 'data/setFormat'>
  setTheme: ActionCreatorWithPayload<Draw.ThemeName, 'data/setTheme'>
}

export const actions = dataSlice.actions

/*

ActionCreatorWithoutPayload<"data/firstCode">
ActionCreatorWithPayload<"a
*/
