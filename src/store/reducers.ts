import type {NumericFormat} from '#model'
import {type ReducerCreators} from '@reduxjs/toolkit'
import {Codec, Draw} from 'effect-tree'
import type {Simplify} from 'type-fest'
import {incDecReducers, randomCodeReducers, type DecIncJumpKey} from './code'
import type {RandomCodeKey} from './code/randomActions'
import type {
  BuildReducer,
  Modifier,
  ReducerOf,
  RootDataState,
  SetDigitPayload,
} from './state'
import * as State from './state'

const setCode: BuildReducer<number[]> = create =>
  create.reducer<number[]>((state, {payload: code}) =>
    State.setCode(state, code),
  )

const setDigit: BuildReducer<SetDigitPayload> = create =>
  create.reducer<SetDigitPayload>((state, {payload}) =>
    State.setDigit(state, payload),
  )

const setTreeIndex: BuildReducer<string> = create =>
  create.reducer<string>(
    ({code: previousCode, ...state}, {payload: index}) => ({
      ...state,
      code: Codec.Prufer.fromOrdinal(
        BigInt(index),
        Codec.Prufer.computeNodeCount(previousCode),
      ),
    }),
  )

const setNodeCount: BuildReducer<number> = create =>
  create.reducer<number>(({code: _, ...state}, {payload: nodeCount}) => ({
    ...state,
    code: Codec.Prufer.getFirstCodeFor(nodeCount),
  }))

const setFormat: BuildReducer<NumericFormat> = create =>
  create.reducer<NumericFormat>((state, {payload}) =>
    State.setFormat(state, payload),
  )

const setTheme: BuildReducer<Draw.ThemeName> = create =>
  create.reducer<Draw.ThemeName>((state, {payload}) =>
    State.setTheme(state, payload),
  )

interface CodeSetters {
  setCode: ReducerOf<number[]>
  setDigit: ReducerOf<SetDigitPayload>
  setTreeIndex: ReducerOf<string>
  setNodeCount: ReducerOf<number>
}

const codeSetters = (create: ReducerCreators<RootDataState>): CodeSetters => ({
  setCode: setCode(create),
  setDigit: setDigit(create),
  setTreeIndex: setTreeIndex(create),
  setNodeCount: setNodeCount(create),
})

interface StyleSetters {
  setFormat: ReducerOf<NumericFormat>
  setTheme: ReducerOf<Draw.ThemeName>
}

const styleSetters = (
  create: ReducerCreators<RootDataState>,
): StyleSetters => ({
  setFormat: setFormat(create),
  setTheme: setTheme(create),
})

interface _Reducers
  extends
    CodeSetters,
    StyleSetters,
    Record<RandomCodeKey | DecIncJumpKey, Modifier> {}

export type Reducers = Simplify<_Reducers>

export const reducers = (create: ReducerCreators<RootDataState>): Reducers => ({
  ...codeSetters(create),
  ...styleSetters(create),
  ...incDecReducers(create),
  ...randomCodeReducers(create),
})
