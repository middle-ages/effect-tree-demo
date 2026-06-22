import {pipe} from '#Function'
import {pluck} from '#Record'
import {
  createSlice,
  type ReducerCreators,
  type Slice,
  type SliceSelectors,
} from '@reduxjs/toolkit'
import {
  initialAppState,
  type AppState,
  type RootSelector,
  type RootState,
} from './data'

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
  selectLeftWidthPx: pluck('leftWidthPx'),
}

type AppReducers = ReturnType<typeof reducers>

const reducers = (create: ReducerCreators<AppState>) => ({
  setLeftWidthPx: create.reducer<AppState>((state, {payload}) => ({
    ...state,
    ...payload,
  })),
})

export const appSlice: AppSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers,
  selectors,
})

const appAdapter = pipe(
  pluck('app')<RootState>,
  appSlice.getSelectors<RootState>,
)

interface AppSelectors {
  selectLeftWidthPx: RootSelector<number>
}

export const {selectLeftWidthPx}: AppSelectors = appAdapter
export const {setLeftWidthPx} = appSlice.actions
