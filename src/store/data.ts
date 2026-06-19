import {K} from '#Function'
import {
  drawRomanTree,
  primeStats,
  type NumericFormat,
  type PrimedStats,
} from '#model'
import {pluck} from '#Record'
import type {CaseReducer, ReducerCreators, Selector} from '@reduxjs/toolkit'
import {Array} from 'effect'
import {type Draw, type Tree, Codec} from 'effect-tree'

export const initialDataState: DataState = {
  code: [],
  format: 'decimal',
  theme: 'unixRound',
}

const initialTree = Codec.Prufer.decode(initialDataState.code)

export const initialComputedState: ComputedState = {
  tree: initialTree,
  lines: drawRomanTree(
    initialTree,
    initialDataState.format,
    initialDataState.theme,
  ),
  stats: primeStats(initialDataState.code, initialTree),
}

export interface TreeCode {
  code: number[]
}

export interface TreeStyle {
  format: NumericFormat
  theme: Draw.ThemeName
}

export interface RootState {
  data: DataState
}

export interface DataState extends TreeStyle, TreeCode {}

export interface ComputedState {
  tree: Tree<number>
  lines: string[]
  stats: PrimedStats
}

export type RootSelector<A> = Selector<RootState, A>
export type DataSelector<A> = Selector<DataState, A>

export type DataReducer<A> = CaseReducer<DataState, {payload: A; type: string}>

/**
 * A reducer that applies some function on the current tree code and requires no
 * payload.
 */
export type VoidDataReducer = DataReducer<void>

export interface BuildReducer<A> {
  (create: ReducerCreators<DataState>): DataReducer<A>
}

export interface SetDigitPayload {
  digit: number
  index: number
}

export const [pluckData, pluckCode, pluckFormat, pluckTheme]: [
  (state: RootState) => DataState,
  (self: DataState) => number[],
  (self: DataState) => NumericFormat,
  (self: DataState) => Draw.ThemeName,
] = [pluck('data'), pluck('code'), pluck('format'), pluck('theme')]

export const setCode = (
  {code: _, ...state}: DataState,
  code: number[],
): DataState => ({...state, code})

export const setFormat = (
  {format: _, ...state}: DataState,
  format: NumericFormat,
): DataState => ({...state, format})

export const setTheme = (
  {theme: _, ...state}: DataState,
  theme: Draw.ThemeName,
): DataState => ({...state, theme})

export const setDigit = (
  {code, ...state}: DataState,
  {digit, index}: SetDigitPayload,
): DataState => ({
  ...state,
  code: Array.modify(code, index, K(digit)),
})
