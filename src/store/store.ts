import {TreeCode, TreeStyle} from '#model'
import {combineSlices, configureStore} from '@reduxjs/toolkit'

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export const reducer = combineSlices(TreeCode.codeSlice, TreeStyle.styleSlice)
export const store = configureStore({reducer})
