import {pluck} from '#Record'
import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {Draw} from 'effect-tree'
import {type NumericFormat} from '../roman/index'
import {initialState, type TreeStyle} from './state'

export {
  initialState,
  numericFormatSelectItems,
  themeSelectItem,
  themeSelectItems,
  type TreeStyle,
} from './state'

const [formatSelector, themeSelector] = [
  pluck('format')<TreeStyle>,
  pluck('theme')<TreeStyle>,
]

export type StyleSlice = typeof styleSlice

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    setFormat: (state, action: PayloadAction<NumericFormat>) => ({
      ...state,
      format: action.payload,
    }),
    setTheme: (state, action: PayloadAction<Draw.ThemeName>) => ({
      ...state,
      theme: action.payload,
    }),
  },
  selectors: {
    selectFormat: formatSelector,
    selectTheme: themeSelector,
  },
})

export const {setTheme, setFormat} = styleSlice.actions
export const {selectTheme, selectFormat} = styleSlice.selectors
