import {pipe} from '#Function'
import {
  createSlice,
  type ReducerCreators,
  type Slice,
  type SliceSelectors,
} from '@reduxjs/toolkit'
import type {AppState, RootSelector, RootState} from './data'
import * as data from './data'

export type AppSlice = Slice<
  AppState,
  AppReducers,
  'app',
  'app',
  SelectorDefinitions
>

interface SelectorDefinitions extends SliceSelectors<AppState> {
  selectLeftWidthPx: (state: AppState) => number
}

const selectors: SelectorDefinitions = {
  selectLeftWidthPx: data.pluckLeftWidthPx,
}

type AppReducers = ReturnType<typeof reducers>

const reducers = (create: ReducerCreators<AppState>) => ({
  setLeftWidthPx: create.reducer<AppState>((state, {payload: {leftWidthPx}}) =>
    data.setLeftWidthPx(state)(leftWidthPx),
  ),
})

export const appSlice: AppSlice = createSlice({
  name: 'app',
  initialState: data.initialAppState,
  reducers,
  selectors,
})

const appAdapter = pipe(data.pluckApp, appSlice.getSelectors<RootState>)

interface AppSelectors {
  selectLeftWidthPx: RootSelector<number>
}

export const {selectLeftWidthPx}: AppSelectors = appAdapter
export const {setLeftWidthPx} = appSlice.actions
