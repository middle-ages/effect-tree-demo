import {useDispatch, useSelector} from 'react-redux'
import {type RootState} from './state'
import {type AppDispatch} from './store'

export const [useAppSelector, useAppDispatch] = [
  useSelector.withTypes<RootState>(),
  useDispatch.withTypes<AppDispatch>(),
]
