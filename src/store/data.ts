import * as Array from '#Array'
import {flow, K} from '#Function'
import {
  primedToValues,
  type NumericFormat,
  type PrimedStats,
  type QuickStats,
  type StatValues,
} from '#model'
import {monoRecord, pluck} from '#Record'
import type {CaseReducer, ReducerCreators, Selector} from '@reduxjs/toolkit'
import {type Branch, type Draw} from 'effect-tree'
import type {Simplify} from 'type-fest'

export interface TreeCode {
  code: number[]
}

export interface TreeBranch {
  tree: Branch<number>
}

export interface TreeStats {
  stats: StatValues
}

export interface TreeLines {
  lines: string[]
}

export interface TreeSvg {
  svg: string
}

export interface TreeStyle {
  format: NumericFormat
  theme: Draw.ThemeName
}

export interface RootState {
  core: CoreState
  computed: ComputedState
  app: AppState
}

export interface FromState<Result> {
  (state: RootState): Result
}

export interface _CoreState extends TreeStyle, TreeCode {
  repeatAction: RepeatActionName | undefined
}

export interface _ComputedState
  extends TreeLines, TreeStats, TreeSvg, TreeBranch, TreeCode {}

export type CoreState = Simplify<_CoreState>
export type ComputedState = Simplify<_ComputedState>

/**
 * Actions that can be in _repeat_ mode.
 */
export const repeatActionNames = [
  'decHalfCode',
  'decCode',
  'incCode',
  'incHalfCode',
  'decHalfNodeCount',
  'decNodes',
  'incNodes',
  'incHalfNodeCount',
] as const

const repeatActionToTrue: Record<RepeatActionName, true> = monoRecord(true)(
  ...repeatActionNames,
)

export const isRepeatActionName = (name: string): name is RepeatActionName =>
  name in repeatActionToTrue

export type RepeatActionName = (typeof repeatActionNames)[number]

export interface AppState {
  leftWidthPx: number
  topWidthPx: number
  isWelcomeOpen: boolean
  showTooltips: boolean
}

export type RootSelector<A> = Selector<RootState, A>
export type CoreSelector<A> = Selector<CoreState, A>
export type CoreReducer<A> = CaseReducer<CoreState, {payload: A; type: string}>

/**
 * A reducer that applies some function on the current tree code and requires no
 * payload.
 */
export type VoidCoreReducer = CoreReducer<void>

export interface BuildReducer<A> {
  (create: ReducerCreators<CoreState>): CoreReducer<A>
}

export interface SetDigitPayload {
  digit: number
  index: number
}

export const pluckPayload = <Payload extends {payload: unknown}>({
  payload,
}: Payload): Payload['payload'] => payload

export const [
  pluckCore,
  pluckComputed,
  pluckApp,
  pluckCode,
  pluckFormat,
  pluckTheme,
  pluckRepeatAction,
  pluckTree,
  pluckLines,
  pluckStats,
  pluckSvg,
  pluckLeftWidthPx,
  pluckTopWidthPx,
  pluckIsWelcomeOpen,
  pluckShowTooltips,
]: [
  (state: RootState) => CoreState,
  (state: RootState) => ComputedState,
  (state: RootState) => AppState,
  (self: TreeCode) => number[],
  (self: TreeStyle) => NumericFormat,
  (self: TreeStyle) => Draw.ThemeName,
  (self: CoreState) => RepeatActionName | undefined,
  (self: TreeBranch) => Branch<number>,
  (self: TreeLines) => string[],
  (self: TreeStats) => StatValues,
  (self: TreeSvg) => string,
  (self: AppState) => number,
  (self: AppState) => number,
  (self: AppState) => boolean,
  (self: AppState) => boolean,
] = [
  pluck('core'),
  pluck('computed'),
  pluck('app'),
  pluck('code'),
  pluck('format'),
  pluck('theme'),
  pluck('repeatAction'),
  pluck('tree'),
  pluck('lines'),
  pluck('stats'),
  pluck('svg'),
  pluck('leftWidthPx'),
  pluck('topWidthPx'),
  pluck('isWelcomeOpen'),
  pluck('showTooltips'),
]

export const pluckMaxDegree: (self: TreeStats) => string = flow(
  pluck('stats'),
  pluck('maxDegree'),
)

export const pluckMaxDepth: (self: TreeStats) => string = flow(
  pluck('stats'),
  pluck('maxDepth'),
)

export const setComputedState =
  ({computed: _, ...state}: RootState) =>
  (computed: ComputedState): RootState => ({...state, computed})

export const setCode =
  ({code: _, ...state}: CoreState) =>
  (code: number[]): CoreState => ({...state, code})

export const setFormat =
  ({format: _, ...state}: CoreState) =>
  (format: NumericFormat): CoreState => ({...state, format})

export const setTheme =
  ({theme: _, ...state}: CoreState) =>
  (theme: Draw.ThemeName): CoreState => ({...state, theme})

export const setDigit =
  ({code, ...state}: CoreState) =>
  ({digit, index}: SetDigitPayload): CoreState => ({
    ...state,
    code: Array.modify(code, index, K(digit)),
  })

export const setTree =
  ({tree: _, ...state}: ComputedState) =>
  (tree: Branch<number>): ComputedState => ({...state, tree})

export const setLines =
  ({lines: _, ...state}: ComputedState) =>
  (lines: string[]): ComputedState => ({...state, lines})

export const setStats =
  ({stats: _, ...state}: ComputedState) =>
  (stats: PrimedStats): ComputedState => ({
    ...state,
    stats: primedToValues(stats),
  })

export const setQuickStats =
  ({stats: previousStats, ...state}: ComputedState) =>
  (stats: QuickStats): ComputedState => ({
    ...state,
    stats: {...previousStats, ...primedToValues(stats)},
  })

export const setMaxDegree =
  ({stats: {maxDegree: _, ...previousStats}, ...state}: ComputedState) =>
  (maxDegree: string): ComputedState => ({
    ...state,
    stats: {...previousStats, maxDegree},
  })

export const setMaxDepth =
  ({stats: {maxDepth: _, ...previousStats}, ...state}: ComputedState) =>
  (maxDepth: string): ComputedState => ({
    ...state,
    stats: {...previousStats, maxDepth},
  })

export const setSvg =
  ({svg: _, ...state}: ComputedState) =>
  (svg: string): ComputedState => ({...state, svg})

export const setLeftWidthPx =
  ({leftWidthPx: _, ...state}: AppState) =>
  (leftWidthPx: number): AppState => ({...state, leftWidthPx})

export const setTopWidthPx =
  ({topWidthPx: _, ...state}: AppState) =>
  (topWidthPx: number): AppState => ({...state, topWidthPx})

export const setIsWelcomeOpen =
  ({isWelcomeOpen: _, ...state}: AppState) =>
  (isWelcomeOpen: boolean): AppState => ({...state, isWelcomeOpen})

export const setShowTooltips =
  ({showTooltips: _, ...state}: AppState) =>
  (showTooltips: boolean): AppState => ({
    ...state,
    showTooltips,
  })

export const setRepeatAction =
  ({repeatAction: _, ...state}: CoreState) =>
  (repeatAction: RepeatActionName | undefined): CoreState => ({
    ...state,
    repeatAction,
  })

export const setComputedCode =
  ({code: _, ...state}: ComputedState) =>
  (code: number[]): ComputedState => ({...state, code})
