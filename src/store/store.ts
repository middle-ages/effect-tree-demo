import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {dataSlice} from './dataSlice'
import {computedSlice} from './computedSlice'
import {listenerMiddleware} from './middleware'

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: combineSlices(dataSlice, computedSlice),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
