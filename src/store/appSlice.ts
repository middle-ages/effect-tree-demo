import {pipe} from '#Function'
import {
  createSlice,
  type ReducerCreators,
  type Slice,
  type SliceSelectors,
} from '@reduxjs/toolkit'
import type {AppState, RootSelector, RootState} from './data'
import * as data from './data'
import {initialApp as initialState} from './initialState'
import type {Pair} from '#Pair'

export type AppSlice = Slice<
  AppState,
  AppReducers,
  'app',
  'app',
  SelectorDefinitions
>

interface SelectorDefinitions extends SliceSelectors<AppState> {
  selectLeftWidthPx: (state: AppState) => number
  selectTopWidthPx: (state: AppState) => number
  selectIsWelcomeOpen: (state: AppState) => boolean
  selectShowTooltips: (state: AppState) => boolean
}

const selectors: SelectorDefinitions = {
  selectLeftWidthPx: data.pluckLeftWidthPx,
  selectTopWidthPx: data.pluckTopWidthPx,
  selectIsWelcomeOpen: data.pluckIsWelcomeOpen,
  selectShowTooltips: data.pluckShowTooltips,
}

type AppReducers = ReturnType<typeof reducers>

const reducers = (create: ReducerCreators<AppState>) => ({
  setLeftWidthPx: create.reducer<number>((state, {payload: leftWidthPx}) =>
    data.setLeftWidthPx(state)(leftWidthPx),
  ),

  setTopWidthPx: create.reducer<number>((state, {payload: topWidthPx}) =>
    data.setTopWidthPx(state)(topWidthPx),
  ),

  setWidths: create.reducer<Pair<number>>(
    (state, {payload: [topWidthPx, leftWidthPx]}): AppState =>
      pipe(
        leftWidthPx,
        pipe(topWidthPx, data.setTopWidthPx(state), data.setLeftWidthPx),
      ),
  ),

  setIsWelcomeOpen: create.reducer<boolean>((state, {payload: isWelcomeOpen}) =>
    data.setIsWelcomeOpen(state)(isWelcomeOpen),
  ),

  closeWelcome: create.reducer<void>(state =>
    data.setIsWelcomeOpen(state)(false),
  ),

  openWelcome: create.reducer<void>(state =>
    data.setIsWelcomeOpen(state)(true),
  ),

  setShowTooltips: create.reducer<void>(state =>
    data.setShowTooltips(state)(true),
  ),

  setHideTooltips: create.reducer<void>(state =>
    data.setShowTooltips(state)(false),
  ),
})

export const appSlice: AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
  selectors,
})

const appAdapter = pipe(data.pluckApp, appSlice.getSelectors<RootState>)

interface AppSelectors {
  selectLeftWidthPx: RootSelector<number>
  selectTopWidthPx: RootSelector<number>
  selectIsWelcomeOpen: RootSelector<boolean>
  selectShowTooltips: RootSelector<boolean>
}

export const {
  selectLeftWidthPx,
  selectTopWidthPx,
  selectIsWelcomeOpen,
  selectShowTooltips,
}: AppSelectors = appAdapter

export const {
  setLeftWidthPx,
  setTopWidthPx,
  setWidths,
  setIsWelcomeOpen,
  closeWelcome,
  openWelcome,
  setShowTooltips,
  setHideTooltips,
} = appSlice.actions
