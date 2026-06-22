import {identity, pipe} from '#Function'
import * as Record from '#Record'
import * as Struct from 'effect/Struct'
import type {NumericFormat} from '#model'
import {
  createSlice,
  type ActionCreatorWithPayload,
  type Slice,
} from '@reduxjs/toolkit'
import type {Draw} from 'effect-tree'
import {noPayloadActionNames, type NoPayloadActions} from './action'
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
import {reducers, type Reducers} from './reducers'

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
  Record.pluck('data')<RootState>,
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

type WithPayload<Payload, Id extends string> = ActionCreatorWithPayload<
  Payload,
  Id
>

interface CodePayloadActions {
  setCode: WithPayload<number[], 'data/setCode'>
  setDigit: WithPayload<SetDigitPayload, 'data/setDigit'>
  setTreeIndex: WithPayload<string, 'data/setTreeIndex'>
  setNodeCount: WithPayload<number, 'data/setNodeCount'>
}

interface CodeActions extends NoPayloadActions, CodePayloadActions {}

interface StyleActions {
  setFormat: WithPayload<NumericFormat, 'data/setFormat'>
  setTheme: WithPayload<Draw.ThemeName, 'data/setTheme'>
}

const noPayloadActions = Struct.pick(
  dataSlice.actions,
  ...(noPayloadActionNames as unknown as (keyof typeof dataSlice.actions)[]),
) as NoPayloadActions

export const codePayloadActions: CodePayloadActions = {
  setCode,
  setDigit,
  setTreeIndex,
  setNodeCount,
}

/**
 * Actions that change only the tree code.
 */
export const codeActions: CodeActions = {
  ...codePayloadActions,
  ...noPayloadActions,
}

/**
 * Actions that change only the tree style.
 */
export const styleActions: StyleActions = {setFormat, setTheme}

export const actions: CodeActions & StyleActions = {
  ...codeActions,
  ...styleActions,
}
