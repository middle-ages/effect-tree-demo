import {identity, pipe} from '#Function'
import type {NumericFormat} from '#model'
import * as Record from '#Record'
import {decIncActionNames, randomActionNames} from '#store'
import {createSlice, type Slice} from '@reduxjs/toolkit'
import type {Draw} from 'effect-tree'
import {pick} from 'effect/Struct'
import type {Simplify} from 'type-fest'
import {
  pluckCode,
  pluckFormat,
  pluckRepeatAction,
  pluckTheme,
  repeatActionNames,
  type CoreState,
  type RepeatActionName,
  type RootSelector,
  type RootState,
  type SetDigitPayload,
} from '../data'
import {initialCore as initialState} from '../initialState'
import type {DecIncActions, WithPayload} from './action'
import {type RandomCodeActions} from './randomActions'
import {reducers, type Reducers} from './reducers'

const coreSelectors = {
  selectCode: pluckCode,
  selectFormat: pluckFormat,
  selectTheme: pluckTheme,
  selectRepeatAction: pluckRepeatAction,
  selectCore: identity<CoreState>,
}

type CoreSelectors = typeof coreSelectors

export type CoreSlice = Slice<
  CoreState,
  Reducers,
  'core',
  'core',
  CoreSelectors
>

export const coreSlice: CoreSlice = createSlice({
  name: 'core',
  initialState,
  reducers,
  selectors: coreSelectors,
})

export const coreAdapter = pipe(
  Record.pluck('core')<RootState>,
  coreSlice.getSelectors<RootState>,
)

export const [
  selectCode,
  selectFormat,
  selectTheme,
  selectRepeatAction,
  selectCore,
]: [
  RootSelector<number[]>,
  RootSelector<NumericFormat>,
  RootSelector<Draw.ThemeName>,
  RootSelector<RepeatActionName | undefined>,
  RootSelector<CoreState>,
] = [
  coreAdapter.selectCode,
  coreAdapter.selectFormat,
  coreAdapter.selectTheme,
  coreAdapter.selectRepeatAction,
  coreAdapter.selectCore,
]

export const {
  setCode,
  setInitialCode,
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
  setRepeatAction,
  unsetRepeatAction,
} = coreSlice.actions

interface CodePayloadActions {
  setCode: WithPayload<number[], 'core/setCode'>
  setInitialCode: WithPayload<number[], 'core/setInitialCode'>
  setDigit: WithPayload<SetDigitPayload, 'core/setDigit'>
  setTreeIndex: WithPayload<string, 'core/setTreeIndex'>
  setNodeCount: WithPayload<number, 'core/setNodeCount'>
}

interface _CodeActions
  extends DecIncActions, RandomCodeActions, CodePayloadActions {}
export type CodeActions = Simplify<_CodeActions>

interface StyleActions {
  setFormat: WithPayload<NumericFormat, 'core/setFormat'>
  setTheme: WithPayload<Draw.ThemeName, 'core/setTheme'>
}

export const codePayloadActions: CodePayloadActions = {
  setCode,
  setInitialCode,
  setDigit,
  setTreeIndex,
  setNodeCount,
}

/**
 * Actions that change only the tree code.
 */
export const codeActions: CodeActions = {
  ...codePayloadActions,
  ...pick(coreSlice.actions, ...decIncActionNames),
  ...pick(coreSlice.actions, ...randomActionNames),
}

/**
 * Actions that change only the tree style.
 */
export const styleActions: StyleActions = {setFormat, setTheme}

export const actions: CodeActions & StyleActions = {
  ...codeActions,
  ...styleActions,
}

export type RepeatActions = Pick<CodeActions, RepeatActionName>

export const repeatActions: RepeatActions = pick(
  codeActions,
  ...repeatActionNames,
)
