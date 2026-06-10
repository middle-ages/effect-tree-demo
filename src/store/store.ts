import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {coreSlice} from './core/slice'
import {computedSlice} from './computedSlice'
import {rootMiddleware} from './middleware'
import {appSlice} from './appSlice'
import {
  persistStore,
  persistReducer,
  type Persistor,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

export type AppStore = typeof store

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value)
    return Promise.resolve(undefined)
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key)
    return Promise.resolve(undefined)
  },
}

const persistConfig = {
  key: 'root',
  storage: storage,
}

const rootReducer = combineSlices(coreSlice, computedSlice, appSlice)
const reducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(rootMiddleware.middleware),
})

export const persistor: Persistor = persistStore(store)
