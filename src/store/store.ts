import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {dataSlice} from './dataSlice'
import {computedSlice} from './computedSlice'
import {listenerMiddleware} from './middleware'
import {appSlice} from './appSlice'

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: combineSlices(dataSlice, computedSlice, appSlice),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
