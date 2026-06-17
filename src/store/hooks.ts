import {useDispatch, useSelector} from 'react-redux'
import {type AppDispatch} from './store'
import {type RootState} from '#model'

export const [useAppSelector, useAppDispatch] = [
  useSelector.withTypes<RootState>(),
  useDispatch.withTypes<AppDispatch>(),
]
