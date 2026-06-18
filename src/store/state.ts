import {K, type EndoOf} from '#Function'
import type {NumericFormat} from '#model'
import {pluck} from '#Record'
import type {BaseItem, DisabledProps} from '#types'
import type {CaseReducer, ReducerCreators, Selector} from '@reduxjs/toolkit'
import {Array} from 'effect'
import type {Draw} from 'effect-tree'

export const initialState: RootDataState = {
  code: [1, 2, 3],
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

export interface SetDigitPayload {
  digit: number
  index: number
}

export type ReducerOf<A> = CaseReducer<
  RootDataState,
  {payload: A; type: string}
>

export type RootDataSelector<A> = Selector<RootDataState, A>
export type RootSelector<A> = Selector<{data: RootDataState}, A>

/**
 * A reducer that applies some function on the current tree code and requires no
 * payload.
 */
export type Modifier = ReducerOf<void>

export interface BuildReducer<A> {
  (create: ReducerCreators<RootDataState>): ReducerOf<A>
}

export const pluckData: (state: RootState) => RootDataState = pluck(
  'data',
)<RootState>

export const [pluckCode, pluckFormat, pluckTheme]: [
  (self: RootDataState) => number[],
  (self: RootDataState) => NumericFormat,
  (self: RootDataState) => Draw.ThemeName,
] = [pluck('code'), pluck('format'), pluck('theme')]

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

/**
 * A function that builds the state for an action button from the current tree.
 */
export interface StateBuilder {
  (code: number[]): DisabledProps
}

/**
 * A tree action that modifies the current tree code.
 */
export interface ModifyAction<Id extends string> extends BaseItem<Id> {
  buildState: StateBuilder
  apply: EndoOf<number[]>
  canRepeat?: boolean
}

/**
 * Convert a `ModifyAction` into a `Modifier`.
 */
export const toBuilderEntry =
  (create: ReducerCreators<RootDataState>) =>
  <Id extends string>({id, apply}: ModifyAction<Id>): [Id, Modifier] => [
    id,
    create.reducer(({code, ...state}) => ({...state, code: apply(code)})),
  ]
