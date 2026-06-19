import {identity} from '#Function'
import {pluck} from '#Record'
import {createSlice, type ReducerCreators, type Slice} from '@reduxjs/toolkit'
import {initialComputedState, type ComputedState} from './data'

export type ComputedSlice = Slice<
  ComputedState,
  ComputedReducers,
  'computed',
  'computed',
  ComputedSelectors
>

type ComputedSelectors = typeof selectors
type ComputedReducers = ReturnType<typeof reducers>

const selectors = {
  selectTree: pluck('tree'),
  selectLines: pluck('lines'),
  selectStats: pluck('stats'),
  selectComputed: identity<ComputedState>,
}

const reducers = (create: ReducerCreators<ComputedState>) => ({
  setComputed: create.reducer<ComputedState>((state, {payload}) => ({
    ...state,
    ...payload,
  })),
})

export const computedSlice: ComputedSlice = createSlice({
  name: 'computed',
  initialState: initialComputedState,
  reducers,
  selectors,
})
