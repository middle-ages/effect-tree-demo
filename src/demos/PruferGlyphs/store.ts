import {map, range} from '#Array'
import {flow, pipe} from '#util'
import {fromEntries, pluck} from '#Record'
import {
  createSlice,
  configureStore,
  type WritableDraft,
  type ReducerCreators,
  type CaseReducer,
} from '@reduxjs/toolkit'
import {Codec, type EndoOf} from 'effect-tree'
import {decIncJumps} from './hooks/actions'
import {type ModifyAction} from './hooks/actions'

export interface CodeSliceState {
  code: number[]
}

type Case = CaseReducer<CodeSliceState, {type: string; payload: void}>

export const initialState: CodeSliceState = {code: range(1, 10)}

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: create => pipe(decCodeActions, map(asReducer(create)), fromEntries),
})

const asReducer =
  (create: ReducerCreators<CodeSliceState>) =>
  ({id, apply}: ModifyAction): [string, Case] => [
    id,
    create.reducer((state: WritableDraft<CodeSliceState>): void => {
      state.code = apply(state.code)
    }),
  ]
