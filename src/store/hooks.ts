import {useDispatch, useSelector} from 'react-redux'
import {type AppDispatch, type RootState} from './store'

export const [useAppSelector, useAppDispatch] = [
  useSelector.withTypes<RootState>(),
  useDispatch.withTypes<AppDispatch>(),
]
