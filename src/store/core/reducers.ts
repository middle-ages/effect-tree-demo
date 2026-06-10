import type {NumericFormat} from '#model'
import {type ReducerCreators} from '@reduxjs/toolkit'
import {Codec, Draw} from 'effect-tree'
import type {Simplify} from 'type-fest'
import type {
  BuildReducer,
  CoreReducer,
  CoreState,
  SetDigitPayload,
  VoidCoreReducer,
} from '../data'
import * as State from '../data'
import type {AnyDecIncKey, DecIncPayload, RandomCodeKey} from './action'
import {decIncReducers} from './decIncActions'
import {randomCodeReducers} from './randomActions'

const setCode: BuildReducer<number[]> = create =>
  create.reducer<number[]>((state, {payload: code}) =>
    State.setCode(state)(code),
  )

const setDigit: BuildReducer<SetDigitPayload> = create =>
  create.reducer<SetDigitPayload>((state, {payload}) =>
    State.setDigit(state)(payload),
  )

const setRepeatAction: BuildReducer<State.RepeatActionName> = create =>
  create.reducer<State.RepeatActionName>((state, {payload}) =>
    State.setRepeatAction(state)(payload),
  )

const unsetRepeatAction: BuildReducer<void> = create =>
  create.reducer<void>(state => State.setRepeatAction(state)(undefined))

const setTreeIndex: BuildReducer<string> = create =>
  create.reducer<string>((state, {payload}) =>
    State.setCode(state)(
      Codec.Prufer.fromOrdinal(
        BigInt(payload),
        Codec.Prufer.computeNodeCount(state.code),
      ),
    ),
  )

const setNodeCount: BuildReducer<number> = create =>
  create.reducer<number>(({code: _, ...state}, {payload: nodeCount}) => ({
    ...state,
    code: Codec.Prufer.getFirstCodeFor(nodeCount),
  }))

const setFormat: BuildReducer<NumericFormat> = create =>
  create.reducer<NumericFormat>((state, {payload}) =>
    State.setFormat(state)(payload),
  )

const setTheme: BuildReducer<Draw.ThemeName> = create =>
  create.reducer<Draw.ThemeName>((state, {payload}) =>
    State.setTheme(state)(payload),
  )

interface CodeSetters {
  setCode: CoreReducer<number[]>
  setInitialCode: CoreReducer<number[]>
  setDigit: CoreReducer<SetDigitPayload>
  setTreeIndex: CoreReducer<string>
  setNodeCount: CoreReducer<number>
}

const codeSetters = (create: ReducerCreators<CoreState>): CodeSetters => ({
  setCode: setCode(create),
  setInitialCode: setCode(create),
  setDigit: setDigit(create),
  setTreeIndex: setTreeIndex(create),
  setNodeCount: setNodeCount(create),
})

interface StyleSetters {
  setFormat: CoreReducer<NumericFormat>
  setTheme: CoreReducer<Draw.ThemeName>
}

const styleSetters = (create: ReducerCreators<CoreState>): StyleSetters => ({
  setFormat: setFormat(create),
  setTheme: setTheme(create),
})

interface _Reducers
  extends
    CodeSetters,
    StyleSetters,
    Record<RandomCodeKey, VoidCoreReducer>,
    Record<AnyDecIncKey, CoreReducer<DecIncPayload>> {
  setRepeatAction: CoreReducer<State.RepeatActionName>
  unsetRepeatAction: CoreReducer<void>
}

export type Reducers = Simplify<_Reducers>

export const reducers = (create: ReducerCreators<CoreState>): Reducers => ({
  ...codeSetters(create),
  ...styleSetters(create),
  ...decIncReducers(create),
  ...randomCodeReducers(create),
  setRepeatAction: setRepeatAction(create),
  unsetRepeatAction: unsetRepeatAction(create),
})
