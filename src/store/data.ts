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
import {Codec, type Branch, type Draw} from 'effect-tree'

export const initialDataState: DataState = {
  code: [
    11, 12, 13, 14, 15, 14, 13, 12, 11, 9, 1, 9, 1, 2, 3, 4, 5, 4, 3, 2, 1, 9,
    1, 9, 11, 12, 13, 14, 15, 14, 13, 12, 11, 9, 1, 9, 1, 2, 3, 4, 5, 4, 3, 2,
    1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
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
  dot: '',
  svg: '',
}

export const initialAppState: AppState = {leftWidthPx: 100}

export interface TreeCode {
  code: number[]
}

export interface TreeBranch {
  tree: Branch<number>
}

export interface TreeStats {
  stats: PrimedStats
}

export interface TreeLines {
  lines: string[]
}

export interface TreeDot {
  dot: string
}

export interface TreeSvg {
  svg: string
}

export interface TreeStyle {
  format: NumericFormat
  theme: Draw.ThemeName
}

export interface RootState {
  data: DataState
  computed: ComputedState
  app: AppState
}

export interface DataState extends TreeStyle, TreeCode {}

export interface ComputedState
  extends TreeBranch, TreeStats, TreeLines, TreeDot, TreeSvg {}

export interface AppState {
  leftWidthPx: number
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

export const [
  pluckData,
  pluckComputed,
  pluckApp,
  pluckCode,
  pluckFormat,
  pluckTheme,
  pluckTree,
  pluckLines,
  pluckStats,
  pluckDot,
  pluckSvg,
  pluckLeftWidthPx,
]: [
  (state: RootState) => DataState,
  (state: RootState) => ComputedState,
  (state: RootState) => AppState,
  (self: DataState) => number[],
  (self: DataState) => NumericFormat,
  (self: DataState) => Draw.ThemeName,
  (self: ComputedState) => Branch<number>,
  (self: ComputedState) => string[],
  (self: ComputedState) => PrimedStats,
  (self: ComputedState) => string,
  (self: ComputedState) => string,
  (self: AppState) => number,
] = [
  pluck('data'),
  pluck('computed'),
  pluck('app'),
  pluck('code'),
  pluck('format'),
  pluck('theme'),
  pluck('tree'),
  pluck('lines'),
  pluck('stats'),
  pluck('dot'),
  pluck('svg'),
  pluck('leftWidthPx'),
]

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

export const setTree = (
  {tree: _, ...state}: ComputedState,
  tree: Branch<number>,
): ComputedState => ({...state, tree})

export const setLines = (
  {lines: _, ...state}: ComputedState,
  lines: string[],
): ComputedState => ({...state, lines})

export const setStats = (
  {stats: _, ...state}: ComputedState,
  stats: PrimedStats,
): ComputedState => ({...state, stats})

export const setDot = (
  {dot: _, ...state}: ComputedState,
  dot: string,
): ComputedState => ({...state, dot})

export const setSvg = (
  {svg: _, ...state}: ComputedState,
  svg: string,
): ComputedState => ({...state, svg})

export const setLeftWidthPx = (
  {leftWidthPx: _, ...state}: AppState,
  leftWidthPx: number,
): AppState => ({...state, leftWidthPx})
