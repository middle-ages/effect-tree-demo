import {K} from '#Function'
import type {NumericFormat} from '#model'
import {pluck} from '#Record'
import type {CaseReducer, ReducerCreators, Selector} from '@reduxjs/toolkit'
import {Array} from 'effect'
import type {Draw} from 'effect-tree'

export const initialState: RootDataState = {
  code: [1, 2, 3, 4, 3, 2, 1],
  format: 'decimal',
  theme: 'unixRound',
}

export interface TreeCode {
  code: number[]
}

export interface TreeStyle {
  format: NumericFormat
  theme: Draw.ThemeName
}

export interface RootState {
  data: RootDataState
}

export interface RootDataState extends TreeStyle, TreeCode {}

export type RootSelector<A> = Selector<RootState, A>
export type RootDataSelector<A> = Selector<RootDataState, A>

export type DataReducer<A> = CaseReducer<
  RootDataState,
  {payload: A; type: string}
>

/**
 * A reducer that applies some function on the current tree code and requires no
 * payload.
 */
export type VoidDataReducer = DataReducer<void>

export interface BuildReducer<A> {
  (create: ReducerCreators<RootDataState>): DataReducer<A>
}

export interface SetDigitPayload {
  digit: number
  index: number
}

export const [pluckData, pluckCode, pluckFormat, pluckTheme]: [
  (state: RootState) => RootDataState,
  (self: RootDataState) => number[],
  (self: RootDataState) => NumericFormat,
  (self: RootDataState) => Draw.ThemeName,
] = [pluck('data'), pluck('code'), pluck('format'), pluck('theme')]

export const setCode = (
  {code: _, ...state}: RootDataState,
  code: number[],
): RootDataState => ({...state, code})

export const setFormat = (
  {format: _, ...state}: RootDataState,
  format: NumericFormat,
): RootDataState => ({...state, format})

export const setTheme = (
  {theme: _, ...state}: RootDataState,
  theme: Draw.ThemeName,
): RootDataState => ({...state, theme})

export const setDigit = (
  {code, ...state}: RootDataState,
  {digit, index}: SetDigitPayload,
): RootDataState => ({
  ...state,
  code: Array.modify(code, index, K(digit)),
})
